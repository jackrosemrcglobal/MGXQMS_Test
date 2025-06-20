// Data persistence functions
import { addIssueRow } from './issues.js';
import { addActionItem, updateActionItemSummary } from './actions.js';
import * as Lists from './lists.js';
import { showToast } from './ui.js';

export const exportToJSON = () => {
    const data = getCurrentData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISO9001_Management_Review_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data exported to JSON successfully!');
};

export const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            loadFromData(data);
            showToast('Data imported successfully!');
        } catch (error) {
            showToast('Error importing JSON file. Please check the file format.', 5000);
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = '';
};

const getCurrentData = () => {
    const data = {
        details: {
            date: document.getElementById('review-date').value,
            location: document.getElementById('review-location').value,
            attendees: document.getElementById('attendees').value,
        },
        pest: {
            political: document.getElementById('pest-political').value,
            economic: document.getElementById('pest-economic').value,
            social: document.getElementById('pest-social').value,
            technological: document.getElementById('pest-technological').value,
        },
        swot: {
            strengths: document.getElementById('swot-strengths').value,
            weaknesses: document.getElementById('swot-weaknesses').value,
            opportunities: document.getElementById('swot-opportunities').value,
            threats: document.getElementById('swot-threats').value,
        },
        issues: [],
        agenda: {}
    };

    // Save issues
    document.querySelectorAll('.issue-item').forEach(issueEl => {
        data.issues.push({
            desc: issueEl.querySelector('.issue-desc').value,
            type: issueEl.querySelector('.issue-type').value,
            party: issueEl.querySelector('.issue-party').value,
            date: issueEl.querySelector('.issue-date').value,
            riskOpp: issueEl.querySelector('.issue-riskopp').value,
            actions: issueEl.querySelector('.issue-actions').value,
            owner: issueEl.querySelector('.issue-owner').value,
            status: issueEl.querySelector('.issue-status').value,
        });
    });

    const agendaContainer = document.getElementById('management-review-agenda');
    agendaContainer.querySelectorAll('.accordion-item').forEach(itemEl => {
        const itemId = itemEl.id.replace('item-', '');
        const minutes = itemEl.querySelector('textarea').value;
        const actionItems = [];
        
        itemEl.querySelectorAll('.action-item').forEach(actionEl => {
            const task = actionEl.querySelector('.task').value;
            const owner = actionEl.querySelector('.owner').value;
            const due = actionEl.querySelector('.due').value;
            const status = actionEl.querySelector('.status').value;
            const agendaTitle = actionEl.dataset.agendaTitle;
            if (task || owner || due) {
                actionItems.push({ task, owner, due, status, agendaTitle });
            }
        });

        const listItems = [];
        itemEl.querySelectorAll('.dynamic-list-container tbody tr').forEach(rowEl => {
            const rowData = {};
            rowEl.querySelectorAll('[data-field]').forEach(fieldEl => {
                rowData[fieldEl.dataset.field] = fieldEl.value;
            });
            if (Object.values(rowData).some(val => val !== '')) {
                 listItems.push(rowData);
            }
        });

        data.agenda[itemId] = { minutes, actionItems, listItems };
    });

    return data;
};

const loadFromData = (data) => {
    // Clear existing data
    document.getElementById('management-review-agenda').querySelectorAll('.action-item').forEach(el => el.remove());
    document.getElementById('management-review-agenda').querySelectorAll('.dynamic-list-container tbody tr').forEach(el => el.remove());
    document.getElementById('issues-container').innerHTML = `<p id="issues-placeholder" class="text-muted">No issues added yet. Click "+ Add Issue" to start building your register.</p>`;

    // Load details
    if (data.details) {
        document.getElementById('review-date').value = data.details.date || '';
        document.getElementById('review-location').value = data.details.location || '';
        document.getElementById('attendees').value = data.details.attendees || '';
    }

    // Load PEST
    if (data.pest) {
        document.getElementById('pest-political').value = data.pest.political || '';
        document.getElementById('pest-economic').value = data.pest.economic || '';
        document.getElementById('pest-social').value = data.pest.social || '';
        document.getElementById('pest-technological').value = data.pest.technological || '';
    }

    // Load SWOT
    if (data.swot) {
        document.getElementById('swot-strengths').value = data.swot.strengths || '';
        document.getElementById('swot-weaknesses').value = data.swot.weaknesses || '';
        document.getElementById('swot-opportunities').value = data.swot.opportunities || '';
        document.getElementById('swot-threats').value = data.swot.threats || '';
    }

    // Load issues
    if (data.issues && data.issues.length > 0) {
        data.issues.forEach(issue => addIssueRow(issue));
    }
    
    // Load agenda items
    if (data.agenda) {
        for (const itemId in data.agenda) {
            const itemData = data.agenda[itemId];
            const itemEl = document.getElementById(`item-${itemId}`);
            if (itemEl) {
                itemEl.querySelector('textarea').value = itemData.minutes || '';
                const container = itemEl.querySelector(`[id^="action-items-container-"]`);
                if (container && itemData.actionItems) {
                    itemData.actionItems.forEach(action => addActionItem(container, action));
                }
                const listContainer = itemEl.querySelector(`[id^="list-container-"]`);
                if (listContainer && itemData.listItems) {
                    const listType = itemEl.querySelector('.add-list-item-btn').dataset.listType;
                    itemData.listItems.forEach(listItem => {
                        if (listType === 'feedback') {
                            Lists.addCustomerFeedbackRow(listContainer, listItem);
                        } else if (listType === 'objective') {
                            Lists.addQualityObjectiveRow(listContainer, listItem);
                        } else if (listType === 'process') {
                            Lists.addProcessPerformanceRow(listContainer, listItem);
                        } else if (listType === 'nonconformity') {
                            Lists.addNonconformityRow(listContainer, listItem);
                        } else if (listType === 'kpi') {
                            Lists.addKPIRow(listContainer, listItem);
                        } else if (listType === 'audit') {
                            Lists.addAuditRow(listContainer, listItem);
                        } else if (listType === 'supplier') {
                            Lists.addSupplierRow(listContainer, listItem);
                        } else if (listType === 'resource') {
                            Lists.addResourceRow(listContainer, listItem);
                        } else if (listType === 'risk-opportunity') {
                            Lists.addRiskOpportunityRow(listContainer, listItem);
                        } else if (listType === 'improvement') {
                            Lists.addImprovementRow(listContainer, listItem);
                        }
                    });
                }
            }
        }
    }
    updateActionItemSummary();
};

