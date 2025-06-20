// Import Chart.js
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    DoughnutController,
    BarController,
    BarElement,
    PieController,
    BubbleController
} from 'chart.js';

// Register Chart.js components
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    DoughnutController,
    BarController,
    BarElement,
    PieController,
    BubbleController
);

// Global chart references
let performanceChart, ncChart, findingsChart, complianceChart, areaChart, closureChart,
    customerSatisfactionChart, processPerformanceReviewChart, trainingCompletionChart,
    trainingTypeChart, certificationStatusChart, trainingTrendChart, improvementSourceChart,
    improvementImpactChart, projectCompletionTrendChart, recordVolumeChart;

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const currentDateElement = document.getElementById('current-date');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupNavigation();
    setupCharts();
    updateCurrentDate();
    initProcessSection();
    initProcessTables();
    initRecordsSection();
    initRiskSection();
    initResourceItems();
    initTrainingSection();
    initAuditsSection();
    initManagementReviewSection();
    initImprovementsSection();
    initQMSDocumentationSection();
});

function initializeApp() {
    console.log('MRC Global ISO Audit Presentation initialized');
    
    // Initialize clear demo data functionality
    initClearDemoData();
    
    // Add any initialization animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Initialize organization section interactivity
    initOrganizationSection();
}

function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked item
            item.classList.add('active');

            const sectionId = item.getAttribute('data-section');

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the corresponding content section
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.classList.add('active');
                // Re-initialize charts if the section is chart-heavy
                if(sectionId === 'records') {
                    initRecordVolumeChart();
                }
            }
        });
    });
}

function setupCharts() { 
    initOverviewCharts();
}

