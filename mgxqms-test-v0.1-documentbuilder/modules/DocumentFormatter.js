export class DocumentFormatter {
    constructor(documentBuilder) {
        this.documentBuilder = documentBuilder;
        this.activeFormats = new Set();
        this.templateManager = null; // Will be set by DocumentBuilder
        this.savedSelection = null;
        this.findReplaceOpen = false;
        this.contextMenu = null;
    }

    setTemplateManager(templateManager) {
        this.templateManager = templateManager;
    }

    setupFormattingListeners() {
        // Setup context menu functionality
        this.setupContextMenu();
        
        // Keep existing functionality for other controls
        this.setupFindReplace();
        this.setupTableControls();
        this.setupInsertControls();
        this.setupContentEvents();
        this.setupLinkControls();
        this.setupPrintPreview();
    }

    setupContextMenu() {
        this.contextMenu = document.getElementById('contextMenu');
        const documentContent = document.getElementById('documentContent');
        
        // Show context menu on right click
        documentContent.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.pageX, e.pageY);
        });

        // Hide context menu on clicks elsewhere
        document.addEventListener('click', (e) => {
            if (!this.contextMenu.contains(e.target)) {
                this.hideContextMenu();
            }
        });

        // Hide context menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideContextMenu();
            }
        });

        // Setup context menu button listeners
        this.setupContextMenuButtons();
    }

    setupContextMenuButtons() {
        // Basic formatting
        document.getElementById('ctxBoldBtn').addEventListener('click', () => this.formatText('bold'));
        document.getElementById('ctxItalicBtn').addEventListener('click', () => this.formatText('italic'));
        document.getElementById('ctxUnderlineBtn').addEventListener('click', () => this.formatText('underline'));
        document.getElementById('ctxStrikeBtn').addEventListener('click', () => this.formatText('strikeThrough'));
        document.getElementById('ctxSuperscriptBtn').addEventListener('click', () => this.formatText('superscript'));
        document.getElementById('ctxSubscriptBtn').addEventListener('click', () => this.formatText('subscript'));

        // Color formatting
        document.getElementById('ctxTextColorBtn').addEventListener('click', () => this.showColorPicker('text', 'ctx'));
        document.getElementById('ctxHighlightBtn').addEventListener('click', () => this.showColorPicker('highlight', 'ctx'));
        document.getElementById('ctxClearFormatBtn').addEventListener('click', () => this.clearFormatting());
        
        // Color picker events
        document.getElementById('ctxTextColorPicker').addEventListener('change', (e) => this.applyTextColor(e.target.value));
        document.getElementById('ctxHighlightColorPicker').addEventListener('change', (e) => this.applyHighlight(e.target.value));

        // Font controls
        document.getElementById('ctxFontSize').addEventListener('change', (e) => this.changeFontSize(e.target.value));
        document.getElementById('ctxFontFamily').addEventListener('change', (e) => this.changeFontFamily(e.target.value));

        // Alignment
        document.getElementById('ctxAlignLeft').addEventListener('click', () => this.alignText('left'));
        document.getElementById('ctxAlignCenter').addEventListener('click', () => this.alignText('center'));
        document.getElementById('ctxAlignRight').addEventListener('click', () => this.alignText('right'));

        // Lists
        document.getElementById('ctxBulletList').addEventListener('click', () => this.formatText('insertUnorderedList'));
        document.getElementById('ctxNumberList').addEventListener('click', () => this.formatText('insertOrderedList'));

        // Indentation
        document.getElementById('ctxIndentBtn').addEventListener('click', () => this.formatText('indent'));
        document.getElementById('ctxOutdentBtn').addEventListener('click', () => this.formatText('outdent'));

        // Table controls
        document.getElementById('ctxInsertRowBtn').addEventListener('click', () => this.insertTableRow());
        document.getElementById('ctxInsertColBtn').addEventListener('click', () => this.insertTableColumn());
        document.getElementById('ctxDeleteRowBtn').addEventListener('click', () => this.deleteTableRow());
        document.getElementById('ctxDeleteColBtn').addEventListener('click', () => this.deleteTableColumn());

        // Other controls
        document.getElementById('ctxLinkBtn').addEventListener('click', () => this.openLinkModal());
        document.getElementById('ctxFindReplaceBtn').addEventListener('click', () => this.toggleFindReplace());
        document.getElementById('ctxPrintPreviewBtn').addEventListener('click', () => this.showPrintPreview());
    }

    showContextMenu(x, y) {
        this.updateContextMenuState();
        
        this.contextMenu.style.left = `${x}px`;
        this.contextMenu.style.top = `${y}px`;
        this.contextMenu.classList.add('show');

        // Adjust position if menu goes off screen
        const rect = this.contextMenu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right > viewportWidth) {
            this.contextMenu.style.left = `${x - rect.width}px`;
        }
        if (rect.bottom > viewportHeight) {
            this.contextMenu.style.top = `${y - rect.height}px`;
        }
    }

    hideContextMenu() {
        this.contextMenu.classList.remove('show');
    }

    updateContextMenuState() {
        try {
            this.updateContextButtonState('ctxBoldBtn', 'bold');
            this.updateContextButtonState('ctxItalicBtn', 'italic');
            this.updateContextButtonState('ctxUnderlineBtn', 'underline');
            this.updateContextButtonState('ctxStrikeBtn', 'strikeThrough');
            this.updateContextButtonState('ctxSuperscriptBtn', 'superscript');
            this.updateContextButtonState('ctxSubscriptBtn', 'subscript');
        } catch (error) {
            console.error('Context menu state update failed:', error);
        }
    }

    updateContextButtonState(buttonId, command) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        const isActive = document.queryCommandState(command);
        button.classList.toggle('active', isActive);
    }

    setupFindReplace() {
        document.getElementById('findInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.findNext();
            }
        });
        document.getElementById('findNextBtn').addEventListener('click', () => this.findNext());
        document.getElementById('findPrevBtn').addEventListener('click', () => this.findPrevious());
        document.getElementById('replaceBtn').addEventListener('click', () => this.replaceCurrentMatch());
        document.getElementById('replaceAllBtn').addEventListener('click', () => this.replaceAll());
        document.getElementById('closeFindBtn').addEventListener('click', () => this.closeFindReplace());
    }

    setupTableControls() {
        // Table controls are now handled in context menu
        // Keep this method for backward compatibility
    }

    setupPrintPreview() {
        // Print preview is now handled in context menu
        // Keep this method for backward compatibility
    }

    setupContentEvents() {
        const content = document.getElementById('documentContent');
        content.addEventListener('keyup', () => {
            this.updateWordCount();
        });
        content.addEventListener('mouseup', () => {
            // Context menu will handle state updates when shown
        });
        content.addEventListener('focus', () => {
            // Context menu will handle state updates when shown
        });
        content.addEventListener('input', () => {
            this.updateWordCount();
        });
    }

    setupLinkControls() {
        // Link controls are now handled in context menu
        // Keep this method for backward compatibility
    }

    setupTemplates() {
        // Template functionality moved to TemplateManager
        // Add event listeners for legacy template buttons
        const templateButtons = document.querySelectorAll('.template-btn');
        templateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const template = button.dataset.template;
                if (template) {
                    this.insertTemplate(template);
                }
            });
        });
    }

    setupInsertControls() {
        // Insert controls are now handled in context menu
        // Keep this method for backward compatibility
        this.setupTemplates();
    }

    updateTemplateList(category) {
        const templateList = document.getElementById('templateList');
        if (!templateList || !this.templateManager) return;
        
        templateList.innerHTML = '';
        const templates = this.templateManager.getTemplatesByCategory(category);
        
        templates.forEach(template => {
            const templateItem = document.createElement('button');
            templateItem.className = 'template-item';
            templateItem.textContent = template.name;
            templateItem.addEventListener('click', () => {
                this.templateManager.insertTemplate(template.name, category);
            });
            templateList.appendChild(templateItem);
        });
    }

    formatText(command) {
        try {
            document.execCommand(command, false, null);
            this.hideContextMenu();
        } catch (error) {
            console.error('Format command failed:', error);
        }
    }

    alignText(alignment) {
        const command = 'justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1);
        try {
            document.execCommand(command, false, null);
            this.hideContextMenu();
        } catch (error) {
            console.error('Align command failed:', error);
        }
    }

    changeFontSize(size) {
        try {
            document.execCommand('fontSize', false, '7');
            const fontElements = document.querySelectorAll('font[size="7"]');
            fontElements.forEach(element => {
                element.removeAttribute('size');
                element.style.fontSize = size + 'pt';
            });
        } catch (error) {
            console.error('Font size change failed:', error);
        }
    }

    changeFontFamily(family) {
        try {
            document.execCommand('fontName', false, family);
        } catch (error) {
            console.error('Font family change failed:', error);
        }
    }

    updateToolbarState() {
        // This method is no longer needed as context menu updates state when shown
    }

    updateButtonState(buttonId, command) {
        // This method is no longer needed
    }

    insertTemplate(template) {
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
        const templateHTML = this.getTemplateHTML(template);

        if (templateHTML) {
            this.insertHTMLAtRange(range, templateHTML);
        }
    }

    getTemplateHTML(template) {
        const templates = {
            'heading1': '<h1>Heading 1</h1><p></p>',
            'heading2': '<h2>Heading 2</h2><p></p>',
            'heading3': '<h3>Heading 3</h3><p></p>',
            'paragraph': '<p>This is a paragraph. You can edit this text.</p>',
            'checklist': `
                <div class="checklist-item">
                    <input type="checkbox"> Checklist item 1
                </div>
                <div class="checklist-item">
                    <input type="checkbox"> Checklist item 2
                </div>
                <div class="checklist-item">
                    <input type="checkbox"> Checklist item 3
                </div>
            `,
            'table': `
                <table>
                    <tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr>
                    <tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>
                    <tr><td>Cell 4</td><td>Cell 5</td><td>Cell 6</td></tr>
                </table>
                <p></p>
            `,
            'section': '<div class="section-break"></div><h2>New Section</h2><p></p>',
            'quote': '<blockquote style="border-left: 4px solid #ccc; margin: 1rem 0; padding-left: 1rem; font-style: italic; color: #666;">"Insert your quote here."</blockquote><p></p>',
            'numberedList': `
                <ol>
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                </ol>
                <p></p>
            `,
            'bulletList': `
                <ul>
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                </ul>
                <p></p>
            `,
            'codeBlock': '<pre style="background: #f4f4f4; padding: 1rem; border: 1px solid #ddd; border-radius: 4px; font-family: monospace; overflow-x: auto;"><code>// Your code here\nconsole.log("Hello World");</code></pre><p></p>',
            'signature': `
                <div style="margin-top: 2rem; border-top: 1px solid #ccc; padding-top: 1rem;">
                    <p><strong>Signature:</strong> ___________________________ <strong>Date:</strong> ___________</p>
                    <p><strong>Name:</strong> _____________________________</p>
                    <p><strong>Title:</strong> ____________________________</p>
                </div>
                <p></p>
            `,
            'warning': '<div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 4px; margin: 1rem 0;"><strong>⚠️ Warning:</strong> Important notice or warning message.</div><p></p>',
            'note': '<div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 1rem; border-radius: 4px; margin: 1rem 0;"><strong>📝 Note:</strong> Additional information or note.</div><p></p>',
            'procedure': `
                <h3>Procedure: [Name]</h3>
                <p><strong>Purpose:</strong> [Describe the purpose]</p>
                <p><strong>Scope:</strong> [Define the scope]</p>
                <ol>
                    <li><strong>Step 1:</strong> [First step]</li>
                    <li><strong>Step 2:</strong> [Second step]</li>
                    <li><strong>Step 3:</strong> [Third step]</li>
                </ol>
                <p></p>
            `,
            'twoColumn': `
                <div style="display: flex; gap: 2rem; margin: 1rem 0;">
                    <div style="flex: 1;">
                        <h4>Left Column</h4>
                        <p>Content for the left column.</p>
                    </div>
                    <div style="flex: 1;">
                        <h4>Right Column</h4>
                        <p>Content for the right column.</p>
                    </div>
                </div>
                <p></p>
            `,
            'definition': `
                <dl style="margin: 1rem 0;">
                    <dt style="font-weight: bold; margin-top: 1rem;">Term 1</dt>
                    <dd style="margin-left: 2rem;">Definition of term 1</dd>
                    <dt style="font-weight: bold; margin-top: 1rem;">Term 2</dt>
                    <dd style="margin-left: 2rem;">Definition of term 2</dd>
                </dl>
                <p></p>
            `,
            'contact': `
                <div style="border: 1px solid #ddd; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
                    <h4>Contact Information</h4>
                    <p><strong>Name:</strong> [Contact Name]</p>
                    <p><strong>Title:</strong> [Job Title]</p>
                    <p><strong>Email:</strong> [email@example.com]</p>
                    <p><strong>Phone:</strong> [Phone Number]</p>
                </div>
                <p></p>
            `,
            'revision': `
                <div style="border: 1px solid #ccc; padding: 0.5rem; margin: 1rem 0;">
                    <p><strong>Revision [Letter]</strong> - [Date]</p>
                    <p><strong>Changes:</strong> [Description of changes]</p>
                    <p><strong>Author:</strong> [Author Name] | <strong>Approved by:</strong> [Approver Name]</p>
                </div>
                <p></p>
            `,
            'approval': `
                <div style="border: 2px solid #000; padding: 1rem; margin: 2rem 0;">
                    <h4 style="text-align: center; margin-bottom: 1rem;">APPROVAL SECTION</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="border: 1px solid #000; padding: 0.5rem; width: 25%;"><strong>Prepared by:</strong></td>
                            <td style="border: 1px solid #000; padding: 0.5rem; width: 25%;">Signature: _______________</td>
                            <td style="border: 1px solid #000; padding: 0.5rem; width: 25%;">Name: _______________</td>
                            <td style="border: 1px solid #000; padding: 0.5rem; width: 25%;">Date: _______________</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 0.5rem;"><strong>Reviewed by:</strong></td>
                            <td style="border: 1px solid #000; padding: 0.5rem;">Signature: _______________</td>
                            <td style="border: 1px solid #000; padding: 0.5rem;">Name: _______________</td>
                            <td style="border: 1px solid #000; padding: 0.5rem;">Date: _______________</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 0.5rem;"><strong>Approved by:</strong></td>
                            <td style="border: 1px solid #000; padding: 0.5rem;">Signature: _______________</td>
                            <td style="border: 1px solid #000; padding: 0.5rem;">Name: _______________</td>
                            <td style="border: 1px solid #000; padding: 0.5rem;">Date: _______________</td>
                        </tr>
                    </table>
                </div>
                <p></p>
            `,
            'flowchart': `
                <div style="text-align: center; margin: 2rem 0;">
                    <h4>Process Flow</h4>
                    <div style="display: inline-block; background: #f0f0f0; border: 2px solid #333; padding: 0.5rem; margin: 0.5rem; border-radius: 8px;">Start</div>
                    <div style="margin: 0.5rem;">↓</div>
                    <div style="display: inline-block; background: #e0e0e0; border: 2px solid #333; padding: 0.5rem; margin: 0.5rem;">Process Step 1</div>
                    <div style="margin: 0.5rem;">↓</div>
                    <div style="display: inline-block; background: #e0e0e0; border: 2px solid #333; padding: 0.5rem; margin: 0.5rem;">Process Step 2</div>
                    <div style="margin: 0.5rem;">↓</div>
                    <div style="display: inline-block; background: #f0f0f0; border: 2px solid #333; padding: 0.5rem; margin: 0.5rem; border-radius: 8px;">End</div>
                </div>
                <p></p>
            `
        };

        return templates[template] || '';
    }

    insertHTMLAtRange(range, html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        while (tempDiv.firstChild) {
            range.insertNode(tempDiv.firstChild);
        }
        
        // Clear selection
        window.getSelection().removeAllRanges();
    }

    insertPageBreak() {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        
        const range = selection.getRangeAt(0);
        const pageBreak = document.createElement('div');
        pageBreak.className = 'page-break';
        pageBreak.innerHTML = '<hr class="page-break">';
        
        range.insertNode(pageBreak);
    }

    // --- Link Functionality ---

    saveSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            this.savedSelection = selection.getRangeAt(0).cloneRange();
        } else {
            this.savedSelection = null;
        }
    }

    restoreSelection() {
        if (this.savedSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(this.savedSelection);
        }
    }

    openLinkModal() {
        this.hideContextMenu();
        this.saveSelection();
        const selection = window.getSelection();
        const parentElement = this.getParentLink(selection);
        
        const linkUrlInput = document.getElementById('linkUrl');
        const linkTextInput = document.getElementById('linkText');
        const linkModalTitle = document.getElementById('linkModalTitle');

        if (parentElement && parentElement.tagName === 'A') {
            linkModalTitle.textContent = "Edit Hyperlink";
            linkUrlInput.value = parentElement.getAttribute('href');
            linkTextInput.value = parentElement.textContent;
        } else {
            linkModalTitle.textContent = "Create Hyperlink";
            linkUrlInput.value = '';
            linkTextInput.value = selection.toString();
        }

        this.documentBuilder.modalManager.showModal('link');
    }

    getParentLink(selection) {
        if (!selection || selection.rangeCount === 0) return null;
        let node = selection.getRangeAt(0).startContainer;
        if (node.nodeType !== Node.ELEMENT_NODE) {
            node = node.parentNode;
        }
        return node.closest('a');
    }

    applyLink() {
        this.restoreSelection();
        const url = document.getElementById('linkUrl').value;
        const text = document.getElementById('linkText').value;

        if (!url) {
            alert('URL cannot be empty.');
            return;
        }

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        
        const parentLink = this.getParentLink(selection);

        // execCommand can be tricky, so we'll manipulate the DOM directly for reliability
        if (parentLink) {
            // Edit existing link
            parentLink.href = url;
            if (text && parentLink.textContent !== text) {
                parentLink.textContent = text;
            }
        } else {
            // Create new link
            this.restoreSelection();
            document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${text || url}</a>`);
        }
        
        this.documentBuilder.modalManager.hideModal('link');
    }

    removeLink() {
        this.restoreSelection();
        const selection = window.getSelection();
        const parentLink = this.getParentLink(selection);

        if (parentLink) {
            const range = document.createRange();
            range.selectNodeContents(parentLink);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('unlink', false, null);
        } else {
            document.execCommand('unlink', false, null);
        }
        
        this.documentBuilder.modalManager.hideModal('link');
    }

    showColorPicker(type, prefix = '') {
        const pickerSelector = prefix ? `#${prefix}${type === 'text' ? 'TextColorPicker' : 'HighlightColorPicker'}` : `#${type === 'text' ? 'textColorPicker' : 'highlightColorPicker'}`;
        const picker = document.querySelector(pickerSelector);
        if (picker) {
            picker.style.display = 'block';
            picker.click();
        }
    }

    applyTextColor(color) {
        try {
            document.execCommand('foreColor', false, color);
            // Hide color pickers
            document.getElementById('textColorPicker').style.display = 'none';
            const ctxPicker = document.getElementById('ctxTextColorPicker');
            if (ctxPicker) ctxPicker.style.display = 'none';
            this.hideContextMenu();
        } catch (error) {
            console.error('Text color change failed:', error);
        }
    }

    applyHighlight(color) {
        try {
            document.execCommand('hiliteColor', false, color);
            // Hide color pickers
            document.getElementById('highlightColorPicker').style.display = 'none';
            const ctxPicker = document.getElementById('ctxHighlightColorPicker');
            if (ctxPicker) ctxPicker.style.display = 'none';
            this.hideContextMenu();
        } catch (error) {
            console.error('Highlight color change failed:', error);
        }
    }

    clearFormatting() {
        try {
            document.execCommand('removeFormat', false, null);
            this.hideContextMenu();
        } catch (error) {
            console.error('Clear formatting failed:', error);
        }
    }

    toggleFindReplace() {
        const findBar = document.getElementById('findReplaceBar');
        this.findReplaceOpen = !this.findReplaceOpen;
        
        if (this.findReplaceOpen) {
            findBar.style.display = 'flex';
            document.getElementById('findInput').focus();
        } else {
            findBar.style.display = 'none';
            this.clearHighlights();
        }
    }

    findNext() {
        const searchTerm = document.getElementById('findInput').value;
        if (!searchTerm) return;

        this.clearHighlights();
        
        if (window.find) {
            const found = window.find(searchTerm, false, false, true, false, true, false);
            if (!found) {
                // Wrap around to beginning
                const selection = window.getSelection();
                selection.removeAllRanges();
                const range = document.createRange();
                range.setStart(document.getElementById('documentContent'), 0);
                selection.addRange(range);
                window.find(searchTerm, false, false, true, false, true, false);
            }
        }
    }

    findPrevious() {
        const searchTerm = document.getElementById('findInput').value;
        if (!searchTerm) return;

        if (window.find) {
            window.find(searchTerm, false, true, true, false, true, false);
        }
    }

    replaceCurrentMatch() {
        const searchTerm = document.getElementById('findInput').value;
        const replaceTerm = document.getElementById('replaceInput').value;
        
        if (!searchTerm) return;

        const selection = window.getSelection();
        if (selection.toString().toLowerCase() === searchTerm.toLowerCase()) {
            document.execCommand('insertText', false, replaceTerm);
            this.findNext();
        }
    }

    replaceAll() {
        const searchTerm = document.getElementById('findInput').value;
        const replaceTerm = document.getElementById('replaceInput').value;
        
        if (!searchTerm) return;

        const content = document.getElementById('documentContent');
        const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        content.innerHTML = content.innerHTML.replace(regex, replaceTerm);
        
        this.clearHighlights();
        alert(`Replaced all instances of "${searchTerm}" with "${replaceTerm}"`);
    }

    clearHighlights() {
        // Remove any existing highlights
        const content = document.getElementById('documentContent');
        const highlights = content.querySelectorAll('mark');
        highlights.forEach(mark => {
            mark.outerHTML = mark.innerHTML;
        });
    }

    closeFindReplace() {
        this.findReplaceOpen = false;
        document.getElementById('findReplaceBar').style.display = 'none';
        this.clearHighlights();
    }

    insertTableRow() {
        const selection = window.getSelection();
        const cell = this.getParentElement(selection, 'td') || this.getParentElement(selection, 'th');
        
        if (cell) {
            const row = cell.parentElement;
            const newRow = row.cloneNode(true);
            // Clear content of new row
            newRow.querySelectorAll('td, th').forEach(cell => {
                cell.innerHTML = '';
            });
            row.parentElement.insertBefore(newRow, row.nextSibling);
        }
        this.hideContextMenu();
    }

    insertTableColumn() {
        const selection = window.getSelection();
        const cell = this.getParentElement(selection, 'td') || this.getParentElement(selection, 'th');
        
        if (cell) {
            const table = this.getParentElement(cell, 'table');
            const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
            
            table.querySelectorAll('tr').forEach(row => {
                const newCell = document.createElement(row.querySelector('th') ? 'th' : 'td');
                newCell.innerHTML = '';
                if (cellIndex < row.children.length - 1) {
                    row.insertBefore(newCell, row.children[cellIndex + 1]);
                } else {
                    row.appendChild(newCell);
                }
            });
        }
        this.hideContextMenu();
    }

    deleteTableRow() {
        const selection = window.getSelection();
        const cell = this.getParentElement(selection, 'td') || this.getParentElement(selection, 'th');
        
        if (cell) {
            const row = cell.parentElement;
            const table = this.getParentElement(row, 'table');
            
            if (table.querySelectorAll('tr').length > 1) {
                row.remove();
            } else {
                alert('Cannot delete the last row of the table.');
            }
        }
        this.hideContextMenu();
    }

    deleteTableColumn() {
        const selection = window.getSelection();
        const cell = this.getParentElement(selection, 'td') || this.getParentElement(selection, 'th');
        
        if (cell) {
            const table = this.getParentElement(cell, 'table');
            const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
            
            if (table.querySelector('tr').children.length > 1) {
                table.querySelectorAll('tr').forEach(row => {
                    if (row.children[cellIndex]) {
                        row.children[cellIndex].remove();
                    }
                });
            } else {
                alert('Cannot delete the last column of the table.');
            }
        }
        this.hideContextMenu();
    }

    getParentElement(element, tagName) {
        let current = element;
        if (current.nodeType === Node.TEXT_NODE) {
            current = current.parentElement;
        }
        
        while (current && current.tagName && current.tagName.toLowerCase() !== tagName.toLowerCase()) {
            current = current.parentElement;
        }
        
        return current;
    }

    showPrintPreview() {
        this.hideContextMenu();
        window.print();
    }

    updateWordCount() {
        const contentElements = document.querySelectorAll('.page-content');
        let totalText = '';
        contentElements.forEach(content => {
            totalText += (content.innerText || content.textContent || '') + ' ';
        });

        const text = totalText;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        
        document.getElementById('wordCount').textContent = words.length;
        document.getElementById('charCount').textContent = characters;
        document.getElementById('charCountNoSpaces').textContent = charactersNoSpaces;
    }
}