import { ExportCoordinator } from './ExportCoordinator.js';

export class DocumentExporter {
    constructor(documentBuilder) {
        this.documentBuilder = documentBuilder;
        this.exportCoordinator = new ExportCoordinator();
    }

    generateFileName(documentSettings, extension) {
        const { id, title, documentType, effectiveDate, revisedDate } = documentSettings;
        
        // Sanitize strings for filename
        const sanitize = (str) => str.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_');
        
        // Format date to YYMMDD
        const formatDateToYYMMDD = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString + 'T00:00:00');
            if (isNaN(date)) return '';
            const year = String(date.getFullYear()).slice(-2);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        };
        
        const docId = sanitize(id || 'DOC-001');
        const docTitle = sanitize(title || 'Document');
        const docType = sanitize(documentType || 'Document');
        const effDate = formatDateToYYMMDD(effectiveDate);
        const revDate = formatDateToYYMMDD(revisedDate) || effDate;
        
        // Build filename: "Document ID - Document Title - Document Type - Effective Date (YYMMDD) - Last Revised Date (YYMMDD)"
        let filename = `${docId} - ${docTitle} - ${docType}`;
        if (effDate) {
            filename += ` - ${effDate}`;
        }
        if (revDate) {
            filename += ` - ${revDate}`;
        }
        
        return `${filename}.${extension}`;
    }

    async publishDocument() {
        this.documentBuilder.modalManager.showExportModal();
        
        try {
            const documentSettings = this.documentBuilder.getDocumentSettings();
            const contentElements = Array.from(document.querySelectorAll('.page-content'));
            const revisions = this.documentBuilder.getRevisions();

            await this.exportCoordinator.executeExportSequence(documentSettings, contentElements, revisions);
            
            this.documentBuilder.modalManager.enableExportModalClose();
        } catch (error) {
            console.error('Export error:', error);
            this.documentBuilder.modalManager.showExportError(error.message);
        }
    }

}