function initOverviewCharts() {
    // Audit Performance Trend Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        if (performanceChart) performanceChart.destroy();
        performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
                datasets: [{
                    label: 'Audit Score (%)',
                    data: [94.5, 95.2, 96.8, 97.1, 97.8, 98.5],
                    borderColor: '#8b0000',
                    backgroundColor: 'rgba(139, 0, 0, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#8b0000',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleFont: { weight: 'bold' },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: function(context) {
                                return ` Audit Score: ${context.formattedValue}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 90,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: '#e5e7eb'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Non-Conformities by Category Chart
    const ncCtx = document.getElementById('ncChart');
    if (ncCtx) {
        if (ncChart) ncChart.destroy();
        ncChart = new Chart(ncCtx, {
            type: 'doughnut',
            data: {
                labels: ['Documentation', 'Process Control', 'Training', 'Calibration', 'Records Management'],
                datasets: [{
                    data: [8, 5, 3, 2, 4],
                    backgroundColor: [
                        '#ef4444',
                        '#f59e0b', 
                        '#3b82f6',
                        '#8b5cf6',
                        '#10b981'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleFont: { weight: 'bold' },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return ` ${context.label}: ${context.formattedValue} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateCurrentDate() { 
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
function initProcessSection() { console.log('initProcessSection called'); }
function initProcessTables() { console.log('initProcessTables called'); }
function initRecordsSection() {
    const recordSearchInput = document.getElementById('recordSearch');
    const recordFilterSelect = document.getElementById('recordFilter');
    const recordsGrid = document.getElementById('recordsGrid');
    const recordCards = recordsGrid.querySelectorAll('.record-card-enhanced');
    const noRecordsFoundMessage = document.getElementById('noRecordsFound');
    const viewRecordsButtons = document.querySelectorAll('.view-records-btn');

    function filterAndSearchRecords() {
        const searchTerm = recordSearchInput.value.toLowerCase();
        const selectedCategory = recordFilterSelect.value;
        let visibleCount = 0;

        recordCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noRecordsFoundMessage.style.display = 'block';
        } else {
            noRecordsFoundMessage.style.display = 'none';
        }
    }

    if (recordSearchInput) {
        recordSearchInput.addEventListener('input', filterAndSearchRecords);
    }
    if (recordFilterSelect) {
        recordFilterSelect.addEventListener('change', filterAndSearchRecords);
    }
    
    if (viewRecordsButtons) {
        viewRecordsButtons.forEach(button => {
            button.addEventListener('click', () => {
                showNotification('Functionality to view detailed records will be added in a future update.', 'info');
            });
        });
    }

    initRecordVolumeChart();
}

function initRecordVolumeChart() {
    const ctx = document.getElementById('recordVolumeChart');
    if (!ctx) return;
    if (recordVolumeChart) {
        recordVolumeChart.destroy();
    }

    recordVolumeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
            datasets: [{
                label: 'New Records',
                data: [850, 920, 980, 1050],
                backgroundColor: 'rgba(139, 0, 0, 0.6)',
                borderColor: 'rgba(139, 0, 0, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: '#111827',
                    titleFont: {
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${context.formattedValue}`;
                        }
                    }
                }
            }
        }
    });
}

function initRiskSection() { console.log('initRiskSection called'); }
function initResourceItems() { console.log('initResourceItems called'); }
function initTrainingSection() {
    const tabs = document.querySelectorAll('.training-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.training-overview .tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            const activeContent = document.getElementById(`${tab.dataset.tab}-content`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    // Manually activate the first tab content on load
    if (document.querySelector('.training-tabs .tab-btn.active')) {
        const initialTab = document.querySelector('.training-tabs .tab-btn.active').dataset.tab;
        const initialContent = document.getElementById(`${initialTab}-content`);
        if(initialContent) initialContent.classList.add('active');
    }

    updateProgressCircles();
    initTrainingAnalyticsCharts();
    initTrainingCalendar();
}

function initAuditsSection() {
    initAuditAnalyticsCharts();

    const scheduleAuditBtn = document.getElementById('scheduleAuditBtn');
    if(scheduleAuditBtn) {
        scheduleAuditBtn.addEventListener('click', () => {
            showNotification('Functionality to schedule a new audit will be added in a future update.', 'info');
        });
    }

    const typeFilter = document.getElementById('auditTypeFilter');
    const statusFilter = document.getElementById('auditStatusFilter');
    
    function filterAudits() {
        const typeValue = typeFilter.value;
        const statusValue = statusFilter.value;
        const rows = document.querySelectorAll('#auditTableBody tr');

        rows.forEach(row => {
            const typeMatch = typeValue === 'all' || row.dataset.type === typeValue;
            const statusMatch = statusValue === 'all' || row.dataset.status === statusValue;
            
            if (typeMatch && statusMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    if(typeFilter) typeFilter.addEventListener('change', filterAudits);
    if(statusFilter) statusFilter.addEventListener('change', filterAudits);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const auditId = item.dataset.auditId;
            const targetRow = document.querySelector(`.audit-table tr[data-audit-id="${auditId}"]`);
            
            if (targetRow) {
                // Scroll to the row
                targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight the row
                document.querySelectorAll('.audit-table tr').forEach(r => r.classList.remove('highlight'));
                targetRow.classList.add('highlight');
                setTimeout(() => targetRow.classList.remove('highlight'), 2000);
            }
        });
    });

    // Tab functionality for Findings & Actions
    const tabsContainer = document.getElementById('audit-findings-tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.tab-btn');
        const contents = tabsContainer.parentElement.parentElement.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetId = `${tab.dataset.tab}-content`;
                contents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
}

function initManagementReviewSection() {
    const tabsContainer = document.querySelector('#management .review-tabs');
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('.review-tab-btn');
    const tabContents = document.querySelector('#management .review-details').querySelectorAll('.review-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate clicked tab and corresponding content
            tab.classList.add('active');
            const targetContentId = `${tab.dataset.tab}-content`;
            const targetContent = document.getElementById(targetContentId);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // If performance tab is clicked, initialize its charts
            if (tab.dataset.tab === 'performance') {
                initManagementReviewCharts();
            }
        });
    });

    // Initialize management review data functionality
    initManagementReviewData();

    // Add dummy functionality for buttons in this section
    const addReviewBtn = document.querySelector('#management .add-review-btn');
    if(addReviewBtn) {
        addReviewBtn.addEventListener('click', () => {
            showNotification('Functionality to schedule a new review will be added in a future update.', 'info');
        });
    }

    const addActionBtn = document.querySelector('#management .add-action-btn');
    if(addActionBtn) {
        addActionBtn.addEventListener('click', () => {
            showNotification('Functionality to add an action item will be added in a future update.', 'info');
        });
    }
}

function initManagementReviewData() {
    // Initialize agenda item functionality
    initAgendaItems();
    
    // Initialize input cards functionality
    initInputCards();
    
    // Initialize performance metrics functionality
    initPerformanceMetrics();
    
    // Initialize action items functionality
    initActionItems();
    
    // Initialize outputs functionality
    initOutputsDecisions();
}

function initAgendaItems() {
    const addAgendaBtn = document.querySelector('.add-agenda-item-btn');
    if (addAgendaBtn) {
        addAgendaBtn.addEventListener('click', () => showAgendaItemModal());
    }

    // Event delegation for edit and delete buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-agenda-btn')) {
            const listItem = e.target.closest('li');
            showAgendaItemModal(listItem);
        }
        
        if (e.target.closest('.delete-agenda-btn')) {
            const listItem = e.target.closest('li');
            deleteAgendaItem(listItem);
        }
    });

    // Click to toggle agenda item status
    document.addEventListener('click', (e) => {
        if (e.target.closest('.agenda-list li') && !e.target.closest('.item-actions')) {
            const listItem = e.target.closest('li');
            toggleAgendaItemStatus(listItem);
        }
    });
}

function showAgendaItemModal(listItem = null) {
    const isNew = !listItem;
    const currentText = isNew ? '' : listItem.querySelector('span').textContent;
    const currentStatus = isNew ? 'pending' : listItem.className.split(' ').find(c => ['complete', 'in-progress', 'pending'].includes(c));

    const modal = document.createElement('div');
    modal.className = 'management-edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNew ? 'Add New' : 'Edit'} Agenda Item</h3>
            <form class="management-edit-form">
                <div class="form-group">
                    <label for="agendaText">Agenda Item</label>
                    <textarea id="agendaText" placeholder="Enter agenda item description" required>${currentText}</textarea>
                </div>
                <div class="form-group">
                    <label for="agendaStatus">Status</label>
                    <select id="agendaStatus">
                        <option value="pending" ${currentStatus === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in-progress" ${currentStatus === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="complete" ${currentStatus === 'complete' ? 'selected' : ''}>Complete</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">${isNew ? 'Add Item' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = form.querySelector('#agendaText').value;
        const status = form.querySelector('#agendaStatus').value;
        
        if (isNew ) {
            addAgendaItem(text, status);
        } else {
            updateAgendaItem(listItem, text, status);
        }
        closeManagementModal(modal);
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => closeManagementModal(modal));
    modal.addEventListener('click', e => {
        if (e.target === modal) closeManagementModal(modal);
    });
}

function addAgendaItem(text, status) {
    const agendaList = document.querySelector('.agenda-list');
    const newId = Date.now();
    
    const newItem = document.createElement('li');
    newItem.className = status;
    newItem.dataset.agendaId = newId;
    
    const iconClass = status === 'complete' ? 'fas fa-check-circle' :
                     status === 'in-progress' ? 'fas fa-circle-notch fa-spin' : 'far fa-circle';
    
    newItem.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${text}</span>
        <div class="item-actions">
            <button class="edit-agenda-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-agenda-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    agendaList.appendChild(newItem);
    showNotification('Agenda item added successfully', 'success');
}

function updateAgendaItem(listItem, text, status) {
    listItem.className = status;
    listItem.querySelector('span').textContent = text;
    
    const icon = listItem.querySelector('i');
    icon.className = status === 'complete' ? 'fas fa-check-circle' :
                    status === 'in-progress' ? 'fas fa-circle-notch fa-spin' : 'far fa-circle';
    
    showNotification('Agenda item updated successfully', 'success');
}

function deleteAgendaItem(listItem) {
    const text = listItem.querySelector('span').textContent;
    if (confirm(`Are you sure you want to delete "${text}"?`)) {
        listItem.style.transition = 'opacity 0.3s, transform 0.3s';
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            listItem.remove();
            showNotification('Agenda item deleted', 'success');
        }, 300);
    }
}

function toggleAgendaItemStatus(listItem) {
    const currentStatus = listItem.className.split(' ').find(c => ['complete', 'in-progress', 'pending'].includes(c));
    const statusCycle = { 'pending': 'in-progress', 'in-progress': 'complete', 'complete': 'pending' };
    const newStatus = statusCycle[currentStatus];
    
    listItem.className = newStatus;
    const icon = listItem.querySelector('i');
    icon.className = newStatus === 'complete' ? 'fas fa-check-circle' :
                    newStatus === 'in-progress' ? 'fas fa-circle-notch fa-spin' : 'far fa-circle';
}

function initInputCards() {
    const addInputBtn = document.querySelector('.add-input-btn');
    if (addInputBtn) {
        addInputBtn.addEventListener('click', () => showInputCardModal());
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-input-btn')) {
            const card = e.target.closest('.input-card');
            showInputCardModal(card);
        }
        
        if (e.target.closest('.delete-input-btn')) {
            const card = e.target.closest('.input-card');
            deleteInputCard(card);
        }
    });
}

function showInputCardModal(card = null) {
    const isNew = !card;
    const currentTitle = isNew ? '' : card.querySelector('span').textContent;
    const currentIcon = isNew ? 'fa-file-alt' : card.querySelector('i').className.split(' ').pop();

    const icons = [
        'fa-file-alt', 'fa-chart-bar', 'fa-users', 'fa-cogs', 'fa-search',
        'fa-shield-alt', 'fa-graduation-cap', 'fa-truck', 'fa-box', 'fa-exclamation-triangle'
    ];

    const modal = document.createElement('div');
    modal.className = 'management-edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNew ? 'Add New' : 'Edit'} Input Source</h3>
            <form class="management-edit-form">
                <div class="form-group">
                    <label for="inputTitle">Input Source Title</label>
                    <input type="text" id="inputTitle" value="${currentTitle}" placeholder="e.g., Customer Feedback" required>
                </div>
                <div class="form-group">
                    <label>Icon</label>
                    <div class="icon-selector">
                        ${icons.map(icon => `
                            <div class="icon-option ${icon === currentIcon ? 'selected' : ''}" data-icon="${icon}">
                                <i class="fas ${icon}"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">${isNew ? 'Add Input' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    // Icon selection
    const iconOptions = modal.querySelectorAll('.icon-option');
    let selectedIcon = currentIcon;
    
    iconOptions.forEach(option => {
        option.addEventListener('click', () => {
            iconOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedIcon = option.dataset.icon;
        });
    });

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelector('#inputTitle').value;
        
        if (isNew) {
            addInputCard(title, selectedIcon);
        } else {
            updateInputCard(card, title, selectedIcon);
        }
        closeManagementModal(modal);
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => closeManagementModal(modal));
    modal.addEventListener('click', e => {
        if (e.target === modal) closeManagementModal(modal);
    });
}

function addInputCard(title, icon) {
    const inputCards = document.querySelector('.input-cards');
    const newId = Date.now();
    
    const newCard = document.createElement('div');
    newCard.className = 'input-card';
    newCard.dataset.inputId = newId;
    newCard.innerHTML = `
        <i class="fas ${icon}"></i> 
        <span>${title}</span>
    `;
    
    inputCards.appendChild(newCard);
    showNotification('Input source added successfully', 'success');
}

function updateInputCard(card, title, icon) {
    card.querySelector('span').textContent = title;
    card.querySelector('i').className = `fas ${icon}`;
    showNotification('Input source updated successfully', 'success');
}

function deleteInputCard(card) {
    const title = card.querySelector('span').textContent;
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.remove();
            showNotification('Input source deleted', 'success');
        }, 300);
    }
}

function initPerformanceMetrics() {
    const addMetricBtn = document.querySelector('.add-metric-btn');
    if (addMetricBtn) {
        addMetricBtn.addEventListener('click', () => showPerformanceMetricModal());
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-metric-btn')) {
            const card = e.target.closest('.performance-metric-card');
            showPerformanceMetricModal(card);
        }
        
        if (e.target.closest('.delete-metric-btn')) {
            const card = e.target.closest('.performance-metric-card');
            deletePerformanceMetric(card);
        }
    });
}

function showPerformanceMetricModal(card = null) {
    const isNew = !card;
    const currentData = isNew ? {
        name: '',
        value: '',
        change: '',
        target: '',
        positive: true
    } : {
        name: card.querySelector('h5').textContent,
        value: card.querySelector('.metric-value').textContent,
        change: card.querySelector('.metric-change').textContent,
        target: card.querySelector('.metric-target').textContent.replace('Target: ', ''),
        positive: card.querySelector('.metric-change').classList.contains('positive')
    };

    const modal = document.createElement('div');
    modal.className = 'management-edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNew ? 'Add New' : 'Edit'} Performance Metric</h3>
            <form class="management-edit-form">
                <div class="form-group">
                    <label for="metricName">Metric Name</label>
                    <input type="text" id="metricName" value="${currentData.name}" placeholder="e.g., Customer Satisfaction" required>
                </div>
                <div class="form-group">
                    <label for="metricValue">Current Value</label>
                    <input type="text" id="metricValue" value="${currentData.value}" placeholder="e.g., 93.8%" required>
                </div>
                <div class="form-group">
                    <label for="metricChange">Change from Previous</label>
                    <input type="text" id="metricChange" value="${currentData.change}" placeholder="e.g., +1.3% vs Q1" required>
                </div>
                <div class="form-group">
                    <label for="metricTarget">Target</label>
                    <input type="text" id="metricTarget" value="${currentData.target}" placeholder="e.g., 95%" required>
                </div>
                <div class="form-group">
                    <label for="changeDirection">Change Direction</label>
                    <select id="changeDirection">
                        <option value="positive" ${currentData.positive ? 'selected' : ''}>Positive (Green)</option>
                        <option value="negative" ${!currentData.positive ? 'selected' : ''}>Negative (Red)</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">${isNew ? 'Add Metric' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: form.querySelector('#metricName').value,
            value: form.querySelector('#metricValue').value,
            change: form.querySelector('#metricChange').value,
            target: form.querySelector('#metricTarget').value,
            positive: form.querySelector('#changeDirection').value === 'positive'
        };
        
        if (isNew) {
            addPerformanceMetric(formData);
        } else {
            updatePerformanceMetric(card, formData);
        }
        closeManagementModal(modal);
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => closeManagementModal(modal));
    modal.addEventListener('click', e => {
        if (e.target === modal) closeManagementModal(modal);
    });
}

