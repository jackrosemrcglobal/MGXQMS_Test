export class ContentProcessor {
    constructor() {}

    processContentForDOCX(contentElement) {
        const paragraphs = [];
        
        try {
            // Get all text content and split by lines/paragraphs
            const htmlContent = contentElement.innerHTML;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            
            // Process each child element
            const children = Array.from(tempDiv.children);
            
            if (children.length === 0) {
                // No structured content, treat as plain text
                const text = contentElement.textContent.trim();
                if (text) {
                    paragraphs.push(this.createSimpleTextRun(text));
                }
            } else {
                children.forEach(child => {
                    const para = this.createParagraphFromElement(child);
                    if (para) {
                        paragraphs.push(para);
                    }
                });
            }
            
            // Ensure we have at least one paragraph
            if (paragraphs.length === 0) {
                paragraphs.push(this.createSimpleTextRun("Document content..."));
            }
            
        } catch (error) {
            console.error('Content processing error:', error);
            // Fallback to simple text content
            paragraphs.push(this.createSimpleTextRun(contentElement.textContent || "Document content..."));
        }
        
        return paragraphs;
    }

    createSimpleTextRun(text, size = 24) {
        // This will be imported from docx in the calling module
        return { text, size };
    }

    createParagraphFromElement(element) {
        const tagName = element.tagName.toLowerCase();
        const text = element.textContent.trim();
        
        if (!text) return null;
        
        let textRun;
        
        switch (tagName) {
            case 'h1':
                textRun = { text, bold: true, size: 32 };
                break;
            case 'h2':
                textRun = { text, bold: true, size: 28 };
                break;
            case 'h3':
                textRun = { text, bold: true, size: 26 };
                break;
            case 'table':
                return this.convertTableStructure(element);
            case 'ul':
            case 'ol':
                return this.convertListStructure(element, tagName === 'ol');
            default:
                // Check for formatting
                const isStrong = element.querySelector('strong, b') !== null;
                const isItalic = element.querySelector('em, i') !== null;
                
                textRun = { text, size: 24, bold: isStrong, italics: isItalic };
                break;
        }
        
        return { type: 'paragraph', textRun };
    }

    convertTableStructure(tableElement) {
        try {
            const rows = Array.from(tableElement.querySelectorAll('tr'));
            
            if (rows.length === 0) return null;
            
            const tableData = rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td, th'));
                return cells.map(cell => ({
                    text: cell.textContent.trim() || "",
                    isHeader: cell.tagName.toLowerCase() === 'th'
                }));
            });
            
            return { type: 'table', data: tableData };
        } catch (error) {
            console.error('Table conversion error:', error);
            return { type: 'paragraph', textRun: { text: "[Table content could not be converted]", size: 24 } };
        }
    }

    convertListStructure(listElement, isOrdered) {
        try {
            const items = Array.from(listElement.querySelectorAll('li'));
            
            return items.map((item, index) => {
                const text = item.textContent.trim() || "";
                const bulletText = isOrdered ? `${index + 1}. ` : '• ';
                
                return {
                    type: 'paragraph',
                    textRun: { text: bulletText + text, size: 24 },
                    indent: true
                };
            });
        } catch (error) {
            console.error('List conversion error:', error);
            return [{ type: 'paragraph', textRun: { text: "[List content could not be converted]", size: 24 } }];
        }
    }

    convertTableToText(tableElement) {
        let text = "TABLE:\n";
        const rows = tableElement.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            const cellTexts = Array.from(cells).map(cell => cell.textContent.trim());
            text += cellTexts.join(' | ') + '\n';
        });
        return text;
    }

    extractPlainText(contentElement) {
        return contentElement.innerText || contentElement.textContent || '';
    }
}