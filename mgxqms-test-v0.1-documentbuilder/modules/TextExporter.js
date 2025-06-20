import saveAs from 'file-saver';
import { ContentProcessor } from './ContentProcessor.js';
import { formatDate } from './DateFormatter.js';

export class TextExporter {
    constructor() {
        this.contentProcessor = new ContentProcessor();
    }

    async exportToTXT(documentSettings, contentElements, revisions) {
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
            
            let txtContent = `${docId} - ${docTitle}\n`;
            txtContent += `Author: ${author || 'N/A'}\n`;
            txtContent += `Department: ${department || 'N/A'}\n`;
            txtContent += `Classification: ${classification || 'N/A'}\n`;
            txtContent += `Status: ${status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A'}\n`;
            txtContent += `Language: ${language || 'en'}\n`;
            txtContent += `Tags: ${tags.join(', ') || 'N/A'}\n`;
            txtContent += `Revision: ${revision}\n`;
            txtContent += `Date: ${formatDate(revisionDate, dateFormat)}\n`;
            txtContent += `${'='.repeat(50)}\n\n`;
            txtContent += content + '\n\n';
            txtContent += `${'='.repeat(50)}\n`;
            txtContent += `REVISION HISTORY\n`;
            txtContent += `${'='.repeat(50)}\n`;
            
            revisions.forEach(rev => {
                txtContent += `Rev ${rev.rev} (${formatDate(rev.date, dateFormat)}): ${rev.description} - ${rev.author} / ${rev.approver}\n`;
            });

            const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
            const filename = this.generateFileName(documentSettings);
            saveAs(blob, filename);
            
            return { success: true };
        } catch (error) {
            console.error('TXT Export Error:', error);
            throw new Error(`TXT export failed: ${error.message}`);
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
        
        return `${filename}.txt`;
    }
}