function addPerformanceMetric(data) {
    const metricsGrid = document.querySelector('.performance-metrics-grid');
    const newId = Date.now();
    
    const newCard = document.createElement('div');
    newCard.className = 'performance-metric-card';
    newCard.dataset.metricId = newId;
    newCard.innerHTML = `
        <div class="metric-header">
            <h5>${data.name}</h5>
            <div class="metric-actions">
                <button class="edit-metric-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-metric-btn"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="metric-value">${data.value}</div>
        <div class="metric-change ${data.positive ? 'positive' : 'negative'}">${data.change}</div>
        <div class="metric-target">Target: ${data.target}</div>
    `;
    
    metricsGrid.appendChild(newCard);
    showNotification('Performance metric added successfully', 'success');
}

function updatePerformanceMetric(card, data) {
    card.querySelector('h5').textContent = data.name;
    card.querySelector('.metric-value').textContent = data.value;
    card.querySelector('.metric-change').textContent = data.change;
    card.querySelector('.metric-target').textContent = `Target: ${data.target}`;
    
    const changeEl = card.querySelector('.metric-change');
    changeEl.classList.remove('positive', 'negative');
    changeEl.classList.add(data.positive ? 'positive' : 'negative');
    
    showNotification('Performance metric updated successfully', 'success');
}

function deletePerformanceMetric(card) {
    const name = card.querySelector('h5').textContent;
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.remove();
            showNotification('Performance metric deleted', 'success');
        }, 300);
    }
}

function initActionItems() {
    const addActionBtn = document.querySelector('#management .add-action-btn');
    if (addActionBtn) {
        addActionBtn.addEventListener('click', () => showActionItemModal());
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-action-btn')) {
            const row = e.target.closest('tr');
            showActionItemModal(row);
        }
        
        if (e.target.closest('.delete-action-btn')) {
            const row = e.target.closest('tr');
            deleteActionItem(row);
        }
    });
}

