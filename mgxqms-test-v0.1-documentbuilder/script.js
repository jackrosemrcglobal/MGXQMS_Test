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
            
            // Comments and Notes
            comments: '',
            
            // Tags
            tags: []
        };
        
        // Quick Edit Field Configuration
        this.quickEditConfig = this.getDefaultQuickEditConfig();
        
        this.initialize();
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
                { value: 'Record', text: 'Record' }
            ]},
            { id: 'author', label: 'Author', enabled: true, showInHeader: true, order: 4, type: 'text', placeholder: 'e.g., Quality Department' },
            { id: 'department', label: 'Department', enabled: true, showInHeader: true, order: 5, type: 'text', placeholder: 'e.g., Operations' },
            { id: 'region', label: 'Region', enabled: true, showInHeader: true, order: 6, type: 'select', options: [
                { value: '', text: 'Select Region' },
                { value: 'EMEA', text: 'EMEA' },
                { value: 'AMERICAS', text: 'Americas' },
                { value: 'APAC', text: 'Asia Pacific' },
                { value: 'Global', text: 'Global' }
            ]},
            { id: 'revision', label: 'Revision', enabled: true, showInHeader: true, order: 7, type: 'text', placeholder: 'A', defaultValue: 'A' },
            { id: 'effectiveDate', label: 'Effective Date', enabled: true, showInHeader: true, order: 8, type: 'date' },
            { id: 'revisedDate', label: 'Revised Date', enabled: true, showInHeader: true, order: 9, type: 'date' },
            { id: 'status', label: 'Status', enabled: true, showInHeader: true, order: 10, type: 'select', options: [
                { value: 'draft', text: 'Draft' },
                { value: 'review', text: 'Under Review' },
                { value: 'approved', text: 'Approved' },
                { value: 'archived', text: 'Archived' },
                { value: 'obsolete', text: 'Obsolete' }
            ]}
        ];
    }

    initialize() {
        try {
            // Initialize modules in correct order
            this.auditTrailManager = new AuditTrailManager(this);
            this.revisionManager = new RevisionManager(this);
            this.modalManager = new ModalManager(this);
            this.templateManager = new TemplateManager(this);
            this.formatter = new DocumentFormatter(this);
            this.formatter.setTemplateManager(this.templateManager);
            this.exporter = new DocumentExporter(this);
            
            // Wait for DOM to be ready before initializing UI
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.setupApplication();
                });
            } else {
                this.setupApplication();
            }
        } catch (error) {
            console.error('Initialization error:', error);
            this.logAuditEvent('Initialization Error', error.message);
            throw error;
        }
    }

    setupApplication() {
        this.setupEventListeners();
        this.setupModules();
        this.initializeDocument();
        this.initializeTemplateSystem();
        this.initializeWordProcessingFeatures();
        this.setupSidebarCollapse();
        this.setupSidebarResize(); // Add this line
    }

    initializeWordProcessingFeatures() {
        // Initialize word count display
        const content = document.getElementById('documentContent');
        if (content) {
            content.addEventListener('input', () => {
                this.formatter.updateWordCount();
            });
        }

        // Initialize word count display container
        const wordCountDisplay = document.getElementById('wordCountDisplay');
        if (wordCountDisplay) {
            // Initial count
            this.formatter.updateWordCount();
        }

        // Find & Replace functionality
        const findReplaceBar = document.getElementById('findReplaceBar');
        if (findReplaceBar) {
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'f') {
                    e.preventDefault();
                    this.formatter.toggleFindReplace();
                }
            });
        }

        // Context menu functionality
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.page-content')) {
                e.preventDefault();
                this.formatter.showContextMenu(e.pageX, e.pageY);
            }
        });

        // Close context menu on clicks outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.context-menu')) {
                this.formatter.hideContextMenu();
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault();
                        this.formatter.formatText('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.formatter.formatText('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        this.formatter.formatText('underline');
                        break;
                    case 'k':
                        e.preventDefault();
                        this.formatter.openLinkModal();
                        break;
                    case 'p':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.formatter.showPrintPreview();
                        }
                        break;
                }
            }
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

    setupSidebarResize() {
        const sidebar = document.querySelector('.sidebar');
        
        // Create divider element
        const divider = document.createElement('div');
        divider.className = 'sidebar-divider';
        sidebar.appendChild(divider);
        
        let isResizing = false;
        let startX;
        let startWidth;
        
        // Add drag start handler
        divider.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.pageX;
            startWidth = parseInt(getComputedStyle(sidebar).width, 10);
            
            // Add dragging classes
            divider.classList.add('dragging');
            document.querySelector('.main-content').classList.add('dragging');
            
            // Prevent text selection during drag
            document.body.style.userSelect = 'none';
        });
        
        // Add drag handler
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const width = startWidth + (e.pageX - startX);
            
            // Enforce min/max width
            if (width >= 200 && width <= 600) {
                sidebar.style.width = `${width}px`;
            }
        });
        
        // Add drag end handler
        document.addEventListener('mouseup', () => {
            if (!isResizing) return;
            
            isResizing = false;
            
            // Remove dragging classes
            divider.classList.remove('dragging');
            document.querySelector('.main-content').classList.remove('dragging');
            
            // Restore text selection
            document.body.style.userSelect = '';
            
            // Save sidebar width preference
            localStorage.setItem('sidebarWidth', sidebar.style.width);
        });
        
        // Restore saved width preference
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth) {
            sidebar.style.width = savedWidth;
        }
    }

    showSidebarContextMenu(x, y) {
        // Remove existing context menu if any
        this.hideSidebarContextMenu();
        
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
            box-shadow: var(--shadow-xl);
            padding: 0.5rem 0;
            z-index: 1001;
            min-width: 160px;
            backdrop-filter: blur(10px);
        `;
        
        const expandAllBtn = document.createElement('button');
        expandAllBtn.textContent = 'Expand All';
        expandAllBtn.className = 'sidebar-context-btn';
        expandAllBtn.addEventListener('click', () => {
            this.expandAllSections();
            this.hideSidebarContextMenu();
        });
        
        const collapseAllBtn = document.createElement('button');
        collapseAllBtn.textContent = 'Collapse All';
        collapseAllBtn.className = 'sidebar-context-btn';
        collapseAllBtn.addEventListener('click', () => {
            this.collapseAllSections();
            this.hideSidebarContextMenu();
        });
        
        contextMenu.appendChild(expandAllBtn);
        contextMenu.appendChild(collapseAllBtn);
        document.body.appendChild(contextMenu);
        
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
    }

    hideSidebarContextMenu() {
        const existingMenu = document.getElementById('sidebarContextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }
    }

    expandAllSections() {
        const allSections = document.querySelectorAll('.sidebar-section');
        allSections.forEach(section => section.classList.add('expanded'));
    }

    collapseAllSections() {
        const allSections = document.querySelectorAll('.sidebar-section');
        allSections.forEach(section => section.classList.remove('expanded'));
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
        
        // Add export all templates button listener
        document.getElementById('exportAllTemplatesBtn').addEventListener('click', async () => {
            try {
                await this.templateManager.exportAllTemplates();
                alert('All templates exported successfully!');
            } catch (error) {
                console.error('Export failed:', error);
                alert('Failed to export templates: ' + error.message);
            }
        });
    }

    showDocumentSettingsModal() {
        this.populateDocumentSettingsTable();
        this.modalManager.showModal('documentSettings');
    }

    hideDocumentSettingsModal() {
        this.modalManager.hideModal('documentSettings');
    }

    populateDocumentSettingsTable() {
        const tbody = document.getElementById('documentSettingsTableBody');
        tbody.innerHTML = '';

        const settingsConfig = [
            { category: 'Basic Information', fields: [
                { key: 'id', label: 'Document ID', type: 'text' },
                { key: 'documentNumberLegacy', label: 'Legacy Document Number', type: 'text' },
                { key: 'title', label: 'Document Title', type: 'text' },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'documentType', label: 'Document Type', type: 'select', options: [
                    { value: 'SOP', text: 'Standard Operating Procedure' },
                    { value: 'WI', text: 'Work Instruction' },
                    { value: 'Policy', text: 'Policy' },
                    { value: 'Form', text: 'Form' },
                    { value: 'Manual', text: 'Manual' },
                    { value: 'Procedure', text: 'Procedure' },
                    { value: 'Specification', text: 'Specification' },
                    { value: 'Record', text: 'Record' }
                ]},
                { key: 'contentType', label: 'Content Type', type: 'select', options: [
                    { value: 'Document', text: 'Document' },
                    { value: 'Template', text: 'Template' },
                    { value: 'Record', text: 'Record' },
                    { value: 'Reference', text: 'Reference' }
                ]}
            ]},
            { category: 'People & Ownership', fields: [
                { key: 'createdBy', label: 'Created By', type: 'text' },
                { key: 'author', label: 'Author', type: 'text' },
                { key: 'approver', label: 'Approver', type: 'text' },
                { key: 'modifiedBy', label: 'Modified By', type: 'text' },
                { key: 'owner', label: 'Owner', type: 'text' }
            ]},
            { category: 'Organization', fields: [
                { key: 'department', label: 'Department', type: 'text' },
                { key: 'region', label: 'Region', type: 'select', options: [
                    { value: '', text: 'Select Region' },
                    { value: 'EMEA', text: 'EMEA' },
                    { value: 'AMERICAS', text: 'Americas' },
                    { value: 'APAC', text: 'Asia Pacific' },
                    { value: 'Global', text: 'Global' }
                ]},
                { key: 'system', label: 'System', type: 'text' },
                { key: 'customer', label: 'Customer', type: 'text' },
                { key: 'workStream', label: 'Work Stream', type: 'text' }
            ]},
            { category: 'Status & Approval', fields: [
                { key: 'status', label: 'Status', type: 'select', options: [
                    { value: 'draft', text: 'Draft' },
                    { value: 'review', text: 'Under Review' },
                    { value: 'approved', text: 'Approved' },
                    { key: 'approvalStatus', label: 'Approval Status', type: 'select', options: [
                        { value: 'pending', text: 'Pending' },
                        { value: 'approved', text: 'Approved' },
                        { value: 'rejected', text: 'Rejected' },
                        { value: 'withdrawn', text: 'Withdrawn' }
                    ]},
                    { key: 'approvalProcess', label: 'Approval Process', type: 'text' }
                ]},
                { key: 'approvalStatus', label: 'Approval Status', type: 'select', options: [
                    { value: 'pending', text: 'Pending' },
                    { value: 'approved', text: 'Approved' },
                    { value: 'rejected', text: 'Rejected' },
                    { value: 'withdrawn', text: 'Withdrawn' }
                ]},
                { key: 'approvalProcess', label: 'Approval Process', type: 'text' }
            ]},
            { category: 'Classification & Compliance', fields: [
                { key: 'classification', label: 'Classification', type: 'select', options: [
                    { value: 'public', text: 'Public' },
                    { value: 'internal', text: 'Internal Use' },
                    { value: 'confidential', text: 'Confidential' },
                    { value: 'restricted', text: 'Restricted' }
                ]},
                { key: 'sensitivity', label: 'Sensitivity', type: 'select', options: [
                    { value: 'public', text: 'Public' },
                    { value: 'internal', text: 'Internal' },
                    { value: 'confidential', text: 'Confidential' },
                    { value: 'highly-confidential', text: 'Highly Confidential' }
                ]},
                { key: 'topic', label: 'Topic', type: 'text' },
                { key: 'isoScope', label: 'ISO Scope', type: 'text' },
                { key: 'isoCritical', label: 'ISO Critical Document', type: 'checkbox' },
                { key: 'processScope', label: 'Process Scope', type: 'text' },
                { key: 'complianceAssetId', label: 'Compliance Asset ID', type: 'text' }
            ]},
            { category: 'Language & Localization', fields: [
                { key: 'language', label: 'Document Language', type: 'select', options: [
                    { value: 'en', text: 'English' },
                    { value: 'es', text: 'Spanish' },
                    { value: 'fr', text: 'French' },
                    { value: 'de', text: 'German' },
                    { value: 'zh', text: 'Chinese' },
                    { value: 'ja', text: 'Japanese' },
                    { value: 'pt', text: 'Portuguese' },
                    { value: 'it', text: 'Italian' },
                    { value: 'ru', text: 'Russian' },
                    { value: 'ar', text: 'Arabic' }
                ]},
                { key: 'dateFormat', label: 'Date Format', type: 'select', options: [
                    { value: 'YYYY-MM-DD', text: 'YYYY-MM-DD (e.g., 2023-10-27)' },
                    { value: 'MM/DD/YYYY', text: 'MM/DD/YYYY (e.g., 10/27/2023)' },
                    { value: 'DD-MM-YYYY', text: 'DD-MM-YYYY (e.g., 27-10-2023)' },
                    { value: 'DD/MM/YYYY', text: 'DD/MM/YYYY (e.g., 27/10/2023)' },
                    { value: 'D MMMM YYYY', text: 'D MMMM YYYY (e.g., 27 October 2023)' },
                    { value: 'MMMM D, YYYY', text: 'MMMM D, YYYY (e.g., October 27, 2023)' },
                    { value: 'DD.MM.YYYY', text: 'DD.MM.YYYY (e.g., 27.10.2023)' },
                    { value: 'YYYY年MM月DD日', text: 'YYYY年MM月DD日 (Chinese format)' },
                    { value: 'DD-MMM-YYYY', text: 'DD-MMM-YYYY (e.g., 27-Oct-2023)' }
                ]}
            ]},
            { category: 'Dates', fields: [
                { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                { key: 'revision', label: 'Revision', type: 'text' },
                { key: 'revisedDate', label: 'Revised Date', type: 'date' },
                { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                { key: 'nextReviewDate', label: 'Next Review Date', type: 'date' }
            ]},
            { category: 'Retention & Labels', fields: [
                { key: 'retentionLabel', label: 'Retention Label', type: 'select', options: [
                    { value: '', text: 'Select Retention' },
                    { value: '1-year', text: '1 Year' },
                    { value: '3-years', text: '3 Years' },
                    { value: '7-years', text: '7 Years' },
                    { value: 'permanent', text: 'Permanent' },
                    { value: 'regulatory', text: 'Regulatory' }
                ]},
                { key: 'retentionLabelApplied', label: 'Retention Label Applied', type: 'checkbox' },
                { key: 'labelSetting', label: 'Label Setting', type: 'text' }
            ]},
            { category: 'File Properties', fields: [
                { key: 'itemType', label: 'Item Type', type: 'select', options: [
                    { value: 'Document', text: 'Document' },
                    { value: 'Folder', text: 'Folder' },
                    { value: 'Template', text: 'Template' },
                    { value: 'Link', text: 'Link' }
                ]},
                { key: 'path', label: 'Path', type: 'text' },
                { key: 'url', label: 'URL', type: 'url' }
            ]},
            { category: 'Comments', fields: [
                { key: 'comments', label: 'Comments', type: 'textarea' }
            ]}
        ];

        settingsConfig.forEach(category => {
            // Add category header
            const categoryRow = document.createElement('tr');
            categoryRow.innerHTML = `
                <td colspan="2" style="padding: 1rem 0.75rem; background: var(--primary-red); color: var(--white); font-weight: bold; text-align: center;">
                    ${category.category}
                </td>
            `;
            tbody.appendChild(categoryRow);

            // Add fields for this category
            category.fields.forEach(field => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="padding: 0.75rem; border: 1px solid var(--border-color); font-weight: 600; background: var(--lighter-gray);">
                        ${field.label}
                    </td>
                    <td style="padding: 0.75rem; border: 1px solid var(--border-color);">
                        ${this.createFieldInput(field)}
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
    }

    createFieldInput(field) {
        const currentValue = this.documentSettings[field.key] || '';
        
        switch (field.type) {
            case 'select':
                const options = field.options.map(option => 
                    `<option value="${option.value}" ${currentValue === option.value ? 'selected' : ''}>${option.text}</option>`
                ).join('');
                return `<select id="modal_${field.key}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color);">${options}</select>`;
            
            case 'textarea':
                return `<textarea id="modal_${field.key}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); min-height: 60px; resize: vertical;" placeholder="${field.placeholder || ''}">${currentValue}</textarea>`;
            
            case 'checkbox':
                return `<label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="modal_${field.key}" ${currentValue ? 'checked' : ''}> Yes</label>`;
            
            case 'date':
                return `<input type="date" id="modal_${field.key}" value="${currentValue}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color);">`;
            
            case 'url':
                return `<input type="url" id="modal_${field.key}" value="${currentValue}" placeholder="${field.placeholder || ''}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color);">`;
            
            default: // text
                return `<input type="text" id="modal_${field.key}" value="${currentValue}" placeholder="${field.placeholder || ''}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color);">`;
        }
    }

    applyDocumentSettingsChanges() {
        const fieldsToUpdate = [
            'id', 'documentNumberLegacy', 'title', 'description', 'documentType', 'contentType',
            'createdBy', 'author', 'approver', 'modifiedBy', 'owner',
            'department', 'region', 'system', 'customer', 'workStream',
            'status', 'approvalStatus', 'approvalProcess',
            'classification', 'sensitivity', 'topic', 'isoScope', 'isoCritical', 'processScope', 'complianceAssetId',
            'language', 'dateFormat',
            'effectiveDate', 'revision', 'revisedDate', 'expiryDate', 'nextReviewDate',
            'retentionLabel', 'retentionLabelApplied', 'labelSetting',
            'itemType', 'path', 'url',
            'comments'
        ];

        const changes = [];
        fieldsToUpdate.forEach(field => {
            const modalField = document.getElementById(`modal_${field}`);
            if (modalField) {
                let newValue;
                
                if (modalField.type === 'checkbox') {
                    newValue = modalField.checked;
                } else {
                    newValue = modalField.value;
                }

                const oldValue = this.documentSettings[field];
                if (oldValue !== newValue) {
                    changes.push({ field, oldValue, newValue });
                    this.updateDocumentSetting(field, newValue, true); // Suppress individual logging
                    
                    // Update corresponding form fields
                    this.updateCorrespondingFormField(field, newValue);
                }
            }
        });

        if (changes.length > 0) {
            // Update all headers and metadata
            this.updateAllHeaders();
            this.updateAllMetadata();
            
            // Sync quick edit fields
            this.syncQuickEditFieldsToDocument();
            
            // Save changes
            this.saveToLocalStorage();
            
            // Log all changes as one audit event
            const changesSummary = changes.map(c => `${c.field}: '${c.oldValue}' -> '${c.newValue}'`).join('; ');
            this.logAuditEvent('Document Settings Updated', `Applied changes: ${changesSummary}`);
            
            alert(`Applied ${changes.length} setting change(s) successfully.`);
        } else {
            alert('No changes detected.');
        }

        this.hideDocumentSettingsModal();
    }

    updateCorrespondingFormField(field, value) {
        // Map document settings to form field IDs
        const fieldMappings = {
            'id': ['docId', 'quickDocId'],
            'documentNumberLegacy': ['docNumberLegacy'],
            'title': ['docTitle', 'quickDocTitle'],
            'description': ['docDescription'],
            'documentType': ['docType', 'quickDocType'],
            'contentType': ['contentType'],
            'createdBy': ['docCreatedBy'],
            'author': ['docAuthor', 'quickDocAuthor'],
            'approver': ['docApprover'],
            'modifiedBy': ['docModifiedBy'],
            'owner': ['docOwner'],
            'department': ['docDepartment', 'quickDocDepartment'],
            'region': ['docRegion', 'quickDocRegion'],
            'system': ['docSystem'],
            'customer': ['docCustomer'],
            'workStream': ['docWorkStream'],
            'status': ['docStatus', 'quickDocStatus'],
            'approvalStatus': ['docApprovalStatus'],
            'approvalProcess': ['docApprovalProcess'],
            'classification': ['docClassification'],
            'sensitivity': ['docSensitivity'],
            'topic': ['docTopic'],
            'isoScope': ['docISOScope'],
            'isoCritical': ['docISOCritical'],
            'processScope': ['docProcessScope'],
            'complianceAssetId': ['docComplianceAssetId'],
            'language': ['docLanguage'],
            'dateFormat': ['docDateFormat'],
            'effectiveDate': ['effectiveDate', 'quickEffectiveDate'],
            'revision': ['revision', 'quickRevision'],
            'revisedDate': ['revisionDate', 'quickRevisionDate'],
            'expiryDate': ['expiryDate'],
            'nextReviewDate': ['nextReviewDate'],
            'retentionLabel': ['retentionLabel'],
            'retentionLabelApplied': ['retentionLabelApplied'],
            'labelSetting': ['labelSetting'],
            'itemType': ['itemType'],
            'path': ['docPath'],
            'url': ['docURL'],
            'comments': ['docComments']
        };

        if (fieldMappings[field]) {
            fieldMappings[field].forEach(formFieldId => {
                const formField = document.getElementById(formFieldId);
                if (formField) {
                    if (formField.type === 'checkbox') {
                        formField.checked = value;
                    } else {
                        formField.value = value;
                    }
                }
            });
        }
    }

    setupQuickEditConfigListeners() {
        const configureBtn = document.getElementById('configureQuickEdits');
        if (configureBtn) {
            configureBtn.addEventListener('click', () => this.showQuickEditConfig());
        }
        const resetBtn = document.getElementById('resetQuickEdits');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetQuickEditConfig());
        }
        const applyBtn = document.getElementById('applyQuickEditConfig');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyQuickEditConfig());
        }
        const cancelBtn = document.getElementById('cancelQuickEditConfig');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideQuickEditConfig());
        }
        const closeBtn = document.getElementById('closeQuickEditConfigModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideQuickEditConfig());
        }
    }

    showQuickEditConfig() {
        this.renderQuickEditConfigTable();
        this.modalManager.showModal('quickEditConfig');
    }

    hideQuickEditConfig() {
        this.modalManager.hideModal('quickEditConfig');
    }

    renderQuickEditConfigTable() {
        const tbody = document.getElementById('quickEditConfigBody');
        tbody.innerHTML = '';

        // Sort by order
        const sortedConfig = [...this.quickEditConfig].sort((a, b) => a.order - b.order);

        sortedConfig.forEach((field, index) => {
            const row = document.createElement('tr');
            row.className = 'config-row';
            row.dataset.fieldId = field.id;
            
            row.innerHTML = `
                <td>
                    <input type="checkbox" ${field.enabled ? 'checked' : ''} 
                           onchange="app.documentBuilder.updateQuickEditFieldEnabled('${field.id}', this.checked)">
                </td>
                <td class="field-name">${field.label}</td>
                <td>
                    <input type="checkbox" ${field.showInHeader ? 'checked' : ''} 
                           onchange="app.documentBuilder.updateQuickEditFieldHeader('${field.id}', this.checked)"
                           ${!field.enabled ? 'disabled' : ''}>
                </td>
                <td>
                    <input type="number" value="${field.order}" min="1" max="${this.quickEditConfig.length}"
                           onchange="app.documentBuilder.updateQuickEditFieldOrder('${field.id}', this.value)">
                </td>
                <td>
                    <button class="btn-small config-action-btn move-btn" onclick="app.documentBuilder.moveQuickEditField('${field.id}', -1)" 
                            ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button class="btn-small config-action-btn move-btn" onclick="app.documentBuilder.moveQuickEditField('${field.id}', 1)" 
                            ${index === sortedConfig.length - 1 ? 'disabled' : ''}>↓</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    updateQuickEditFieldEnabled(fieldId, enabled) {
        const field = this.quickEditConfig.find(f => f.id === fieldId);
        if (field) {
            field.enabled = enabled;
            this.renderQuickEditConfigTable();
        }
    }

    updateQuickEditFieldHeader(fieldId, showInHeader) {
        const field = this.quickEditConfig.find(f => f.id === fieldId);
        if (field) {
            field.showInHeader = showInHeader;
        }
    }

    updateQuickEditFieldOrder(fieldId, newOrder) {
        const field = this.quickEditConfig.find(f => f.id === fieldId);
        if (field) {
            field.order = parseInt(newOrder);
            this.renderQuickEditConfigTable();
        }
    }

    moveQuickEditField(fieldId, direction) {
        const fieldIndex = this.quickEditConfig.findIndex(f => f.id === fieldId);
        if (fieldIndex === -1) return;

        const sortedConfig = [...this.quickEditConfig].sort((a, b) => a.order - b.order);
        const sortedIndex = sortedConfig.findIndex(f => f.id === fieldId);
        const newIndex = sortedIndex + direction;

        if (newIndex >= 0 && newIndex < sortedConfig.length) {
            // Swap orders
            const currentField = sortedConfig[sortedIndex];
            const targetField = sortedConfig[newIndex];
            
            const tempOrder = currentField.order;
            currentField.order = targetField.order;
            targetField.order = tempOrder;
            
            this.renderQuickEditConfigTable();
        }
    }

    resetQuickEditConfig() {
        const confirmed = confirm('Reset quick edit configuration to default? This will restore all default fields and settings.');
        if (confirmed) {
            this.quickEditConfig = this.getDefaultQuickEditConfig();
            this.renderQuickEditConfigTable();
        }
    }

    applyQuickEditConfig() {
        this.renderQuickEditFields();
        
        // Update the document with current field values
        this.syncQuickEditFieldsToDocument();
        
        // Update revision block in header based on configuration
        this.updateRevisionBlockFromConfig();
        
        this.hideQuickEditConfig();
        this.saveToLocalStorage();
        this.logAuditEvent('Quick Edit Config Changed', 'Applied new quick edit field configuration');
    }

    syncQuickEditFieldsToDocument() {
        // Get all enabled quick edit fields and update document accordingly
        const enabledFields = this.quickEditConfig
            .filter(field => field.enabled)
            .sort((a, b) => a.order - b.order);

        enabledFields.forEach(field => {
            const quickFieldId = `quick${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`;
            const quickField = document.getElementById(quickFieldId);
            
            if (quickField && quickField.value) {
                // Map quick edit field IDs to document setting keys
                const fieldMapping = {
                    'docId': 'id', 'docTitle': 'title', 'docType': 'documentType',
                    'author': 'author', 'department': 'department', 'region': 'region',
                    'revision': 'revision', 'effectiveDate': 'effectiveDate', 
                    'revisedDate': 'revisedDate', 'status': 'status'
                };

                const settingKey = fieldMapping[field.id];
                if (settingKey) {
                    let value = quickField.value;
                    
                    // Special handling for certain fields
                    if (field.id === 'docId' && !value) value = 'DOC-001';
                    if (field.id === 'docTitle' && !value) value = 'Quality Management Form';
                    if (field.id === 'revision' && !value) value = 'A';

                    this.updateDocumentSetting(settingKey, value);
                    
                    // Also update the corresponding full form field
                    const fullFormFieldId = field.id === 'docId' ? 'docId' : 
                                           field.id === 'docTitle' ? 'docTitle' :
                                           field.id === 'docType' ? 'docType' :
                                           field.id === 'author' ? 'docAuthor' :
                                           field.id === 'department' ? 'docDepartment' :
                                           field.id === 'region' ? 'docRegion' :
                                           field.id === 'revision' ? 'revision' :
                                           field.id === 'effectiveDate' ? 'effectiveDate' :
                                           field.id === 'revisedDate' ? 'revisionDate' :
                                           field.id === 'status' ? 'docStatus' : null;

                    if (fullFormFieldId) {
                        const fullFormField = document.getElementById(fullFormFieldId);
                        if (fullFormField) {
                            fullFormField.value = value;
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
            }
        });
        
        // Update all headers and metadata to reflect changes
        this.updateAllHeaders();
        this.updateAllMetadata();
    }

    renderQuickEditFields() {
        const container = document.getElementById('quickEditFieldsContainer');
        if (!container) {
            console.warn('Quick edit container not found');
            return;
        }

        container.innerHTML = '';

        // Sort by order and filter enabled fields
        const enabledFields = this.quickEditConfig
            .filter(field => field.enabled)
            .sort((a, b) => a.order - b.order);

        enabledFields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const label = document.createElement('label');
            label.setAttribute('for', `quick${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`);
            
            // Create label text with checkbox if field supports header visibility - now inline
            if (field.showInHeader !== undefined) {
                const labelContainer = document.createElement('div');
                labelContainer.style.display = 'flex';
                labelContainer.style.alignItems = 'center';
                labelContainer.style.gap = '0.5rem';
                labelContainer.style.marginBottom = '0.5rem';
                
                const labelText = document.createElement('span');
                labelText.textContent = `${field.label}:`;
                labelText.style.fontWeight = '600';
                labelText.style.color = 'var(--dark-gray)';
                labelText.style.fontSize = '0.9rem';
                labelText.style.letterSpacing = '0.01em';
                
                const checkboxContainer = document.createElement('label');
                checkboxContainer.style.display = 'flex';
                checkboxContainer.style.alignItems = 'center';
                checkboxContainer.style.gap = '0.25rem';
                checkboxContainer.style.fontSize = '0.8rem';
                checkboxContainer.style.fontWeight = 'normal';
                checkboxContainer.style.margin = '0';
                checkboxContainer.style.whiteSpace = 'nowrap';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `show${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`;
                checkbox.checked = field.showInHeader;
                
                const checkboxLabel = document.createElement('span');
                checkboxLabel.textContent = 'Show in Header';
                
                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(checkboxLabel);
                
                labelContainer.appendChild(labelText);
                labelContainer.appendChild(checkboxContainer);
                
                formGroup.appendChild(labelContainer);
            } else {
                label.textContent = `${field.label}:`;
                formGroup.appendChild(label);
            }

            let input;
            const inputId = `quick${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`;

            if (field.type === 'select') {
                input = document.createElement('select');
                input.className = 'form-select';
                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    input.appendChild(optionElement);
                });
            } else if (field.type === 'date') {
                input = document.createElement('input');
                input.type = 'date';
            } else {
                input = document.createElement('input');
                input.type = 'text';
                if (field.placeholder) input.placeholder = field.placeholder;
            }

            input.id = inputId;
            input.style.width = '100%';
            
            // Set default value if specified
            if (field.defaultValue) {
                input.value = field.defaultValue;
            }

            formGroup.appendChild(input);
            container.appendChild(formGroup);

            // Add event listener for header visibility checkbox if it exists
            if (field.showInHeader !== undefined) {
                const checkbox = document.getElementById(`show${field.id.charAt(0).toUpperCase() + field.id.slice(1)}`);
                if (checkbox) {
                    checkbox.addEventListener('change', (e) => {
                        this.updateQuickEditFieldHeader(field.id, e.target.checked);
                        this.updateHeaderVisibility(field.id, e.target.checked);
                        this.saveToLocalStorage();
                    });
                }
            }

            // Add event listener for field changes
            this.addQuickEditFieldListener(input, field);
        });
    }

    addQuickEditFieldListener(input, field) {
        const eventType = field.type === 'select' ? 'change' : 'input';
        
        input.addEventListener(eventType, (e) => {
            // Map quick edit field IDs to document setting keys
            const fieldMapping = {
                'docId': 'id', 'docTitle': 'title', 'docType': 'documentType',
                'author': 'author', 'department': 'department', 'region': 'region',
                'revision': 'revision', 'effectiveDate': 'effectiveDate', 
                'revisedDate': 'revisedDate', 'status': 'status'
            };

            const settingKey = fieldMapping[field.id];
            if (settingKey) {
                let value = e.target.value;
                
                // Special handling for certain fields
                if (field.id === 'docId' && !value) value = 'DOC-001';
                if (field.id === 'docTitle' && !value) value = 'Quality Management Form';
                if (field.id === 'revision' && !value) value = 'A';

                this.updateDocumentSetting(settingKey, value);
                
                // Also update the corresponding full form field
                const fullFormFieldId = field.id === 'docId' ? 'docId' : 
                                       field.id === 'docTitle' ? 'docTitle' :
                                       field.id === 'docType' ? 'docType' :
                                       field.id === 'author' ? 'docAuthor' :
                                       field.id === 'department' ? 'docDepartment' :
                                       field.id === 'region' ? 'docRegion' :
                                       field.id === 'revision' ? 'revision' :
                                       field.id === 'effectiveDate' ? 'effectiveDate' :
                                       field.id === 'revisedDate' ? 'revisionDate' :
                                       field.id === 'status' ? 'docStatus' : null;

                if (fullFormFieldId) {
                    const fullFormField = document.getElementById(fullFormFieldId);
                    if (fullFormField) {
                        fullFormField.value = value;
                    }
                }

                this.saveToLocalStorage();
            }
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
                this.toggleHeaderElement(elementId, show);
            });
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
        try {
            // Add defensive check for required container
            const quickEditContainer = document.getElementById('quickEditFieldsContainer');
            if (!quickEditContainer) {
                console.warn('Quick edit container not found, skipping quick edit initialization');
                return;
            }

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
        } catch (error) {
            console.error('Failed to initialize document:', error);
            // Continue initialization even if quick edit fails
        }
    }

    setInitialDocumentState() {
        const today = new Date().toISOString().split('T')[0];
        
        // First check if elements exist before trying to set values
        const safeSetValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else {
                    element.value = value;
                }
            }
        };

        // Basic Information
        safeSetValue('docId', this.documentSettings.id);
        safeSetValue('docNumberLegacy', this.documentSettings.documentNumberLegacy);
        safeSetValue('docTitle', this.documentSettings.title);
        safeSetValue('docDescription', this.documentSettings.description);
        safeSetValue('docType', this.documentSettings.documentType);
        safeSetValue('contentType', this.documentSettings.contentType);
        
        // People and Ownership
        safeSetValue('docCreatedBy', this.documentSettings.createdBy);
        safeSetValue('docAuthor', this.documentSettings.author);
        safeSetValue('docApprover', this.documentSettings.approver);
        safeSetValue('docModifiedBy', this.documentSettings.modifiedBy);
        safeSetValue('docOwner', this.documentSettings.owner);
        
        // Organization
        safeSetValue('docDepartment', this.documentSettings.department);
        safeSetValue('docRegion', this.documentSettings.region);
        safeSetValue('docSystem', this.documentSettings.system);
        safeSetValue('docCustomer', this.documentSettings.customer);
        safeSetValue('docWorkStream', this.documentSettings.workStream);
        
        // Status and Approval
        safeSetValue('docStatus', this.documentSettings.status);
        safeSetValue('docApprovalStatus', this.documentSettings.approvalStatus);
        safeSetValue('docApprovalProcess', this.documentSettings.approvalProcess);
        
        // Classification and Compliance
        safeSetValue('docClassification', this.documentSettings.classification);
        safeSetValue('docSensitivity', this.documentSettings.sensitivity);
        safeSetValue('docTopic', this.documentSettings.topic);
        safeSetValue('docISOScope', this.documentSettings.isoScope);
        safeSetValue('docISOCritical', this.documentSettings.isoCritical);
        safeSetValue('docProcessScope', this.documentSettings.processScope);
        safeSetValue('docComplianceAssetId', this.documentSettings.complianceAssetId);
        
        // Language and Localization
        safeSetValue('docLanguage', this.documentSettings.language);
        safeSetValue('docDateFormat', this.documentSettings.dateFormat || 'YYYY-MM-DD');
        
        // Dates
        safeSetValue('createdDate', today);
        safeSetValue('modifiedDate', today);
        safeSetValue('effectiveDate', this.documentSettings.effectiveDate);
        safeSetValue('revision', this.documentSettings.revision);
        safeSetValue('revisionDate', today);
        safeSetValue('expiryDate', this.documentSettings.expiryDate);
        safeSetValue('nextReviewDate', this.documentSettings.nextReviewDate);
        
        // Retention and Labels
        safeSetValue('retentionLabel', this.documentSettings.retentionLabel);
        safeSetValue('retentionLabelApplied', this.documentSettings.retentionLabelApplied);
        safeSetValue('labelSetting', this.documentSettings.labelSetting);
        
        // File Properties
        safeSetValue('itemType', this.documentSettings.itemType);
        safeSetValue('docPath', this.documentSettings.path);
        safeSetValue('docURL', this.documentSettings.url);
        safeSetValue('fileSize', this.documentSettings.fileSize);
        safeSetValue('itemChildCount', this.documentSettings.itemChildCount);
        safeSetValue('folderChildCount', this.documentSettings.folderChildCount);
        
        // Engagement
        safeSetValue('likeCount', this.documentSettings.likeCount);
        
        // Comments
        safeSetValue('docComments', this.documentSettings.comments);

        // Update tags
        this.renderTags();

        // Update all headers and metadata
        this.updateAllHeaders();
        this.updateAllMetadata();
    }

    initializeTemplateSystem() {
        // Initialize header dropdown functionality
        const templateBtn = document.getElementById('templateBtn');
        const templateDropdown = document.getElementById('templateDropdownContent');
        
        if (templateBtn) {
            templateBtn.addEventListener('click', () => {
                templateDropdown.classList.toggle('show');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.matches('#templateBtn') && !e.target.closest('.template-dropdown-content')) {
                templateDropdown.classList.remove('show');
            }
        });

        // Initialize with first category in header dropdown
        const headerCategorySelect = document.getElementById('templateCategoryHeader');
        const headerTemplateList = document.getElementById('templateListHeader');
        
        if (headerCategorySelect && headerTemplateList) {
            // Load initial category templates
            const initialCategory = headerCategorySelect.value;
            this.updateHeaderTemplateList(initialCategory);

            // Add category change listener
            headerCategorySelect.addEventListener('change', (e) => {
                this.updateHeaderTemplateList(e.target.value);
            });

            // Add search functionality
            const searchInput = document.getElementById('templateSearchHeader');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.searchHeaderTemplates(e.target.value);
                });
            }
        }

        // Initialize with first category in sidebar
        const categories = this.templateManager.getAllCategories();
        if (categories.length > 0) {
            this.formatter.updateTemplateList(categories[0]);
        }

        // Add category change listener for sidebar
        const categorySelect = document.getElementById('templateCategory');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.formatter.updateTemplateList(e.target.value);
            });
        }

        // Add template search functionality for sidebar
        const templateSearch = document.getElementById('templateSearch');
        if (templateSearch) {
            templateSearch.addEventListener('input', (e) => {
                this.searchTemplates(e.target.value);
            });
        }
    }

    updateHeaderTemplateList(category) {
        const templateList = document.getElementById('templateListHeader');
        if (!templateList) return;
        
        templateList.innerHTML = '';
        const templates = this.templateManager.getTemplatesByCategory(category);
        
        templates.forEach(template => {
            const templateItem = document.createElement('button');
            templateItem.className = 'template-item';
            templateItem.textContent = template.name;
            templateItem.addEventListener('click', () => {
                this.templateManager.insertTemplate(template.name, category);
                document.getElementById('templateDropdownContent').classList.remove('show');
            });
            templateList.appendChild(templateItem);
        });
    }

    searchHeaderTemplates(searchTerm) {
        const templateList = document.getElementById('templateListHeader');
        if (!templateList) return;

        if (!searchTerm.trim()) {
            const category = document.getElementById('templateCategoryHeader').value;
            this.updateHeaderTemplateList(category);
            return;
        }

        templateList.innerHTML = '';
        const results = this.templateManager.searchTemplates(searchTerm);
        
        results.forEach(template => {
            const templateItem = document.createElement('button');
            templateItem.className = 'template-item';
            templateItem.textContent = template.name;
            templateItem.addEventListener('click', () => {
                this.templateManager.insertTemplate(template.name, template.category);
                document.getElementById('templateDropdownContent').classList.remove('show');
            });
            templateList.appendChild(templateItem);
        });
    }

    searchTemplates(searchTerm) {
        const templateList = document.getElementById('templateList');
        if (!templateList) return;

        if (!searchTerm.trim()) {
            const categorySelect = document.getElementById('templateCategory');
            this.formatter.updateTemplateList(categorySelect.value);
            return;
        }

        templateList.innerHTML = '';
        const results = this.templateManager.searchTemplates(searchTerm);
        
        results.forEach(template => {
            const templateItem = document.createElement('button');
            templateItem.className = 'template-item';
            templateItem.textContent = template.name;
            templateItem.addEventListener('click', () => {
                this.templateManager.insertTemplate(template.name, template.category);
            });
            templateList.appendChild(templateItem);
        });
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
            'comments': 'metaComments'
        };

        if (metadataMappings[key]) {
            const element = document.getElementById(metadataMappings[key]);
            if (element) {
                if (key === 'status') {
                    const statusText = document.querySelector(`#docStatus option[value="${value}"]`).textContent;
                    element.textContent = statusText;
                    element.dataset.status = value;
                } else if (key === 'isoCritical' || key === 'retentionLabelApplied') {
                    element.textContent = value ? 'Yes' : 'No';
                } else if (key === 'language') {
                    const languageText = document.querySelector(`#docLanguage option[value="${value}"]`).textContent;
                    element.textContent = languageText;
                } else if (key === 'dateFormat') {
                    const formatText = document.querySelector(`#docDateFormat option[value="${value}"]`).textContent;
                    element.textContent = formatText;
                } else if (key === 'classification') {
                    const classText = document.querySelector(`#docClassification option[value="${value}"]`).textContent;
                    element.textContent = classText;
                } else if (key === 'sensitivity') {
                    const sensText = document.querySelector(`#docSensitivity option[value="${value}"]`).textContent;
                    element.textContent = sensText;
                } else if (key === 'documentType') {
                    const typeText = document.querySelector(`#docType option[value="${value}"]`)?.textContent || value;
                    element.textContent = typeText;
                } else if (key === 'contentType') {
                    const contentText = document.querySelector(`#contentType option[value="${value}"]`).textContent;
                    element.textContent = contentText;
                } else if (key === 'retentionLabel') {
                    const retentionText = document.querySelector(`#retentionLabel option[value="${value}"]`)?.textContent || value;
                    element.textContent = retentionText;
                } else if (key === 'region') {
                    const regionText = document.querySelector(`#docRegion option[value="${value}"]`)?.textContent || value || '-';
                    element.textContent = regionText;
                } else if (key === 'itemType') {
                    const itemText = document.querySelector(`#itemType option[value="${value}"]`).textContent;
                    element.textContent = itemText;
                } else if (['createdDate', 'modifiedDate', 'effectiveDate', 'revisedDate', 'expiryDate', 'nextReviewDate'].includes(key)) {
                    element.textContent = value ? this.getFormattedDate(value) : '-';
                } else {
                    element.textContent = value || '-';
                }
            }
        }

        // Special handling for tags
        if (key === 'tags') {
            const tagsElement = document.getElementById('metaTags');
            if (tagsElement) {
                tagsElement.textContent = this.documentSettings.tags.length > 0 ? this.documentSettings.tags.join(', ') : '-';
            }
        }
    }

    updateAllMetadata() {
        Object.entries(this.documentSettings).forEach(([key, value]) => {
            this.updateMetadata(key, value);
        });
        
        // Update tags separately
        const tagsElement = document.getElementById('metaTags');
        if (tagsElement) {
            tagsElement.textContent = this.documentSettings.tags.length > 0 ? this.documentSettings.tags.join(', ') : '-';
        }
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

        // Also update the Document ID in the revision block
        if (key === 'id') {
            const docIdBottomElement = document.getElementById('headerDocIdBottom');
            if (docIdBottomElement) {
                docIdBottomElement.textContent = value;
            }
        }

        if (key === 'date' || key === 'dateFormat') {
            const dateElement = document.getElementById('headerDate');
            if (dateElement) {
                dateElement.textContent = this.getFormattedDate(this.documentSettings.date);
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
    }

    updateAllHeaders() {
        Object.entries(this.documentSettings).forEach(([key, value]) => {
            this.updateHeaders(key, value);
        });
    }

    loadDocumentSettings(settings) {
        this.documentSettings = { ...settings };
        
        // Helper function to safely set field value
        const safeSetValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else {
                    element.value = value;
                }
            }
        };

        // Helper function to safely set content
        const safeSetContent = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = value;
            }
        };

        // Try to safely set all form fields
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
            safeSetValue('docISOCritical', settings.isoCritical);
            safeSetValue('docProcessScope', settings.processScope);
            safeSetValue('docComplianceAssetId', settings.complianceAssetId);
            
            // Language and Localization
            safeSetValue('docLanguage', settings.language);
            safeSetValue('docDateFormat', settings.dateFormat || 'YYYY-MM-DD');
            
            // Dates
            safeSetValue('createdDate', settings.createdDate);
            safeSetValue('modifiedDate', settings.modifiedDate);
            safeSetValue('effectiveDate', settings.effectiveDate);
            safeSetValue('revision', settings.revision);
            safeSetValue('revisionDate', settings.revisedDate);
            safeSetValue('expiryDate', settings.expiryDate);
            safeSetValue('nextReviewDate', settings.nextReviewDate);
            
            // Header Content
            safeSetContent('headerDocId', settings.id);
            safeSetContent('headerDocTitle', settings.title);
            safeSetContent('headerRevision', settings.revision);
            safeSetContent('headerAuthor', settings.author);
            safeSetContent('headerDepartment', settings.department);
            safeSetContent('headerRegion', settings.region);
            safeSetContent('headerDocType', settings.documentType);
            
            // Document Content
            const content = document.querySelector('.page-content');
            if (content && !content.innerHTML.trim()) {
                content.innerHTML = '<h1>Document Title</h1><p>Start typing your document content here...</p>';
            }

        } catch (error) {
            console.warn('Some elements could not be initialized:', error);
            // Continue execution even if some elements fail
        }

        // Update all headers and metadata after setting values
        this.updateAllHeaders();
        this.updateAllMetadata();
    }

    handleContentChange() {
        // Update modified date when content changes
        const today = new Date().toISOString().split('T')[0];
        this.updateDocumentSetting('modifiedDate', today, true);
        document.getElementById('modifiedDate').value = today;
        
        // Update modified by if not already set
        if (!this.documentSettings.modifiedBy && this.documentSettings.author) {
            this.updateDocumentSetting('modifiedBy', this.documentSettings.author, true);
            document.getElementById('docModifiedBy').value = this.documentSettings.author;
        }
        
        this.checkPageOverflow();
        this.saveToLocalStorage();
    }

    checkPageOverflow() {
        // Enhanced page overflow detection
        const contentElements = document.querySelectorAll('.page-content');
        contentElements.forEach((content, index) => {
            const maxHeight = 8.5 * 96; // Approximate max height in pixels for 8.5 inches at 96 DPI
            
            if (content.scrollHeight > maxHeight && this.totalPages === (index+1)) {
                this.considerPageSplit();
            }
        });
    }

    considerPageSplit() {
        // Placeholder for advanced page splitting logic
        console.log('Content overflow detected - consider implementing page splitting');
    }

    autoSave() {
        // Debounced auto-save functionality
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            this.saveToLocalStorage();
        }, 1000); // Reduced from 2000ms to 1000ms for more frequent saves
    }

    saveDocument() {
        try {
            this.saveToLocalStorage();
            this.showSaveConfirmation();
            this.logAuditEvent('Document Saved', 'Content and settings saved to local storage.');
        } catch (error) {
            console.error('Save failed:', error);
            alert('Failed to save document: ' + error.message);
        }
    }

    saveToLocalStorage() {
        const contentElements = Array.from(document.querySelectorAll('.page-content'));
        const contents = contentElements.map(el => el.innerHTML);

        const documentData = {
            settings: this.documentSettings,
            content: contents,
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
                    Object.entries(data.headerVisibility).forEach(([checkboxId, checked]) => {
                        const checkbox = document.getElementById(checkboxId);
                        if (checkbox) {
                            checkbox.checked = checked;
                            // Apply the visibility immediately
                            const elementMap = {
                                'showDocId': ['headerDocId', 'docIdBottomRow'],
                                'showDocTitle': ['headerDocTitle'],
                                'showDocType': ['docTypeRow'],
                                'showAuthor': ['authorRow'],
                                'showDepartment': ['departmentRow'],
                                'showRegion': ['regionRow'],
                                'showRevision': ['revisionRow'],
                                'showEffectiveDate': ['effectiveDateRow'],
                                'showRevisionDate': ['revisedDateRow'],
                                'showStatus': ['headerDocStatus']
                            };
                            
                            if (elementMap[checkboxId]) {
                                elementMap[checkboxId].forEach(elementId => {
                                    this.toggleHeaderElement(elementId, checked);
                                });
                            }
                        }
                    });
                }
                
                this.logAuditEvent('Session Resumed', 'Loaded previous state from local storage.');
                return data;
            }
        } catch (error) {
            console.error('Failed to load saved document:', error);
        }
        return null;
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
                
                // Comments and Notes
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
            this.revisionManager.updateRevisionTable();
            this.revisionManager.updateRevisionList();
            this.updateAllHeaders();
            this.updateAllMetadata();
            this.renderQuickEditFields(); // Render fields with default config
            
            // Show confirmation
            this.showResetConfirmation();
            
            // Log the reset action
            this.logAuditEvent('Document Reset', 'Document cleared and reset to default state.');
            
        } catch (error) {
            console.error('Reset failed:', error);
            alert('Failed to reset document: ' + error.message);
        }
    }

    showResetConfirmation() {
        // Simple confirmation - similar to save confirmation
        const resetBtn = document.getElementById('resetBtn');
        const originalText = resetBtn.textContent;
        resetBtn.textContent = 'Reset!';
        resetBtn.style.background = '#28a745';
        
        setTimeout(() => {
            resetBtn.textContent = originalText;
            resetBtn.style.background = '';
        }, 2000);
    }

    async publishDocument() {
        // Add confirmation dialog
        const confirmed = confirm('Are you sure you want to publish and export this document? This will generate multiple file formats (DOCX, PDF, TXT, XLSX).');
        
        if (!confirmed) {
            return; // User cancelled
        }
        
        try {
            await this.exporter.publishDocument();
            this.logAuditEvent('Document Exported', 'All formats generated.');
        } catch (error) {
            console.error('Publish failed:', error);
            this.logAuditEvent('Export Failed', error.message);
            alert('Failed to publish document: ' + error.message);
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

        // Add placeholder text if empty
        if (!contentHTML || contentHTML === '<p></p>') {
            content.innerHTML = '<p>Start typing on your new page...</p>';
        }

        // Assemble page
        newPage.appendChild(header);
        newPage.appendChild(content);
        newPage.appendChild(footer);

        // Add to document
        documentContainer.appendChild(newPage);
        
        // Update page count
        this.totalPages = documentContainer.querySelectorAll('.document-page').length;
        
        // Update all headers to maintain consistency
        this.updateAllHeaders();
        
        // Focus new content area
        content.focus();

        // Log audit event
        this.logAuditEvent('Page Added', `Added page ${pageCount + 1}`);

        return content; // Return content element for additional manipulation if needed
    }

    updatePageNumbers() {
        this.totalPages = document.querySelectorAll('.document-page').length;
        // This functionality was not fully implemented in the original code.
        // For now, this just updates the total page count.
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

    toggleHeaderElement(elementId, show) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = show ? '' : 'none';
        }
    }

    addTags(tagsString) {
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
        let changed = false;
        tags.forEach(tag => {
            if (!this.documentSettings.tags.includes(tag)) {
                this.documentSettings.tags.push(tag);
                changed = true;
            }
        });
        if (changed) {
            this.renderTags();
            this.logAuditEvent('Tags Added', tags.join(', '));
        }
    }

    removeTag(tagToRemove) {
        this.documentSettings.tags = this.documentSettings.tags.filter(tag => tag !== tagToRemove);
        this.renderTags();
        this.logAuditEvent('Tag Removed', tagToRemove);
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
        
        // Update metadata tags display
        this.updateMetadata('tags', this.documentSettings.tags);
    }

    updateRevisionBlockFromConfig() {
        // Get enabled fields that should show in header, sorted by order
        const headerFields = this.quickEditConfig
            .filter(field => field.enabled && field.showInHeader)
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

        // Create mapping from field IDs to revision table row IDs
        const fieldToRowMapping = {
            'revision': 'revisionRow',
            'effectiveDate': 'effectiveDateRow', 
            'revisedDate': 'revisedDateRow',
            'author': 'authorRow',
            'department': 'departmentRow',
            'region': 'regionRow',
            'docType': 'docTypeRow',
            'docId': 'docIdBottomRow'
        };

        // Get the revision table container
        const revisionTable = document.querySelector('.revision-header-table');
        if (!revisionTable) return;

        // Create new tbody with ordered rows
        const tbody = revisionTable.querySelector('tbody') || revisionTable;
        const newTbody = document.createElement('tbody');

        // Add rows in the configured order
        headerFields.forEach(field => {
            const rowId = fieldToRowMapping[field.id];
            if (rowId) {
                const existingRow = document.getElementById(rowId);
                if (existingRow) {
                    const clonedRow = existingRow.cloneNode(true);
                    clonedRow.style.display = 'table-row';
                    newTbody.appendChild(clonedRow);
                }
            }
        });

        // Replace the tbody content
        if (tbody === revisionTable) {
            // If no tbody exists, replace all tr elements
            const existingRows = revisionTable.querySelectorAll('tr');
            existingRows.forEach(row => row.remove());
            revisionTable.appendChild(newTbody);
        } else {
            // Replace existing tbody
            tbody.replaceWith(newTbody);
        }
    }
}

