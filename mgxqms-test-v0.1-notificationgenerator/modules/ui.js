export function initUI() {
    // Init Google Translate button
    initTranslateButton();
    // Init Settings/Release Notes modal
    initSettingsModal();
    // Initialize rich text editors
    initializeRichTextEditors();
    if (document.getElementById('contentOverride')) {
        convertToRichText('contentOverride');
    }
    // Add new buttons to letter container dynamically
    updateLettersUI();
}

function initTranslateButton() {
    const restoreOriginalLanguageBtn = document.createElement('button');
    restoreOriginalLanguageBtn.id = 'restoreLanguageBtn';
    restoreOriginalLanguageBtn.className = 'btn restore-language-btn';
    restoreOriginalLanguageBtn.textContent = 'Restore Original Language';
    restoreOriginalLanguageBtn.style.display = 'none';

    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
        translateElement.after(restoreOriginalLanguageBtn);

        restoreOriginalLanguageBtn.addEventListener('click', function() {
            const iframe = document.getElementsByClassName('goog-te-banner-frame')[0];
            if (iframe) {
                const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                const restoreBtn = innerDoc.getElementsByTagName('button')[0];
                if (restoreBtn) {
                    restoreBtn.click();
                }
            }
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
            location.reload();
        });

        const observer = new MutationObserver(function(mutations) {
            if (document.body.classList.contains('translated-rtl') || document.body.classList.contains('translated-ltr')) {
                restoreOriginalLanguageBtn.style.display = 'inline-block';
            } else {
                restoreOriginalLanguageBtn.style.display = 'none';
            }
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
}

function initSettingsModal() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsModal');
    if (settingsBtn && settingsModal && closeSettingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.remove('hidden');
        });
        closeSettingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('hidden');
        });
        window.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.add('hidden');
            }
        });
    }
}

function updateLettersUI() {
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer) {
        if (!document.getElementById('saveAsPDFsBtn')) {
            const saveAsPDFsBtn = document.createElement('button');
            saveAsPDFsBtn.id = 'saveAsPDFsBtn';
            saveAsPDFsBtn.className = 'btn';
            saveAsPDFsBtn.textContent = 'Save as PDFs';
            buttonsContainer.appendChild(saveAsPDFsBtn);
        }
        if (!document.getElementById('batchPrintBtn')) {
            const batchPrintBtn = document.createElement('button');
            batchPrintBtn.id = 'batchPrintBtn';
            batchPrintBtn.className = 'btn';
            batchPrintBtn.textContent = 'Print Letters in Batch';
            buttonsContainer.appendChild(batchPrintBtn);
        }
    }
}

export function getFormattedContent(fieldId) {
    const richTextArea = document.getElementById(`${fieldId}-rich`);
    if (richTextArea) {
        return richTextArea.innerHTML;
    }
    const element = document.getElementById(fieldId);
    return element ? element.value.replace(/\n/g, '<br>') : '';
}

function initializeRichTextEditors() {
    const paragraphFields = ['paragraph1', 'paragraph2', 'paragraph3', 'paragraph4', 'paragraph5', 'contactInfo'];
    paragraphFields.forEach(fieldId => {
        if (document.getElementById(fieldId)) {
            convertToRichText(fieldId);
        }
    });
}

function convertToRichText(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;

    const container = document.createElement('div');
    container.className = 'rich-text-container';
    
    const toolbar = createFormattingToolbar(textareaId);
    
    const richTextArea = document.createElement('div');
    richTextArea.id = `${textareaId}-rich`;
    richTextArea.className = 'rich-text-area form-control';
    richTextArea.contentEditable = true;
    richTextArea.innerHTML = textarea.value.replace(/\n/g, '<br>');
    
    richTextArea.addEventListener('input', function() {
        textarea.value = richTextArea.innerHTML.replace(/<br\s*\/?>/gi, '\n');
    });
    
    textarea.style.display = 'none';
    container.appendChild(toolbar);
    container.appendChild(richTextArea);
    textarea.parentNode.insertBefore(container, textarea.nextSibling);

    richTextArea.addEventListener('keydown', function(e) {
        if (e.ctrlKey) {
            switch (e.key) {
                case 'b': e.preventDefault(); document.execCommand('bold'); break;
                case 'i': e.preventDefault(); document.execCommand('italic'); break;
                case 'u': e.preventDefault(); document.execCommand('underline'); break;
            }
        }
    });
}

