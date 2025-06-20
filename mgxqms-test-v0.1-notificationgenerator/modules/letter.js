import { getFormattedContent } from './ui.js';
import { printSingleLetter } from './exporter.js';

let generatedLetters = [];

export function getGeneratedLetters() {
    return generatedLetters;
}

export function setGeneratedLetters(letters) {
    generatedLetters = letters;
}

export function generateLetters(context) {
    const { csvData, logo, columnNames } = context;

    const recallDate = document.getElementById('recallDate').value;
    const manufacturer = document.getElementById('manufacturer').value;
    const ncr = document.getElementById('ncr').value;
    const materialCategory = document.getElementById('materialCategory').value;
    const issue = document.getElementById('issue').value;
    const heatNumber = document.getElementById('heatNumber').value;
    
    const customFields = {
        field1: document.getElementById('customField1').value,
        field2: document.getElementById('customField2').value,
        field3: document.getElementById('customField3').value,
        field4: document.getElementById('customField4').value,
        field5: document.getElementById('customField5').value,
    };
    
    const isContentOverride = document.getElementById('useContentOverride').checked;
    const overrideText = getFormattedContent('contentOverride');
    const letterTitle = document.getElementById('letterTitle').value;
    const paragraph1 = getFormattedContent('paragraph1');
    const paragraph2 = getFormattedContent('paragraph2');
    const paragraph3 = getFormattedContent('paragraph3');
    const paragraph4 = getFormattedContent('paragraph4');
    const paragraph5 = getFormattedContent('paragraph5');
    const contactInfo = getFormattedContent('contactInfo');
    
    if (!recallDate || !manufacturer || !ncr || !materialCategory || !issue) {
        alert('Please fill in all required recall information fields.');
        return [];
    }
    if (csvData.length === 0) {
        alert('Please upload a CSV file with customer data.');
        return [];
    }

    const groupBy = document.querySelector('input[name="groupBy"]:checked').value;
    const selectedFields = Array.from(document.querySelectorAll('#fieldCheckboxes input:checked')).map(cb => cb.value);
    
    const groupedData = groupDataBy(csvData, groupBy);
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
    const newGeneratedLetters = [];

    Object.keys(groupedData).forEach(key => {
        const records = groupedData[key];
        if (records.length > 0) {
            const letterData = {
                records, recallDate, manufacturer, ncr, materialCategory, issue, selectedFields, heatNumber, letterTitle, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, contactInfo, customFields, isContentOverride, overrideText, logo, columnNames,
                control: records[0].Control || 'Unknown',
                address: records[0].Address || '',
            };

            const letterElement = createLetter(letterData);
            lettersContainer.appendChild(letterElement);
            letterData.element = letterElement;
            newGeneratedLetters.push(letterData);
        }
    });
    
    document.getElementById('lettersContainer').classList.remove('hidden');
    return newGeneratedLetters;
}


function groupDataBy(data, groupBy) {
    return data.reduce((acc, row, index) => {
        let key;
        switch (groupBy) {
            case 'Control': key = row.Control || 'Unknown'; break;
            case 'ItemAddress': key = `${row['Item ID'] || 'Unknown'}-${row.Address || 'Unknown'}`; break;
            case 'SSR': key = row['Sales Representative'] || 'Unknown'; break;
            case 'ItemOrder': key = `${row['Item ID'] || 'Unknown'}-${row['Customer Order'] || 'Unknown'}`; break;
            case 'Line': key = `line-${index}`; break;
            default: key = row.Control || 'Unknown'; break;
        }
        if (groupBy === 'Line') {
            acc[key] = [row];
        } else {
            if (!acc[key]) acc[key] = [];
            acc[key].push(row);
        }
        return acc;
    }, {});
}