export const exportToPPT = () => {
    const data = getCurrentData();
    const pres = new PptxGenJS();
    
    // Title slide
    const titleSlide = pres.addSlide();
    titleSlide.addText('ISO 9001:2015 Management Review', { 
        x: 1, y: 2, w: 8, h: 1.5, fontSize: 32, bold: true, align: 'center' 
    });
    titleSlide.addText(`Date: ${data.details.date || 'TBD'}`, { 
        x: 1, y: 4, w: 8, h: 0.5, fontSize: 18, align: 'center' 
    });
    titleSlide.addText(`Location: ${data.details.location || 'TBD'}`, { 
        x: 1, y: 4.5, w: 8, h: 0.5, fontSize: 18, align: 'center' 
    });

    // Meeting Details slide
    if (data.details.attendees) {
        const detailsSlide = pres.addSlide();
        detailsSlide.addText('Meeting Details', { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true 
        });
        detailsSlide.addText('Attendees:', { 
            x: 0.5, y: 1.5, w: 2, h: 0.5, fontSize: 16, bold: true 
        });
        detailsSlide.addText(data.details.attendees, { 
            x: 0.5, y: 2, w: 9, h: 4, fontSize: 14 
        });
    }

    // PEST Analysis slide
    if (data.pest.political || data.pest.economic || data.pest.social || data.pest.technological) {
        const pestSlide = pres.addSlide();
        pestSlide.addText('PEST Analysis', { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true 
        });
        
        const pestData = [
            ['Political', 'Economic'],
            [data.pest.political || 'N/A', data.pest.economic || 'N/A'],
            ['Social', 'Technological'],
            [data.pest.social || 'N/A', data.pest.technological || 'N/A']
        ];
        
        pestSlide.addTable(pestData, {
            x: 0.5, y: 1.5, w: 9, h: 4,
            fontSize: 12,
            border: { pt: 1, color: '363636' }
        });
    }

    // SWOT Analysis slide
    if (data.swot.strengths || data.swot.weaknesses || data.swot.opportunities || data.swot.threats) {
        const swotSlide = pres.addSlide();
        swotSlide.addText('SWOT Analysis', { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true 
        });
        
        const swotData = [
            ['Strengths', 'Weaknesses'],
            [data.swot.strengths || 'N/A', data.swot.weaknesses || 'N/A'],
            ['Opportunities', 'Threats'],
            [data.swot.opportunities || 'N/A', data.swot.threats || 'N/A']
        ];
        
        swotSlide.addTable(swotData, {
            x: 0.5, y: 1.5, w: 9, h: 4,
            fontSize: 12,
            border: { pt: 1, color: '363636' }
        });
    }

    // Issues Register slide
    if (data.issues.length > 0) {
        const issuesSlide = pres.addSlide();
        issuesSlide.addText('External & Internal Issues Register', { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true 
        });
        
        const issuesData = [
            ['Issue Description', 'Type', 'Status', 'Owner']
        ];
        
        data.issues.forEach(issue => {
            issuesData.push([
                issue.desc || 'N/A',
                issue.type || 'N/A',
                issue.status || 'N/A',
                issue.owner || 'N/A'
            ]);
        });
        
        issuesSlide.addTable(issuesData, {
            x: 0.5, y: 1.5, w: 9, h: 4,
            fontSize: 10,
            border: { pt: 1, color: '363636' }
        });
    }

    // Action Items Summary slide
    const allActionItems = [];
    for (const itemId in data.agenda) {
        const itemData = data.agenda[itemId];
        if (itemData.actionItems) {
            allActionItems.push(...itemData.actionItems);
        }
    }

    if (allActionItems.length > 0) {
        const actionSlide = pres.addSlide();
        actionSlide.addText('Action Items Summary', { 
            x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true 
        });
        
        const actionData = [
            ['Task', 'Owner', 'Due Date', 'Status']
        ];
        
        allActionItems.forEach(action => {
            actionData.push([
                action.task || 'N/A',
                action.owner || 'N/A',
                action.due || 'N/A',
                action.status || 'N/A'
            ]);
        });
        
        actionSlide.addTable(actionData, {
            x: 0.5, y: 1.5, w: 9, h: 4,
            fontSize: 10,
            border: { pt: 1, color: '363636' }
        });
    }

    pres.writeFile({ fileName: `ISO9001_Management_Review_${new Date().toISOString().split('T')[0]}.pptx` });
    showToast('PowerPoint presentation exported successfully!');
};

export const saveData = () => {
    const data = getCurrentData();
    localStorage.setItem('managementReviewData', JSON.stringify(data));
    updateActionItemSummary();
    showToast('Progress saved successfully!');
};

export const loadData = () => {
    const data = JSON.parse(localStorage.getItem('managementReviewData'));
    if (!data) return;
    loadFromData(data);
};