function showActionItemModal(row = null) {
    const isNew = !row;
    const currentData = isNew ? {
        description: '',
        owner: '',
        dueDate: '',
        priority: 'medium',
        progress: '0',
        status: 'pending'
    } : {
        description: row.cells[0].textContent,
        owner: row.cells[1].textContent,
        dueDate: row.cells[2].textContent,
        priority: row.querySelector('.priority-pill').textContent.toLowerCase(),
        progress: row.querySelector('.progress-bar-container + span').textContent.replace('%', ''),
        status: row.querySelector('.status-pill').textContent.toLowerCase().replace(' ', '-')
    };

    const modal = document.createElement('div');
    modal.className = 'management-edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNew ? 'Add New' : 'Edit'} Action Item</h3>
            <form class="management-edit-form">
                <div class="form-group">
                    <label for="actionDescription">Action Description</label>
                    <textarea id="actionDescription" placeholder="Describe the action to be taken" required>${currentData.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="actionOwner">Owner</label>
                    <input type="text" id="actionOwner" value="${currentData.owner}" placeholder="e.g., Quality Director" required>
                </div>
                <div class="form-group">
                    <label for="actionDueDate">Due Date</label>
                    <input type="date" id="actionDueDate" value="${convertToDateInput(currentData.dueDate)}" required>
                </div>
                <div class="form-group">
                    <label for="actionPriority">Priority</label>
                    <select id="actionPriority">
                        <option value="low" ${currentData.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${currentData.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${currentData.priority === 'high' ? 'selected' : ''}>High</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="actionProgress">Progress (%)</label>
                    <input type="number" id="actionProgress" min="0" max="100" value="${currentData.progress}" required>
                </div>
                <div class="form-group">
                    <label for="actionStatus">Status</label>
                    <select id="actionStatus">
                        <option value="pending" ${currentData.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="in-progress" ${currentData.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="complete" ${currentData.status === 'complete' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">${isNew ? 'Add Action' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            description: form.querySelector('#actionDescription').value,
            owner: form.querySelector('#actionOwner').value,
            dueDate: form.querySelector('#actionDueDate').value,
            priority: form.querySelector('#actionPriority').value,
            progress: form.querySelector('#actionProgress').value,
            status: form.querySelector('#actionStatus').value
        };
        
        if (isNew) {
            addActionItem(formData);
        } else {
            updateActionItem(row, formData);
        }
        closeManagementModal(modal);
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => closeManagementModal(modal));
    modal.addEventListener('click', e => {
        if (e.target === modal) closeManagementModal(modal);
    });
}

function convertToDateInput(dateString) {
    if (!dateString || dateString === 'N/A') return '';
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch {
        return '';
    }
}

function formatDateForDisplay(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function addActionItem(data) {
    const tbody = document.querySelector('#management .action-table-enhanced tbody');
    const newId = Date.now();
    
    const newRow = document.createElement('tr');
    newRow.dataset.actionId = newId;
    newRow.innerHTML = `
        <td>${data.description}</td>
        <td>${data.owner}</td>
        <td>${formatDateForDisplay(data.dueDate)}</td>
        <td><span class="priority-pill ${data.priority}">${data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}</span></td>
        <td>
            <div class="progress-bar-container"><div class="progress-bar" style="width: ${data.progress}%;"></div></div>
            <span>${data.progress}%</span>
        </td>
        <td><span class="status-pill ${data.status}">${data.status.charAt(0).toUpperCase() + data.status.slice(1).replace('-', ' ')}</span></td>
        <td>
            <button class="edit-action-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-action-btn"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    tbody.appendChild(newRow);
    showNotification('Action item added successfully', 'success');
}

function updateActionItem(row, data) {
    row.cells[0].textContent = data.description;
    row.cells[1].textContent = data.owner;
    row.cells[2].textContent = formatDateForDisplay(data.dueDate);
    
    const priorityPill = row.querySelector('.priority-pill');
    priorityPill.className = `priority-pill ${data.priority}`;
    priorityPill.textContent = data.priority.charAt(0).toUpperCase() + data.priority.slice(1);
    
    const progressBar = row.querySelector('.progress-bar');
    progressBar.style.width = `${data.progress}%`;
    row.querySelector('.progress-bar-container + span').textContent = `${data.progress}%`;
    
    const statusPill = row.querySelector('.status-pill');
    statusPill.className = `status-pill ${data.status}`;
    statusPill.textContent = data.status.charAt(0).toUpperCase() + data.status.slice(1).replace('-', ' ');
    
    showNotification('Action item updated successfully', 'success');
}

function deleteActionItem(row) {
    const description = row.cells[0].textContent;
    if (confirm(`Are you sure you want to delete this action item?`)) {
        row.style.transition = 'opacity 0.3s, transform 0.3s';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            row.remove();
            showNotification('Action item deleted', 'success');
        }, 300);
    }
}

function initOutputsDecisions() {
    const addOutputBtn = document.querySelector('.add-output-btn');
    if (addOutputBtn) {
        addOutputBtn.addEventListener('click', () => showOutputModal());
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-output-btn')) {
            const card = e.target.closest('.output-card');
            showOutputModal(card);
        }
        
        if (e.target.closest('.delete-output-btn')) {
            const card = e.target.closest('.output-card');
            deleteOutput(card);
        }
    });
}

function showOutputModal(card = null) {
    const isNew = !card;
    const currentData = isNew ? {
        title: '',
        description: '',
        icon: 'fa-bullseye'
    } : {
        title: card.querySelector('h5').textContent,
        description: card.querySelector('p').textContent,
        icon: card.querySelector('.output-icon i').className.split(' ').pop()
    };

    const icons = [
        'fa-bullseye', 'fa-cogs', 'fa-cubes', 'fa-file-alt', 'fa-handshake',
        'fa-graduation-cap', 'fa-chart-line', 'fa-users-cog', 'fa-lightbulb', 'fa-award'
    ];

    const modal = document.createElement('div');
    modal.className = 'management-edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNew ? 'Add New' : 'Edit'} Output/Decision</h3>
            <form class="management-edit-form">
                <div class="form-group">
                    <label for="outputTitle">Title</label>
                    <input type="text" id="outputTitle" value="${currentData.title}" placeholder="e.g., Updated Quality Objectives" required>
                </div>
                <div class="form-group">
                    <label for="outputDescription">Description</label>
                    <textarea id="outputDescription" placeholder="Describe the output or decision made" required>${currentData.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Icon</label>
                    <div class="icon-selector">
                        ${icons.map(icon => `
                            <div class="icon-option ${icon === currentData.icon ? 'selected' : ''}" data-icon="${icon}">
                                <i class="fas ${icon}"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">${isNew ? 'Add Output' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    // Icon selection
    const iconOptions = modal.querySelectorAll('.icon-option');
    let selectedIcon = currentData.icon;
    
    iconOptions.forEach(option => {
        option.addEventListener('click', () => {
            iconOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedIcon = option.dataset.icon;
        });
    });

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            title: form.querySelector('#outputTitle').value,
            description: form.querySelector('#outputDescription').value,
            icon: selectedIcon
        };
        
        if (isNew) {
            addOutput(formData);
        } else {
            updateOutput(card, formData);
        }
        closeManagementModal(modal);
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => closeManagementModal(modal));
    modal.addEventListener('click', e => {
        if (e.target === modal) closeManagementModal(modal);
    });
}

function addOutput(data) {
    const outputCards = document.querySelector('.output-cards');
    const newId = Date.now();
    
    const newCard = document.createElement('div');
    newCard.className = 'output-card';
    newCard.dataset.outputId = newId;
    newCard.innerHTML = `
        <div class="output-icon"><i class="fas ${data.icon}"></i></div>
        <div class="output-content">
            <h5>${data.title}</h5>
            <p>${data.description}</p>
        </div>
        <div class="output-actions">
            <button class="edit-output-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-output-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    outputCards.appendChild(newCard);
    showNotification('Output/Decision added successfully', 'success');
}

function updateOutput(card, data) {
    card.querySelector('h5').textContent = data.title;
    card.querySelector('p').textContent = data.description;
    card.querySelector('.output-icon i').className = `fas ${data.icon}`;
    showNotification('Output/Decision updated successfully', 'success');
}

function deleteOutput(card) {
    const title = card.querySelector('h5').textContent;
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.remove();
            showNotification('Output/Decision deleted', 'success');
        }, 300);
    }
}

function closeManagementModal(modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 300);
}

function initImprovementsSection() {
    initImprovementTabs();
    initImprovementAnalyticsCharts();
    initSortableTable();
    
    const addImprovementBtn = document.querySelector('#improvements .add-improvement-btn');
    if (addImprovementBtn) {
        addImprovementBtn.addEventListener('click', () => {
            showNotification('Functionality to submit improvement ideas will be added in a future update.', 'info');
        });
    }
    
    const exportBtn = document.querySelector('#improvements .export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            showNotification('Functionality to export improvement data will be added in a future update.', 'info');
        });
    }
}

function initImprovementTabs() {
    const tabsContainer = document.querySelector('.improvement-tracking .tabs');
    if (!tabsContainer) return;
    
    const tabs = tabsContainer.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.improvement-tracking .tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show corresponding content
            const targetContentId = `${tab.dataset.tab}-content`;
            const targetContent = document.getElementById(targetContentId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initImprovementAnalyticsCharts() {
    const chartContexts = {
        improvementSourceChart: document.getElementById('improvementSourceChart'),
        improvementImpactChart: document.getElementById('improvementImpactChart'),
        projectCompletionTrendChart: document.getElementById('projectCompletionTrendChart')
    };
    
    if (chartContexts.improvementSourceChart) {
        if (improvementSourceChart) improvementSourceChart.destroy();
        improvementSourceChart = new Chart(chartContexts.improvementSourceChart, {
            type: 'doughnut',
            data: {
                labels: ['Employee Suggestions', 'Management Directives', 'Customer Feedback', 'Internal Audits', 'Process Reviews'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#8b0000',
                        '#b91c1c', 
                        '#dc2626',
                        '#ef4444',
                        '#f87171'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleFont: { weight: 'bold' },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return ` ${context.label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    if (chartContexts.improvementImpactChart) {
        if (improvementImpactChart) improvementImpactChart.destroy();
        improvementImpactChart = new Chart(chartContexts.improvementImpactChart, {
            type: 'bar',
            data: {
                labels: ['Cost Savings', 'Time Savings', 'Quality Improvement', 'Safety Enhancement', 'Customer Satisfaction'],
                datasets: [{
                    label: 'Impact Score',
                    data: [85, 78, 92, 88, 76],
                    backgroundColor: 'rgba(139, 0, 0, 0.6)',
                    borderColor: '#8b0000',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: '#e5e7eb'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleFont: { weight: 'bold' },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: function(context) {
                                return ` Impact Score: ${context.formattedValue}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    if (chartContexts.projectCompletionTrendChart) {
        if (projectCompletionTrendChart) projectCompletionTrendChart.destroy();
        projectCompletionTrendChart = new Chart(chartContexts.projectCompletionTrendChart, {
            type: 'line',
            data: {
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
                datasets: [{
                    label: 'Projects Completed',
                    data: [3, 4, 6, 5, 7, 8],
                    borderColor: '#8b0000',
                    backgroundColor: 'rgba(139, 0, 0, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#8b0000',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#111827',
                        titleFont: { weight: 'bold' },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: function(context) {
                                return ` Projects: ${context.formattedValue}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function initSortableTable() {
    const table = document.querySelector('.sortable-table');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-sort-by]');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortBy = header.dataset.sortBy;
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // Toggle sort direction
            const isAscending = header.classList.contains('sort-asc');
            
            // Remove sort classes from all headers
            headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
            
            // Add appropriate sort class
            header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
            
            // Sort rows
            rows.sort((a, b) => {
                let aVal = getCellValue(a, sortBy);
                let bVal = getCellValue(b, sortBy);
                
                // Handle numeric values
                if (!isNaN(aVal) && !isNaN(bVal)) {
                    aVal = parseFloat(aVal);
                    bVal = parseFloat(bVal);
                }
                
                if (isAscending) {
                    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
                } else {
                    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                }
            });
            
            // Re-append sorted rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

function getCellValue(row, sortBy) {
    const cellIndex = {
        'name': 0,
        'category': 1,
        'date': 2,
        'savings': 3,
        'impact': 4
    };
    
    const cell = row.cells[cellIndex[sortBy]];
    if (!cell) return '';
    
    // Handle data attributes for sorting
    const dataValue = cell.dataset.value;
    if (dataValue) return dataValue;
    
    // Handle money values
    const text = cell.textContent.trim();
    if (sortBy === 'savings') {
        return text.replace(/[,$]/g, '');
    }
    
    return text;
}

function initQMSDocumentationSection() {
    const docLinks = document.querySelectorAll('.doc-link');
    docLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const docName = e.target.dataset.docName;
            showNotification(`Opening document: ${docName}...`, 'success');
            // In a real application, you would navigate to the document URL
            // For example: window.open(`/documents/${docName}.pdf`);
        });
    });

    const collapseBtn = document.querySelector('.collapse-btn');
    if (collapseBtn) {
        collapseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Feature to view all procedures is not yet implemented.', 'info');
        });
    }

    // Add/Edit functionality
    const addDocButtons = document.querySelectorAll('.add-doc-btn');
    addDocButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;
            showEditDocModal(null, level);
        });
    });

    document.querySelector('#qms').addEventListener('click', e => {
        const editBtn = e.target.closest('.edit-doc-btn');
        if (editBtn) {
            const docItem = editBtn.closest('.doc-item');
            const level = docItem.closest('.doc-items').dataset.level;
            showEditDocModal(docItem, level);
        }

        const deleteBtn = e.target.closest('.delete-doc-btn');
        if (deleteBtn) {
            const docItem = deleteBtn.closest('.doc-item');
            const docName = docItem.querySelector('.doc-link').dataset.docName;
            if (confirm(`Are you sure you want to delete "${docName}"?`)) {
                docItem.style.transition = 'opacity 0.3s, transform 0.3s';
                docItem.style.opacity = '0';
                docItem.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    docItem.remove();
                    updateQmsTotalDocs();
                    showNotification('Document deleted.', 'success');
                }, 300);
            }
        }
    });
    
    updateQmsTotalDocs();
}

