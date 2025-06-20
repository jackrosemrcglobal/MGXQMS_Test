import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const { useState, useRef, useEffect } = React;

const QcTestResultsTableRow = ({ item, onUpdateItem, onDeleteItem, visibleColumns }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Pass', 'Fail', 'Pending', 'Retest'];

    return html`
        <tr className="audit-item-row">
            ${visibleColumns.sampleId && html`<td><textarea name="sampleId" rows="1" value=${item.sampleId} onInput=${handleInputChange} className="form-control" placeholder="Sample ID" aria-label=${`Sample ID for ${item.id}`}></textarea></td>`}
            ${visibleColumns.testDate && html`<td><input type="date" name="testDate" value=${item.testDate} onInput=${handleInputChange} className="form-control" aria-label=${`Test Date for ${item.id}`} /></td>`}
            ${visibleColumns.product && html`<td><textarea name="product" rows="1" value=${item.product} onInput=${handleInputChange} className="form-control" placeholder="Product/Material" aria-label=${`Product for ${item.id}`}></textarea></td>`}
            ${visibleColumns.testParameter && html`<td><textarea name="testParameter" rows="1" value=${item.testParameter} onInput=${handleInputChange} className="form-control" placeholder="Test Parameter" aria-label=${`Test Parameter for ${item.id}`}></textarea></td>`}
            ${visibleColumns.specificationLimit && html`<td><textarea name="specificationLimit" rows="1" value=${item.specificationLimit} onInput=${handleInputChange} className="form-control" placeholder="Spec Limit" aria-label=${`Specification Limit for ${item.id}`}></textarea></td>`}
            ${visibleColumns.actualResult && html`<td><textarea name="actualResult" rows="1" value=${item.actualResult} onInput=${handleInputChange} className="form-control" placeholder="Actual Result" aria-label=${`Actual Result for ${item.id}`}></textarea></td>`}
            ${visibleColumns.status && html`<td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>`}
            ${visibleColumns.operator && html`<td><textarea name="operator" rows="1" value=${item.operator} onInput=${handleInputChange} className="form-control" placeholder="Operator" aria-label=${`Operator for ${item.id}`}></textarea></td>`}
            ${visibleColumns.equipment && html`<td><textarea name="equipment" rows="1" value=${item.equipment} onInput=${handleInputChange} className="form-control" placeholder="Equipment Used" aria-label=${`Equipment for ${item.id}`}></textarea></td>`}
            ${visibleColumns.notes && html`<td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>`}
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete QC test result ${item.sampleId}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

const sortData = (data, sortColumn, sortDirection) => {
    if (!sortColumn) return data;
    
    return [...data].sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];
        
        // Handle different data types
        if (sortColumn === 'testDate') {
            aVal = aVal ? new Date(aVal) : new Date('1900-01-01');
            bVal = bVal ? new Date(bVal) : new Date('1900-01-01');
        } else if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
};

export const QcTestResultsTable = ({ testResults, onUpdateItem, onDeleteItem, tableView = 'dense', visibleColumns, onToggleColumn }) => {
    const tableRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeData, setResizeData] = useState(null);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing || !resizeData) return;
            
            const { startX, startWidth, columnIndex } = resizeData;
            const diff = e.clientX - startX;
            const newWidth = Math.max(80, startWidth + diff);
            
            const table = tableRef.current;
            if (table) {
                const headers = table.querySelectorAll('th');
                if (headers[columnIndex]) {
                    headers[columnIndex].style.width = `${newWidth}px`;
                }
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setResizeData(null);
            if (tableRef.current) {
                tableRef.current.classList.remove('resizing');
            }
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, resizeData]);

    const handleMouseDown = (e, columnIndex) => {
        const rect = e.target.getBoundingClientRect();
        const isNearRightEdge = e.clientX > rect.right - 10;
        
        if (isNearRightEdge) {
            e.preventDefault();
            const startX = e.clientX;
            const startWidth = e.target.offsetWidth;
            
            setIsResizing(true);
            setResizeData({ startX, startWidth, columnIndex });
            
            if (tableRef.current) {
                tableRef.current.classList.add('resizing');
            }
        }
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn !== column) return ' ↕️';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    const columnDefinitions = [
        { key: 'sampleId', label: 'Sample ID' },
        { key: 'testDate', label: 'Test Date' },
        { key: 'product', label: 'Product/Material' },
        { key: 'testParameter', label: 'Test Parameter' },
        { key: 'specificationLimit', label: 'Spec Limit' },
        { key: 'actualResult', label: 'Actual Result' },
        { key: 'status', label: 'Status' },
        { key: 'operator', label: 'Operator' },
        { key: 'equipment', label: 'Equipment' },
        { key: 'notes', label: 'Notes' }
    ];

    if (!testResults || testResults.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No QC Test Results Found</h4>
                <p>Add a new test result or adjust your filters.</p>
            </div>
        `;
    }

    const sortedItems = sortData(testResults, sortColumn, sortDirection);

    return html`
        <div>
            <div className="audit-table-container">
                <table className=${`audit-table table-view-${tableView}`} ref=${tableRef}>
                    <thead>
                        <tr>
                            ${visibleColumns.sampleId && html`<th onMouseDown=${(e) => handleMouseDown(e, 0)} onClick=${() => handleSort('sampleId')} className="sortable-header">Sample ID${getSortIcon('sampleId')}</th>`}
                            ${visibleColumns.testDate && html`<th onMouseDown=${(e) => handleMouseDown(e, 1)} onClick=${() => handleSort('testDate')} className="sortable-header">Test Date${getSortIcon('testDate')}</th>`}
                            ${visibleColumns.product && html`<th onMouseDown=${(e) => handleMouseDown(e, 2)} onClick=${() => handleSort('product')} className="sortable-header">Product/Material${getSortIcon('product')}</th>`}
                            ${visibleColumns.testParameter && html`<th onMouseDown=${(e) => handleMouseDown(e, 3)} onClick=${() => handleSort('testParameter')} className="sortable-header">Test Parameter${getSortIcon('testParameter')}</th>`}
                            ${visibleColumns.specificationLimit && html`<th onMouseDown=${(e) => handleMouseDown(e, 4)} onClick=${() => handleSort('specificationLimit')} className="sortable-header">Spec Limit${getSortIcon('specificationLimit')}</th>`}
                            ${visibleColumns.actualResult && html`<th onMouseDown=${(e) => handleMouseDown(e, 5)} onClick=${() => handleSort('actualResult')} className="sortable-header">Actual Result${getSortIcon('actualResult')}</th>`}
                            ${visibleColumns.status && html`<th onMouseDown=${(e) => handleMouseDown(e, 6)} onClick=${() => handleSort('status')} className="sortable-header">Status${getSortIcon('status')}</th>`}
                            ${visibleColumns.operator && html`<th onMouseDown=${(e) => handleMouseDown(e, 7)} onClick=${() => handleSort('operator')} className="sortable-header">Operator${getSortIcon('operator')}</th>`}
                            ${visibleColumns.equipment && html`<th onMouseDown=${(e) => handleMouseDown(e, 8)} onClick=${() => handleSort('equipment')} className="sortable-header">Equipment${getSortIcon('equipment')}</th>`}
                            ${visibleColumns.notes && html`<th onMouseDown=${(e) => handleMouseDown(e, 9)} onClick=${() => handleSort('notes')} className="sortable-header">Notes${getSortIcon('notes')}</th>`}
                            <th onMouseDown=${(e) => handleMouseDown(e, 10)}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedItems.map(item => html`
                            <${QcTestResultsTableRow}
                                key=${item.id}
                                item=${item}
                                onUpdateItem=${onUpdateItem}
                                onDeleteItem=${onDeleteItem}
                                visibleColumns=${visibleColumns}
                            />
                        `)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};