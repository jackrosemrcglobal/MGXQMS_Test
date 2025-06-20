export const PrintManager = {
    modal: null,
    
    init() {
        this.modal = document.getElementById('print-options-modal');
        const openBtn = document.getElementById('print-options-btn');
        const closeBtn = document.getElementById('close-print-modal');
        const printBtn = document.getElementById('print-form-btn');
        
        if (!this.modal || !openBtn || !closeBtn || !printBtn) return;
        
        openBtn.addEventListener('click', () => this.showModal());
        closeBtn.addEventListener('click', () => this.hideModal());
        printBtn.addEventListener('click', () => this.printForm());
        
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hideModal();
            }
        });
    },
    
    showModal() {
        this.populateSectionChecklist();
        this.modal.classList.add('show');
    },
    
    hideModal() {
        this.modal.classList.remove('show');
    },
    
    populateSectionChecklist() {
        const checklistContainer = document.getElementById('print-section-checklist');
        const sections = document.querySelectorAll('#inspection-form > fieldset');
        let checklistHtml = '';
        
        const visibilityState = JSON.parse(localStorage.getItem('form_section_visibility') || '{}');
        
        sections.forEach(section => {
            const sectionId = section.dataset.sectionId;
            const legend = section.querySelector('legend');
            const title = legend ? legend.textContent.trim() : `Section ${sectionId}`;
            
            if (sectionId) {
                const isChecked = visibilityState[sectionId] !== false;
                checklistHtml += `
                    <div class="print-section-item">
                        <label>
                            <input type="checkbox" data-section-id="${sectionId}" ${isChecked ? 'checked' : ''}>
                            ${title}
                        </label>
                    </div>
                `;
            }
        });
        
        checklistContainer.innerHTML = checklistHtml;
    },
    
    printForm() {
        this.hideModal();

        // Always hide empty fields by default for printing
        this.prepareForCompactPrint();
        this.prepareImagesForPrint();

        const printStyles = this.generatePrintStyles();
        const styleEl = document.createElement('style');
        styleEl.id = 'print-override-styles';
        styleEl.innerHTML = `@media print { ${printStyles} }`;
        document.head.appendChild(styleEl);

        setTimeout(() => {
            window.print();
            
            // Cleanup after print dialog
            setTimeout(() => {
                if (document.head.contains(styleEl)) {
                    document.head.removeChild(styleEl);
                }
                // Restore hidden rows after printing
                this.cleanupAfterCompactPrint();
            }, 1000);
        }, 200);
    },

    prepareForCompactPrint() {
        // Hide empty table rows
        document.querySelectorAll('table tbody tr').forEach(tr => {
            if (tr.classList.contains('section-header')) return;
            let isEmpty = true;

            // Check if row is already hidden
            if (tr.classList.contains('hidden') || tr.style.display === 'none') {
                tr.classList.add('print-hide');
                return;
            }

            // Check all inputs in the row
            tr.querySelectorAll('input, textarea, select').forEach(input => {
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                    isEmpty = false;
                } else if (input.type !== 'checkbox' && input.type !== 'radio' && input.value.trim() !== '') {
                    isEmpty = false;
                }
            });

            // Check for non-input text content
            if (tr.querySelectorAll('input, textarea').length === 0 && tr.textContent.trim() !== '') {
                isEmpty = false;
            }

            if (isEmpty) {
                tr.classList.add('print-hide');
            }
        });

        // Hide empty form groups
        document.querySelectorAll('.form-group').forEach(group => {
            let isEmpty = true;
            group.querySelectorAll('input, textarea, select').forEach(input => {
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                    isEmpty = false;
                } else if (input.type !== 'checkbox' && input.type !== 'radio' && input.value && input.value.trim() !== '') {
                    isEmpty = false;
                }
            });
            if (isEmpty) {
                group.classList.add('print-hide');
            }
        });

        // Hide additional items that are hidden by default
        document.querySelectorAll('.additional-item').forEach(item => {
            if (item.classList.contains('hidden')) {
                item.classList.add('print-hide');
            }
        });
    },

    cleanupAfterCompactPrint() {
        document.querySelectorAll('.print-hide').forEach(el => {
            el.classList.remove('print-hide');
        });
    },

    prepareImagesForPrint() {
        const includeImages = document.getElementById('print-opt-images').checked;
        if (!includeImages) return;

        document.querySelectorAll('.image-preview-item').forEach(item => {
            const title = item.querySelector('.title-input').value;
            const comment = item.querySelector('.comment-input').value;
            const detailsDiv = item.querySelector('.image-details');
            if (detailsDiv) {
                detailsDiv.setAttribute('data-title', title || '');
                detailsDiv.setAttribute('data-comment', comment || '');
            }
        });
    },
    
    generatePrintStyles() {
        let styles = `
            /* Hide empty/hidden elements when printing */
            .print-hide,
            .hidden,
            [style*="display: none"] { 
                display: none !important; 
            }

            /* Hide controls and UI elements */
            .table-controls,
            #toggle-additional-items,
            #toggle-additional-calibration,
            #toggle-additional-docs,
            .no-print {
                display: none !important;
            }

            /* Show all hidden rows in tables for printing */
            .item-details-table .additional-item,
            .calibration-table .additional-item,
            .document-table .additional-item {
                display: table-row !important;
            }

            /* Show all paginated manufacturers and avoid breaks */
            .manufacturer-pagination-controls {
                display: none !important;
            }
            #manufacturers-display-container .manufacturer-table-container {
                display: block !important;
                page-break-inside: avoid;
                break-inside: avoid;
            }

            /* Avoid breaks within extended audit tables */
            .extended-audit-table-container {
                page-break-inside: avoid;
                break-inside: avoid;
            }
        `;
        
        return styles;
    }
};