function updateQmsTotalDocs() {
    const totalDocsEl = document.getElementById('qms-total-docs');
    if (totalDocsEl) {
        const docCount = document.querySelectorAll('#qms .doc-item').length;
        // This is a static representation, so we just add to the base
        const baseWorkInstructions = 156;
        totalDocsEl.textContent = docCount + baseWorkInstructions;
    }
}

function showEditDocModal(docItem, level) {
    const isNew = docItem === null;
    const docName = isNew ? '' : docItem.querySelector('.doc-link').dataset.docName;
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.doc-edit-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'doc-edit-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNew ? 'Add New' : 'Edit'} Document (Level ${level})</h3>
            <form class="doc-edit-form">
                <div class="form-group">
                    <label for="docName">Document Name / ID</label>
                    <input type="text" id="docName" value="${docName}" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">${isNew ? 'Add Document' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => modal.classList.add('visible'));

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = form.querySelector('#docName').value;
        if (isNew) {
            addDocItem(newName, level);
        } else {
            updateDocItem(docItem, newName);
        }
        closeDocModal(modal);
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => closeDocModal(modal));
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeDocModal(modal);
        }
    });
}

function closeDocModal(modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 300);
}

function createDocItemHTML(name, level) {
    const icons = {
        '1': 'fa-file-alt',
        '2': 'fa-book',
        '3': 'fa-clipboard-list'
    };
    const iconClass = icons[level] || 'fa-file';

    return `
        <i class="fas ${iconClass}"></i>
        <a href="#" class="doc-link" data-doc-name="${name}">${name}</a>
        <div class="doc-actions">
            <button class="edit-doc-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-doc-btn"><i class="fas fa-trash"></i></button>
        </div>
        <div class="doc-status-indicator current"></div>
    `;
}

function addDocItem(name, level) {
    const docItemsContainer = document.querySelector(`.doc-items[data-level="${level}"]`);
    if (!docItemsContainer) return;

    const newDocItem = document.createElement('div');
    newDocItem.className = 'doc-item';
    newDocItem.innerHTML = createDocItemHTML(name, level);

    const collapseDiv = docItemsContainer.querySelector('.doc-collapse');
    if (collapseDiv) {
        docItemsContainer.insertBefore(newDocItem, collapseDiv);
    } else {
        docItemsContainer.appendChild(newDocItem);
    }

    newDocItem.querySelector('.doc-link').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification(`Opening document: ${name}...`, 'success');
    });

    showNotification('Document added successfully.', 'success');
    updateQmsTotalDocs();
}

function updateDocItem(docItem, newName) {
    const link = docItem.querySelector('.doc-link');
    link.textContent = newName;
    link.dataset.docName = newName;
    showNotification('Document updated successfully.', 'success');
}

// Add this new function for organization section
function initOrganizationSection() {
    const orgCards = document.querySelectorAll('.org-card');
    const exportBtn = document.querySelector('.org-structure .export-btn');

    // Add hover effects for org cards
    orgCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });

        // Add click handler for org cards to edit
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            showEditOrgModal(card);
        });
    });

    // Export structure handler
    if (exportBtn) {
        exportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportOrgStructure();
        });
    }

    // Add "Add Department" button
    addDepartmentButton();
    
    // Initialize matrix editing
    initMatrixEditing();
}

function initClearDemoData() {
    const clearBtn = document.getElementById('clearDemoData');
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (confirm('Are you sure you want to clear all demo data? This action cannot be undone.')) {
                clearAllDemoData();
                showNotification('All demo data has been cleared successfully', 'success');
            }
        });
    }
}

function clearAllDemoData() {
    // Clear charts if they exist
    if (window.performanceChart && typeof window.performanceChart.destroy === 'function') {
        window.performanceChart.destroy();
        window.performanceChart = null;
    }
    if (window.ncChart && typeof window.ncChart.destroy === 'function') {
        window.ncChart.destroy();
        window.ncChart = null;
    }
    if (window.findingsChart && typeof window.findingsChart.destroy === 'function') {
        window.findingsChart.destroy();
        window.findingsChart = null;
    }
    if (window.complianceChart && typeof window.complianceChart.destroy === 'function') {
        window.complianceChart.destroy();
        window.complianceChart = null;
    }
    
    // Clear overview metrics
    clearOverviewData();
    
    // Clear organization data
    clearOrganizationData();
    
    // Clear other sections
    clearProcessData();
    clearRecordsData();
    clearRiskData();
    clearTrainingData();
    clearAuditsData();
    clearManagementData();
    clearImprovementsData();
    
    // Reinitialize charts
    setTimeout(() => {
        setupCharts();
    }, 100);
}

function clearOverviewData() {
    // Reset metric values only in the overview section
    const overviewSection = document.getElementById('overview');
    if (!overviewSection) return;
    
    const metricValues = overviewSection.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
        if (value.textContent.includes('%')) {
            value.textContent = '0%';
        } else if (value.textContent.includes('$')) {
            value.textContent = '$0';
        } else if (value.textContent === 'ISO 9001:2015') {
            value.textContent = 'Not Certified';
        } else if (value.textContent === 'March 2024') {
            value.textContent = 'No Data';
        } else if (!isNaN(value.textContent.replace(/,/g, ''))) {
            value.textContent = '0';
        }
    });
    
    // Reset status indicators only in the overview section
    const statusDots = overviewSection.querySelectorAll('.status-dot');
    statusDots.forEach(dot => {
        dot.className = 'status-dot red';
    });
    
    // Reset status indicator text
    const statusItems = overviewSection.querySelectorAll('.status-item span');
    statusItems.forEach((span, index) => {
        switch(index) {
            case 0:
                span.textContent = 'QMS Non-Compliant';
                break;
            case 1:
                span.textContent = 'Documentation Outdated';
                break;
            case 2:
                span.textContent = 'No Data';
                break;
        }
    });

    // Clear overview charts
    if (performanceChart) {
        performanceChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
        performanceChart.update();
    }
    if (ncChart) {
        ncChart.data.datasets[0].data = [0, 0, 0, 0, 0];
        ncChart.update();
    }
}

function clearProcessData() {
    // Reset process effectiveness values in the process map
    const effectivenessSpans = document.querySelectorAll('#processes .process-interaction-map .effectiveness');
    effectivenessSpans.forEach(span => {
        span.textContent = '0%';
    });

    // Reset process KPI dashboard
    const kpiValues = document.querySelectorAll('#processes .kpi-grid .kpi-value');
    kpiValues.forEach(value => {
        if (value.textContent.includes('%')) {
            value.textContent = '0%';
        } else {
            value.textContent = '0';
        }
    });

    const kpiTrends = document.querySelectorAll('#processes .kpi-grid .kpi-trend');
    kpiTrends.forEach(trend => {
        trend.classList.remove('positive', 'negative');
        trend.innerHTML = '<i class="fas fa-minus"></i><span>-</span>';
    });

    // Clear all process performance tables
    const tables = document.querySelectorAll('#processes .performance-table tbody');
    tables.forEach(tbody => {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 1) {
                // Iterate through all cells except the first (name) and last (status)
                for (let i = 1; i < cells.length - 1; i++) {
                    const cell = cells[i];
                    if (cell.textContent.includes('%')) {
                        // Keep the '+' for quality impact if it exists
                        if (cell.textContent.startsWith('+')) {
                             cell.textContent = '+0%';
                        } else {
                             cell.textContent = '0%';
                        }
                    } else if (cell.textContent.includes('days')) {
                        cell.textContent = '0 days';
                    } else if (cell.textContent.includes('hours')) {
                        cell.textContent = '0 hours';
                    } else if (cell.textContent.includes('/5')) {
                        cell.textContent = '0/5';
                    } else if (cell.textContent.includes('$')) {
                        cell.textContent = '$0K';
                    } else { // Catches numbers, etc.
                        cell.textContent = '0';
                    }
                }
                // Set status to review
                const statusCell = cells[cells.length - 1];
                statusCell.innerHTML = '<span class="status-pill red">Review</span>';
            }
        });
    });
}

function clearRecordsData() {
    // Reset metric values in the #records section
    const metricValues = document.querySelectorAll('#records .metric-value');
    metricValues.forEach(value => {
        if (value.textContent.includes('%')) {
            value.textContent = '0%';
        } else if (value.textContent.includes('sec')) {
            value.textContent = 'N/A';
        } else {
            value.textContent = '0';
        }
    });

    // Reset record counts in the browser cards
    const recordCardMetas = document.querySelectorAll('.record-card-meta span:first-child');
    recordCardMetas.forEach(meta => {
        const iconHTML = meta.querySelector('i').outerHTML;
        meta.innerHTML = `${iconHTML} 0 Records`;
    });

    // Clear the record volume chart
    if (recordVolumeChart && typeof recordVolumeChart.destroy === 'function') {
        recordVolumeChart.data.datasets[0].data = [0, 0, 0, 0];
        recordVolumeChart.update();
    }
}

