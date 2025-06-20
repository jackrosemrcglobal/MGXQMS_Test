// script.js
import { DocumentExporter } from './modules/DocumentExporter.js';
import { DocumentFormatter } from './modules/DocumentFormatter.js';
import { ModalManager } from './modules/ModalManager.js';
import { RevisionManager } from './modules/RevisionManager.js';
import { TemplateManager } from './modules/TemplateManager.js';
import { AuditTrailManager } from './modules/AuditTrailManager.js';
import { formatDate } from './modules/DateFormatter.js';

class DocumentBuilder {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.documentSettings = {
            // Basic Document Information
            id: 'DOC-001',
            title: 'Quality Management Form',
            documentNumberLegacy: '',
            name: 'Quality Management Form',
            description: '',
            documentType: 'SOP',
            contentType: 'Document',
            
            // Dates
            createdDate: new Date().toISOString().split('T')[0],
            modifiedDate: new Date().toISOString().split('T')[0],
            effectiveDate: '',
            revisedDate: new Date().toISOString().split('T')[0],
            expiryDate: '',
            nextReviewDate: '',
            
            // People
            createdBy: 'Quality Department',
            author: 'Quality Department',
            approver: '',
            modifiedBy: '',
            owner: '',
            
            // Organization
            department: 'Operations',
            region: '',
            system: '',
            customer: '',
            workStream: '',
            
            // Status and Approval
            status: 'draft',
            approvalStatus: 'pending',
            approvalProcess: '',
            
            // Classification and Compliance
            classification: 'internal',
            sensitivity: 'internal',
            topic: '',
            isoScope: '',
            isoCritical: false,
            processScope: '',
            complianceAssetId: '',
            
            // Language and Localization
            language: 'en',
            dateFormat: 'YYYY-MM-DD',
            
            // Revision Management
            revision: 'A',
            
            // File Properties
            fileSize: 0,
            itemType: 'Document',
            path: '',
            url: '',
            itemChildCount: 0,
            folderChildCount: 0,
            
            // Retention and Labels
            retentionLabel: '',
            retentionLabelApplied: false,
            labelSetting: '',
            
            // Engagement
            likeCount: 0,
            
            // Comments
            comments: '',
            
            // Tags
            tags: []
        };
        
        // Quick Edit Field Configuration
        this.quickEditConfig = this.getDefaultQuickEditConfig();
        
