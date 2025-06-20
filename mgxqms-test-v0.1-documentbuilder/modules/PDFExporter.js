import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export class PDFExporter {
    constructor() {}

    async exportToPDF(documentSettings, includeRevisionTable = true) {
        try {
            const { title: docTitle } = documentSettings;
            
            // Handle revision table visibility
            const revisionTable = document.getElementById('revisionTableContainer');
            const originalDisplay = revisionTable.style.display;
            
            if (!includeRevisionTable) {
                revisionTable.style.display = 'none';
            } else {
                // Ensure revision table is visible when we want to include it
                revisionTable.style.display = 'block';
            }

            // Get all document pages
            const documentPages = document.querySelectorAll('.document-page');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // A4 dimensions in mm
            const pageWidth = 210;
            const pageHeight = 297;
            
            let isFirstPage = true;
            
            // Process each document page
            for (const page of documentPages) {
                if (!isFirstPage) {
                    pdf.addPage();
                }
                
                // Ensure the page is visible and properly sized
                const originalTransform = page.style.transform;
                const originalPosition = page.style.position;
                page.style.transform = 'none';
                page.style.position = 'relative';
                
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: 816, // 8.5 inches at 96 DPI
                    height: 1056, // 11 inches at 96 DPI
                    x: 0,
                    y: 0,
                    scrollX: 0,
                    scrollY: 0
                });

                // Restore original styles
                page.style.transform = originalTransform;
                page.style.position = originalPosition;

                const imgData = canvas.toDataURL('image/png', 1.0);
                
                // Validate canvas dimensions
                if (!canvas.width || !canvas.height || canvas.width <= 0 || canvas.height <= 0) {
                    console.warn('Invalid canvas dimensions, using default scaling');
                    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
                    isFirstPage = false;
                    continue;
                }
                
                // Calculate proper scaling to maintain 8.5:11 ratio
                const canvasRatio = canvas.width / canvas.height;
                const pageRatio = pageWidth / pageHeight;
                
                let finalWidth = pageWidth;
                let finalHeight = pageHeight;
                let offsetX = 0;
                let offsetY = 0;
                
                // Validate ratio calculations
                if (isFinite(canvasRatio) && canvasRatio > 0 && isFinite(pageRatio) && pageRatio > 0) {
                    if (canvasRatio > pageRatio) {
                        // Canvas is wider, fit to width
                        finalHeight = pageWidth / canvasRatio;
                        offsetY = (pageHeight - finalHeight) / 2;
                    } else {
                        // Canvas is taller, fit to height
                        finalWidth = pageHeight * canvasRatio;
                        offsetX = (pageWidth - finalWidth) / 2;
                    }
                }
                
                // Validate final dimensions and offsets
                finalWidth = Math.max(0, isFinite(finalWidth) ? finalWidth : pageWidth);
                finalHeight = Math.max(0, isFinite(finalHeight) ? finalHeight : pageHeight);
                offsetX = Math.max(0, isFinite(offsetX) ? offsetX : 0);
                offsetY = Math.max(0, isFinite(offsetY) ? offsetY : 0);
                
                // Ensure dimensions don't exceed page bounds
                if (offsetX + finalWidth > pageWidth) {
                    finalWidth = pageWidth - offsetX;
                }
                if (offsetY + finalHeight > pageHeight) {
                    finalHeight = pageHeight - offsetY;
                }
                
                pdf.addImage(imgData, 'PNG', offsetX, offsetY, finalWidth, finalHeight);
                isFirstPage = false;
            }
            
            // Add revision table as separate page if including it
            if (includeRevisionTable && revisionTable) {
                pdf.addPage();
                
                const revisionCanvas = await html2canvas(revisionTable, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: revisionTable.offsetWidth,
                    height: revisionTable.offsetHeight,
                    scrollX: 0,
                    scrollY: 0
                });

                const revisionImgData = revisionCanvas.toDataURL('image/png', 1.0);
                
                // Validate revision canvas dimensions
                if (!revisionCanvas.width || !revisionCanvas.height || revisionCanvas.width <= 0 || revisionCanvas.height <= 0) {
                    console.warn('Invalid revision canvas dimensions, skipping revision table');
                } else {
                    // Scale revision table to fit page
                    const revisionRatio = revisionCanvas.width / revisionCanvas.height;
                    let revisionWidth = pageWidth;
                    let revisionHeight = pageWidth / revisionRatio;
                    let revisionOffsetY = 0;
                    
                    if (isFinite(revisionRatio) && revisionRatio > 0) {
                        if (revisionHeight > pageHeight) {
                            revisionHeight = pageHeight;
                            revisionWidth = pageHeight * revisionRatio;
                        }
                    } else {
                        // Fallback to default scaling
                        revisionWidth = pageWidth;
                        revisionHeight = pageHeight;
                    }
                    
                    // Validate revision dimensions and offsets
                    revisionWidth = Math.max(0, isFinite(revisionWidth) ? revisionWidth : pageWidth);
                    revisionHeight = Math.max(0, isFinite(revisionHeight) ? revisionHeight : pageHeight);
                    
                    const revisionOffsetX = Math.max(0, (pageWidth - revisionWidth) / 2);
                    revisionOffsetY = Math.max(0, (pageHeight - revisionHeight) / 2);
                    
                    // Ensure dimensions don't exceed page bounds
                    if (revisionOffsetX + revisionWidth > pageWidth) {
                        revisionWidth = pageWidth - revisionOffsetX;
                    }
                    if (revisionOffsetY + revisionHeight > pageHeight) {
                        revisionHeight = pageHeight - revisionOffsetY;
                    }
                    
                    pdf.addImage(revisionImgData, 'PNG', revisionOffsetX, revisionOffsetY, revisionWidth, revisionHeight);
                }
            }

            const filename = this.generateFileName(documentSettings, includeRevisionTable);
            
            pdf.save(filename);
            
            // Restore revision table display
            if (revisionTable) {
                revisionTable.style.display = originalDisplay;
            }
            
            return { success: true };
        } catch (error) {
            console.error('PDF Export Error:', error);
            throw new Error(`PDF export failed: ${error.message}`);
        }
    }

    generateFileName(documentSettings, includeRevisionTable) {
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
        
        const suffix = includeRevisionTable ? '' : '_clean';
        return `${filename}${suffix}.pdf`;
    }
}