function clearRiskData() {
    // Reset risk statistics
    const riskStats = document.querySelectorAll('.risk-stat .stat-value');
    riskStats.forEach(stat => {
        stat.textContent = '0';
    });
    
    // Reset action progress
    const progressBars = document.querySelectorAll('.action-progress .progress-bar > div');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    const progressTexts = document.querySelectorAll('.action-progress span');
    progressTexts.forEach(text => {
        if (text.textContent.includes('%')) {
            text.textContent = '0% Complete';
        }
    });
}

function clearTrainingData() {
    // Reset training metrics
    const metricValues = document.querySelectorAll('#training .metric-value');
    metricValues.forEach(value => {
        if (value.textContent.includes('%')) {
            value.textContent = '0%';
        } else if (!isNaN(value.textContent.replace(/,/g, ''))) {
            value.textContent = '0';
        }
    });

    // Reset progress circles
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        circle.dataset.progress = "0";
    });
    updateProgressCircles();
    document.querySelectorAll('.completion-info p').forEach(p => p.textContent = '0 Employees Trained');

    // Reset ongoing development progress bars
    document.querySelectorAll('#ongoing-content .progress').forEach(bar => bar.style.width = '0%');
    document.querySelectorAll('#ongoing-content .program-progress span').forEach(span => span.textContent = '0% Complete');

    // Clear certifications table
    const certTbody = document.querySelector('#certifications-content tbody');
    if(certTbody) certTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No certification data</td></tr>';

    // Clear analytics charts
    if(trainingCompletionChart) { trainingCompletionChart.data.datasets[0].data = [0,0,0,0]; trainingCompletionChart.update(); }
    if(trainingTypeChart) { trainingTypeChart.data.datasets[0].data = [0,0,0,0]; trainingTypeChart.update(); }
    if(certificationStatusChart) { certificationStatusChart.data.datasets[0].data = [0,0,0]; certificationStatusChart.update(); }
    if(trainingTrendChart) { trainingTrendChart.data.datasets[0].data = [0,0,0,0]; trainingTrendChart.update(); }

    // Clear calendar
    const calendarGrid = document.getElementById('training-calendar-grid');
    if(calendarGrid) {
        calendarGrid.querySelectorAll('.calendar-event').forEach(e => e.remove());
    }
}

function clearAuditsData() {
    // Reset audit summary values
    document.getElementById('audits-scheduled-value').textContent = '0';
    document.getElementById('audits-completion-value').textContent = '0%';
    document.getElementById('audits-findings-value').innerHTML = '0 <span class="sub-value">(0 Major)</span>';
    document.getElementById('audits-closure-value').textContent = 'N/A';
    
    // Clear the table
    const tableBody = document.getElementById('auditTableBody');
    if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No audit data</td></tr>';
    }

    // Clear findings and actions
    const findingsGrid = document.querySelector('#audits .findings-grid');
    if (findingsGrid) {
        findingsGrid.innerHTML = '<p style="text-align:center; padding: 1rem;">No findings to display.</p>';
    }
    const actionCards = document.querySelector('#audits #actions-content .action-cards');
    if (actionCards) {
        actionCards.innerHTML = '<p style="text-align:center; padding: 1rem;">No actions to display.</p>';
    }

    // Clear analytics charts
    const chartRefs = [findingsChart, complianceChart, areaChart, closureChart];
    chartRefs.forEach((chart, index) => {
        if(chart && typeof chart.destroy === 'function') {
            chart.data.datasets[0].data = [];
            chart.update();
        }
    });
}

function clearManagementData() {
    // Reset management review KPIs
    const kpiValues = document.querySelectorAll('#management .review-kpi-card .kpi-value');
    if (kpiValues.length > 0) {
        kpiValues[0].textContent = 'N/A'; // Latest Review
        kpiValues[1].textContent = '0'; // Actions Generated
        kpiValues[2].textContent = '0%'; // Action Closure Rate
        kpiValues[3].textContent = '0%'; // Attendance
    }

    // Reset agenda list items status
    const agendaItems = document.querySelectorAll('#management .agenda-list li');
    agendaItems.forEach(item => {
        item.classList.remove('complete', 'in-progress');
        item.classList.add('pending');
        const icon = item.querySelector('i');
        icon.className = 'far fa-circle';
    });
    
    // Clear all but first 3 agenda items
    const agendaList = document.querySelector('#management .agenda-list');
    const agendaItemsArray = Array.from(agendaList.children);
    agendaItemsArray.slice(3).forEach(item => item.remove());

    // Clear input cards beyond the basic ones
    const inputCards = document.querySelector('.input-cards');
    const inputCardsArray = Array.from(inputCards.children);
    inputCardsArray.slice(6).forEach(card => card.remove());

    // Clear performance metrics
    const metricsGrid = document.querySelector('.performance-metrics-grid');
    metricsGrid.innerHTML = '<p style="text-align:center; padding: 2rem; color: #6b7280;">No performance metrics available</p>';

    // Reset action items table
    const actionTableRows = document.querySelectorAll('#management .action-table-enhanced tbody tr');
    actionTableRows.forEach(row => {
        const progressBar = row.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        const progressText = row.querySelector('.progress-bar-container + span');
        if (progressText) {
            progressText.textContent = '0%';
        }
        
        const statusPill = row.querySelector('.status-pill');
        if (statusPill) {
            statusPill.className = 'status-pill pending';
            statusPill.textContent = 'Pending';
        }
    });
    
    // Clear all but first 3 action items
    const actionTableBody = document.querySelector('#management .action-table-enhanced tbody');
    const actionRows = Array.from(actionTableBody.children);
    actionRows.slice(3).forEach(row => row.remove());

    // Clear output cards beyond the basic ones
    const outputCards = document.querySelector('.output-cards');
    const outputCardsArray = Array.from(outputCards.children);
    outputCardsArray.slice(4).forEach(card => card.remove());

    // Clear charts if they exist
    if (customerSatisfactionChart && typeof customerSatisfactionChart.update === 'function') {
        customerSatisfactionChart.data.datasets[0].data = [0, 0, 0, 0];
        customerSatisfactionChart.update();
    }
    if (processPerformanceReviewChart && typeof processPerformanceReviewChart.update === 'function') {
        processPerformanceReviewChart.data.datasets.forEach(dataset => {
            dataset.data = [0, 0, 0, 0];
        });
        processPerformanceReviewChart.update();
    }
}

function clearImprovementsData() {
    // Reset improvement metrics
    const improvementValues = document.querySelectorAll('#improvements .summary-value');
    improvementValues.forEach(value => {
        if (value.textContent.includes('$')) {
            value.textContent = '$0';
        } else if (value.textContent.includes('%')) {
            value.textContent = '0%';
        } else {
            value.textContent = '0';
        }
    });
    
    // Reset project progress
    const projectBars = document.querySelectorAll('#improvements .project-card-enhanced .progress-bar');
    projectBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    const projectTexts = document.querySelectorAll('#improvements .project-card-enhanced .progress-text');
    projectTexts.forEach(text => {
        text.textContent = '0%';
    });
    
    // Clear suggestion box
    const suggestionList = document.querySelector('#improvements .suggestion-list');
    if (suggestionList) {
        suggestionList.innerHTML = '<p style="text-align:center; padding: 2rem; color: #6b7280;">No suggestions to display.</p>';
    }
    
    // Clear completed projects table
    const completedTable = document.querySelector('#improvements .sortable-table tbody');
    if (completedTable) {
        completedTable.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">No completed projects to display.</td></tr>';
    }
    
    // Clear analytics charts
    if (improvementSourceChart && typeof improvementSourceChart.update === 'function') {
        improvementSourceChart.data.datasets[0].data = [0, 0, 0, 0, 0];
        improvementSourceChart.update();
    }
    
    if (improvementImpactChart && typeof improvementImpactChart.update === 'function') {
        improvementImpactChart.data.datasets[0].data = [0, 0, 0, 0, 0];
        improvementImpactChart.update();
    }
    
    if (projectCompletionTrendChart && typeof projectCompletionTrendChart.update === 'function') {
        projectCompletionTrendChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
        projectCompletionTrendChart.update();
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initMatrixEditing() {
    const addRoleBtn = document.querySelector('.add-role-btn');
    const saveMatrixBtn = document.querySelector('.save-matrix-btn');
    const matrixTable = document.querySelector('.matrix-table table');
    
    if (addRoleBtn) {
        addRoleBtn.addEventListener('click', addNewRole);
    }
    
    if (saveMatrixBtn) {
        saveMatrixBtn.addEventListener('click', saveMatrixChanges);
    }
    
    // Initialize existing cells
    initMatrixCells();
}

function initMatrixCells() {
    const matrixTable = document.querySelector('.matrix-table table tbody');
    if (!matrixTable) return;
    
    const rows = matrixTable.querySelectorAll('tr');
    rows.forEach(row => {
        setupMatrixRow(row);
    });
}

function setupMatrixRow(row) {
    const roleCell = row.querySelector('td:first-child');
    const responsibilityCells = row.querySelectorAll('td:not(:first-child)');
    
    // Make role name editable
    if (roleCell && !roleCell.querySelector('.delete-role-btn')) {
        roleCell.addEventListener('click', () => editRoleName(roleCell));
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-role-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete Role';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteRole(row);
        });
        roleCell.appendChild(deleteBtn);
    }
    
    // Make responsibility cells clickable
    responsibilityCells.forEach(cell => {
        cell.addEventListener('click', () => toggleResponsibility(cell));
    });
}