function createFormattingToolbar(targetId) {
    const toolbar = document.createElement('div');
    toolbar.className = 'formatting-toolbar';
    
    const commands = {
        'bold': '<b>B</b>',
        'italic': '<i>I</i>',
        'underline': '<u>U</u>'
    };

    Object.entries(commands).forEach(([cmd, html]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'format-btn';
        btn.innerHTML = html;
        btn.title = cmd.charAt(0).toUpperCase() + cmd.slice(1);
        btn.addEventListener('click', () => {
            document.execCommand(cmd);
            document.getElementById(`${targetId}-rich`).focus();
        });
        toolbar.appendChild(btn);
    });

    // Separators and other controls
    toolbar.appendChild(createSeparator());
    toolbar.appendChild(createColorPicker(targetId));
    toolbar.appendChild(createSeparator());
    
    const listCommands = {
        'insertUnorderedList': '•',
        'insertOrderedList': '1.'
    };
    Object.entries(listCommands).forEach(([cmd, html]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'format-btn';
        btn.innerHTML = html;
        btn.addEventListener('click', () => document.execCommand(cmd));
        toolbar.appendChild(btn);
    });
    
    toolbar.appendChild(createSeparator());
    
    const justifyCommands = {
        'justifyLeft': '≡',
        'justifyCenter': '≡',
        'justifyRight': '≡'
    };
    Object.entries(justifyCommands).forEach(([cmd, html]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'format-btn';
        btn.innerHTML = html;
        if (cmd !== 'justifyLeft') btn.style.textAlign = cmd.replace('justify', '').toLowerCase();
        btn.addEventListener('click', () => document.execCommand(cmd));
        toolbar.appendChild(btn);
    });
    
    toolbar.appendChild(createSeparator());
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'format-btn';
    clearBtn.innerHTML = 'Clear';
    clearBtn.addEventListener('click', () => document.execCommand('removeFormat'));
    toolbar.appendChild(clearBtn);

    return toolbar;
}

function createSeparator() {
    const separator = document.createElement('div');
    separator.className = 'format-separator';
    return separator;
}

function createColorPicker(targetId) {
    const colorContainer = document.createElement('div');
    colorContainer.className = 'format-dropdown';
    
    const colorBtn = document.createElement('button');
    colorBtn.type = 'button';
    colorBtn.className = 'format-btn color-btn';
    colorBtn.innerHTML = 'A';
    colorBtn.title = 'Text Color';
    colorBtn.style.position = 'relative';

    const colorIndicator = document.createElement('div');
    colorIndicator.className = 'color-indicator';
    colorIndicator.style.backgroundColor = '#000000';
    colorBtn.appendChild(colorIndicator);
    
    const colorDropdown = document.createElement('div');
    colorDropdown.className = 'format-dropdown-content color-dropdown';
    
    const colors = ['#000000', '#444444', '#888888', '#CCCCCC', '#FFFFFF', '#AA0000', '#FF0000', '#FF8800', '#FFCC00', '#008800', '#00CC00', '#00CCCC', '#0000FF', '#000088', '#8800CC', '#00447c'];
    
    colors.forEach(color => {
        const colorOption = document.createElement('button');
        colorOption.type = 'button';
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        if (color === '#FFFFFF') colorOption.style.border = '1px solid #ccc';
        colorOption.addEventListener('click', () => {
            document.execCommand('foreColor', false, color);
            colorBtn.style.color = color;
            colorIndicator.style.backgroundColor = color;
            document.getElementById(`${targetId}-rich`).focus();
        });
        colorDropdown.appendChild(colorOption);
    });
    
    const customColorInput = document.createElement('input');
    customColorInput.type = 'color';
    customColorInput.className = 'custom-color-input';
    customColorInput.addEventListener('input', function() {
        document.execCommand('foreColor', false, this.value);
        colorBtn.style.color = this.value;
        colorIndicator.style.backgroundColor = this.value;
    });

    const customColorContainer = document.createElement('div');
    customColorContainer.className = 'custom-color-container';
    customColorContainer.appendChild(customColorInput);
    const customColorLabel = document.createElement('span');
    customColorLabel.className = 'custom-color-label';
    customColorLabel.textContent = 'Custom';
    customColorContainer.appendChild(customColorLabel);

    colorDropdown.appendChild(customColorContainer);
    colorContainer.appendChild(colorBtn);
    colorContainer.appendChild(colorDropdown);
    return colorContainer;
}