// Main application controller - coordinates all modules and handles events
import { agendaItems, createAgendaItemHTML } from './modules/agenda.js';
import { exportPestToXLSX, exportSwotToXLSX } from './modules/analyses.js';
import { addIssueRow, exportIssuesToXLSX } from './modules/issues.js';
import * as Lists from './modules/lists.js';
import { addActionItem, updateActionItemSummary } from './modules/actions.js';
import { saveData, loadData, exportToJSON, importFromJSON, exportToPPT } from './modules/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const agendaContainer = document.getElementById('management-review-agenda');
    const issuesContainer = document.getElementById('issues-container');

    // Initialize agenda
    agendaContainer.innerHTML = agendaItems.map(createAgendaItemHTML).join('');

    // Event listeners for analyses
    document.getElementById('export-pest-btn').addEventListener('click', exportPestToXLSX);
    document.getElementById('export-swot-btn').addEventListener('click', exportSwotToXLSX);

    // Event listeners for issues register
    document.getElementById('add-issue-btn').addEventListener('click', () => addIssueRow());
    document.getElementById('export-issues-btn').addEventListener('click', exportIssuesToXLSX);

    // Issues container event delegation
    issuesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-issue-btn')) {
            e.target.closest('.issue-item').remove();

            if (issuesContainer.children.length === 0) {
                 issuesContainer.innerHTML = `<p id="issues-placeholder" class="text-muted">No issues added yet. Click "+ Add Issue" to start building your register.</p>`;
            }
        }
    });

    // Agenda container event delegation
    agendaContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-action-item-btn')) {
            const containerId = e.target.dataset.targetContainer;
            const agendaTitle = e.target.dataset.agendaTitle;
            const container = document.getElementById(containerId);
            addActionItem(container, { agendaTitle });
        }
        if (e.target.classList.contains('delete-action-item-btn')) {
            e.target.closest('.action-item').remove();
            updateActionItemSummary();
        }
        if (e.target.classList.contains('add-list-item-btn')) {
            const containerId = e.target.dataset.targetContainer;
            const listType = e.target.dataset.listType;
            const container = document.getElementById(containerId);
            if (listType === 'feedback') {
                Lists.addCustomerFeedbackRow(container);
            } else if (listType === 'objective') {
                Lists.addQualityObjectiveRow(container);
            } else if (listType === 'process') {
                Lists.addProcessPerformanceRow(container);
            } else if (listType === 'nonconformity') {
                Lists.addNonconformityRow(container);
            } else if (listType === 'kpi') {
                Lists.addKPIRow(container);
            } else if (listType === 'audit') {
                Lists.addAuditRow(container);
            } else if (listType === 'supplier') {
                Lists.addSupplierRow(container);
            } else if (listType === 'resource') {
                Lists.addResourceRow(container);
            } else if (listType === 'risk-opportunity') {
                Lists.addRiskOpportunityRow(container);
            } else if (listType === 'improvement') {
                Lists.addImprovementRow(container);
            }
        }
        if (e.target.classList.contains('delete-list-item-btn')) {
            e.target.closest('tr').remove();
        }
    });
    
    // Listen for any input changes to update summary in real-time
    document.getElementById('management-review-agenda').addEventListener('input', updateActionItemSummary);

    // Data persistence event listeners
    document.getElementById('save-progress').addEventListener('click', saveData);
    document.getElementById('finalize-print').addEventListener('click', () => {
        saveData();
        // Give a small delay to ensure data is saved before print dialog
        setTimeout(() => window.print(), 100);
    });
    document.getElementById('export-ppt').addEventListener('click', exportToPPT);
    document.getElementById('export-json').addEventListener('click', exportToJSON);
    document.getElementById('import-json').addEventListener('click', () => {
        document.getElementById('import-json-file').click();
    });
    document.getElementById('import-json-file').addEventListener('change', importFromJSON);
    document.getElementById('clear-data').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.removeItem('managementReviewData');
            location.reload();
        }
    });

    // Release Notes modal
    document.getElementById('release-notes-btn').addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('releaseNotesModal'));
        modal.show();
    });

    // Initial load
    loadData();
});