function editRoleName(roleCell) {
    if (roleCell.classList.contains('editing')) return;
    
    const currentText = roleCell.textContent.trim();
    const deleteBtn = roleCell.querySelector('.delete-role-btn');
    
    roleCell.classList.add('editing');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'role-input';
    input.value = currentText;
    
    roleCell.textContent = '';
    roleCell.appendChild(input);
    roleCell.appendChild(deleteBtn);
    
    input.focus();
    input.select();
    
    function finishEditing() {
        const newValue = input.value.trim() || currentText;
        roleCell.classList.remove('editing');
        roleCell.textContent = newValue;
        roleCell.appendChild(deleteBtn);
        
        if (newValue !== currentText) {
            markCellChanged(roleCell);
        }
    }
    
    input.addEventListener('blur', finishEditing);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            finishEditing();
        } else if (e.key === 'Escape') {
            input.value = currentText;
            finishEditing();
        }
    });
}

function toggleResponsibility(cell) {
    const icon = cell.querySelector('i');
    if (!icon) {
        // No icon - add partial responsibility (amber circle)
        cell.innerHTML = '<i class="fas fa-circle text-amber responsibility-icon"></i>';
    } else if (icon.classList.contains('fa-circle')) {
        // Circle - change to full responsibility (green check)
        cell.innerHTML = '<i class="fas fa-check text-green responsibility-icon"></i>';
    } else if (icon.classList.contains('fa-check')) {
        // Check - remove responsibility (no icon)
        cell.innerHTML = '';
    }
    
    markCellChanged(cell);
}

function addNewRole() {
    const matrixTable = document.querySelector('.matrix-table table tbody');
    if (!matrixTable) return;
    
    const headerRow = document.querySelector('.matrix-table table thead tr');
    const columnCount = headerRow.querySelectorAll('th').length;
    
    const newRow = document.createElement('tr');
    
    // Role name cell
    const roleCell = document.createElement('td');
    roleCell.textContent = 'New Role';
    roleCell.classList.add('changed');
    newRow.appendChild(roleCell);
    
    // Responsibility cells
    for (let i = 1; i < columnCount; i++) {
        const cell = document.createElement('td');
        cell.innerHTML = '';
        newRow.appendChild(cell);
    }
    
    matrixTable.appendChild(newRow);
    setupMatrixRow(newRow);
    
    // Auto-edit the role name
    setTimeout(() => editRoleName(roleCell), 100);
    
    showNotification('New role added. Click to edit the name.', 'success');
}

function deleteRole(row) {
    const roleName = row.querySelector('td:first-child').textContent.trim();
    
    if (confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            row.remove();
            showNotification(`Role "${roleName}" deleted successfully`, 'success');
        }, 300);
    }
}

function markCellChanged(cell) {
    cell.classList.add('changed');
}

function saveMatrixChanges() {
    const changedCells = document.querySelectorAll('.matrix-table .changed');
    const changes = [];
    
    changedCells.forEach(cell => {
        const row = cell.parentElement;
        const roleName = row.querySelector('td:first-child').textContent.trim();
        
        if (cell === row.querySelector('td:first-child')) {
            changes.push({
                type: 'role_name',
                role: roleName,
                change: 'Role name updated'
            });
        } else {
            const columnIndex = Array.from(row.children).indexOf(cell);
            const headerRow = document.querySelector('.matrix-table table thead tr');
            const columnName = headerRow.children[columnIndex].textContent;
            const responsibility = getResponsibilityLevel(cell);
            
            changes.push({
                type: 'responsibility',
                role: roleName,
                column: columnName,
                level: responsibility
            });
        }
    });
    
    // Here you would typically send changes to a server
    console.log('Saving matrix changes:', changes);
    
    // Remove change indicators
    changedCells.forEach(cell => cell.classList.remove('changed'));
    
    const changeCount = changes.length;
    showNotification(`${changeCount} change${changeCount !== 1 ? 's' : ''} saved successfully`, 'success');
}

function getResponsibilityLevel(cell) {
    const icon = cell.querySelector('i');
    if (!icon) return 'none';
    if (icon.classList.contains('fa-check')) return 'full';
    if (icon.classList.contains('fa-circle')) return 'partial';
    return 'none';
}

