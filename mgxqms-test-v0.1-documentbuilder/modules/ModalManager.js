export class ModalManager {
    constructor(documentBuilder) {
        this.documentBuilder = documentBuilder;
        this.modals = {
            table: document.getElementById('tableModal'),
            revision: document.getElementById('revisionModal'),
            export: document.getElementById('exportModal'),
            link: document.getElementById('linkModal'),
            quickEditConfig: document.getElementById('quickEditConfigModal'),
            documentSettings: document.getElementById('documentSettingsModal')
        };
    }

    setupModalListeners() {
        // Insert buttons
        document.getElementById('insertTable').addEventListener('click', () => this.showModal('table'));
        document.getElementById('insertImage').addEventListener('click', () => this.insertImage());
        document.getElementById('insertPageBreak').addEventListener('click', () => this.insertPageBreak());

        // Table modal
        document.getElementById('closeTableModal').addEventListener('click', () => this.hideModal('table'));
        document.getElementById('cancelTable').addEventListener('click', () => this.hideModal('table'));
        document.getElementById('createTable').addEventListener('click', () => this.createTable());

        // Link modal
        document.getElementById('closeLinkModal').addEventListener('click', () => this.hideModal('link'));
        document.getElementById('cancelLink').addEventListener('click', () => this.hideModal('link'));
        document.getElementById('createLink').addEventListener('click', () => this.documentBuilder.formatter.applyLink());
        document.getElementById('removeLink').addEventListener('click', () => this.documentBuilder.formatter.removeLink());

        // Export modal
        document.getElementById('closeExportModal').addEventListener('click', () => this.hideModal('export'));

        // Image upload
        document.getElementById('imageInput').addEventListener('change', (e) => this.handleImageUpload(e));

        // Close modals when clicking outside
        this.setupModalBackdropListeners();
    }

    setupModalBackdropListeners() {
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(this.getModalName(modal));
                }
            });
        });
    }

    getModalName(modalElement) {
        for (const [name, element] of Object.entries(this.modals)) {
            if (element === modalElement) return name;
        }
        return null;
    }

    showModal(modalName) {
        if (this.modals[modalName]) {
            this.modals[modalName].classList.add('show');
        }
    }

    hideModal(modalName) {
        if (this.modals[modalName]) {
            this.modals[modalName].classList.remove('show');
        }
    }

    showTableModal() {
        this.showModal('table');
    }

    hideTableModal() {
        this.hideModal('table');
    }

    showExportModal() {
        this.showModal('export');
        // Reset all status indicators
        document.querySelectorAll('.progress-status').forEach(status => {
            status.textContent = '⏳';
        });
        document.getElementById('closeExportModal').style.display = 'none';
    }

    hideExportModal() {
        this.hideModal('export');
    }

    enableExportModalClose() {
        document.getElementById('closeExportModal').style.display = 'block';
    }

    showExportError(message) {
        // Add error message to export modal
        const modalBody = this.modals.export.querySelector('.modal-body');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'export-error';
        errorDiv.style.color = 'var(--primary-red)';
        errorDiv.style.marginTop = '1rem';
        errorDiv.textContent = `Error: ${message}`;
        modalBody.appendChild(errorDiv);
        this.enableExportModalClose();
    }

    createTable() {
        const rows = parseInt(document.getElementById('tableRows').value);
        const cols = parseInt(document.getElementById('tableCols').value);
        const hasHeaders = document.getElementById('tableHeaders').checked;

        let tableHTML = '<table>';
        
        for (let i = 0; i < rows; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < cols; j++) {
                if (i === 0 && hasHeaders) {
                    tableHTML += `<th>Header ${j + 1}</th>`;
                } else {
                    tableHTML += `<td>Cell ${i + 1},${j + 1}</td>`;
                }
            }
            tableHTML += '</tr>';
        }
        
        tableHTML += '</table><p></p>';

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHTML;
        
        while (tempDiv.firstChild) {
            range.insertNode(tempDiv.firstChild);
        }

        this.hideTableModal();
    }

    insertImage() {
        document.getElementById('imageInput').click();
    }

    insertPageBreak() {
        const content = document.getElementById('documentContent');
        const selection = window.getSelection();
        
        if (selection.rangeCount === 0) {
            content.focus();
            const range = document.createRange();
            range.selectNodeContents(content);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        const range = selection.getRangeAt(0);
        const pageBreak = document.createElement('div');
        pageBreak.className = 'page-break';
        pageBreak.innerHTML = '<hr style="page-break-before: always; border: none; margin: 2rem 0;">';
        
        range.insertNode(pageBreak);
        
        // Move cursor after the page break
        range.setStartAfter(pageBreak);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.display = 'block';
                img.style.margin = '1rem 0';

                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                range.insertNode(img);
                
                // Add a paragraph after the image
                const p = document.createElement('p');
                range.insertNode(p);
            };
            reader.readAsDataURL(file);
        }
    }
}