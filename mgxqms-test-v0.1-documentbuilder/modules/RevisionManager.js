export class RevisionManager {
    constructor(documentBuilder) {
        this.documentBuilder = documentBuilder;
        this.revisions = [
            {
                rev: 'A',
                date: new Date().toISOString().split('T')[0],
                description: 'Initial Release',
                author: 'Quality Team',
                approver: 'QM',
                content: ['<h1>Document Title</h1><p>Start typing your document content here...</p>'], // Default content as array
                settings: null // Will be populated later
            }
        ];
        // The rest of the initialization will be done after the document is ready
    }

    setInitialState(content, settings) {
        if (this.revisions.length > 0) {
            this.revisions[0].content = content;
            this.revisions[0].settings = settings;
        }
        this.initializeRevisionDisplay();
    }

    initializeRevisionDisplay() {
        this.updateRevisionTable();
        this.updateRevisionList();
    }

    setupRevisionListeners() {
        // Revision controls
        document.getElementById('addRevision').addEventListener('click', () => this.showRevisionModal());
        document.getElementById('closeRevisionModal').addEventListener('click', () => this.hideRevisionModal());
        document.getElementById('cancelRevision').addEventListener('click', () => this.hideRevisionModal());
        document.getElementById('addRevisionConfirm').addEventListener('click', () => this.addRevision());

        // Listener for revert buttons
        document.getElementById('revisionList').addEventListener('click', (e) => {
            if (e.target.classList.contains('revert-btn')) {
                const rev = e.target.dataset.rev;
                this.revertToRevision(rev);
            }
        });
    }

    showRevisionModal() {
        this.documentBuilder.modalManager.showModal('revision');
        // Set next revision letter
        const lastRev = this.revisions[this.revisions.length - 1].rev;
        const nextRev = String.fromCharCode(lastRev.charCodeAt(0) + 1);
        document.getElementById('newRevision').value = nextRev;
        document.getElementById('newRevisionDate').value = new Date().toISOString().split('T')[0];
    }

    hideRevisionModal() {
        this.documentBuilder.modalManager.hideModal('revision');
        this.clearRevisionForm();
    }

    clearRevisionForm() {
        document.getElementById('newRevision').value = '';
        document.getElementById('newRevisionDate').value = '';
        document.getElementById('revisionDescription').value = '';
        document.getElementById('revisionAuthor').value = '';
        document.getElementById('revisionApprover').value = '';
    }

    addRevision() {
        const rev = document.getElementById('newRevision').value.trim();
        const date = document.getElementById('newRevisionDate').value;
        const description = document.getElementById('revisionDescription').value.trim();
        const author = document.getElementById('revisionAuthor').value.trim();
        const approver = document.getElementById('revisionApprover').value.trim();

        if (!this.validateRevisionInput(rev, date, description, author, approver)) {
            return;
        }

        const contentElements = Array.from(document.querySelectorAll('.page-content'));
        const currentContent = contentElements.map(el => el.innerHTML);
        const currentSettings = this.documentBuilder.getDocumentSettings();

        this.revisions.push({
            rev, date, description, author, approver,
            content: currentContent,
            settings: currentSettings
        });

        this.updateRevisionTable();
        this.updateRevisionList();
        this.updateCurrentRevision(rev, date);
        this.hideRevisionModal();
        
        // Save to local storage after adding revision
        this.documentBuilder.saveToLocalStorage();
    }

    validateRevisionInput(rev, date, description, author, approver) {
        if (!rev || !date || !description || !author || !approver) {
            alert('Please fill in all revision fields.');
            return false;
        }

        // Check if revision already exists
        if (this.revisions.some(r => r.rev === rev)) {
            alert('Revision already exists. Please use a different revision identifier.');
            return false;
        }
        
        // Check if rev is sequential
        const lastRev = this.revisions[this.revisions.length - 1].rev;
        if (rev.charCodeAt(0) <= lastRev.charCodeAt(0)) {
            alert(`Revision must be sequential. Next expected revision is ${String.fromCharCode(lastRev.charCodeAt(0) + 1)} or later.`);
            return false;
        }

        return true;
    }

    updateCurrentRevision(rev, date) {
        document.getElementById('revision').value = rev;
        document.getElementById('headerRevision').textContent = rev;
        document.getElementById('revisionDate').value = date;
        document.getElementById('headerDate').textContent = this.documentBuilder.getFormattedDate(date);
    }

    updateRevisionTable() {
        const tbody = document.getElementById('revisionTableBody');
        tbody.innerHTML = '';

        this.revisions.forEach(revision => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${revision.rev}</td>
                <td>${this.documentBuilder.getFormattedDate(revision.date)}</td>
                <td>${revision.description}</td>
                <td>${revision.author}</td>
                <td>${revision.approver}</td>
            `;
            tbody.appendChild(row);
        });
    }

    updateRevisionList() {
        const revisionList = document.getElementById('revisionList');
        revisionList.innerHTML = '';
        const currentRev = this.getCurrentRevision().rev;

        this.revisions.slice().reverse().forEach(revision => {
            const item = document.createElement('div');
            item.className = 'revision-item';
            
            const isCurrent = revision.rev === currentRev;

            item.innerHTML = `
                <div class="revision-summary">
                    <span class="revision-id">Rev ${revision.rev}</span>
                    <span class="revision-date">${this.documentBuilder.getFormattedDate(revision.date)}</span>
                </div>
                <div class="revision-desc">${revision.description}</div>
                <div class="revision-actions">
                    <button class="btn-small revert-btn" data-rev="${revision.rev}" ${isCurrent ? 'disabled' : ''}>
                        View & Revert
                    </button>
                </div>
            `;
            revisionList.appendChild(item);
        });
    }

    revertToRevision(revId) {
        const revisionToLoad = this.revisions.find(r => r.rev === revId);

        if (!revisionToLoad) {
            alert('Revision not found.');
            return;
        }

        const confirmed = confirm(
            `Are you sure you want to revert to Revision ${revId}? \n\n` +
            `This will replace the current content and settings in the editor. ` +
            `Your current work will be lost unless you've saved it as a new revision.`
        );

        if (confirmed) {
            this.documentBuilder.logAuditEvent('Revert Action', `Reverted to revision ${revId}`);
            
            // Clear existing pages except the first one
            const container = document.getElementById('documentContainer');
            const pages = container.querySelectorAll('.document-page');
            for (let i = 1; i < pages.length; i++) {
                pages[i].remove();
            }

            // Restore content
            const contentToLoad = revisionToLoad.content;
            if (Array.isArray(contentToLoad)) {
                const firstPageContent = container.querySelector('.page-content');
                firstPageContent.innerHTML = contentToLoad[0] || '<p></p>';
                for (let i = 1; i < contentToLoad.length; i++) {
                    this.documentBuilder.addNewPage(contentToLoad[i]);
                }
            } else {
                // Fallback for old revision data format
                const firstPageContent = container.querySelector('.page-content');
                firstPageContent.innerHTML = contentToLoad;
            }

            // Restore settings
            this.documentBuilder.loadDocumentSettings(revisionToLoad.settings);

            // Save the reverted state to local storage
            this.documentBuilder.saveToLocalStorage();

            // Optional: alert user of successful revert
            alert(`Successfully loaded Revision ${revId}. You can now continue editing. Remember to create a new revision to save any changes.`);
        }
    }

    getRevisions() {
        return [...this.revisions];
    }

    getCurrentRevision() {
        return this.revisions[this.revisions.length - 1];
    }
}