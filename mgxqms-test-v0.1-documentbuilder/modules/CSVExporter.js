import saveAs from 'file-saver';
import { formatDate } from './DateFormatter.js';

export class CSVExporter {
    constructor() {}

    async exportToCSV(documentSettings, revisions) {
        try {
            const csvData = this.generateCSVData(documentSettings, revisions);
            const csvContent = this.convertToCSV(csvData);
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
            const filename = this.generateFileName(documentSettings);
            saveAs(blob, filename);
            
            return { success: true };
        } catch (error) {
            console.error('CSV Export Error:', error);
            throw new Error(`CSV export failed: ${error.message}`);
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
        
        return `${filename}_metadata.csv`;
    }

    generateCSVData(documentSettings, revisions) {
        const { dateFormat } = documentSettings;
        
        // Document metadata
        const documentData = [
            ['Field', 'Value'],
            ['Document ID', documentSettings.id],
            ['Legacy Document Number', documentSettings.documentNumberLegacy || '-'],
            ['Document Title', documentSettings.title],
            ['Description', documentSettings.description || '-'],
            ['Document Type', documentSettings.documentType],
            ['Content Type', documentSettings.contentType],
            ['Created By', documentSettings.createdBy],
            ['Author', documentSettings.author],
            ['Approver', documentSettings.approver || '-'],
            ['Modified By', documentSettings.modifiedBy || '-'],
            ['Owner', documentSettings.owner || '-'],
            ['Department', documentSettings.department],
            ['Region', documentSettings.region || '-'],
            ['System', documentSettings.system || '-'],
            ['Customer', documentSettings.customer || '-'],
            ['Work Stream', documentSettings.workStream || '-'],
            ['Status', documentSettings.status],
            ['Approval Status', documentSettings.approvalStatus],
            ['Approval Process', documentSettings.approvalProcess || '-'],
            ['Classification', documentSettings.classification],
            ['Sensitivity', documentSettings.sensitivity],
            ['Topic', documentSettings.topic || '-'],
            ['ISO Scope', documentSettings.isoScope || '-'],
            ['ISO Critical', documentSettings.isoCritical ? 'Yes' : 'No'],
            ['Process Scope', documentSettings.processScope || '-'],
            ['Compliance Asset ID', documentSettings.complianceAssetId || '-'],
            ['Language', documentSettings.language],
            ['Date Format', documentSettings.dateFormat],
            ['Created Date', formatDate(documentSettings.createdDate, dateFormat)],
            ['Modified Date', formatDate(documentSettings.modifiedDate, dateFormat)],
            ['Effective Date', documentSettings.effectiveDate ? formatDate(documentSettings.effectiveDate, dateFormat) : '-'],
            ['Revised Date', documentSettings.revisedDate ? formatDate(documentSettings.revisedDate, dateFormat) : '-'],
            ['Expiry Date', documentSettings.expiryDate ? formatDate(documentSettings.expiryDate, dateFormat) : '-'],
            ['Next Review Date', documentSettings.nextReviewDate ? formatDate(documentSettings.nextReviewDate, dateFormat) : '-'],
            ['Current Revision', documentSettings.revision],
            ['Retention Label', documentSettings.retentionLabel || '-'],
            ['Retention Label Applied', documentSettings.retentionLabelApplied ? 'Yes' : 'No'],
            ['Label Setting', documentSettings.labelSetting || '-'],
            ['Item Type', documentSettings.itemType],
            ['Path', documentSettings.path || '-'],
            ['URL', documentSettings.url || '-'],
            ['File Size (KB)', documentSettings.fileSize],
            ['Item Child Count', documentSettings.itemChildCount],
            ['Folder Child Count', documentSettings.folderChildCount],
            ['Like Count', documentSettings.likeCount],
            ['Tags', documentSettings.tags.join(', ') || '-'],
            ['Comments', documentSettings.comments || '-'],
            [''],
            ['Revision History'],
            ['Rev', 'Date', 'Description', 'Author', 'Approved By'],
            ...revisions.map(rev => [
                rev.rev,
                formatDate(rev.date, dateFormat),
                rev.description,
                rev.author,
                rev.approver
            ])
        ];

        return documentData;
    }

    convertToCSV(data) {
        return data.map(row => {
            return row.map(field => {
                // Escape quotes and wrap in quotes if necessary
                const stringField = String(field || '');
                if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                    return '"' + stringField.replace(/"/g, '""') + '"';
                }
                return stringField;
            }).join(',');
        }).join('\n');
    }
}