        this.initialize();
    }

    initialize() {
        // Initialize modules in correct order
        this.auditTrailManager = new AuditTrailManager(this);
        this.revisionManager = new RevisionManager(this);
        this.modalManager = new ModalManager(this);
        this.templateManager = new TemplateManager(this);
        this.formatter = new DocumentFormatter(this);
        this.formatter.setTemplateManager(this.templateManager);
        this.exporter = new DocumentExporter(this);
        
        this.setupApplication();
    }

    setupApplication() {
        this.setupEventListeners();
        this.setupModules();
        this.initializeDocument();
        this.initializeTemplateSystem();
        this.initializeWordProcessingFeatures();
        this.setupSidebarCollapse();
    }

    setupEventListeners() {
        // Document settings
        this.setupDocumentSettingsListeners();
        
        // Main actions
        this.setupMainActionListeners();

        // Document Settings Modal
        document.getElementById('documentSettingsBtn').addEventListener('click', () => this.showDocumentSettingsModal());
        document.getElementById('closeDocumentSettingsModal').addEventListener('click', () => this.hideDocumentSettingsModal());
        document.getElementById('cancelDocumentSettings').addEventListener('click', () => this.hideDocumentSettingsModal());
        document.getElementById('applyDocumentSettings').addEventListener('click', () => this.applyDocumentSettingsChanges());

        // Add New Page button
        document.getElementById('addNewPageBtn').addEventListener('click', () => this.addNewPage());
        
        // Content monitoring
        this.setupContentMonitoring();
        
        // Quick Edit Configuration
        this.setupQuickEditConfigListeners();
    }

    setupQuickEditConfigListeners() {
        const configureQuickBtn = document.getElementById('configureQuickEdits');
        if (configureQuickBtn) {
            configureQuickBtn.addEventListener('click', () => this.showQuickEditConfig());
        }
        const resetQuickBtn = document.getElementById('resetQuickEdits');
        if (resetQuickBtn) {
            resetQuickBtn.addEventListener('click', () => this.resetQuickEditConfig());
        }
        const applyQuickBtn = document.getElementById('applyQuickEditConfig');
        if (applyQuickBtn) {
            applyQuickBtn.addEventListener('click', () => this.applyQuickEditConfig());
        }
        const cancelQuickBtn = document.getElementById('cancelQuickEditConfig');
        if (cancelQuickBtn) {
            cancelQuickBtn.addEventListener('click', () => this.hideQuickEditConfig());
        }
        const closeQuickBtn = document.getElementById('closeQuickEditConfigModal');
        if (closeQuickBtn) {
            closeQuickBtn.addEventListener('click', () => this.hideQuickEditConfig());
        }
    }

    setupDocumentSettingsListeners() {
        // Basic Information (guarded - only attach if element exists)
        const docIdField = document.getElementById('docId');
        if (docIdField) {
            docIdField.addEventListener('input', (e) => {
                this.updateDocumentSetting('id', e.target.value || 'DOC-001');
                this.saveToLocalStorage();
            });
        }
        const docTitleField = document.getElementById('docTitle');
        if (docTitleField) {
            docTitleField.addEventListener('input', (e) => {
                this.updateDocumentSetting('title', e.target.value || 'Quality Management Form');
                this.saveToLocalStorage();
            });
        }
        const docTypeField = document.getElementById('docType');
        if (docTypeField) {
            docTypeField.addEventListener('change', (e) => {
                this.updateDocumentSetting('documentType', e.target.value);
                this.saveToLocalStorage();
            });
        }
        const docAuthorField = document.getElementById('docAuthor');
        if (docAuthorField) {
            docAuthorField.addEventListener('input', (e) => {
                this.updateDocumentSetting('author', e.target.value);
                this.saveToLocalStorage();
            });
        }
        const docDepartmentField = document.getElementById('docDepartment');
        if (docDepartmentField) {
            docDepartmentField.addEventListener('input', (e) => {
                this.updateDocumentSetting('department', e.target.value);
                this.saveToLocalStorage();
            });
        }
        const docRegionField = document.getElementById('docRegion');
        if (docRegionField) {
            docRegionField.addEventListener('change', (e) => {
                this.updateDocumentSetting('region', e.target.value);
                this.saveToLocalStorage();
            });
        }
        const revisionField = document.getElementById('revision');
        if (revisionField) {
            revisionField.addEventListener('input', (e) => {
                this.updateDocumentSetting('revision', e.target.value || 'A');
                this.saveToLocalStorage();
            });
        }
        const effectiveDateField = document.getElementById('effectiveDate');
        if (effectiveDateField) {
            effectiveDateField.addEventListener('input', (e) => {
                this.updateDocumentSetting('effectiveDate', e.target.value);
                this.saveToLocalStorage();
            });
        }
        const revisedDateField = document.getElementById('revisionDate');
        if (revisedDateField) {
            revisedDateField.addEventListener('input', (e) => {
                this.updateDocumentSetting('revisedDate', e.target.value);
                this.saveToLocalStorage();
            });
        }
        const docStatusField = document.getElementById('docStatus');
        if (docStatusField) {
            docStatusField.addEventListener('change', (e) => {
                this.updateDocumentSetting('status', e.target.value);
                this.saveToLocalStorage();
            });
        }
    }

    setupMainActionListeners() {
        // Reset functionality
        document.getElementById('resetBtn').addEventListener('click', () => this.resetDocument());
        
        // Save functionality
        document.getElementById('saveBtn').addEventListener('click', () => this.saveDocument());
        
        // Export functionality
        document.getElementById('publishBtn').addEventListener('click', () => this.publishDocument());
    }

    setupContentMonitoring() {
        document.getElementById('documentContainer').addEventListener('input', (e) => {
            if (e.target.classList.contains('page-content')) {
                this.handleContentChange();
            }
        });
    }

    setupModules() {
        this.formatter.setupFormattingListeners();
        this.modalManager.setupModalListeners();
        this.revisionManager.setupRevisionListeners();
        this.auditTrailManager.setupDisplay();
        
        // Add page break handling
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.addNewPage();
            }
        });
    }

    initializeDocument() {
        // Try to load from local storage first
        const savedData = this.loadFromLocalStorage();
        
        if (savedData) {
            // If we loaded saved data, don't set initial state
            this.updatePageNumbers();
            this.updateAllHeaders();
            this.renderQuickEditFields(); // Render based on saved config
        } else {
            // Only set initial state if no saved data
            this.setInitialDocumentState();
            this.updatePageNumbers();
            this.updateAllHeaders();
            this.renderQuickEditFields(); // Render based on default config

            // Pass initial state to RevisionManager
            const contentElements = Array.from(document.querySelectorAll('.page-content'));
            const contents = contentElements.map(el => el.innerHTML);
            this.revisionManager.setInitialState(
                contents,
                this.getDocumentSettings()
            );
        }
    }

    setInitialDocumentState() {
        const today = new Date().toISOString().split('T')[0];
        
        // Set quick edit form values
        document.getElementById('quickDocId').value = this.documentSettings.id;
        document.getElementById('quickDocTitle').value = this.documentSettings.title;
        document.getElementById('quickDocType').value = this.documentSettings.documentType;
        document.getElementById('quickDocAuthor').value = this.documentSettings.author;
        document.getElementById('quickDocDepartment').value = this.documentSettings.department;
        document.getElementById('quickDocRegion').value = this.documentSettings.region;
        document.getElementById('quickRevision').value = this.documentSettings.revision;
        document.getElementById('quickEffectiveDate').value = this.documentSettings.effectiveDate;
        document.getElementById('quickRevisionDate').value = today;
        document.getElementById('quickDocStatus').value = this.documentSettings.status;
        
        // Update form fields
        document.getElementById('docId').value = this.documentSettings.id;
        document.getElementById('docNumberLegacy').value = this.documentSettings.documentNumberLegacy;
        document.getElementById('docTitle').value = this.documentSettings.title;
        document.getElementById('docDescription').value = this.documentSettings.description;
        document.getElementById('docType').value = this.documentSettings.documentType;
        document.getElementById('contentType').value = this.documentSettings.contentType;
        
        // People and Ownership
        document.getElementById('docCreatedBy').value = this.documentSettings.createdBy;
        document.getElementById('docAuthor').value = this.documentSettings.author;
        document.getElementById('docApprover').value = this.documentSettings.approver;
        document.getElementById('docModifiedBy').value = this.documentSettings.modifiedBy;
        document.getElementById('docOwner').value = this.documentSettings.owner;
        
        // Organization
        document.getElementById('docDepartment').value = this.documentSettings.department;
        document.getElementById('docRegion').value = this.documentSettings.region;
        document.getElementById('docSystem').value = this.documentSettings.system;
        document.getElementById('docCustomer').value = this.documentSettings.customer;
        document.getElementById('docWorkStream').value = this.documentSettings.workStream;
        
        // Status and Approval
        document.getElementById('docStatus').value = this.documentSettings.status;
        document.getElementById('docApprovalStatus').value = this.documentSettings.approvalStatus;
        document.getElementById('docApprovalProcess').value = this.documentSettings.approvalProcess;
        
        // Classification and Compliance
        document.getElementById('docClassification').value = this.documentSettings.classification;
        document.getElementById('docSensitivity').value = this.documentSettings.sensitivity;
        document.getElementById('docTopic').value = this.documentSettings.topic;
        document.getElementById('docISOScope').value = this.documentSettings.isoScope;
        document.getElementById('docISOCritical').checked = this.documentSettings.isoCritical;
        document.getElementById('docProcessScope').value = this.documentSettings.processScope;
        document.getElementById('docComplianceAssetId').value = this.documentSettings.complianceAssetId;
        
        // Language and Localization
        document.getElementById('docLanguage').value = this.documentSettings.language;
        document.getElementById('docDateFormat').value = this.documentSettings.dateFormat || 'YYYY-MM-DD';
        
        // Dates
        document.getElementById('createdDate').value = today;
        document.getElementById('modifiedDate').value = today;
        document.getElementById('effectiveDate').value = this.documentSettings.effectiveDate;
        document.getElementById('revision').value = this.documentSettings.revision;
        document.getElementById('revisionDate').value = today;
        document.getElementById('expiryDate').value = this.documentSettings.expiryDate;
        document.getElementById('nextReviewDate').value = this.documentSettings.nextReviewDate;
        
        // Retention and Labels
        document.getElementById('retentionLabel').value = this.documentSettings.retentionLabel;
        document.getElementById('retentionLabelApplied').checked = this.documentSettings.retentionLabelApplied;
        document.getElementById('labelSetting').value = this.documentSettings.labelSetting;
        
        // File Properties
        document.getElementById('itemType').value = this.documentSettings.itemType;
        document.getElementById('docPath').value = this.documentSettings.path;
        document.getElementById('docURL').value = this.documentSettings.url;
        document.getElementById('fileSize').value = this.documentSettings.fileSize;
        document.getElementById('itemChildCount').value = this.documentSettings.itemChildCount;
        document.getElementById('folderChildCount').value = this.documentSettings.folderChildCount;
        
        // Engagement
        document.getElementById('likeCount').value = this.documentSettings.likeCount;
        
        // Comments
        document.getElementById('docComments').value = this.documentSettings.comments;
        
        // Update tags
        this.renderTags();

        // Update all headers
        this.updateAllHeaders();
    }

    renderTags() {
        const container = document.getElementById('tagsContainer');
        container.innerHTML = '';
        
        this.documentSettings.tags.forEach(tag => {
            const pill = document.createElement('div');
            pill.className = 'tag-pill';
            pill.innerHTML = `
                <span>${tag}</span>
                <button class="tag-remove-btn" data-tag="${tag}">&times;</button>
            `;
            container.appendChild(pill);
        });
        
        // Update metadata display
        this.updateMetadata('tags', this.documentSettings.tags);
    }

    updateMetadata(key, value) {
        const metadataMappings = {
            'id': 'metaDocId',
            'documentNumberLegacy': 'metaDocNumberLegacy',
            'title': 'metaDocTitle',
            'description': 'metaDocDescription',
            'documentType': 'metaDocType',
            'contentType': 'metaContentType',
            'createdBy': 'metaCreatedBy',
            'author': 'metaAuthor',
            'approver': 'metaApprover',
            'modifiedBy': 'metaModifiedBy',
            'owner': 'metaOwner',
            'department': 'metaDepartment',
            'region': 'metaRegion',
            'system': 'metaSystem',
            'customer': 'metaCustomer',
            'workStream': 'metaWorkStream',
            'status': 'metaStatus',
            'approvalStatus': 'metaApprovalStatus',
            'approvalProcess': 'metaApprovalProcess',
            'classification': 'metaClassification',
            'sensitivity': 'metaSensitivity',
            'topic': 'metaTopic',
            'isoScope': 'metaISOScope',
            'isoCritical': 'metaISOCritical',
            'processScope': 'metaProcessScope',
            'complianceAssetId': 'metaComplianceAssetId',
            'language': 'metaLanguage',
            'dateFormat': 'metaDateFormat',
            'createdDate': 'metaCreatedDate',
            'modifiedDate': 'metaModifiedDate',
            'effectiveDate': 'metaEffectiveDate',
            'revisedDate': 'metaRevisedDate',
            'expiryDate': 'metaExpiryDate',
            'nextReviewDate': 'metaNextReviewDate',
            'retentionLabel': 'metaRetentionLabel',
            'retentionLabelApplied': 'metaRetentionLabelApplied',
            'labelSetting': 'metaLabelSetting',
            'itemType': 'metaItemType',
            'path': 'metaPath',
            'url': 'metaURL',
            'fileSize': 'metaFileSize',
            'itemChildCount': 'metaItemChildCount',
            'folderChildCount': 'metaFolderChildCount',
            'likeCount': 'metaLikeCount',
            'comments': 'metaComments',
            'tags': 'metaTags'
        };

        if (metadataMappings[key]) {
            const element = document.getElementById(metadataMappings[key]);
            if (element) {
                if (key === 'status') {
                    const statusText = document.querySelector(`#docStatus option[value="${value}"]`).textContent;
                    element.textContent = statusText;
                    element.dataset.status = value;
                } else if (key === 'isoCritical' || key === 'retentionLabelApplied') {
                    element.checked = value;
                } else if (key === 'classification') {
                    const classText = document.querySelector(`#docClassification option[value="${value}"]`)?.textContent || value;
                    element.textContent = classText;
                } else if (key === 'sensitivity') {
                    const sensText = document.querySelector(`#docSensitivity option[value="${value}"]`)?.textContent || value;
                    element.textContent = sensText;
                } else if (key === 'documentType') {
                    const typeText = document.querySelector(`#docType option[value="${value}"]`)?.textContent || value;
                    element.textContent = typeText;
                } else {
                    element.textContent = value || '-';
                }
            }
        }

        // Special handling for tags
        if (key === 'tags') {
            const tagsElement = document.getElementById('metaTags');
            if (tagsElement) {
                tagsElement.textContent = value.length > 0 ? value.join(', ') : '-';
            }
        }
    }

    updateAllMetadata() {
        if (!this.documentSettings) {
            console.warn('Document settings not initialized');
            return;
        }

        Object.entries(this.documentSettings).forEach(([key, value]) => {
            if (key && value !== undefined) {
                this.updateMetadata(key, value);
            }
        });
        
        // Update tags separately with null check
        const tagsElement = document.getElementById('metaTags');
        if (tagsElement) {
            tagsElement.textContent = (this.documentSettings.tags && this.documentSettings.tags.length > 0) 
                ? this.documentSettings.tags.join(', ') 
                : '-';
        }
    }

    updateAllHeaders() {
        Object.entries(this.documentSettings).forEach(([key, value]) => {
            this.updateHeaders(key, value);
        });
    }

    updateHeaders(key, value) {
        const headerMappings = {
            'id': 'headerDocId',
            'title': 'headerDocTitle',
            'revision': 'headerRevision',
            'effectiveDate': 'headerEffectiveDate', 
            'revisedDate': 'headerRevisedDate',
            'author': 'headerAuthor',
            'department': 'headerDepartment',
            'region': 'headerRegion',
            'documentType': 'headerDocType'
        };

        if (headerMappings[key]) {
            const element = document.getElementById(headerMappings[key]);
            if (element) {
                if (key === 'effectiveDate' || key === 'revisedDate') {
                    element.textContent = value ? this.getFormattedDate(value) : '-';
                } else if (key === 'documentType') {
                    const typeText = document.querySelector(`#docType option[value="${value}"]`)?.textContent || value;
                    element.textContent = typeText;
                } else if (key === 'region') {
                    const regionText = document.querySelector(`#docRegion option[value="${value}"]`)?.textContent || value || '-';
                    element.textContent = regionText;
                } else {
                    element.textContent = value || '-';
                }
            }
        }

        if (key === 'status') {
            const statusBadge = document.getElementById('headerDocStatus');
            if (statusBadge) {
                const statusText = document.querySelector(`#docStatus option[value="${value}"]`).textContent;
                statusBadge.textContent = statusText;
                statusBadge.dataset.status = value;
            }
        }
        
        if (key === 'id') {
            const docIdBottomElement = document.getElementById('headerDocIdBottom');
            if (docIdBottomElement) {
                docIdBottomElement.textContent = value;
            }
        }

        if (key === 'date') {
            const dateElement = document.getElementById('headerDate');
            if (dateElement) {
                dateElement.textContent = this.getFormattedDate(this.documentSettings.date);
            }
        }
        
        if (key === 'status') {
            const headerStatusBadge = document.getElementById('headerDocStatus');
            if (headerStatusBadge) {
                headerStatusBadge.textContent = value;
            }
        }
    }

    getFormattedDate(dateString) {
        return formatDate(dateString, this.documentSettings.dateFormat);
    }

    updatePageNumbers() {
        this.totalPages = document.querySelectorAll('.document-page').length;
        
        // Update page numbers
        const pages = document.querySelectorAll('.page-content');
        if (pages.length > 0) {
            pages.forEach((page, index) => {
                page.innerHTML += `<p>Page ${index + 1}</p>`;
            });
        }
    }

    setupQuickEditConfig() {
        const quickEditConfig = this.modalManager.modalContent.querySelector('#quickEditConfigModal .quick-edit-config-table');
        
        // Render and populate the quick edit config table
        this.renderQuickEditConfig(quickEditConfig);
    }

    renderQuickEditConfig(container) {
        const config = this.quickEditConfig;
        container.innerHTML = '';
        config.forEach((field) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${field.label}</td>
                <td>
                    <input type="checkbox" data-enabled="${field.enabled}" ${field.enabled ? 'checked' : ''}>
                    <label>Enabled</label>
                </td>
                <td>
                    <input type="checkbox" data-show-in-header="${field.showInHeader}" ${field.showInHeader ? 'checked' : ''}>
                    <label>Show in Header</label>
                </td>
                <td>
                    <input type="number" value="${field.order}" min="1" max="${this.quickEditConfig.length}" step="1">
                </td>
                <td>
                    <button class="config-action-btn move-btn" data-direction="-1" ${field.order === 1 ? 'disabled' : ''}>↑</button>
                    <button class="config-action-btn move-btn" data-direction="1" ${field.order === this.quickEditConfig.length ? 'disabled' : ''}>
                        ↓
                    </button>
                </td>
            </tr>
            `);

            container.appendChild(row);
        });
    }

    setupSidebarCollapse() {
        // Add click listeners to all sidebar section headers
        const sidebarHeaders = document.querySelectorAll('.sidebar-section-header');
        
        sidebarHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const section = header.parentElement;
                const isCurrentlyExpanded = section.classList.contains('expanded');
                
                // Close all sections first
                const allSections = document.querySelectorAll('.sidebar-section');
                allSections.forEach(sec => sec.classList.remove('expanded'));
                
                // If the clicked section wasn't expanded, expand it
                if (!isCurrentlyExpanded) {
                    section.classList.add('expanded');
                }
            });
            
            // Add right-click context menu for expand/collapse all
            header.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showSidebarContextMenu(e.pageX, e.pageY);
            });
            
            // Hide sidebar context menu when clicking elsewhere
            document.addEventListener('click', () => {
                this.hideSidebarContextMenu();
            });
        });
        
        // Also add right-click to sidebar itself
        const sidebar = document.querySelector('.sidebar');
        sidebar.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showSidebarContextMenu(e.pageX, e.pageY);
        });
        
        // Hide sidebar context menu when clicking elsewhere
        document.addEventListener('click', () => {
            this.hideSidebarContextMenu();
        });
    }

    showSidebarContextMenu(x, y) {
        // Remove existing context menu if any
        const existingMenu = document.getElementById('sidebarContextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Create new context menu
        const contextMenu = document.createElement('div');
        contextMenu.id = 'sidebarContextMenu';
        contextMenu.className = 'sidebar-context-menu';
        contextMenu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: var(--white);
            border: 1px solid var(--border-color);
            border-radius: 0;
            padding: 0.5rem 0;
            backdrop-filter: blur(10px);
            z-index: 1001;
            display: none;
        `;
        
        // Add menu items
        const expandAllBtn = document.createElement('button');
        expandAllBtn.textContent = 'Expand All';
        expandAllBtn.addEventListener('click', () => {
            this.expandAllSections();
            this.hideSidebarContextMenu();
        });
        
        const collapseAllBtn = document.createElement('button');
        collapseAllBtn.textContent = 'Collapse All';
        collapseAllBtn.addEventListener('click', () => {
            this.collapseAllSections();
            this.hideSidebarContextMenu();
        });
        
        contextMenu.appendChild(expandAllBtn);
        contextMenu.appendChild(collapseAllBtn);
        
        // Adjust position if menu goes off screen
        const rect = contextMenu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right > viewportWidth) {
            contextMenu.style.left = `${x - rect.width}px`;
        }
        if (rect.bottom > viewportHeight) {
            contextMenu.style.top = `${y - rect.height}px`;
        }
        
        document.body.appendChild(contextMenu);
        
        // Display the context menu
        contextMenu.style.display = 'block';
    }

    hideSidebarContextMenu() {
        const existingMenu = document.getElementById('sidebarContextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }
    }

    expandAllSections() {
        const allSections = document.querySelectorAll('.sidebar-section');
        allSections.forEach(section => {
            section.classList.add('expanded');
        });
    }

    collapseAllSections() {
        const allSections = document.querySelectorAll('.sidebar-section');
        allSections.forEach(section => {
            section.classList.remove('expanded');
        });
    }

    showQuickEditConfig() {
        this.modalManager.showModal('quickEditConfig');
    }

    hideQuickEditConfig() {
        this.modalManager.hideModal('quickEditConfig');
    }

    resetQuickEditConfig() {
        const confirmed = confirm('Reset quick edit configuration to default? This will restore all default fields and settings.');
        if (confirmed) {
            this.quickEditConfig = this.getDefaultQuickEditConfig();
            this.renderQuickEditConfig();
            this.saveToLocalStorage();
            this.logAuditEvent('Quick Edit Config Reset', 'Quick edit fields reset to default.');
        }
    }

    applyQuickEditConfig() {
        this.updateQuickEditFieldsToDocument();
        this.updateRevisionBlockFromConfig();
        this.saveToLocalStorage();
        this.logAuditEvent('Quick Edit Configuration Applied', 'Changes to quick edit configuration applied.');
    }

    updateQuickEditFieldsToDocument() {
        const enabledFields = this.quickEditConfig.filter(field => field.enabled);
        enabledFields.forEach(field => {
            const quickFieldId = `quick${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`;
            const quickField = document.getElementById(quickFieldId);
            if (quickField) {
                // Map quick edit field IDs to document setting keys
                const fieldMapping = {
                    'docId': 'id',
                    'docTitle': 'title',
                    'docType': 'documentType',
                    'author': 'author',
                    'department': 'department',
                    'region': 'region',
                    'revision': 'revision',
                    'effectiveDate': 'effectiveDate', 
                    'revisedDate': 'revisedDate', 
                    'status': 'status'
                };
                
                const settingKey = fieldMapping[field.id];
                if (settingKey) {
                    this.updateDocumentSetting(settingKey, quickField.value);
                    // Also update the corresponding full form field
                    const fullFormFieldId = field.id === 'docId' ? 'docId' : 
                                       field.id === 'docTitle' ? 'docTitle' :
                                       field.id === 'docType' ? 'docType' :
                                       field.id === 'author' ? 'docAuthor' :
                                       field.id === 'department' ? 'docDepartment'':
                                       field.id === 'region' ? 'docRegion'':
                                       field.id === 'revision' ? 'revision'':
                                       field.id === 'effectiveDate' ? 'effectiveDate'':
                                       field.id === 'revisedDate' ? 'revisionDate'':
                                       field.id === 'status' ? 'docStatus'': null;

                    if (fullFormFieldId) {
                        const fullFormField = document.getElementById(fullFormFieldId);
                        if (fullFormField) {
                            fullFormField.value = quickField.value;
                        }
                    }
                }

                // Update header visibility based on field configuration
                if (field.showInHeader !== undefined) {
                    this.updateHeaderVisibility(field.id, field.showInHeader);
                    
                    // Update the show/hide checkbox for this field
                    const checkboxId = `show${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`;
                    const checkbox = document.getElementById(checkboxId);
                    if (checkbox) {
                        checkbox.checked = field.showInHeader;
                    }
                }
            });
            
            // Update all headers and metadata to reflect changes
            this.updateAllHeaders();
            this.updateAllMetadata();
        });
    }

    updateHeaderVisibility(fieldId, show) {
        const headerElementMap = {
            'docId': ['headerDocId', 'docIdBottomRow'],
            'docTitle': ['headerDocTitle'],
            'docType': ['docTypeRow'],
            'author': ['authorRow'],
            'department': ['departmentRow'],
            'region': ['regionRow'],
            'revision': ['revisionRow'],
            'effectiveDate': ['effectiveDateRow'],
            'revisedDate': ['revisedDateRow'],
            'status': ['headerDocStatus']
        };

        if (headerElementMap[fieldId]) {
            headerElementMap[fieldId].forEach(elementId => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.style.display = show ? '' : 'none';
                }
            });
        }
    }

    updateRevisionBlockFromConfig() {
        // Get enabled fields that should show in header, sorted by order
        const headerFields = this.quickEditConfig
            .filter(field => field.enabled)
            .sort((a, b) => a.order - b.order);

        // Hide all revision block rows first
        const allRows = [
            'revisionRow', 'effectiveDateRow', 'revisedDateRow', 'authorRow', 
            'departmentRow', 'regionRow', 'docTypeRow', 'docIdBottomRow'
        ];
        
        allRows.forEach(rowId => {
            const row = document.getElementById(rowId);
            if (row) {
                row.style.display = 'none';
            }
        });

        // Create new tbody with ordered rows
        const revisionTable = document.querySelector('.revision-header-table');
        const newTbody = document.createElement('tbody');

        // Add rows in the configured order
        headerFields.forEach(field => {
            const rowId = field.id === 'revision' ? 'revisionRow' :
                           field.id === 'effectiveDate' ? 'effectiveDateRow' :
                           field.id === 'revisedDate' ? 'revisedDateRow'':
                           field.id === 'author' ? 'authorRow'':
                           field.id === 'department' ? 'departmentRow'':
                           field.id === 'region' ? 'regionRow'':
                           field.id === 'docType' ? 'docTypeRow'':
                           field.id === 'docId' ? 'docIdBottomRow'': null;
            
            const row = document.getElementById(rowId);
            if (row) {
                row.style.display = 'table-row';
            }
        });

        // Replace the tbody content
        revisionTable.appendChild(newTbody);
        
        // Adjust position
        const rect = revisionTable.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right > viewportWidth) {
            revisionTable.style.left = `${rect.left - rect.width}px`;
        }
        if (rect.bottom > viewportHeight) {
            revisionTable.style.top = `${rect.top - rect.height}px`;
        }
    }

    updateDocumentSetting(key, value, suppressLog = false) {
        const oldValue = this.documentSettings[key];
        if (oldValue === value) return;

        this.documentSettings[key] = value;
        this.updateHeaders(key, value);
        this.updateMetadata(key, value);
        
        // When format changes, we need to update all date displays
        if (key === 'dateFormat') {
            this.revisionManager.updateRevisionTable();
            this.revisionManager.updateRevisionList();
            this.updateAllMetadata();
        }

        if (!suppressLog) {
            this.logAuditEvent('Setting Changed', `${key}: '${oldValue}' -> '${value}'`);
        }
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('mrc-document-builder');
            if (saved) {
                const data = JSON.parse(saved);
                
                // Clear existing pages except the first one
                const container = document.getElementById('documentContainer');
                const pages = container.querySelectorAll('.document-page');
                for (let i = 1; i < pages.length; i++) {
                    pages[i].remove();
                }

                // Load content into pages
                if (Array.isArray(data.content)) {
                    const firstPageContent = container.querySelector('.page-content');
                    firstPageContent.innerHTML = data.content[0] || '<p></p>';
                    for (let i = 1; i < data.content.length; i++) {
                        this.addNewPage(data.content[i]);
                    }
                } else {
                    // Fallback for old data format
                    const firstPageContent = container.querySelector('.page-content');
                    firstPageContent.innerHTML = data.content;
                }

                this.loadDocumentSettings(data.settings);
                
                if (data.revisions) {
                    this.revisionManager.revisions = data.revisions;
                    this.revisionManager.initializeRevisionDisplay();
                }
                if(data.auditLog) {
                    this.auditTrailManager.loadLog(data.auditLog);
                }
                
                // Load quick edit configuration
                if (data.quickEditConfig) {
                    this.quickEditConfig = data.quickEditConfig;
                }
                
                // Load header visibility settings
                if (data.headerVisibility) {
                    Object.keys(data.headerVisibility).forEach(checkboxId => {
                        const checkbox = document.getElementById(checkboxId);
                        if (checkbox) {
                            checkbox.checked = data.headerVisibility[checkboxId];
                            // Apply the visibility immediately
                            const fieldMap = {
                                showDocId: 'headerDocId',
                                showDocTitle: 'headerDocTitle',
                                showDocType: 'docTypeRow',
                                showAuthor: 'authorRow',
                                showDepartment: 'departmentRow',
                                showRegion: 'regionRow',
                                showRevision: 'revisionRow',
                                showEffectiveDate: 'effectiveDateRow', 
                                showRevisionDate: 'revisedDateRow',
                                showStatus: 'headerDocStatus'
                            };
                            const fieldId = fieldMap[checkboxId];
                            if (fieldId) {
                                this.updateHeaderVisibility(fieldId, checkbox.checked);
                            }
                        });
                }
                
                // Update all displays
                this.updateAllHeaders();
                this.updateAllMetadata();
                
                // Log the session resumed event
                this.logAuditEvent('Session Resumed', 'Loaded previous state from local storage.');
                return data;
            }
        } catch (error) {
            console.error('Failed to load saved document:', error);
        }
        return null;
    }

    loadDocumentSettings(settings) {
        if (!settings || typeof settings !== 'object') {
            console.warn('Invalid settings object provided');
            return;
        }

        this.documentSettings = {
            ...this.documentSettings, // Keep existing settings as fallback
            ...settings // Overlay new settings
        };
        
        // Helper function to safely set field value
        const safeSetValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = !!value;
                } else {
                    element.value = value || '';
                }
            }
        };

        // Helper function to safely set content
        const safeSetContent = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = value || '';
            }
        };

        try {
            // Basic Information
            safeSetValue('docId', settings.id);
            safeSetValue('docNumberLegacy', settings.documentNumberLegacy);
            safeSetValue('docTitle', settings.title);
            safeSetValue('docDescription', settings.description);
            safeSetValue('docType', settings.documentType);
            safeSetValue('contentType', settings.contentType);
            
            // People and Ownership
            safeSetValue('docCreatedBy', settings.createdBy);
            safeSetValue('docAuthor', settings.author);
            safeSetValue('docApprover', settings.approver);
            safeSetValue('docModifiedBy', settings.modifiedBy);
            safeSetValue('docOwner', settings.owner);
            
            // Organization
            safeSetValue('docDepartment', settings.department);
            safeSetValue('docRegion', settings.region);
            safeSetValue('docSystem', settings.system);
            safeSetValue('docCustomer', settings.customer);
            safeSetValue('docWorkStream', settings.workStream);
            
            // Status and Approval
            safeSetValue('docStatus', settings.status);
            safeSetValue('docApprovalStatus', settings.approvalStatus);
            safeSetValue('docApprovalProcess', settings.approvalProcess);
            
            // Classification and Compliance
            safeSetValue('docClassification', settings.classification);
            safeSetValue('docSensitivity', settings.sensitivity);
            safeSetValue('docTopic', settings.topic);
            safeSetValue('docISOScope', settings.isoScope);
            document.getElementById('docISOCritical').checked = settings.isoCritical;
            safeSetValue('docProcessScope', settings.processScope);
            safeSetValue('docComplianceAssetId', settings.complianceAssetId);
            
            // Language and Localization
            safeSetValue('docLanguage', settings.language);
            safeSetValue('docDateFormat', settings.dateFormat || 'YYYY-MM-DD');
            
            // Dates
            safeSetValue('createdDate', settings.createdDate);
            safeSetValue('modifiedDate', settings.modifiedDate);
            safeSetValue('effectiveDate', settings.effectiveDate);
            safeSetValue('revisedDate', settings.revisedDate);
            safeSetValue('expiryDate', settings.expiryDate);
            safeSetValue('nextReviewDate', settings.nextReviewDate);
            
            // Retention and Labels
            safeSetValue('retentionLabel', settings.retentionLabel);
            document.getElementById('retentionLabelApplied').checked = settings.retentionLabelApplied;
            safeSetValue('labelSetting', settings.labelSetting);
            
            // File Properties
            safeSetValue('itemType', settings.itemType);
            safeSetValue('docPath', settings.path);
            safeSetValue('docURL', settings.url);
            safeSetValue('fileSize', settings.fileSize);
            safeSetValue('itemChildCount', settings.itemChildCount);
            safeSetValue('folderChildCount', settings.folderChildCount);
            
            // Engagement
            safeSetValue('likeCount', settings.likeCount);
            
            // Comments
            safeSetValue('docComments', settings.comments);
            
            // Update tags
            this.documentSettings.tags = settings.tags || [];
            
            // Update all headers and metadata after setting values
            this.updateAllHeaders();
            this.updateAllMetadata();
            
        } catch (error) {
            console.error('Error loading document settings:', error);
            // Continue execution even if some elements fail
        }
    }

    saveToLocalStorage() {
        const documentData = {
            settings: this.documentSettings,
            content: this.getContent(),
            revisions: this.revisionManager.getRevisions(),
            auditLog: this.auditTrailManager.getLog(),
            quickEditConfig: this.quickEditConfig, // Save quick edit configuration
            headerVisibility: {
                showDocId: document.getElementById('showDocId')?.checked || false,
                showDocTitle: document.getElementById('showDocTitle')?.checked || false,
                showDocType: document.getElementById('showDocType')?.checked || false,
                showAuthor: document.getElementById('showAuthor')?.checked || false,
                showDepartment: document.getElementById('showDepartment')?.checked || false,
                showRegion: document.getElementById('showRegion')?.checked || false,
                showRevision: document.getElementById('showRevision')?.checked || false,
                showEffectiveDate: document.getElementById('showEffectiveDate')?.checked || false,
                showRevisionDate: document.getElementById('showRevisionDate')?.checked || false,
                showStatus: document.getElementById('showStatus')?.checked || false
            },
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('mrc-document-builder', JSON.stringify(documentData));
        
        // Save to local storage and log action
        this.logAuditEvent('Document Saved', 'Content and settings saved to local storage.');
    }

    getContent() {
        const contentElements = Array.from(document.querySelectorAll('.page-content'));
        return contentElements.map(el => el.innerHTML);
    }

    showSaveConfirmation() {
        // Simple confirmation - could be enhanced with a toast notification
        const saveBtn = document.getElementById('saveBtn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        saveBtn.style.background = '#28a745';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = '';
        }, 2000);
    }

    resetDocument() {
        // Show confirmation dialog
        const confirmed = confirm('Are you sure you want to reset the document? This will clear all content and settings and cannot be undone.');
        
        if (!confirmed) {
            return; // User cancelled
        }

        try {
            // Clear local storage
            localStorage.removeItem('mrc-document-builder');
            
            // Reset document settings to defaults
            this.documentSettings = {
                // Basic Document Information
                id: 'DOC-001',
                title: 'Quality Management Form',
                documentNumberLegacy: '',
                name: 'Quality Management Form',
                description: '',
                documentType: 'SOP',
                contentType: 'Document',
                
                // Dates
                createdDate: new Date().toISOString().split('T')[0],
                modifiedDate: new Date().toISOString().split('T')[0],
                effectiveDate: '',
                revisedDate: new Date().toISOString().split('T')[0],
                expiryDate: '',
                nextReviewDate: '',
                
                // People
                createdBy: 'Quality Department',
                author: 'Quality Department',
                approver: '',
                modifiedBy: '',
                owner: '',
                
                // Organization
                department: 'Operations',
                region: '',
                system: '',
                customer: '',
                workStream: '',
                
                // Status and Approval
                status: 'draft',
                approvalStatus: 'pending',
                approvalProcess: '',
                
                // Classification and Compliance
                classification: 'internal',
                sensitivity: 'internal',
                topic: '',
                isoScope: '',
                isoCritical: false,
                processScope: '',
                complianceAssetId: '',
                
                // Language and Localization
                language: 'en',
                dateFormat: 'YYYY-MM-DD',
                
                // Revision Management
                revision: 'A',
                
                // File Properties
                fileSize: 0,
                itemType: 'Document',
                path: '',
                url: '',
                itemChildCount: 0,
                folderChildCount: 0,
                
                // Retention and Labels
                retentionLabel: '',
                retentionLabelApplied: false,
                labelSetting: '',
                
                // Engagement
                likeCount: 0,
                
                // Comments
                comments: '',
                
                // Tags
                tags: []
            };

            // Reset quick edit configuration to default
            this.quickEditConfig = this.getDefaultQuickEditConfig();

            // Reset document content to default
            document.getElementById('documentContent').innerHTML = '<h1>Document Title</h1><p>Start typing your document content here...</p>';
            
            // Reset revisions to initial state
            this.revisionManager.revisions = [
                {
                    rev: 'A',
                    date: new Date().toISOString().split('T')[0],
                    description: 'Initial Release',
                    author: 'Quality Team',
                    approver: 'QM',
                    content: '<h1>Document Title</h1><p>Start typing your document content here...</p>',
                    settings: this.getDocumentSettings()
                }
            ];
            
            // Reset audit trail
            this.auditTrailManager.log = [];
            this.auditTrailManager.renderAll();
            
            // Reinitialize the document state
            this.setInitialDocumentState();
            
            // Update all displays
            this.updateAllHeaders();
            this.updateAllMetadata();
            this.renderQuickEditFields(); // Render fields with default config
            
            // Log the reset action
            this.logAuditEvent('Document Reset', 'Document cleared and reset to default state.');
            
        } catch (error) {
            console.error('Reset failed:', error);
            alert('Failed to reset document: ' + error.message);
        }
    }

    publishDocument() {
        // Add confirmation dialog
        const confirmed = confirm('Are you sure you want to publish and export this document? This will generate multiple file formats (DOCX, PDF, TXT, XLSX).');
        
        if (!confirmed) {
            return; // User cancelled
        }
        
        try {
            this.exporter.publishDocument();
            this.logAuditEvent('Document Exported', 'All formats generated.');
        } catch (error) {
            console.error('Publish failed:', error);
            this.logAuditEvent('Export Failed', error.message);
        }
    }

    addNewPage(contentHTML = '<p>Start typing on your new page...</p>') {
        const documentContainer = document.getElementById('documentContainer');
        const pageCount = documentContainer.querySelectorAll('.document-page').length;

        const newPage = document.createElement('div');
        newPage.className = 'document-page';
        newPage.id = `page${pageCount + 1}`;

        // Clone header and footer from first page
        const firstPage = document.getElementById('page1');
        const header = firstPage.querySelector('.page-header').cloneNode(true);
        const footer = firstPage.querySelector('.page-footer').cloneNode(true);

        // Create content area with provided HTML
        const content = document.createElement('div');
        content.className = 'page-content';
        content.contentEditable = 'true';
        content.innerHTML = contentHTML;

        // Assemble page
        newPage.appendChild(header);
        newPage.appendChild(content);
        newPage.appendChild(footer);

        // Add to document
        documentContainer.appendChild(newPage);
        
        // Update page count
        this.updatePageNumbers();
        
        // Focus new content area
        content.focus();

        // Log audit event
        this.logAuditEvent('Page Added', `Added page ${pageCount + 1}`);
    }

    toggleHeaderElement(elementId, show) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = show ? '' : 'none';
        }
    }

    // Getter methods for modules
    getDocumentSettings() {
        return { ...this.documentSettings };
    }

    getRevisions() {
        return this.revisionManager.getRevisions();
    }

    getFormattedDate(dateString) {
        return formatDate(dateString, this.documentSettings.dateFormat);
    }

    logAuditEvent(action, details) {
        this.auditTrailManager.addEntry(action, details);
    }

    // Cleanup
    resetConfig() {
        this.quickEditConfig = this.getDefaultQuickEditConfig();
    }

    getDefaultQuickEditConfig() {
        return [
            { id: 'docId', label: 'Document ID', enabled: true, showInHeader: true, order: 1, type: 'text', placeholder: 'DOC-001' },
            { id: 'docTitle', label: 'Document Title', enabled: true, showInHeader: true, order: 2, type: 'text', placeholder: 'Quality Management Form' },
            { id: 'docType', label: 'Document Type', enabled: true, showInHeader: true, order: 3, type: 'select', options: [
                { value: 'SOP', text: 'Standard Operating Procedure' },
                { value: 'WI', text: 'Work Instruction' },
                { value: 'Policy', text: 'Policy' },
                { value: 'Form', text: 'Form' },
                { value: 'Manual', text: 'Manual' },
                { value: 'Procedure', text: 'Procedure' },
                { value: 'Specification', text: 'Specification' },
                { value: 'Record', text: 'Record' },
                { value: 'Definition', text: 'Definition' },
                { value: 'DefinitionList', text: 'Definition List' },
            ]},
            { id: 'author', label: 'Author', enabled: true, showInHeader: true, order: 4, type: 'text', placeholder: 'Quality Department' },
            { id: 'department', label: 'Department', enabled: true, showInHeader: true, order: 5, type: 'text', placeholder: 'Operations' },
            { id: 'region', label: 'Region', enabled: true, showInHeader: true, order: 6, type: 'select', options: [
                { value: '', text: 'Select Region' },
                { value: 'EMEA', text: 'EMEA' },
                { value: 'AMERICAS', text: 'Americas' },
                { value: 'APAC', text: 'Asia Pacific' },
                { value: 'Global', text: 'Global' }
            ]},
            { id: 'revision', label: 'Revision', enabled: true, showInHeader: true, order: 7, type: 'text', placeholder: 'A' },
            { id: 'effectiveDate', label: 'Effective Date', enabled: true, showInHeader: true, order: 8, type: 'date' },
            { id: 'revisedDate', label: 'Revised Date', enabled: true, showInHeader: true, order: 9, type: 'date' },
            { id: 'status', label: 'Status', enabled: true, showInHeader: true, order: 10, type: 'select', options: [
                { value: 'draft', text: 'Draft' },
                { value: 'review', text: 'Under Review' },
                { value: 'approved', text: 'Approved' },
                { value: 'archived', text: 'Archived' },
                { value: 'obsolete', text: 'Obsolete' }
            ]},
        ];
    }
}