// Application initialization
class Application {
    constructor() {
        this.documentBuilder = null;
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseError.bind(this));
        this.init();
    }

    handleError(event) {
        console.error('Application error:', event.error);
        this.showError(event.error?.message || 'Unknown error occurred');
        event.preventDefault();
    }

    handlePromiseError(event) {
        console.error('Unhandled promise rejection:', event.reason);
        this.showError(event.reason?.message || 'Promise rejection occurred');
        event.preventDefault();
    }

    showError(message) {
        const errorContainer = document.getElementById('errorContainer') || this.createErrorContainer();
        errorContainer.innerHTML = `
            <h3>Application Error</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="btn btn-primary">Reload Application</button>
        `;
        errorContainer.style.display = 'block';
    }

    createErrorContainer() {
        const container = document.createElement('div');
        container.id = 'errorContainer';
        container.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border: 1px solid red;
            border-radius: 4px;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(container);
        return container;
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.start(), 100); // Small delay to ensure DOM is ready
            });
        } else {
            setTimeout(() => this.start(), 100);
        }
    }

    start() {
        try {
            if (!document.body) {
                throw new Error('Document body not ready');
            }

            const container = document.createElement('div');
            container.id = 'errorContainer';
            container.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #f8d7da;
                color: #721c24;
                padding: 2rem;
                border-radius: 0;
                border: 1px solid #f5c6cb;
                z-index: 10000;
                display: none;
            `;
            document.body.appendChild(container);

            this.documentBuilder = new DocumentBuilder();
            this.setupGlobalErrorHandling();
            
        } catch (error) {
            console.error('Application failed to start:', error);
            this.showError(error.message);
            throw error; // Re-throw to trigger global error handler
        }
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // Don't show UI error for script load errors
            if (!e.error?.message?.includes('script')) {
                this.showError(e.error);
            }
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showError(e.reason);
        });
    }
}

// Initialize application
window.app = new Application();