function exportMatrixData() {
    const matrixTable = document.querySelector('.matrix-table table');
    const timestamp = new Date().toISOString().split('T')[0];
    
    const matrixData = {
        organization: "MRC Global",
        exportDate: timestamp,
        matrixType: "Quality Responsibilities Matrix",
        roles: []
    };
    
    const rows = matrixTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const roleName = cells[0].textContent.trim();
        const responsibilities = {};
        
        // Get header names
        const headers = matrixTable.querySelectorAll('thead th');
        for (let i = 1; i < cells.length; i++) {
            const headerName = headers[i].textContent.trim();
            responsibilities[headerName] = getResponsibilityLevel(cells[i]);
        }
        
        matrixData.roles.push({
            name: roleName,
            responsibilities: responsibilities
        });
    });
    
    const blob = new Blob([JSON.stringify(matrixData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mrc-global-responsibility-matrix-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showNotification('Responsibility matrix exported successfully', 'success');
}

function exportOrgStructure() {
    const orgStructure = document.querySelector('.org-structure');
    const executive = orgStructure.querySelector('.org-card.executive');
    const departments = orgStructure.querySelectorAll('.org-card.department');

    const structureData = {
        executive: {
            title: executive.querySelector('h4').textContent,
            description: executive.querySelector('p').textContent,
            metrics: Array.from(executive.querySelectorAll('.org-metrics span')).map(s => s.textContent.trim())
        },
        departments: Array.from(departments).map(dept => ({
            title: dept.querySelector('h4').textContent,
            description: dept.querySelector('p').textContent,
            metrics: Array.from(dept.querySelectorAll('.org-metrics span')).map(s => s.textContent.trim())
        }))
    };

    const blob = new Blob([JSON.stringify(structureData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `mrc-global-org-structure-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showNotification('Organization structure exported successfully', 'success');
}

function clearOrganizationData() {
    const orgCards = document.querySelectorAll('.org-card:not(.executive)');
    orgCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => card.remove(), 300);
    });
    
    // Clear matrix data
    const matrixCells = document.querySelectorAll('.matrix-table td i');
    matrixCells.forEach(cell => {
        cell.className = 'far fa-circle text-gray';
    });
    
    // Reset role names to defaults
    const roleNames = document.querySelectorAll('.matrix-table tbody td:first-child');
    const defaultRoles = ['Quality Director', 'Department Managers', 'Quality Team', 'Process Owners'];
    roleNames.forEach((cell, index) => {
        if (defaultRoles[index]) {
            cell.textContent = defaultRoles[index];
        }
    });
}

function addDepartmentButton() {
    // Find the org-structure container
    const orgStructure = document.querySelector('.org-structure');
    if (!orgStructure) return;

    // Create the "Add Department" button if it doesn't exist
    if (!document.querySelector('.add-department-btn')) {
        const addButton = document.createElement('button');
        addButton.className = 'add-department-btn';
        addButton.innerHTML = '<i class="fas fa-plus"></i> Add New Department';
        
        addButton.addEventListener('click', () => {
            showEditOrgModal(); // Call with no parameter to indicate new department
        });
        
        orgStructure.appendChild(addButton);
    }
}

// Add the showEditOrgModal function that was missing
function showEditOrgModal(card = null) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'org-edit-modal';
    
    const isNewDepartment = !card;
    const departmentData = isNewDepartment ? {
        title: '',
        description: '',
        metrics: ['', '']
    } : {
        title: card.querySelector('h4').textContent,
        description: card.querySelector('p').textContent,
        metrics: Array.from(card.querySelectorAll('.org-metrics span')).map(span => span.textContent)
    };

    modal.innerHTML = `
        <div class="modal-content">
            <h3>${isNewDepartment ? 'Add New Department' : 'Edit Department'}</h3>
            <form class="org-edit-form">
                <div class="form-group">
                    <label for="deptTitle">Department Title</label>
                    <input type="text" id="deptTitle" value="${departmentData.title}" required>
                </div>
                <div class="form-group">
                    <label for="deptDesc">Description</label>
                    <textarea id="deptDesc" required>${departmentData.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="deptMetric1">Metric 1</label>
                    <input type="text" id="deptMetric1" value="${departmentData.metrics[0]}" placeholder="e.g., 12 Managers">
                </div>
                <div class="form-group">
                    <label for="deptMetric2">Metric 2</label>
                    <input type="text" id="deptMetric2" value="${departmentData.metrics[1]}" placeholder="e.g., 400+ Staff">
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    ${!isNewDepartment ? '<button type="button" class="delete-dept-btn">Delete</button>' : ''}
                    <button type="submit" class="save-btn">Save</button>
                </div>
            </form>
        </div>
    `;

    // Add the modal to the page
    document.body.appendChild(modal);

    // Show the modal with animation
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    });

    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveDepartment(form, card);
        closeModal(modal);
    });

    // Handle cancel button
    const cancelBtn = modal.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => closeModal(modal));

    // Handle delete button if editing existing department
    const deleteBtn = modal.querySelector('.delete-dept-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this department?')) {
                card.remove();
                closeModal(modal);
                showNotification('Department deleted successfully', 'success');
            }
        });
    }
}

function closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
    setTimeout(() => modal.remove(), 300);
}

function saveDepartment(form, existingCard) {
    const title = form.querySelector('#deptTitle').value;
    const description = form.querySelector('#deptDesc').value;
    const metric1 = form.querySelector('#deptMetric1').value;
    const metric2 = form.querySelector('#deptMetric2').value;

    if (existingCard) {
        // Update existing card
        existingCard.querySelector('h4').textContent = title;
        existingCard.querySelector('p').textContent = description;
        const metrics = existingCard.querySelectorAll('.org-metrics span');
        metrics[0].textContent = metric1;
        metrics[1].textContent = metric2;
        showNotification('Department updated successfully', 'success');
    } else {
        // Create new card
        const newCard = createNewDepartmentCard(title, description, metric1, metric2);
        const orgLevel = document.querySelector('.org-level:nth-child(2)');
        if (orgLevel) {
            orgLevel.appendChild(newCard);
            showNotification('New department added successfully', 'success');
        }
    }
}

function createNewDepartmentCard(title, description, metric1, metric2) {
    const card = document.createElement('div');
    card.className = 'org-card department';
    card.innerHTML = `
        <h4>${title}</h4>
        <p>${description}</p>
        <div class="org-metrics">
            <span>${metric1}</span>
            <span>${metric2}</span>
        </div>
    `;

    // Add click handler for editing
    card.addEventListener('click', () => showEditOrgModal(card));

    return card;
}

function updateProgressCircles() {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach(circle => {
        const progress = circle.dataset.progress;
        const ring = circle.querySelector('.progress-ring__circle');
        const radius = ring.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - progress / 100 * circumference;
        ring.style.strokeDashoffset = offset;

        const text = circle.querySelector('.progress-text');
        if (text) text.textContent = `${progress}%`;
    });
}

function initTrainingAnalyticsCharts() {
    const chartContexts = {
        trainingCompletionChart: document.getElementById('trainingCompletionChart'),
        trainingTypeChart: document.getElementById('trainingTypeChart'),
        certificationStatusChart: document.getElementById('certificationStatusChart'),
        trainingTrendChart: document.getElementById('trainingTrendChart'),
    };

    if (chartContexts.trainingCompletionChart) {
        if (trainingCompletionChart) trainingCompletionChart.destroy();
        trainingCompletionChart = new Chart(chartContexts.trainingCompletionChart, {
            type: 'doughnut',
            data: {
                labels: ['Manufacturing', 'Quality', 'Sales', 'Support'],
                datasets: [{
                    data: [95, 100, 92, 98],
                    backgroundColor: ['#b91c1c', '#9a3412', '#7c2d12', '#fdf2f2'],
                    borderColor: '#fff'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }

    if (chartContexts.trainingTypeChart) {
        if (trainingTypeChart) trainingTypeChart.destroy();
        trainingTypeChart = new Chart(chartContexts.trainingTypeChart, {
            type: 'bar',
            data: {
                labels: ['Onboarding', 'Compliance', 'Technical', 'Leadership'],
                datasets: [{
                    label: 'Training Hours',
                    data: [8000, 9500, 5000, 2180],
                    backgroundColor: 'rgba(139, 0, 0, 0.6)',
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
        });
    }

    if (chartContexts.certificationStatusChart) {
        if (certificationStatusChart) certificationStatusChart.destroy();
        certificationStatusChart = new Chart(chartContexts.certificationStatusChart, {
            type: 'pie',
            data: {
                labels: ['Current', 'Renewal Due', 'Expired'],
                datasets: [{
                    data: [42, 5, 1],
                    backgroundColor: ['#16a34a', '#f59e0b', '#ef4444'],
                    borderColor: '#fff'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }
    
    if (chartContexts.trainingTrendChart) {
        if (trainingTrendChart) trainingTrendChart.destroy();
        trainingTrendChart = new Chart(chartContexts.trainingTrendChart, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Completions',
                    data: [88, 92, 95, 98],
                    borderColor: '#8b0000',
                    backgroundColor: 'rgba(139, 0, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }
}

function initTrainingCalendar() {
    const calendarGrid = document.getElementById('training-calendar-grid');
    const monthEl = document.getElementById('current-month');
    const prevBtn = document.querySelector('.calendar-controls .prev-month');
    const nextBtn = document.querySelector('.calendar-controls .next-month');
    if (!calendarGrid) return;
    
    let currentDate = new Date();

    const trainingEvents = {
        '2024-04-22': 'Internal Auditor Refresher',
        '2024-04-25': 'Process Control Workshop',
        '2024-05-08': 'New QMS Software Intro',
        '2024-05-15': 'Risk Management Training',
    };

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthEl.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            calendarGrid.innerHTML += `<div class="calendar-header-day">${day}</div>`;
        });
        
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.innerHTML += `<div class="calendar-day other-month"></div>`;
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            const thisDate = new Date(year, month, day);
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            if (thisDate.toDateString() === new Date().toDateString()) {
                dayEl.classList.add('today');
            }
            
            dayEl.innerHTML = `<span class="day-number">${day}</span>`;
            
            if (trainingEvents[dateString]) {
                dayEl.innerHTML += `<div class="calendar-event" title="${trainingEvents[dateString]}">${trainingEvents[dateString]}</div>`;
            }

            calendarGrid.appendChild(dayEl);
        }
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
}

function initAuditAnalyticsCharts() {
    const chartContexts = {
        findingsChart: document.getElementById('findingsChart'),
        complianceChart: document.getElementById('complianceChart'),
        areaChart: document.getElementById('areaChart'),
        closureChart: document.getElementById('closureChart'),
    };
    
    if (chartContexts.findingsChart) {
        if (findingsChart) findingsChart.destroy();
        findingsChart = new Chart(chartContexts.findingsChart, {
            type: 'doughnut',
            data: {
                labels: ['Minor NC', 'Major NC', 'Observations'],
                datasets: [{
                    data: [6, 2, 5],
                    backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }

    if (chartContexts.complianceChart) {
        if (complianceChart) complianceChart.destroy();
        complianceChart = new Chart(chartContexts.complianceChart, {
            type: 'line',
            data: {
                labels: ['Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024 (Proj.)'],
                datasets: [{
                    label: 'Compliance Score',
                    data: [96.5, 97.2, 98.5, 99.0],
                    borderColor: '#8b0000',
                    backgroundColor: 'rgba(139, 0, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false } }, plugins: { legend: { display: false } } }
        });
    }

    if (chartContexts.areaChart) {
        if (areaChart) areaChart.destroy();
        areaChart = new Chart(chartContexts.areaChart, {
            type: 'bar',
            data: {
                labels: ['Manufacturing', 'Doc Control', 'Training', 'Purchasing', 'Sales'],
                datasets: [{
                    label: 'Number of Findings',
                    data: [5, 3, 2, 2, 1],
                    backgroundColor: 'rgba(139, 0, 0, 0.6)',
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
        });
    }

    if (chartContexts.closureChart) {
        if (closureChart) closureChart.destroy();
        closureChart = new Chart(chartContexts.closureChart, {
            type: 'pie',
            data: {
                labels: ['Closed On-Time', 'Overdue', 'In Progress'],
                datasets: [{
                    data: [25, 4, 8],
                    backgroundColor: ['#16a34a', '#ef4444', '#f59e0b'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }
}