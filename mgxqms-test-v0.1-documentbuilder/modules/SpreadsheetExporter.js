import * as XLSX from 'xlsx';
import { ContentProcessor } from './ContentProcessor.js';
import { formatDate } from './DateFormatter.js';

export class SpreadsheetExporter {
    constructor() {
        this.contentProcessor = new ContentProcessor();
    }

    async exportToXLSX(documentSettings, contentElements, revisions) {
        try {
            const { 
                id: docId, 
                title: docTitle, 
                revision, 
                date: revisionDate,
                author,
                department,
                classification,
                status,
                language,
                tags,
                dateFormat
            } = documentSettings;
            const content = contentElements.map(el => this.contentProcessor.extractPlainText(el)).join('\n\n--- Page Break ---\n\n');
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            
            // Document info sheet
            const docInfo = [
                ['Document ID', docId],
                ['Document Title', docTitle],
                ['Author', author],
                ['Department', department],
                ['Classification', classification],
                ['Status', status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'],
                ['Language', language || 'en'],
                ['Tags', tags.join(', ')],
                ['Current Revision', revision],
                ['Date', formatDate(revisionDate, dateFormat)],
                ['Content', content]
            ];
            
            const wsDocInfo = XLSX.utils.aoa_to_sheet(docInfo);
            XLSX.utils.book_append_sheet(wb, wsDocInfo, 'Document Info');
            
            // Revision history sheet
            const revisionData = [
                ['Rev', 'Date', 'Description', 'Author', 'Approved By'],
                ...revisions.map(rev => [rev.rev, formatDate(rev.date, dateFormat), rev.description, rev.author, rev.approver])
            ];
            
            const wsRevisions = XLSX.utils.aoa_to_sheet(revisionData);
            XLSX.utils.book_append_sheet(wb, wsRevisions, 'Revision History');
            
            // Save file
            const filename = this.generateFileName(documentSettings);
            XLSX.writeFile(wb, filename);
            
            return { success: true };
        } catch (error) {
            console.error('XLSX Export Error:', error);
            throw new Error(`XLSX export failed: ${error.message}`);
        }
    }

    generateFileName(documentSettings) {
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
        
        return `${filename}.xlsx`;
    }
}