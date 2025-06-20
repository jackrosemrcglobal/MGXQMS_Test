import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, PageBreak } from 'docx';
import saveAs from 'file-saver';
import { ContentProcessor } from './ContentProcessor.js';
import { formatDate } from './DateFormatter.js';

export class DOCXExporter {
    constructor() {
        this.contentProcessor = new ContentProcessor();
    }

    async exportToDOCX(documentSettings, contentElements, revisions) {
        try {
            const { 
                id: docId, 
                title: docTitle, 
                revision, 
                effectiveDate,
                revisedDate,
                author,
                department,
                classification,
                status,
                language,
                tags,
                dateFormat
            } = documentSettings;
            
            const docChildren = [];

            contentElements.forEach((contentElement, index) => {
                const processedContent = this.contentProcessor.processContentForDOCX(contentElement);
                const contentParagraphs = this.convertProcessedContentToDOCX(processedContent);
                docChildren.push(...contentParagraphs);
                
                if (index < contentElements.length - 1) {
                    docChildren.push(new Paragraph({ children: [new PageBreak()] }));
                }
            });
            
            const doc = new Document({
                sections: [{
                    properties: {
                        page: {
                            margin: {
                                top: 720,    // 0.5 inch
                                right: 720,
                                bottom: 720,
                                left: 720,
                            },
                        },
                    },
                    children: [
                        // Document header info
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${docId} - ${docTitle}`,
                                    bold: true,
                                    size: 28, // 14pt
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Author: ${author || 'N/A'}`,
                                    size: 24, // 12pt
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Department: ${department || 'N/A'}`,
                                    size: 24, // 12pt
                                }),
                            ],
                        }),
                         new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Classification: ${classification || 'N/A'} | Status: ${status || 'N/A'}`,
                                    size: 24, // 12pt
                                }),
                            ],
                        }),
                        new Paragraph({
                           children: [
                               new TextRun({
                                   text: `Language: ${language || 'N/A'}`,
                                   size: 24, // 12pt
                               }),
                           ],
                       }),
                        new Paragraph({
                           children: [
                               new TextRun({
                                   text: `Tags: ${tags.join(', ') || 'N/A'}`,
                                   size: 24, // 12pt
                               }),
                           ],
                       }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Revision: ${revision}`,
                                    size: 24, // 12pt
                                }),
                            ],
                        }),
                         new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Effective Date: ${formatDate(effectiveDate, dateFormat)}`,
                                    size: 24, // 12pt
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Revised Date: ${formatDate(revisedDate, dateFormat)}`,
                                    size: 24, // 12pt
                                }),
                            ],
                        }),
                        new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
                        
                        // Document content
                        ...docChildren,
                        
                        // Revision history
                        new Paragraph({ children: [new PageBreak()] }), // Page break before revision table
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Document Revision History",
                                    bold: true,
                                    size: 28,
                                }),
                            ],
                        }),
                        new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
                        this.createRevisionTableForDOCX(revisions, dateFormat),
                    ],
                }],
            });

            const blob = await Packer.toBlob(doc);
            const filename = this.generateFileName(documentSettings);
            saveAs(blob, filename);
            
            return { success: true };
        } catch (error) {
            console.error('DOCX Export Error:', error);
            throw new Error(`DOCX export failed: ${error.message}`);
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
        
        return `${filename}.docx`;
    }

    convertProcessedContentToDOCX(processedContent) {
        const paragraphs = [];
        
        processedContent.forEach(item => {
            if (Array.isArray(item)) {
                // Handle lists
                paragraphs.push(...item.map(listItem => this.createParagraphFromProcessed(listItem)));
            } else if (item.type === 'table') {
                paragraphs.push(this.convertTableToDOCX(item.data));
            } else {
                paragraphs.push(this.createParagraphFromProcessed(item));
            }
        });
        
        return paragraphs;
    }

    createParagraphFromProcessed(item) {
        if (item.type === 'paragraph' || item.textRun) {
            const textRun = item.textRun || item;
            
            return new Paragraph({
                children: textRun.text ? [new TextRun({
                    text: textRun.text,
                    size: textRun.size || 24, // 12pt
                    bold: textRun.bold || false,
                    italics: textRun.italics || false,
                    underline: textRun.underline || false,
                    strike: textRun.strike || false,
                    color: textRun.color,
                    highlight: textRun.highlight,
                })] : [],
                alignment: textRun.alignment,
                indent: item.indent ? { left: 360 } : undefined,
            });
        }
        
        // Fallback for simple text
        return new Paragraph({
            children: (item.text || String(item)) ? [new TextRun({ text: item.text || String(item), size: 24 })] : [],
        });
    }

    convertTableToDOCX(tableData) {
        try {
            const docxRows = tableData.map(rowData => {
                const tableCells = rowData.map(cellData => {
                    return new TableCell({
                        children: [new Paragraph({
                            children: [new TextRun({ 
                                text: cellData.text,
                                bold: cellData.isHeader,
                                size: 22
                            })],
                        })],
                        shading: cellData.isHeader ? { fill: "CCCCCC" } : undefined,
                    });
                });
                
                return new TableRow({ children: tableCells });
            });
            
            return new Table({
                rows: docxRows,
                width: { size: 100, type: "pct" },
            });
        } catch (error) {
            console.error('Table conversion error:', error);
            return new Paragraph({
                children: [new TextRun({ text: "[Table content could not be converted]", size: 24 })],
            });
        }
    }

    createRevisionTableForDOCX(revisions, dateFormat) {
        try {
            const headerRow = new TableRow({
                children: [
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: "Rev", bold: true, size: 22 })] 
                        })],
                        shading: { fill: "CCCCCC" }
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: "Date", bold: true, size: 22 })] 
                        })],
                        shading: { fill: "CCCCCC" }
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: "Description", bold: true, size: 22 })] 
                        })],
                        shading: { fill: "CCCCCC" }
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: "Author", bold: true, size: 22 })] 
                        })],
                        shading: { fill: "CCCCCC" }
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: "Approved By", bold: true, size: 22 })] 
                        })],
                        shading: { fill: "CCCCCC" }
                    }),
                ],
            });
            
            const dataRows = revisions.map(rev => new TableRow({
                children: [
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: rev.rev || "", size: 22 })] 
                        })] 
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: formatDate(rev.date, dateFormat) || "", size: 22 })] 
                        })] 
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: rev.description || "", size: 22 })] 
                        })] 
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: rev.author || "", size: 22 })] 
                        })] 
                    }),
                    new TableCell({ 
                        children: [new Paragraph({ 
                            children: [new TextRun({ text: rev.approver || "", size: 22 })] 
                        })] 
                    }),
                ],
            }));

            return new Table({
                rows: [headerRow, ...dataRows],
                width: { size: 100, type: "pct" },
            });
        } catch (error) {
            console.error('Revision table creation error:', error);
            return new Paragraph({
                children: [new TextRun({ text: "[Revision table could not be created]", size: 24 })],
            });
        }
    }
}