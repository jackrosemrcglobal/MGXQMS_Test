import { initUI } from './modules/ui.js';
import { generateLetters, getGeneratedLetters, setGeneratedLetters } from './modules/letter.js';
import { exportLettersAsZip, saveLettersAsImages, saveLettersAsPDFs, printLetters } from './modules/exporter.js';

document.addEventListener('DOMContentLoaded', function() {
    // State
    let csvData = [];
    let columnNames = [];
    let logo = 'placeholder.jpg';

    // DOM elements
    const csvUpload = document.getElementById('csvUpload');
    const logoUpload = document.getElementById('logoUpload');
    const logoPreview = document.getElementById('logoPreview');
    const generateBtn = document.getElementById('generateBtn');
    const printBtn = document.getElementById('printBtn');
    const exportBtn = document.getElementById('exportBtn');
    const saveAsImagesBtn = document.getElementById('saveAsImagesBtn');
    const saveAsPDFsBtn = document.getElementById('saveAsPDFsBtn');
    const batchPrintBtn = document.getElementById('batchPrintBtn');
    const fieldSelection = document.getElementById('fieldSelection');
    const fieldCheckboxes = document.getElementById('fieldCheckboxes');
    
    // Initialize UI components (rich text editors, modals, etc.)
    initUI();

    // Event listeners
    if (csvUpload) csvUpload.addEventListener('change', handleCSVUpload);
    if (logoUpload) logoUpload.addEventListener('change', handleLogoUpload);
    if (generateBtn) generateBtn.addEventListener('click', () => {
        const lettersData = generateLetters({
            csvData,
            logo,
            columnNames
        });
        setGeneratedLetters(lettersData);
    });
    if (printBtn) printBtn.addEventListener('click', printLetters);
    if (exportBtn) exportBtn.addEventListener('click', () => exportLettersAsZip(getGeneratedLetters(), columnNames));
    if (saveAsImagesBtn) saveAsImagesBtn.addEventListener('click', () => saveLettersAsImages(getGeneratedLetters()));
    if (saveAsPDFsBtn) saveAsPDFsBtn.addEventListener('click', () => saveLettersAsPDFs(getGeneratedLetters()));
    if (batchPrintBtn) batchPrintBtn.addEventListener('click', () => saveLettersAsPDFs(getGeneratedLetters()));
    
    // Handle CSV upload
    function handleCSVUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                csvData = results.data;
                
                if (csvData.length === 0) {
                    alert('No data found in the CSV file.');
                    return;
                }
                
                columnNames = Object.keys(csvData[0]);
                createFieldCheckboxes(columnNames);
                fieldSelection.classList.remove('hidden');
            },
            error: function(error) {
                console.error('Error parsing CSV:', error);
                alert('Error parsing the CSV file. Please check the format.');
            }
        });
    }

    // Handle logo upload
    function handleLogoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            logo = e.target.result;
            
            logoPreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = logo;
            img.alt = 'Company Logo';
            img.style.maxWidth = '100%';
            logoPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    // Create checkboxes for field selection
    function createFieldCheckboxes(fields) {
        fieldCheckboxes.innerHTML = '';
        
        const expectedFields = [
            'Control', 'NCR', 'Address', 'Sales Order', 'Invoice', 
            'Invoice Date', 'Ship Date', 'Sales Representative', 
            'Item ID', 'Item Description', 'Quantity', 'ID', 
            'Customer Order', 'Contract Release#'
        ];
        
        fields.forEach(field => {
            const container = document.createElement('div');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `field-${field.replace(/\s+/g, '-').toLowerCase()}`;
            checkbox.value = field;
            checkbox.checked = expectedFields.includes(field);
            
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = field;
            
            if (expectedFields.includes(field)) {
                container.classList.add('expected-field');
            } else {
                container.classList.add('custom-field');
            }
            
            container.appendChild(checkbox);
            container.appendChild(label);
            fieldCheckboxes.appendChild(container);
        });
    }
});