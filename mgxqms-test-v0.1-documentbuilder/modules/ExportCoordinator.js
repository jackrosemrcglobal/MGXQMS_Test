import { DOCXExporter } from './DOCXExporter.js';
import { PDFExporter } from './PDFExporter.js';
import { TextExporter } from './TextExporter.js';
import { SpreadsheetExporter } from './SpreadsheetExporter.js';
import { CSVExporter } from './CSVExporter.js';
import { ExportStatusManager } from './ExportStatusManager.js';

export class ExportCoordinator {
    constructor() {
        this.docxExporter = new DOCXExporter();
        this.pdfExporter = new PDFExporter();
        this.textExporter = new TextExporter();
        this.spreadsheetExporter = new SpreadsheetExporter();
        this.csvExporter = new CSVExporter();
        this.statusManager = new ExportStatusManager();
    }

    async executeExportSequence(documentSettings, contentElements, revisions) {
        const exports = [
            { name: 'docx', fn: () => this.docxExporter.exportToDOCX(documentSettings, contentElements, revisions) },
            { name: 'pdf', fn: () => this.pdfExporter.exportToPDF(documentSettings, true) },
            { name: 'pdfClean', fn: () => this.pdfExporter.exportToPDF(documentSettings, false) },
            { name: 'txt', fn: () => this.textExporter.exportToTXT(documentSettings, contentElements, revisions) },
            { name: 'xlsx', fn: () => this.spreadsheetExporter.exportToXLSX(documentSettings, contentElements, revisions) },
            { name: 'csv', fn: () => this.csvExporter.exportToCSV(documentSettings, revisions) }
        ];

        for (const exportItem of exports) {
            try {
                await exportItem.fn();
                this.statusManager.updateStatus(exportItem.name, true);
            } catch (error) {
                this.statusManager.updateStatus(exportItem.name, false);
                throw new Error(`${exportItem.name.toUpperCase()} export failed: ${error.message}`);
            }
        }
    }
}