function createLetter(data) {
    const { records, recallDate, manufacturer, ncr, materialCategory, issue, selectedFields, heatNumber, letterTitle, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, contactInfo, customFields, isContentOverride, overrideText, logo, columnNames } = data;

    const letterDiv = document.createElement('div');
    letterDiv.className = 'letter';

    const formattedDate = new Date(recallDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const controlNumber = records[0].Control || '';
    const address = records[0].Address || '';

    let contentHTML;
    if (isContentOverride && overrideText) {
        contentHTML = replacePlaceholders(overrideText, { manufacturer, materialCategory, issue, heatNumber, ...customFields });
    } else {
        contentHTML = [paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, contactInfo]
            .map(p => `<div>${replacePlaceholders(p, { manufacturer, materialCategory, issue, heatNumber, ...customFields })}</div>`).join('');
    }

    const tableHTML = `
        <table class="letter-table">
            <thead>
                <tr>${selectedFields.map(field => `<th>${field}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${records.map(record => `<tr>${selectedFields.map(field => `<td>${record[field] || ''}</td>`).join('')}</tr>`).join('')}
            </tbody>
        </table>
    `;

    letterDiv.innerHTML = `
        <div class="letter-print-button-container no-print">
            <button class="btn letter-print-btn">Print This Letter</button>
        </div>
        <div class="letter-header">
            <div class="logo-address-container">
                <div><img src="${logo}" alt="Company Logo" class="letter-logo"></div>
                <div class="letter-address editable" data-field="address">${address}</div>
            </div>
            <div class="letter-date">Recall Date: ${formattedDate}</div>
        </div>
        <div class="letter-title editable" data-field="letterTitle">${letterTitle}</div>
        <div class="letter-manufacturer editable" data-field="manufacturer">Manufacturer: ${manufacturer}</div>
        <div class="letter-control editable" data-field="control">Control #: ${controlNumber}${heatNumber ? ` | Heat Number: ${heatNumber}`: ''}</div>
        <div class="letter-ncr editable" data-field="ncr">NCR: ${ncr}</div>
        <div class="letter-content">${contentHTML}</div>
        ${tableHTML}
    `;

    letterDiv.querySelector('.letter-print-btn').addEventListener('click', () => printSingleLetter(letterDiv));

    // Make content editable
    letterDiv.querySelectorAll('.editable, .letter-content > div').forEach((el, index) => {
        if (!el.hasAttribute('data-field')) {
            el.setAttribute('data-field', isContentOverride ? 'overrideContent' : `paragraph${index + 1}`);
        }
        makeEditable(el);
    });
    
    return letterDiv;
}

function replacePlaceholders(text, values) {
    return text
        .replace(/\[MANUFACTURER\]/g, values.manufacturer || '')
        .replace(/\[MATERIAL_CATEGORY\]/g, values.materialCategory || '')
        .replace(/\[ISSUE\]/g, values.issue || '')
        .replace(/\[HEAT_NUMBER\]/g, values.heatNumber || '')
        .replace(/\[FIELD1\]/g, values.field1 || '')
        .replace(/\[FIELD2\]/g, values.field2 || '')
        .replace(/\[FIELD3\]/g, values.field3 || '')
        .replace(/\[FIELD4\]/g, values.field4 || '')
        .replace(/\[FIELD5\]/g, values.field5 || '');
}

function makeEditable(element) {
    element.addEventListener('click', function(e) {
        if (document.querySelector('.editing')) return;
        
        element.classList.add('editing');
        const originalContent = element.innerHTML;
        element.contentEditable = true;
        element.focus();

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'edit-controls';
        controlsDiv.innerHTML = `<button class="edit-btn save-edit-btn">Save</button><button class="edit-btn cancel-edit-btn">Cancel</button>`;
        element.parentNode.insertBefore(controlsDiv, element.nextSibling);

        const finishEditing = (save) => {
            if (save) {
                const newContent = element.innerHTML;
                updateLetterData(element, newContent);
            } else {
                element.innerHTML = originalContent;
            }
            element.contentEditable = false;
            element.classList.remove('editing');
            controlsDiv.remove();
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };

        const handleOutsideClick = (event) => {
            if (!element.contains(event.target) && !controlsDiv.contains(event.target)) {
                finishEditing(true);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') finishEditing(false);
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                finishEditing(true);
            }
        };

        controlsDiv.querySelector('.save-edit-btn').addEventListener('click', () => finishEditing(true));
        controlsDiv.querySelector('.cancel-edit-btn').addEventListener('click', () => finishEditing(false));
        setTimeout(() => { // To avoid capturing the same click
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('keydown', handleEscape);
        }, 100);
    });
}

function updateLetterData(element, newContent) {
    const letterContainer = element.closest('.letter');
    const letterIndex = Array.from(document.getElementById('letters').children).indexOf(letterContainer);
    if (letterIndex === -1) return;

    const letterData = generatedLetters[letterIndex];
    const field = element.getAttribute('data-field');

    switch (field) {
        case 'address': letterData.address = newContent; break;
        case 'letterTitle': letterData.letterTitle = newContent; break;
        case 'manufacturer': letterData.manufacturer = newContent.replace('Manufacturer: ', ''); break;
        case 'control': 
            const controlMatch = newContent.match(/Control #: (.*?)(?:\s\|.*)?$/);
            if (controlMatch) letterData.control = controlMatch[1];
            break;
        case 'ncr': letterData.ncr = newContent.replace('NCR: ', ''); break;
        case 'overrideContent': letterData.overrideText = newContent; break;
        default:
            if (field.startsWith('paragraph')) {
                const pIndex = parseInt(field.replace('paragraph', ''), 10) - 1;
                const paraKeys = ['paragraph1', 'paragraph2', 'paragraph3', 'paragraph4', 'paragraph5', 'contactInfo'];
                if(pIndex >= 0 && pIndex < paraKeys.length) {
                    letterData[paraKeys[pIndex]] = newContent;
                }
            }
            break;
    }
}