export class ExportStatusManager {
    constructor() {
        this.statusElements = {
            docx: document.getElementById('docxStatus'),
            pdf: document.getElementById('pdfStatus'),
            pdfClean: document.getElementById('pdfCleanStatus'),
            txt: document.getElementById('txtStatus'),
            xlsx: document.getElementById('xlsxStatus'),
            csv: document.getElementById('csvStatus')
        };
    }

    updateStatus(exportType, success) {
        const element = this.statusElements[exportType];
        if (element) {
            element.textContent = success ? '✅' : '❌';
        }
    }

    resetAllStatus() {
        Object.values(this.statusElements).forEach(element => {
            if (element) {
                element.textContent = '⏳';
            }
        });
    }
}

