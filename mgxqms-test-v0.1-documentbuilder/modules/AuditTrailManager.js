export class AuditTrailManager {
    constructor(documentBuilder) {
        this.documentBuilder = documentBuilder;
        this.log = [];
        this.trailListElement = document.getElementById('auditTrailList');
    }

    setupDisplay() {
        // This method can be called after the constructor to ensure DOM is ready.
        this.trailListElement = document.getElementById('auditTrailList');
    }

    addEntry(action, details = '') {
        const timestamp = new Date();
        const entry = {
            action,
            details,
            timestamp: timestamp.toISOString()
        };
        this.log.push(entry);
        this.renderNewEntry(entry);
    }

    renderNewEntry(entry) {
        if (!this.trailListElement) return;

        const item = document.createElement('div');
        item.className = 'audit-item';

        const formattedTime = new Date(entry.timestamp).toLocaleString();

        item.innerHTML = `
            <div class="audit-summary">
                <span class="audit-action">${entry.action}</span>
                <span class="audit-timestamp">${formattedTime}</span>
            </div>
            ${entry.details ? `<div class="audit-details">${entry.details}</div>` : ''}
        `;
        // Prepend to show latest first
        this.trailListElement.prepend(item);
    }

    renderAll() {
        if (!this.trailListElement) return;
        this.trailListElement.innerHTML = '';
        // Render in reverse chronological order
        [...this.log].reverse().forEach(entry => this.renderNewEntry(entry));
    }

    getLog() {
        return [...this.log];
    }

    loadLog(logData) {
        this.log = logData || [];
        this.renderAll();
    }
}