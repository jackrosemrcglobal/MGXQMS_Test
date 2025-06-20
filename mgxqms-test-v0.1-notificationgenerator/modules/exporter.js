import { getGeneratedLetters } from './letter.js';

async function processLettersForExport(letters, fileExtension, fileType, conversionFn) {
    if (letters.length === 0) {
        alert('No letters to export. Please generate letters first.');
        return;
    }
    if (typeof JSZip === 'undefined' || (fileExtension === 'pdf' && (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined'))) {
        alert('A required library is not loaded. Please check your internet connection and refresh.');
        return;
    }

    const zip = new JSZip();
    const loadingDiv = showLoading(true, `Converting letters to ${fileType}...`);

    try {
        for (const letterData of letters) {
            const dateStr = new Date(letterData.recallDate).toISOString().slice(0, 10);
            const fileName = `${letterData.ncr} - ${letterData.control} - ${letterData.manufacturer} - ${dateStr}.${fileExtension}`;
            
            const fileContent = await conversionFn(letterData);
            zip.file(fileName, fileContent);
        }

        const zipContent = await zip.generateAsync({ type: 'blob' });
        downloadFile(zipContent, `Recall_Letters_${fileType}_${new Date().toISOString().slice(0,10)}.zip`);
    } catch (error) {
        console.error(`Error generating ${fileType}:`, error);
        alert(`There was an error generating the ${fileType}. Please try again.`);
    } finally {
        showLoading(false);
    }
}

export function exportLettersAsZip(letters, columnNames) {
    processLettersForExport(letters, 'txt', 'Text', (letterData) => {
        return Promise.resolve(convertLetterToText(letterData, columnNames));
    });
}

export function saveLettersAsImages(letters) {
    processLettersForExport(letters, 'jpg', 'Images', async (letterData) => {
        const canvas = await generateCanvas(letterData);
        return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
    });
}

export function saveLettersAsPDFs(letters) {
    processLettersForExport(letters, 'pdf', 'PDFs', async (letterData) => {
        const { jsPDF } = window.jspdf;
        const canvas = await generateCanvas(letterData);
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        return pdf.output('blob');
    });
}

async function generateCanvas(letterData) {
    const clonedLetter = letterData.element.cloneNode(true);
    updateLetterBeforeExport(clonedLetter, letterData);
    clonedLetter.querySelectorAll('.no-print, .edit-controls, .edit-indicator').forEach(el => el.remove());
    
    clonedLetter.style.position = 'absolute';
    clonedLetter.style.left = '-9999px';
    clonedLetter.style.background = 'white';
    document.body.appendChild(clonedLetter);

    const canvas = await html2canvas(clonedLetter, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
    document.body.removeChild(clonedLetter);
    return canvas;
}

function convertLetterToText(letterData, columnNames) {
    const { recallDate, address, letterTitle, manufacturer, control, ncr, heatNumber, records, selectedFields } = letterData;
    const formattedDate = new Date(recallDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    let contentText;
    if (letterData.isContentOverride) {
        contentText = stripHtml(letterData.overrideText);
    } else {
        contentText = [letterData.paragraph1, letterData.paragraph2, letterData.paragraph3, letterData.paragraph4, letterData.paragraph5, letterData.contactInfo]
            .map(p => stripHtml(p)).join('\n\n');
    }

    const tableHeader = selectedFields.join('\t');
    const tableRows = records.map(record => selectedFields.map(field => record[field] || '').join('\t')).join('\n');

    return `
Recall Date: ${formattedDate}

${address}

${letterTitle}

Manufacturer: ${manufacturer}
Control #: ${control}${heatNumber ? ` | Heat Number: ${heatNumber}`: ''}
NCR: ${ncr}

${contentText}

------------ ORDER DETAILS ------------
${tableHeader}
${'-'.repeat(tableHeader.length * 1.5)}
${tableRows}
    `.trim();
}

function updateLetterBeforeExport(letterElement, letterData) {
    letterElement.querySelector('.letter-address').innerHTML = letterData.address;
    letterElement.querySelector('.letter-title').innerHTML = letterData.letterTitle;
    // ... update other fields similarly if needed for visual consistency before canvas/pdf render
}

export function printLetters() {
    const editElements = document.querySelectorAll('.edit-controls, .edit-indicator, .letter-print-button-container');
    editElements.forEach(el => el.style.display = 'none');
    window.print();
    setTimeout(() => {
        editElements.forEach(el => el.style.display = 'block');
    }, 500);
}

export function printSingleLetter(letterElement) {
    const allLetters = document.querySelectorAll('.letter');
    const allNoPrint = document.querySelectorAll('.no-print');

    allNoPrint.forEach(el => el.style.display = 'none');
    allLetters.forEach(letter => {
        if (letter !== letterElement) letter.style.display = 'none';
    });
    
    window.print();
    
    setTimeout(() => {
        allLetters.forEach(letter => letter.style.display = 'block');
        allNoPrint.forEach(el => el.style.display = 'block');
    }, 500);
}

function showLoading(show, text = 'Processing...') {
    let loadingDiv = document.querySelector('.loading-overlay');
    if (show) {
        if (!loadingDiv) {
            loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-overlay';
            loadingDiv.innerHTML = `<div class="loading-spinner"></div><p>${text}</p>`;
            document.body.appendChild(loadingDiv);
        }
        loadingDiv.style.display = 'flex';
        loadingDiv.querySelector('p').textContent = text;
    } else {
        if (loadingDiv) loadingDiv.style.display = 'none';
    }
    return loadingDiv;
}

function downloadFile(blob, fileName) {
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p><p>/gi, '\n\n')
        .replace(/<div>/gi, '\n')
        .replace(/<\/div>/gi, '')
        .replace(/<li>/gi, '\n• ')
        .replace(/<\/li>/gi, '');
    return (temp.textContent || temp.innerText || '').trim();
}