export class TemplateManager {
    constructor(documentBuilder) {
        this.documentBuilder = documentBuilder;
        this.templates = this.initializeTemplates();
        this.currentCategory = 'sop';
    }

    initializeTemplates() {
        return {
            sop: [
                {
                    name: "SOP: Document Control",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Document Control</h2>
                    <p><strong>Purpose:</strong> To establish procedures for the control of documents within the Quality Management System.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all documents that affect the quality of products and services.</p>
                    <h3>2. Responsibilities</h3>
                    <p>Quality Manager: Overall responsibility for document control</p>
                    <p>Department Heads: Ensure compliance within their areas</p>
                    <h3>3. Procedure</h3>
                    <p>3.1 Document Creation</p>
                    <p>3.2 Document Review</p>
                    <p>3.3 Document Approval</p>
                    <p>3.4 Document Distribution</p>
                    <p>3.5 Document Control</p>
                    <h3>4. Records</h3>
                    <p>Document control logs shall be maintained.</p>`,
                    settings: {
                        id: 'SOP-001',
                        title: 'Document Control',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Establishes procedures for the control of documents within the Quality Management System.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Document Control',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Document Control',
                        isoScope: 'ISO 9001:2015 7.5',
                        isoCritical: true,
                        processScope: 'Document Control Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Document Control', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Management Review",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Management Review</h2>
                    <p><strong>Purpose:</strong> To ensure the continuing suitability, adequacy, and effectiveness of the QMS.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure covers the management review process for the Quality Management System.</p>
                    <h3>2. Frequency</h3>
                    <p>Management reviews shall be conducted at least annually.</p>
                    <h3>3. Input to Management Review</h3>
                    <p>• Status of actions from previous reviews</p>
                    <p>• Changes in external and internal issues</p>
                    <p>• Information on QMS performance</p>
                    <p>• Customer feedback</p>
                    <p>• Extent of objectives achievement</p>
                    <h3>4. Output from Management Review</h3>
                    <p>• Opportunities for improvement</p>
                    <p>• Need for changes to QMS</p>
                    <p>• Resource needs</p>`,
                    settings: {
                        id: 'SOP-002',
                        title: 'Management Review',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for conducting management reviews of the Quality Management System.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'CEO',
                        department: 'Executive',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Management Review',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Management Review',
                        isoScope: 'ISO 9001:2015 9.3',
                        isoCritical: true,
                        processScope: 'Management Review Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Management Review', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Internal Audit",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Internal Audit</h2>
                    <p><strong>Purpose:</strong> To provide information on whether the QMS conforms to requirements.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all internal audits of the Quality Management System.</p>
                    <h3>2. Audit Program</h3>
                    <p>An annual audit program shall be established considering:</p>
                    <p>• Importance of processes</p>
                    <p>• Changes affecting the organization</p>
                    <p>• Results of previous audits</p>
                    <h3>3. Audit Process</h3>
                    <p>3.1 Audit Planning</p>
                    <p>3.2 Audit Execution</p>
                    <p>3.3 Audit Reporting</p>
                    <p>3.4 Follow-up Activities</p>
                    <h3>4. Auditor Competence</h3>
                    <p>Auditors shall be competent based on education, training, and experience.</p>`,
                    settings: {
                        id: 'SOP-003',
                        title: 'Internal Audit',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for conducting internal audits of the Quality Management System.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Internal Audit',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Internal Audit',
                        isoScope: 'ISO 9001:2015 9.2',
                        isoCritical: true,
                        processScope: 'Internal Audit Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Internal Audit', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Corrective Action",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Corrective Action</h2>
                    <p><strong>Purpose:</strong> To eliminate the causes of nonconformities to prevent recurrence.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all corrective actions within the organization.</p>
                    <h3>2. Corrective Action Process</h3>
                    <p>2.1 Review the nonconformity</p>
                    <p>2.2 Determine causes of nonconformity</p>
                    <p>2.3 Evaluate need for action</p>
                    <p>2.4 Implement action needed</p>
                    <p>2.5 Review effectiveness of corrective action</p>
                    <p>2.6 Update risks and opportunities</p>
                    <h3>3. Documentation</h3>
                    <p>Evidence of corrective actions shall be retained as documented information.</p>`,
                    settings: {
                        id: 'SOP-004',
                        title: 'Corrective Action',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for taking corrective action to eliminate the causes of nonconformities.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Corrective Action',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Corrective Action',
                        isoScope: 'ISO 9001:2015 10.2',
                        isoCritical: true,
                        processScope: 'Corrective Action Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Corrective Action', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Training and Competence",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Training and Competence</h2>
                    <p><strong>Purpose:</strong> To ensure personnel competency affecting quality performance.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all personnel whose work affects QMS performance.</p>
                    <h3>2. Competence Requirements</h3>
                    <p>2.1 Education</p>
                    <p>2.2 Training</p>
                    <p>2.3 Skills</p>
                    <p>2.4 Experience</p>
                    <h3>3. Training Process</h3>
                    <p>3.1 Identify training needs</p>
                    <p>3.2 Provide training</p>
                    <p>3.3 Evaluate training effectiveness</p>
                    <p>3.4 Maintain competence records</p>`,
                    settings: {
                        id: 'SOP-005',
                        title: 'Training and Competence',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for ensuring personnel competency affecting quality performance.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Training and Competence',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Training and Competence',
                        isoScope: 'ISO 9001:2015 7.2',
                        isoCritical: true,
                        processScope: 'Training Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Training', 'Competence', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Risk Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Risk Management</h2>
                    <p><strong>Purpose:</strong> To identify, assess, and manage risks that could affect quality objectives.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all risk management activities within the organization.</p>
                    <h3>2. Risk Identification</h3>
                    <p>• Systematic identification of risks</p>
                    <p>• Consideration of internal and external factors</p>
                    <p>• Review of historical data and lessons learned</p>
                    <h3>3. Risk Assessment</h3>
                    <p>3.1 Determine likelihood of occurrence</p>
                    <p>3.2 Assess potential impact</p>
                    <p>3.3 Calculate risk rating</p>
                    <h3>4. Risk Treatment</h3>
                    <p>4.1 Risk avoidance</p>
                    <p>4.2 Risk mitigation</p>
                    <p>4.3 Risk transfer</p>
                    <p>4.4 Risk acceptance</p>
                    <h3>5. Monitoring and Review</h3>
                    <p>Risk register shall be reviewed quarterly and updated as needed.</p>`,
                    settings: {
                        id: 'SOP-006',
                        title: 'Risk Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for identifying, assessing, and managing risks that could affect quality objectives.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Risk Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Risk Management',
                        isoScope: 'ISO 9001:2015 6.1',
                        isoCritical: true,
                        processScope: 'Risk Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Risk Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Supplier Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Supplier Management</h2>
                    <p><strong>Purpose:</strong> To ensure external providers deliver products and services that meet requirements.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all suppliers of products and services affecting quality.</p>
                    <h3>2. Supplier Selection</h3>
                    <p>2.1 Define supplier requirements</p>
                    <p>2.2 Evaluate potential suppliers</p>
                    <p>2.3 Conduct supplier audits if required</p>
                    <p>2.4 Approve qualified suppliers</p>
                    <h3>3. Supplier Evaluation</h3>
                    <p>Suppliers shall be evaluated based on:</p>
                    <p>• Quality performance</p>
                    <p>• Delivery performance</p>
                    <p>• Service level</p>
                    <p>• Cost competitiveness</p>
                    <h3>4. Supplier Monitoring</h3>
                    <p>4.1 Regular performance reviews</p>
                    <p>4.2 Supplier scorecards</p>
                    <p>4.3 Corrective action when needed</p>`,
                    settings: {
                        id: 'SOP-007',
                        title: 'Supplier Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for ensuring external providers deliver products and services that meet requirements.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Supplier Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Supplier Management',
                        isoScope: 'ISO 9001:2015 8.4',
                        isoCritical: true,
                        processScope: 'Supplier Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Supplier Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Customer Satisfaction",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Customer Satisfaction</h2>
                    <p><strong>Purpose:</strong> To monitor and measure customer satisfaction and enhance customer experience.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure covers all customer satisfaction monitoring activities.</p>
                    <h3>2. Customer Feedback Collection</h3>
                    <p>2.1 Customer surveys</p>
                    <p>2.2 Customer interviews</p>
                    <p>2.3 Complaint analysis</p>
                    <p>2.4 Market research</p>
                    <h3>3. Data Analysis</h3>
                    <p>3.1 Satisfaction metrics calculation</p>
                    <p>3.2 Trend analysis</p>
                    <p>3.3 Root cause analysis of dissatisfaction</p>
                    <h3>4. Improvement Actions</h3>
                    <p>4.1 Develop improvement plans</p>
                    <p>4.2 Implement corrective actions</p>
                    <p>4.3 Monitor effectiveness</p>
                    <h3>5. Reporting</h3>
                    <p>Customer satisfaction results shall be reported to management quarterly.</p>`,
                    settings: {
                        id: 'SOP-008',
                        title: 'Customer Satisfaction',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for monitoring and measuring customer satisfaction and enhancing customer experience.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Customer Satisfaction',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Customer Satisfaction',
                        isoScope: 'ISO 9001:2015 9.1.2',
                        isoCritical: true,
                        processScope: 'Customer Satisfaction Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Customer Satisfaction', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Change Control",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Change Control</h2>
                    <p><strong>Purpose:</strong> To ensure changes to processes, products, or systems are properly controlled.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all changes that could affect quality, safety, or compliance.</p>
                    <h3>2. Change Request Process</h3>
                    <p>2.1 Submit change request</p>
                    <p>2.2 Assess impact and risks</p>
                    <p>2.3 Obtain necessary approvals</p>
                    <p>2.4 Plan implementation</p>
                    <h3>3. Change Implementation</h3>
                    <p>3.1 Execute change according to plan</p>
                    <p>3.2 Update documentation</p>
                    <p>3.3 Communicate changes</p>
                    <p>3.4 Provide training if needed</p>
                    <h3>4. Change Verification</h3>
                    <p>4.1 Verify implementation</p>
                    <p>4.2 Monitor effectiveness</p>
                    <p>4.3 Document lessons learned</p>`,
                    settings: {
                        id: 'SOP-009',
                        title: 'Change Control',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for ensuring changes to processes, products, or systems are properly controlled.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Change Control',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Change Control',
                        isoScope: 'ISO 9001:2015 8.5.6',
                        isoCritical: true,
                        processScope: 'Change Control Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Change Control', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Calibration Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Calibration Management</h2>
                    <p><strong>Purpose:</strong> To ensure measuring equipment provides accurate and reliable results.</p>
                    
                    <h3>1. Calibration Planning</h3>
                    <p>1.1 Calibration schedules</p>
                    <p>1.2 Resource allocation</p>
                    <p>1.3 Calibration requirements</p>
                    
                    <h3>2. Calibration Process</h3>
                    <p>2.1 Equipment calibration</p>
                    <p>2.2 Calibration verification</p>
                    <p>2.3 Calibration records</p>
                    
                    <h3>3. Out-of-Tolerance Equipment</h3>
                    <p>Equipment found out of tolerance shall be investigated and corrective action taken.</p>`,
                    settings: {
                        id: 'SOP-010',
                        title: 'Calibration Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for ensuring measuring equipment provides accurate and reliable results.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Calibration Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Calibration Management',
                        isoScope: 'ISO 9001:2015 7.1.5',
                        isoCritical: true,
                        processScope: 'Calibration Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Calibration Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Preventive Action",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Preventive Action</h2>
                    <p><strong>Purpose:</strong> To eliminate causes of potential nonconformities to prevent occurrence.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all preventive actions within the organization.</p>
                    <h3>2. Identification of Potential Issues</h3>
                    <p>2.1 Data analysis and trending</p>
                    <p>2.2 Risk assessments</p>
                    <p>2.3 Customer feedback analysis</p>
                    <p>2.4 Lessons learned from other organizations</p>
                    <h3>3. Preventive Action Process</h3>
                    <p>3.1 Determine potential causes</p>
                    <p>3.2 Evaluate need for action</p>
                    <p>3.3 Implement preventive action</p>
                    <p>3.4 Verify effectiveness</p>
                    <h3>4. Documentation</h3>
                    <p>All preventive actions shall be documented and records maintained.</p>`,
                    settings: {
                        id: 'SOP-011',
                        title: 'Preventive Action',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for eliminating causes of potential nonconformities to prevent occurrence.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Preventive Action',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Preventive Action',
                        isoScope: 'ISO 9001:2015 6.1',
                        isoCritical: true,
                        processScope: 'Preventive Action Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Preventive Action', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Production Control",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Production Control</h2>
                    <p><strong>Purpose:</strong> To establish procedures for controlling production operations.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This procedure applies to all production activities within the facility.</p>
                    
                    <h3>2. Production Planning</h3>
                    <p>2.1 Review customer orders</p>
                    <p>2.2 Schedule production runs</p>
                    <p>2.3 Allocate resources</p>
                    <p>2.4 Plan material requirements</p>
                    
                    <h3>3. Production Execution</h3>
                    <p>3.1 Setup verification</p>
                    <p>3.2 Production monitoring</p>
                    <p>3.3 Quality checks</p>
                    <p>3.4 Production reporting</p>
                    
                    <h3>4. Production Records</h3>
                    <p>4.1 Batch records</p>
                    <p>4.2 Production logs</p>
                    <p>4.3 Quality data</p>`,
                    settings: {
                        id: 'SOP-012',
                        title: 'Production Control',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for controlling production operations.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Production Control',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Production Control',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Production Control Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Production Control', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Emergency Response",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Emergency Response</h2>
                    <p><strong>Purpose:</strong> To establish procedures for responding to emergencies.</p>
                    
                    <h3>1. Emergency Types</h3>
                    <p>• Fire emergencies</p>
                    <p>• Chemical spills</p>
                    <p>• Medical emergencies</p>
                    <p>• Natural disasters</p>
                    
                    <h3>2. Response Teams</h3>
                    <p>2.1 Emergency coordinator</p>
                    <p>2.2 First responders</p>
                    <p>2.3 Medical team</p>
                    <p>2.4 Evacuation team</p>
                    
                    <h3>3. Emergency Procedures</h3>
                    <p>3.1 Immediate actions</p>
                    <p>3.2 Communication protocol</p>
                    <p>3.3 Evacuation procedures</p>
                    <p>3.4 External agency coordination</p>`,
                    settings: {
                        id: 'SOP-013',
                        title: 'Emergency Response',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for responding to emergencies.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Emergency Response',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Emergency Response',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Emergency Response Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Emergency Response', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Inventory Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Inventory Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for managing inventory effectively.</p>
                    
                    <h3>1. Inventory Control</h3>
                    <p>1.1 Stock counting procedures</p>
                    <p>1.2 Reorder points</p>
                    <p>1.3 Safety stock levels</p>
                    
                    <h3>2. Storage Requirements</h3>
                    <p>2.1 Storage conditions</p>
                    <p>2.2 Location management</p>
                    <p>2.3 Special handling</p>
                    
                    <h3>3. Inventory Transactions</h3>
                    <p>3.1 Receiving process</p>
                    <p>3.2 Issue process</p>
                    <p>3.3 Returns handling</p>`,
                    settings: {
                        id: 'SOP-014',
                        title: 'Inventory Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for managing inventory effectively.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Inventory Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Inventory Management',
                        isoScope: 'ISO 9001:2015 7.5.3',
                        isoCritical: true,
                        processScope: 'Inventory Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Inventory Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Laboratory Testing",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Laboratory Testing</h2>
                    <p><strong>Purpose:</strong> To establish procedures for conducting laboratory tests.</p>
                    
                    <h3>1. Sample Management</h3>
                    <p>1.1 Sample receipt</p>
                    <p>1.2 Sample identification</p>
                    <p>1.3 Sample storage</p>
                    
                    <h3>2. Testing Procedures</h3>
                    <p>2.1 Test method selection</p>
                    <p>2.2 Equipment calibration</p>
                    <p>2.3 Test execution</p>
                    
                    <h3>3. Results Management</h3>
                    <p>3.1 Data recording</p>
                    <p>3.2 Result verification</p>
                    <p>3.3 Report generation</p>`,
                    settings: {
                        id: 'SOP-015',
                        title: 'Laboratory Testing',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for conducting laboratory tests.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Laboratory Testing',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Laboratory Testing',
                        isoScope: 'ISO 9001:2015 7.1.5',
                        isoCritical: true,
                        processScope: 'Laboratory Testing Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Laboratory Testing', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Equipment Maintenance",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Equipment Maintenance</h2>
                    <p><strong>Purpose:</strong> To establish procedures for maintaining equipment.</p>
                    
                    <h3>1. Maintenance Planning</h3>
                    <p>1.1 Maintenance schedules</p>
                    <p>1.2 Resource allocation</p>
                    <p>1.3 Spare parts management</p>
                    
                    <h3>2. Maintenance Types</h3>
                    <p>2.1 Preventive maintenance</p>
                    <p>2.2 Corrective maintenance</p>
                    <p>2.3 Predictive maintenance</p>
                    
                    <h3>3. Documentation</h3>
                    <p>3.1 Maintenance records</p>
                    <p>3.2 Equipment history</p>
                    <p>3.3 Performance monitoring</p>`,
                    settings: {
                        id: 'SOP-016',
                        title: 'Equipment Maintenance',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for maintaining equipment.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Equipment Maintenance',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Equipment Maintenance',
                        isoScope: 'ISO 9001:2015 7.5.3',
                        isoCritical: true,
                        processScope: 'Equipment Maintenance Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Equipment Maintenance', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Information Security",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Information Security</h2>
                    <p><strong>Purpose:</strong> To establish procedures for protecting information assets.</p>
                    
                    <h3>1. Access Control</h3>
                    <p>1.1 User authentication</p>
                    <p>1.2 Authorization levels</p>
                    <p>1.3 Password management</p>
                    
                    <h3>2. Data Protection</h3>
                    <p>2.1 Data classification</p>
                    <p>2.2 Data encryption</p>
                    <p>2.3 Backup procedures</p>
                    
                    <h3>3. Security Monitoring</h3>
                    <p>3.1 System monitoring</p>
                    <p>3.2 Incident response</p>
                    <p>3.3 Security audits</p>`,
                    settings: {
                        id: 'SOP-017',
                        title: 'Information Security',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for protecting information assets.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Information Security',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Information Security',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Information Security Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Information Security', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Customer Service",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Customer Service</h2>
                    <p><strong>Purpose:</strong> To establish procedures for providing customer service.</p>
                    
                    <h3>1. Customer Interaction</h3>
                    <p>1.1 Communication standards</p>
                    <p>1.2 Response times</p>
                    <p>1.3 Service levels</p>
                    
                    <h3>2. Complaint Handling</h3>
                    <p>2.1 Complaint receipt</p>
                    <p>2.2 Investigation process</p>
                    <p>2.3 Resolution procedures</p>
                    
                    <h3>3. Service Records</h3>
                    <p>3.1 Interaction logging</p>
                    <p>3.2 Follow-up actions</p>
                    <p>3.3 Customer feedback</p>`,
                    settings: {
                        id: 'SOP-018',
                        title: 'Customer Service',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for providing customer service.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Customer Service',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Customer Service',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Customer Service Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Customer Service', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Procurement Process",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Procurement Process</h2>
                    <p><strong>Purpose:</strong> To establish procedures for procurement activities.</p>
                    
                    <h3>1. Purchase Requirements</h3>
                    <p>1.1 Need identification</p>
                    <p>1.2 Specification development</p>
                    <p>1.3 Budget verification</p>
                    
                    <h3>2. Supplier Selection</h3>
                    <p>2.1 Supplier evaluation</p>
                    <p>2.2 Quote comparison</p>
                    <p>2.3 Supplier approval</p>
                    
                    <h3>3. Purchase Process</h3>
                    <p>3.1 Purchase order creation</p>
                    <p>3.2 Order tracking</p>
                    <p>3.3 Receipt verification</p>`,
                    settings: {
                        id: 'SOP-019',
                        title: 'Procurement Process',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for procurement activities.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Procurement Process',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Procurement Process',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Procurement Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Procurement Process', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Document Control",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Document Control</h2>
                    <p><strong>Purpose:</strong> To establish procedures for controlling documents.</p>
                    
                    <h3>1. Document Creation</h3>
                    <p>1.1 Document templates</p>
                    <p>1.2 Content requirements</p>
                    <p>1.3 Review process</p>
                    
                    <h3>2. Document Management</h3>
                    <p>2.1 Version control</p>
                    <p>2.2 Distribution control</p>
                    <p>2.3 Document access</p>
                    
                    <h3>3. Document Revision</h3>
                    <p>3.1 Change control</p>
                    <p>3.2 Approval process</p>
                    <p>3.3 Implementation</p>`,
                    settings: {
                        id: 'SOP-020',
                        title: 'Document Control',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for controlling documents.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Document Control',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Document Control',
                        isoScope: 'ISO 9001:2015 7.5',
                        isoCritical: true,
                        processScope: 'Document Control Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Document Control', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Training Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Training Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for managing training activities.</p>
                    
                    <h3>1. Training Needs</h3>
                    <p>1.1 Needs assessment</p>
                    <p>1.2 Training plans</p>
                    <p>1.3 Resource allocation</p>
                    
                    <h3>2. Training Delivery</h3>
                    <p>2.1 Training methods</p>
                    <p>2.2 Training materials</p>
                    <p>2.3 Training execution</p>
                    
                    <h3>3. Training Evaluation</h3>
                    <p>3.1 Assessment methods</p>
                    <p>3.2 Effectiveness evaluation</p>
                    <p>3.3 Records maintenance</p>`,
                    settings: {
                        id: 'SOP-021',
                        title: 'Training Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for managing training activities.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Training Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Training Management',
                        isoScope: 'ISO 9001:2015 7.2',
                        isoCritical: true,
                        processScope: 'Training Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Training Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Environmental Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Environmental Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for environmental management.</p>
                    
                    <h3>1. Environmental Aspects</h3>
                    <p>1.1 Aspect identification</p>
                    <p>1.2 Impact assessment</p>
                    <p>1.3 Control measures</p>
                    
                    <h3>2. Waste Management</h3>
                    <p>2.1 Waste segregation</p>
                    <p>2.2 Waste disposal</p>
                    <p>2.3 Recycling program</p>
                    
                    <h3>3. Environmental Monitoring</h3>
                    <p>3.1 Monitoring parameters</p>
                    <p>3.2 Data collection</p>
                    <p>3.3 Reporting requirements</p>`,
                    settings: {
                        id: 'SOP-022',
                        title: 'Environmental Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for environmental management.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Environmental Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Environmental Management',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Environmental Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Environmental Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Project Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Project Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for managing projects.</p>
                    
                    <h3>1. Project Planning</h3>
                    <p>1.1 Scope definition</p>
                    <p>1.2 Schedule development</p>
                    <p>1.3 Resource planning</p>
                    
                    <h3>2. Project Execution</h3>
                    <p>2.1 Task management</p>
                    <p>2.2 Progress monitoring</p>
                    <p>2.3 Risk management</p>
                    
                    <h3>3. Project Control</h3>
                    <p>3.1 Change management</p>
                    <p>3.2 Performance reporting</p>
                    <p>3.3 Project closure</p>`,
                    settings: {
                        id: 'SOP-023',
                        title: 'Project Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for managing projects.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Project Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Project Management',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Project Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Project Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Sales Process",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Sales Process</h2>
                    <p><strong>Purpose:</strong> To establish procedures for sales activities.</p>
                    
                    <h3>1. Lead Management</h3>
                    <p>1.1 Lead generation</p>
                    <p>1.2 Lead qualification</p>
                    <p>1.3 Lead tracking</p>
                    
                    <h3>2. Sales Activities</h3>
                    <p>2.1 Customer contact</p>
                    <p>2.2 Proposal development</p>
                    <p>2.3 Negotiation process</p>
                    
                    <h3>3. Order Processing</h3>
                    <p>3.1 Order entry</p>
                    <p>3.2 Order confirmation</p>
                    <p>3.3 Order fulfillment</p>`,
                    settings: {
                        id: 'SOP-024',
                        title: 'Sales Process',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for sales activities.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Sales Process',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Sales Process',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Sales Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Sales Process', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Quality Control",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Quality Control</h2>
                    <p><strong>Purpose:</strong> To establish procedures for quality control activities.</p>
                    
                    <h3>1. Inspection Planning</h3>
                    <p>1.1 Inspection points</p>
                    <p>1.2 Acceptance criteria</p>
                    <p>1.3 Sampling plans</p>
                    
                    <h3>2. Inspection Process</h3>
                    <p>2.1 Visual inspection</p>
                    <p>2.2 Measurement methods</p>
                    <p>2.3 Testing procedures</p>
                    
                    <h3>3. Quality Records</h3>
                    <p>3.1 Inspection results</p>
                    <p>3.2 Non-conformance reports</p>
                    <p>3.3 Corrective actions</p>`,
                    settings: {
                        id: 'SOP-025',
                        title: 'Quality Control',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for quality control activities.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Quality Control',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Quality Control',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Quality Control Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Quality Control', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Asset Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Asset Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for managing company assets.</p>
                    
                    <h3>1. Asset Registration</h3>
                    <p>1.1 Asset identification</p>
                    <p>1.2 Asset classification</p>
                    <p>1.3 Asset tagging</p>
                    
                    <h3>2. Asset Tracking</h3>
                    <p>2.1 Location tracking</p>
                    <p>2.2 Movement control</p>
                    <p>2.3 Utilization monitoring</p>
                    
                    <h3>3. Asset Maintenance</h3>
                    <p>3.1 Maintenance scheduling</p>
                    <p>3.2 Repair procedures</p>
                    <p>3.3 Disposal process</p>`,
                    settings: {
                        id: 'SOP-026',
                        title: 'Asset Management',
                        documentType: 'SOP',
                        contentType: 'Document',
                        description: 'Procedure for managing company assets.',
                        createdBy: 'Quality Department',
                        author: 'Quality Department',
                        approver: 'Quality Manager',
                        department: 'Quality',
                        region: 'Global',
                        system: 'Quality Management System',
                        workStream: 'Asset Management',
                        status: 'draft',
                        approvalStatus: 'pending',
                        classification: 'internal',
                        sensitivity: 'internal',
                        topic: 'Asset Management',
                        isoScope: 'ISO 9001:2015 8.2.3',
                        isoCritical: true,
                        processScope: 'Asset Management Process',
                        language: 'en',
                        revision: 'A',
                        tags: ['Asset Management', 'QMS', 'SOP']
                    }
                },
                {
                    name: "SOP: Network Security",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Network Security</h2>
                    <p><strong>Purpose:</strong> To establish procedures for maintaining network security.</p>
                    
                    <h3>1. Access Control</h3>
                    <ul>
                        <li>Network authentication</li>
                        <li>Access levels</li>
                        <li>Password policies</li>
                    </ul>
                    
                    <h3>2. Network Monitoring</h3>
                    <ul>
                        <li>Traffic monitoring</li>
                        <li>Intrusion detection</li>
                        <li>Performance analysis</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-027',
                        title: 'Network Security',
                        documentType: 'SOP',
                        department: 'IT'
                    }
                },
                {
                    name: "SOP: Financial Controls",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Financial Controls</h2>
                    <p><strong>Purpose:</strong> To establish procedures for financial control and oversight.</p>
                    
                    <h3>1. Transaction Controls</h3>
                    <ul>
                        <li>Authorization levels</li>
                        <li>Documentation requirements</li>
                        <li>Verification procedures</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-028',
                        title: 'Financial Controls',
                        documentType: 'SOP',
                        department: 'Finance'
                    }
                },
                {
                    name: "SOP: Human Resources",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Human Resources Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for HR operations.</p>
                    
                    <h3>1. Recruitment Process</h3>
                    <ul>
                        <li>Job posting</li>
                        <li>Candidate selection</li>
                        <li>Interview process</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-029',
                        title: 'Human Resources Management',
                        documentType: 'SOP',
                        department: 'HR'
                    }
                },
                {
                    name: "SOP: Marketing Operations",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Marketing Operations</h2>
                    <p><strong>Purpose:</strong> To establish procedures for marketing activities.</p>
                    
                    <h3>1. Campaign Management</h3>
                    <ul>
                        <li>Planning</li>
                        <li>Execution</li>
                        <li>Analysis</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-030',
                        title: 'Marketing Operations',
                        documentType: 'SOP',
                        department: 'Marketing'
                    }
                },
                {
                    name: "SOP: Facility Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Facility Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for facility operations.</p>
                    
                    <h3>1. Maintenance Schedule</h3>
                    <ul>
                        <li>Daily tasks</li>
                        <li>Weekly inspections</li>
                        <li>Monthly reviews</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-031',
                        title: 'Facility Management',
                        documentType: 'SOP',
                        department: 'Facilities'
                    }
                },
                {
                    name: "SOP: Customer Support",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Customer Support</h2>
                    <p><strong>Purpose:</strong> To establish procedures for customer support operations.</p>
                    
                    <h3>1. Support Levels</h3>
                    <ul>
                        <li>Level 1 Support</li>
                        <li>Level 2 Support</li>
                        <li>Escalation procedures</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-032',
                        title: 'Customer Support',
                        documentType: 'SOP',
                        department: 'Customer Service'
                    }
                },
                {
                    name: "SOP: Legal Compliance",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Legal Compliance</h2>
                    <p><strong>Purpose:</strong> To establish procedures for maintaining legal compliance.</p>
                    
                    <h3>1. Compliance Review</h3>
                    <ul>
                        <li>Regular audits</li>
                        <li>Documentation review</li>
                        <li>Reporting requirements</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-033',
                        title: 'Legal Compliance',
                        documentType: 'SOP',
                        department: 'Legal'
                    }
                },
                {
                    name: "SOP: Research and Development",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Research and Development</h2>
                    <p><strong>Purpose:</strong> To establish procedures for R&D activities.</p>
                    
                    <h3>1. Research Process</h3>
                    <ul>
                        <li>Project planning</li>
                        <li>Experimentation</li>
                        <li>Documentation</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-034',
                        title: 'Research and Development',
                        documentType: 'SOP',
                        department: 'R&D'
                    }
                },
                {
                    name: "SOP: Supply Chain Management",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Supply Chain Management</h2>
                    <p><strong>Purpose:</strong> To establish procedures for supply chain operations.</p>
                    
                    <h3>1. Supply Chain Process</h3>
                    <ul>
                        <li>Procurement</li>
                        <li>Logistics</li>
                        <li>Inventory management</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-035',
                        title: 'Supply Chain Management',
                        documentType: 'SOP',
                        department: 'Supply Chain'
                    }
                },
                {
                    name: "SOP: Product Development",
                    content: `<h1>Standard Operating Procedure</h1>
                    <h2>Product Development</h2>
                    <p><strong>Purpose:</strong> To establish procedures for product development.</p>
                    
                    <h3>1. Development Process</h3>
                    <ul>
                        <li>Concept development</li>
                        <li>Design phase</li>
                        <li>Testing procedures</li>
                    </ul>`,
                    settings: {
                        id: 'SOP-036',
                        title: 'Product Development',
                        documentType: 'SOP',
                        department: 'Product'
                    }
                }
            ],
            workInstructions: [
                {
                    name: "WI: Equipment Calibration",
                    content: `<h1>Work Instruction</h1>
                    <h2>Equipment Calibration</h2>
                    <p><strong>Purpose:</strong> To ensure proper calibration of measurement equipment.</p>
                    
                    <h3>Required Equipment</h3>
                    <ul>
                        <li>Calibration standards</li>
                        <li>Calibration tools</li>
                        <li>PPE</li>
                    </ul>
                    
                    <h3>Procedure</h3>
                    <ol>
                        <li>Verify equipment identification</li>
                        <li>Check calibration due date</li>
                        <li>Prepare calibration area</li>
                        <li>Perform calibration checks</li>
                        <li>Record results</li>
                        <li>Apply new calibration label</li>
                    </ol>

                    <h3>Documentation</h3>
                    <p>Complete calibration record form</p>`,
                    settings: {
                        id: 'WI-001',
                        title: 'Equipment Calibration',
                        documentType: 'WI',
                        contentType: 'Document',
                        description: 'Step-by-step instructions for calibrating measurement equipment',
                        department: 'Quality'
                    }
                },
                {
                    name: "WI: Quality Inspection",
                    content: `<h1>Work Instruction</h1>
                    <h2>Quality Inspection Process</h2>
                    <p><strong>Purpose:</strong> To conduct quality inspections of products.</p>
                    
                    <h3>Equipment Required</h3>
                    <ul>
                        <li>Inspection checklist</li>
                        <li>Measuring tools</li>
                        <li>Sample collection materials</li>
                    </ul>
                    
                    <h3>Inspection Steps</h3>
                    <ol>
                        <li>Verify product specifications</li>
                        <li>Conduct visual inspection</li>
                        <li>Perform measurements</li>
                        <li>Document findings</li>
                        <li>Tag product status</li>
                    </ol>`,
                    settings: {
                        id: 'WI-002',
                        title: 'Quality Inspection Process',
                        documentType: 'WI',
                        description: 'Detailed steps for conducting quality inspections'
                    }
                },
                {
                    name: "WI: Material Handling",
                    content: `<h1>Work Instruction</h1>
                    <h2>Material Handling</h2>
                    <p><strong>Purpose:</strong> Safe handling of materials in the facility.</p>
                    
                    <h3>Safety Equipment</h3>
                    <ul>
                        <li>Safety shoes</li>
                        <li>Work gloves</li>
                        <li>High-visibility vest</li>
                    </ul>
                    
                    <h3>Procedure</h3>
                    <ol>
                        <li>Assess load weight</li>
                        <li>Select appropriate equipment</li>
                        <li>Check path clearance</li>
                        <li>Execute lift safely</li>
                        <li>Transport material</li>
                        <li>Set down properly</li>
                    </ol>`,
                    settings: {
                        id: 'WI-003',
                        title: 'Material Handling',
                        documentType: 'WI',
                        description: 'Guidelines for safe material handling'
                    }
                },
                {
                    name: "WI: Machine Setup",
                    content: `<h1>Work Instruction</h1>
                    <h2>Machine Setup</h2>
                    <p><strong>Purpose:</strong> Proper setup of production equipment.</p>
                    
                    <h3>Pre-Setup Checks</h3>
                    <ul>
                        <li>Power requirements</li>
                        <li>Safety systems</li>
                        <li>Tool condition</li>
                    </ul>
                    
                    <h3>Setup Steps</h3>
                    <ol>
                        <li>Power down equipment</li>
                        <li>Clean work area</li>
                        <li>Install tooling</li>
                        <li>Set parameters</li>
                        <li>Test operation</li>
                    </ol>`,
                    settings: {
                        id: 'WI-004',
                        title: 'Machine Setup',
                        documentType: 'WI',
                        description: 'Instructions for machine setup and preparation'
                    }
                },
                {
                    name: "WI: Product Packaging",
                    content: `<h1>Work Instruction</h1>
                    <h2>Product Packaging</h2>
                    <p><strong>Purpose:</strong> Proper packaging of finished products.</p>
                    
                    <h3>Materials Needed</h3>
                    <ul>
                        <li>Packaging materials</li>
                        <li>Labels</li>
                        <li>Tape/sealing equipment</li>
                    </ul>
                    
                    <h3>Packaging Steps</h3>
                    <ol>
                        <li>Verify product cleanliness</li>
                        <li>Apply protective wrapping</li>
                        <li>Place in container</li>
                        <li>Add cushioning</li>
                        <li>Seal package</li>
                        <li>Apply labels</li>
                    </ol>`,
                    settings: {
                        id: 'WI-005',
                        title: 'Product Packaging',
                        documentType: 'WI',
                        description: 'Steps for product packaging and labeling'
                    }
                },
                {
                    name: "WI: Sample Testing",
                    content: `<h1>Work Instruction</h1>
                    <h2>Sample Testing</h2>
                    <p><strong>Purpose:</strong> Testing product samples for quality assurance.</p>
                    
                    <h3>Testing Equipment</h3>
                    <ul>
                        <li>Test instruments</li>
                        <li>Sample containers</li>
                        <li>Recording forms</li>
                    </ul>
                    
                    <h3>Test Procedure</h3>
                    <ol>
                        <li>Collect samples</li>
                        <li>Prepare test equipment</li>
                        <li>Run tests</li>
                        <li>Record results</li>
                        <li>Clean equipment</li>
                    </ol>`,
                    settings: {
                        id: 'WI-006',
                        title: 'Sample Testing',
                        documentType: 'WI',
                        description: 'Instructions for conducting product sample tests'
                    }
                },
                {
                    name: "WI: Tool Maintenance",
                    content: `<h1>Work Instruction</h1>
                    <h2>Tool Maintenance</h2>
                    <p><strong>Purpose:</strong> Maintaining tools and equipment.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Cleaning supplies</li>
                        <li>Lubricants</li>
                        <li>Replacement parts</li>
                    </ul>
                    
                    <h3>Maintenance Steps</h3>
                    <ol>
                        <li>Inspect tool condition</li>
                        <li>Clean thoroughly</li>
                        <li>Lubricate moving parts</li>
                        <li>Replace worn components</li>
                        <li>Test operation</li>
                        <li>Document maintenance</li>
                    </ol>`,
                    settings: {
                        id: 'WI-007',
                        title: 'Tool Maintenance',
                        documentType: 'WI',
                        description: 'Guidelines for tool maintenance and care'
                    }
                },
                {
                    name: "WI: Safety Equipment Check",
                    content: `<h1>Work Instruction</h1>
                    <h2>Safety Equipment Check</h2>
                    <p><strong>Purpose:</strong> Inspection of safety equipment.</p>
                    
                    <h3>Equipment List</h3>
                    <ul>
                        <li>Fire extinguishers</li>
                        <li>Emergency lights</li>
                        <li>First aid kits</li>
                        <li>Eye wash stations</li>
                    </ul>
                    
                    <h3>Inspection Steps</h3>
                    <ol>
                        <li>Check expiration dates</li>
                        <li>Test functionality</li>
                        <li>Verify accessibility</li>
                        <li>Replace/repair as needed</li>
                        <li>Update inspection tags</li>
                    </ol>`,
                    settings: {
                        id: 'WI-008',
                        title: 'Safety Equipment Check',
                        documentType: 'WI',
                        description: 'Procedure for inspecting safety equipment'
                    }
                },
                {
                    name: "WI: Data Recording",
                    content: `<h1>Work Instruction</h1>
                    <h2>Data Recording</h2>
                    <p><strong>Purpose:</strong> Proper recording of production data.</p>
                    
                    <h3>Required Materials</h3>
                    <ul>
                        <li>Data forms</li>
                        <li>Measuring equipment</li>
                        <li>Reference documents</li>
                    </ul>
                    
                    <h3>Recording Steps</h3>
                    <ol>
                        <li>Verify measurement accuracy</li>
                        <li>Record readings</li>
                        <li>Calculate results</li>
                        <li>Check for errors</li>
                        <li>File documentation</li>
                    </ol>`,
                    settings: {
                        id: 'WI-009',
                        title: 'Data Recording',
                        documentType: 'WI',
                        description: 'Instructions for recording and managing data'
                    }
                },
                {
                    name: "WI: Inventory Count",
                    content: `<h1>Work Instruction</h1>
                    <h2>Inventory Count</h2>
                    <p><strong>Purpose:</strong> Conducting physical inventory counts.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Count sheets</li>
                        <li>Scanner/counter</li>
                        <li>Labels</li>
                    </ul>
                    
                    <h3>Count Procedure</h3>
                    <ol>
                        <li>Prepare count area</li>
                        <li>Verify item numbers</li>
                        <li>Count items</li>
                        <li>Record quantities</li>
                        <li>Verify counts</li>
                        <li>Report discrepancies</li>
                    </ol>`,
                    settings: {
                        id: 'WI-010',
                        title: 'Inventory Count',
                        documentType: 'WI',
                        description: 'Steps for conducting inventory counts'
                    }
                },
                {
                    name: "WI: Document Control",
                    content: `<h1>Work Instruction</h1>
                    <h2>Document Control</h2>
                    <p><strong>Purpose:</strong> Managing controlled documents.</p>
                    
                    <h3>Required Materials</h3>
                    <ul>
                        <li>Document log</li>
                        <li>Control stamps</li>
                        <li>Filing system</li>
                    </ul>
                    
                    <h3>Control Steps</h3>
                    <ol>
                        <li>Receive document</li>
                        <li>Assign control number</li>
                        <li>Apply control stamps</li>
                        <li>Record in log</li>
                        <li>File properly</li>
                        <li>Track distribution</li>
                    </ol>`,
                    settings: {
                        id: 'WI-011',
                        title: 'Document Control',
                        documentType: 'WI',
                        description: 'Instructions for document control process'
                    }
                },
                {
                    name: "WI: Equipment Cleaning",
                    content: `<h1>Work Instruction</h1>
                    <h2>Equipment Cleaning</h2>
                    <p><strong>Purpose:</strong> Proper cleaning of production equipment.</p>
                    
                    <h3>Required Materials</h3>
                    <ul>
                        <li>Cleaning supplies</li>
                        <li>PPE</li>
                        <li>Cleaning checklist</li>
                    </ul>
                    
                    <h3>Cleaning Steps</h3>
                    <ol>
                        <li>Power down equipment</li>
                        <li>Remove debris</li>
                        <li>Apply cleaning agents</li>
                        <li>Scrub surfaces</li>
                        <li>Rinse thoroughly</li>
                        <li>Dry and inspect</li>
                    </ol>`,
                    settings: {
                        id: 'WI-012',
                        title: 'Equipment Cleaning',
                        documentType: 'WI',
                        description: 'Guidelines for equipment cleaning'
                    }
                },
                {
                    name: "WI: Product Assembly",
                    content: `<h1>Work Instruction</h1>
                    <h2>Product Assembly</h2>
                    <p><strong>Purpose:</strong> Assembly of finished products.</p>
                    
                    <h3>Required Tools</h3>
                    <ul>
                        <li>Assembly tools</li>
                        <li>Component parts</li>
                        <li>Assembly drawings</li>
                    </ul>
                    
                    <h3>Assembly Steps</h3>
                    <ol>
                        <li>Verify components</li>
                        <li>Follow assembly sequence</li>
                        <li>Perform quality checks</li>
                        <li>Test functionality</li>
                        <li>Apply final labels</li>
                        <li>Package product</li>
                    </ol>`,
                    settings: {
                        id: 'WI-013',
                        title: 'Product Assembly',
                        documentType: 'WI',
                        description: 'Instructions for product assembly process'
                    }
                },
                {
                    name: "WI: Quality Sampling",
                    content: `<h1>Work Instruction</h1>
                    <h2>Quality Sampling</h2>
                    <p><strong>Purpose:</strong> Collection of quality control samples.</p>
                    
                    <h3>Required Materials</h3>
                    <ul>
                        <li>Sample containers</li>
                        <li>Labels</li>
                        <li>Sampling tools</li>
                    </ul>
                    
                    <h3>Sampling Steps</h3>
                    <ol>
                        <li>Identify sample points</li>
                        <li>Prepare containers</li>
                        <li>Collect samples</li>
                        <li>Label properly</li>
                        <li>Document collection</li>
                        <li>Transport to lab</li>
                    </ol>`,
                    settings: {
                        id: 'WI-014',
                        title: 'Quality Sampling',
                        documentType: 'WI',
                        description: 'Process for quality control sampling'
                    }
                },
                {
                    name: "WI: Waste Management",
                    content: `<h1>Work Instruction</h1>
                    <h2>Waste Management</h2>
                    <p><strong>Purpose:</strong> Proper handling of waste materials.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Waste containers</li>
                        <li>PPE</li>
                        <li>Labels</li>
                    </ul>
                    
                    <h3>Handling Steps</h3>
                    <ol>
                        <li>Identify waste type</li>
                        <li>Select proper container</li>
                        <li>Apply correct label</li>
                        <li>Record quantity</li>
                        <li>Store properly</li>
                        <li>Arrange disposal</li>
                    </ol>`,
                    settings: {
                        id: 'WI-015',
                        title: 'Waste Management',
                        documentType: 'WI',
                        description: 'Instructions for waste handling and disposal'
                    }
                },
                {
                    name: "WI: Software Installation",
                    content: `<h1>Work Instruction</h1>
                    <h2>Software Installation</h2>
                    <p><strong>Purpose:</strong> Steps for installing software applications.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Installation media</li>
                        <li>License keys</li>
                        <li>System requirements</li>
                    </ul>`,
                    settings: {
                        id: 'WI-016',
                        title: 'Software Installation',
                        documentType: 'WI',
                        department: 'IT'
                    }
                },
                {
                    name: "WI: Vehicle Maintenance",
                    content: `<h1>Work Instruction</h1>
                    <h2>Vehicle Maintenance</h2>
                    <p><strong>Purpose:</strong> Steps for maintaining company vehicles.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Maintenance tools</li>
                        <li>Service records</li>
                        <li>Safety equipment</li>
                    </ul>`,
                    settings: {
                        id: 'WI-017',
                        title: 'Vehicle Maintenance',
                        documentType: 'WI',
                        department: 'Fleet'
                    }
                },
                {
                    name: "WI: Laboratory Safety",
                    content: `<h1>Work Instruction</h1>
                    <h2>Laboratory Safety</h2>
                    <p><strong>Purpose:</strong> Safety procedures for laboratory operations.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>PPE</li>
                        <li>Safety equipment</li>
                        <li>Emergency procedures</li>
                    </ul>`,
                    settings: {
                        id: 'WI-018',
                        title: 'Laboratory Safety',
                        documentType: 'WI',
                        department: 'Laboratory'
                    }
                },
                {
                    name: "WI: Network Configuration",
                    content: `<h1>Work Instruction</h1>
                    <h2>Network Configuration</h2>
                    <p><strong>Purpose:</strong> Steps for configuring network equipment.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Network devices</li>
                        <li>Configuration tools</li>
                        <li>Documentation</li>
                    </ul>`,
                    settings: {
                        id: 'WI-019',
                        title: 'Network Configuration',
                        documentType: 'WI',
                        department: 'IT'
                    }
                },
                {
                    name: "WI: Customer Service Protocol",
                    content: `<h1>Work Instruction</h1>
                    <h2>Customer Service Protocol</h2>
                    <p><strong>Purpose:</strong> Steps for handling customer interactions.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Service scripts</li>
                        <li>Contact forms</li>
                        <li>System access</li>
                    </ul>`,
                    settings: {
                        id: 'WI-020',
                        title: 'Customer Service Protocol',
                        documentType: 'WI',
                        department: 'Customer Service'
                    }
                },
                {
                    name: "WI: Shipping Procedures",
                    content: `<h1>Work Instruction</h1>
                    <h2>Shipping Procedures</h2>
                    <p><strong>Purpose:</strong> Steps for processing shipments.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Shipping labels</li>
                        <li>Packaging materials</li>
                        <li>Documentation forms</li>
                    </ul>`,
                    settings: {
                        id: 'WI-021',
                        title: 'Shipping Procedures',
                        documentType: 'WI',
                        department: 'Logistics'
                    }
                },
                {
                    name: "WI: Quality Testing",
                    content: `<h1>Work Instruction</h1>
                    <h2>Quality Testing</h2>
                    <p><strong>Purpose:</strong> Steps for quality control testing.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Test equipment</li>
                        <li>Standards documentation</li>
                        <li>Recording forms</li>
                    </ul>`,
                    settings: {
                        id: 'WI-022',
                        title: 'Quality Testing',
                        documentType: 'WI',
                        department: 'Quality'
                    }
                },
                {
                    name: "WI: Machine Operation",
                    content: `<h1>Work Instruction</h1>
                    <h2>Machine Operation</h2>
                    <p><strong>Purpose:</strong> Steps for operating production machinery.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Operating manual</li>
                        <li>Safety equipment</li>
                        <li>Maintenance tools</li>
                    </ul>`,
                    settings: {
                        id: 'WI-023',
                        title: 'Machine Operation',
                        documentType: 'WI',
                        department: 'Production'
                    }
                },
                {
                    name: "WI: Inventory Management",
                    content: `<h1>Work Instruction</h1>
                    <h2>Inventory Management</h2>
                    <p><strong>Purpose:</strong> Steps for managing inventory.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Inventory system</li>
                        <li>Counting equipment</li>
                        <li>Record forms</li>
                    </ul>`,
                    settings: {
                        id: 'WI-024',
                        title: 'Inventory Management',
                        documentType: 'WI',
                        department: 'Warehouse'
                    }
                },
                {
                    name: "WI: Security Procedures",
                    content: `<h1>Work Instruction</h1>
                    <h2>Security Procedures</h2>
                    <p><strong>Purpose:</strong> Steps for maintaining security.</p>
                    
                    <h3>Required Items</h3>
                    <ul>
                        <li>Security equipment</li>
                        <li>Access cards</li>
                        <li>Log books</li>
                    </ul>`,
                    settings: {
                        id: 'WI-025',
                        title: 'Security Procedures',
                        documentType: 'WI',
                        department: 'Security'
                    }
                }
            ],
            policies: [
                {
                    name: "Policy: Information Security",
                    content: `<h1>Information Security Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for protecting company information assets and systems.</p>
                    
                    <h3>1. Data Classification</h3>
                    <ul>
                        <li>Public Information</li>
                        <li>Internal Use Only</li>
                        <li>Confidential</li>
                        <li>Restricted</li>
                    </ul>
                    
                    <h3>2. Access Control</h3>
                    <p>2.1 User Authentication</p>
                    <p>2.2 Authorization Levels</p>
                    <p>2.3 Password Requirements</p>
                    
                    <h3>3. Data Protection</h3>
                    <p>3.1 Encryption Standards</p>
                    <p>3.2 Data Backup</p>
                    <p>3.3 Data Disposal</p>`,
                    settings: {
                        id: 'POL-001',
                        title: 'Information Security Policy',
                        documentType: 'Policy',
                        department: 'IT'
                    }
                },
                {
                    name: "Policy: Code of Conduct",
                    content: `<h1>Code of Conduct Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish standards for professional behavior and ethical conduct.</p>
                    
                    <h3>1. Professional Behavior</h3>
                    <ul>
                        <li>Respect and Dignity</li>
                        <li>Professional Appearance</li>
                        <li>Workplace Conduct</li>
                    </ul>
                    
                    <h3>2. Ethical Standards</h3>
                    <p>2.1 Conflict of Interest</p>
                    <p>2.2 Confidentiality</p>
                    <p>2.3 Anti-corruption</p>`,
                    settings: {
                        id: 'POL-002',
                        title: 'Code of Conduct Policy',
                        documentType: 'Policy',
                        department: 'HR'
                    }
                },
                {
                    name: "Policy: Health and Safety",
                    content: `<h1>Health and Safety Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure a safe and healthy work environment for all employees.</p>
                    
                    <h3>1. Safety Responsibilities</h3>
                    <ul>
                        <li>Management Responsibilities</li>
                        <li>Employee Responsibilities</li>
                        <li>Safety Committee</li>
                    </ul>
                    
                    <h3>2. Safety Procedures</h3>
                    <p>2.1 Hazard Reporting</p>
                    <p>2.2 Emergency Response</p>
                    <p>2.3 First Aid</p>`,
                    settings: {
                        id: 'POL-003',
                        title: 'Health and Safety Policy',
                        documentType: 'Policy',
                        department: 'HSE'
                    }
                },
                {
                    name: "Policy: Environmental Management",
                    content: `<h1>Environmental Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish commitment to environmental protection and sustainable practices.</p>
                    
                    <h3>1. Environmental Objectives</h3>
                    <ul>
                        <li>Waste Reduction</li>
                        <li>Energy Conservation</li>
                        <li>Pollution Prevention</li>
                    </ul>
                    
                    <h3>2. Implementation</h3>
                    <p>2.1 Environmental Programs</p>
                    <p>2.2 Monitoring and Measurement</p>
                    <p>2.3 Continuous Improvement</p>`,
                    settings: {
                        id: 'POL-004',
                        title: 'Environmental Management Policy',
                        documentType: 'Policy',
                        department: 'HSE'
                    }
                },
                {
                    name: "Policy: Social Media Usage",
                    content: `<h1>Social Media Usage Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To provide guidelines for appropriate use of social media.</p>
                    
                    <h3>1. General Guidelines</h3>
                    <ul>
                        <li>Professional Conduct</li>
                        <li>Confidential Information</li>
                        <li>Brand Representation</li>
                    </ul>
                    
                    <h3>2. Acceptable Use</h3>
                    <p>2.1 Business Purposes</p>
                    <p>2.2 Personal Use</p>
                    <p>2.3 Content Guidelines</p>`,
                    settings: {
                        id: 'POL-005',
                        title: 'Social Media Usage Policy',
                        documentType: 'Policy',
                        department: 'Communications'
                    }
                },
                {
                    name: "Policy: Data Privacy",
                    content: `<h1>Data Privacy Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure protection of personal and sensitive data.</p>
                    
                    <h3>1. Data Collection</h3>
                    <ul>
                        <li>Types of Data</li>
                        <li>Collection Methods</li>
                        <li>Purpose of Collection</li>
                    </ul>
                    
                    <h3>2. Data Protection</h3>
                    <p>2.1 Storage Security</p>
                    <p>2.2 Access Controls</p>
                    <p>2.3 Data Subject Rights</p>`,
                    settings: {
                        id: 'POL-006',
                        title: 'Data Privacy Policy',
                        documentType: 'Policy',
                        department: 'Legal'
                    }
                },
                {
                    name: "Policy: Quality Management",
                    content: `<h1>Quality Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish commitment to quality in all business operations.</p>
                    
                    <h3>1. Quality Objectives</h3>
                    <ul>
                        <li>Customer Satisfaction</li>
                        <li>Process Excellence</li>
                        <li>Continuous Improvement</li>
                    </ul>
                    
                    <h3>2. Implementation</h3>
                    <p>2.1 Quality Standards</p>
                    <p>2.2 Quality Control</p>
                    <p>2.3 Quality Assurance</p>`,
                    settings: {
                        id: 'POL-007',
                        title: 'Quality Management Policy',
                        documentType: 'Policy',
                        department: 'Quality'
                    }
                },
                {
                    name: "Policy: Remote Work",
                    content: `<h1>Remote Work Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for working remotely.</p>
                    
                    <h3>1. Eligibility</h3>
                    <ul>
                        <li>Position Requirements</li>
                        <li>Performance Criteria</li>
                        <li>Technical Requirements</li>
                    </ul>
                    
                    <h3>2. Guidelines</h3>
                    <p>2.1 Work Hours</p>
                    <p>2.2 Communication</p>
                    <p>2.3 Equipment and Security</p>`,
                    settings: {
                        id: 'POL-008',
                        title: 'Remote Work Policy',
                        documentType: 'Policy',
                        department: 'HR'
                    }
                },
                {
                    name: "Policy: Travel and Expense",
                    content: `<h1>Travel and Expense Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for business travel and expense reimbursement.</p>
                    
                    <h3>1. Travel Guidelines</h3>
                    <ul>
                        <li>Travel Authorization</li>
                        <li>Transportation</li>
                        <li>Accommodations</li>
                    </ul>
                    
                    <h3>2. Expense Guidelines</h3>
                    <p>2.1 Allowable Expenses</p>
                    <p>2.2 Documentation Requirements</p>
                    <p>2.3 Reimbursement Process</p>`,
                    settings: {
                        id: 'POL-009',
                        title: 'Travel and Expense Policy',
                        documentType: 'Policy',
                        department: 'Finance'
                    }
                },
                {
                    name: "Policy: Procurement",
                    content: `<h1>Procurement Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for procurement of goods and services.</p>
                    
                    <h3>1. Procurement Process</h3>
                    <ul>
                        <li>Purchase Requisition</li>
                        <li>Vendor Selection</li>
                        <li>Purchase Orders</li>
                    </ul>
                    
                    <h3>2. Guidelines</h3>
                    <p>2.1 Authorization Levels</p>
                    <p>2.2 Competitive Bidding</p>
                    <p>2.3 Vendor Management</p>`,
                    settings: {
                        id: 'POL-010',
                        title: 'Procurement Policy',
                        documentType: 'Policy',
                        department: 'Procurement'
                    }
                },
                {
                    name: "Policy: Asset Management",
                    content: `<h1>Asset Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing company assets.</p>
                    
                    <h3>1. Asset Classification</h3>
                    <ul>
                        <li>Fixed Assets</li>
                        <li>IT Assets</li>
                        <li>Inventory</li>
                    </ul>
                    
                    <h3>2. Asset Lifecycle</h3>
                    <p>2.1 Acquisition</p>
                    <p>2.2 Maintenance</p>
                    <p>2.3 Disposal</p>`,
                    settings: {
                        id: 'POL-011',
                        title: 'Asset Management Policy',
                        documentType: 'Policy',
                        department: 'Finance'
                    }
                },
                {
                    name: "Policy: Business Continuity",
                    content: `<h1>Business Continuity Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure business operations continue during disruptions.</p>
                    
                    <h3>1. Risk Assessment</h3>
                    <ul>
                        <li>Threat Identification</li>
                        <li>Impact Analysis</li>
                        <li>Recovery Priorities</li>
                    </ul>
                    
                    <h3>2. Continuity Plans</h3>
                    <p>2.1 Emergency Response</p>
                    <p>2.2 Recovery Procedures</p>
                    <p>2.3 Communication Plans</p>`,
                    settings: {
                        id: 'POL-012',
                        title: 'Business Continuity Policy',
                        documentType: 'Policy',
                        department: 'Operations'
                    }
                },
                {
                    name: "Policy: Anti-Harassment",
                    content: `<h1>Anti-Harassment Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To maintain a workplace free from harassment and discrimination.</p>
                    
                    <h3>1. Prohibited Conduct</h3>
                    <ul>
                        <li>Types of Harassment</li>
                        <li>Examples of Behavior</li>
                        <li>Protected Categories</li>
                    </ul>
                    
                    <h3>2. Procedures</h3>
                    <p>2.1 Reporting Process</p>
                    <p>2.2 Investigation Process</p>
                    <p>2.3 Corrective Actions</p>`,
                    settings: {
                        id: 'POL-013',
                        title: 'Anti-Harassment Policy',
                        documentType: 'Policy',
                        department: 'HR'
                    }
                },
                {
                    name: "Policy: Innovation Management",
                    content: `<h1>Innovation Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To promote and manage innovation across the organization.</p>
                    
                    <h3>1. Innovation Process</h3>
                    <ul>
                        <li>Idea Generation</li>
                        <li>Evaluation Criteria</li>
                        <li>Implementation</li>
                    </ul>
                    
                    <h3>2. Support Systems</h3>
                    <p>2.1 Resources</p>
                    <p>2.2 Recognition</p>
                    <p>2.3 Knowledge Management</p>`,
                    settings: {
                        id: 'POL-014',
                        title: 'Innovation Management Policy',
                        documentType: 'Policy',
                        department: 'R&D'
                    }
                },
                {
                    name: "Policy: Corporate Communications",
                    content: `<h1>Corporate Communications Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for internal and external communications.</p>
                    
                    <h3>1. Communication Channels</h3>
                    <ul>
                        <li>Internal Communications</li>
                        <li>External Communications</li>
                        <li>Media Relations</li>
                    </ul>
                    
                    <h3>2. Guidelines</h3>
                    <p>2.1 Spokesperson Authorization</p>
                    <p>2.2 Message Approval</p>
                    <p>2.3 Crisis Communication</p>`,
                    settings: {
                        id: 'POL-015',
                        title: 'Corporate Communications Policy',
                        documentType: 'Policy',
                        department: 'Communications'
                    }
                },
                {
                    name: "Policy: Cybersecurity",
                    content: `<h1>Cybersecurity Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for maintaining cybersecurity.</p>
                    
                    <h3>1. Security Measures</h3>
                    <ul>
                        <li>Access controls</li>
                        <li>Data protection</li>
                        <li>Incident response</li>
                    </ul>`,
                    settings: {
                        id: 'POL-016',
                        title: 'Cybersecurity Policy',
                        documentType: 'Policy',
                        department: 'IT'
                    }
                },
                {
                    name: "Policy: Vendor Management",
                    content: `<h1>Vendor Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing vendor relationships.</p>
                    
                    <h3>1. Vendor Selection</h3>
                    <ul>
                        <li>Qualification criteria</li>
                        <li>Evaluation process</li>
                        <li>Performance monitoring</li>
                    </ul>`,
                    settings: {
                        id: 'POL-017',
                        title: 'Vendor Management Policy',
                        documentType: 'Policy',
                        department: 'Procurement'
                    }
                },
                {
                    name: "Policy: Crisis Management",
                    content: `<h1>Crisis Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing crisis situations.</p>
                    
                    <h3>1. Crisis Response</h3>
                    <ul>
                        <li>Response team</li>
                        <li>Communication plan</li>
                        <li>Recovery procedures</li>
                    </ul>`,
                    settings: {
                        id: 'POL-018',
                        title: 'Crisis Management Policy',
                        documentType: 'Policy',
                        department: 'Management'
                    }
                },
                {
                    name: "Policy: Performance Management",
                    content: `<h1>Performance Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing employee performance.</p>
                    
                    <h3>1. Performance Review</h3>
                    <ul>
                        <li>Review process</li>
                        <li>Evaluation criteria</li>
                        <li>Development plans</li>
                    </ul>`,
                    settings: {
                        id: 'POL-019',
                        title: 'Performance Management Policy',
                        documentType: 'Policy',
                        department: 'HR'
                    }
                },
                {
                    name: "Policy: Knowledge Management",
                    content: `<h1>Knowledge Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing organizational knowledge.</p>
                    
                    <h3>1. Knowledge Capture</h3>
                    <ul>
                        <li>Documentation</li>
                        <li>Storage systems</li>
                        <li>Access controls</li>
                    </ul>`,
                    settings: {
                        id: 'POL-020',
                        title: 'Knowledge Management Policy',
                        documentType: 'Policy',
                        department: 'Knowledge Management'
                    }
                },
                {
                    name: "Policy: Corporate Responsibility",
                    content: `<h1>Corporate Responsibility Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for corporate social responsibility.</p>
                    
                    <h3>1. Social Responsibility</h3>
                    <ul>
                        <li>Community engagement</li>
                        <li>Environmental stewardship</li>
                        <li>Ethical practices</li>
                    </ul>`,
                    settings: {
                        id: 'POL-021',
                        title: 'Corporate Responsibility Policy',
                        documentType: 'Policy',
                        department: 'Corporate Affairs'
                    }
                },
                {
                    name: "Policy: Brand Management",
                    content: `<h1>Brand Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing corporate brand.</p>
                    
                    <h3>1. Brand Guidelines</h3>
                    <ul>
                        <li>Visual identity</li>
                        <li>Brand voice</li>
                        <li>Usage rules</li>
                    </ul>`,
                    settings: {
                        id: 'POL-022',
                        title: 'Brand Management Policy',
                        documentType: 'Policy',
                        department: 'Marketing'
                    }
                },
                {
                    name: "Policy: Project Management",
                    content: `<h1>Project Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing projects.</p>
                    
                    <h3>1. Project Governance</h3>
                    <ul>
                        <li>Methodology</li>
                        <li>Documentation</li>
                        <li>Control measures</li>
                    </ul>`,
                    settings: {
                        id: 'POL-023',
                        title: 'Project Management Policy',
                        documentType: 'Policy',
                        department: 'Project Management'
                    }
                },
                {
                    name: "Policy: Product Safety",
                    content: `<h1>Product Safety Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for ensuring product safety.</p>
                    
                    <h3>1. Safety Standards</h3>
                    <ul>
                        <li>Design requirements</li>
                        <li>Testing procedures</li>
                        <li>Documentation requirements</li>
                    </ul>`,
                    settings: {
                        id: 'POL-024',
                        title: 'Product Safety Policy',
                        documentType: 'Policy',
                        department: 'Quality'
                    }
                },
                {
                    name: "Policy: Innovation Management",
                    content: `<h1>Innovation Management Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish guidelines for managing innovation.</p>
                    
                    <h3>1. Innovation Process</h3>
                    <ul>
                        <li>Idea generation</li>
                        <li>Evaluation criteria</li>
                        <li>Implementation process</li>
                    </ul>`,
                    settings: {
                        id: 'POL-025',
                        title: 'Innovation Management Policy',
                        documentType: 'Policy',
                        department: 'Innovation'
                    }
                }
            ],
            forms: [
                {
                    name: "Form: Corrective Action Request",
                    content: `<h1>Corrective Action Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td colspan="2" style="text-align:center; background:#f0f0f0; padding:10px;"><strong>Issue Details</strong></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Issue Description:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Root Cause Analysis:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Corrective Action Plan:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-001',
                        title: 'Corrective Action Request',
                        documentType: 'Form',
                        department: 'Quality'
                    }
                },
                {
                    name: "Form: Incident Report",
                    content: `<h1>Incident Report Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date of Incident:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Time:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="time"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Location:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Description:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-002',
                        title: 'Incident Report',
                        documentType: 'Form',
                        department: 'HSE'
                    }
                },
                {
                    name: "Form: Equipment Inspection",
                    content: `<h1>Equipment Inspection Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Equipment ID:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align:center; background:#f0f0f0; padding:10px;"><strong>Inspection Items</strong></td>
                        </tr>
                        <tr>
                            <td>Item</td>
                            <td>Status</td>
                            <td>Comments</td>
                            <td>Action Required</td>
                        </tr>
                        <tr>
                            <td>Physical Condition</td>
                            <td style="padding:5px; border:1px solid #ddd;">
                                <select>
                                    <option>Pass</option>
                                    <option>Fail</option>
                                    <option>N/A</option>
                                </select>
                            </td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-003',
                        title: 'Equipment Inspection',
                        documentType: 'Form',
                        department: 'Maintenance'
                    }
                },
                {
                    name: "Form: Training Record",
                    content: `<h1>Training Record Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Training Title:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Trainer:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align:center; background:#f0f0f0; padding:10px;"><strong>Attendees</strong></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>Department</td>
                            <td>Signature</td>
                            <td>Assessment Result</td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-004',
                        title: 'Training Record',
                        documentType: 'Form',
                        department: 'Training'
                    }
                },
                {
                    name: "Form: Change Request",
                    content: `<h1>Change Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Change Description:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Justification:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Risk Assessment:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-005',
                        title: 'Change Request',
                        documentType: 'Form',
                        department: 'Change Management'
                    }
                },
                {
                    name: "Form: Audit Checklist",
                    content: `<h1>Audit Checklist Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Audit Area:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align:center; background:#f0f0f0; padding:10px;"><strong>Audit Items</strong></td>
                        </tr>
                        <tr>
                            <td>Requirement</td>
                            <td>Compliance Status</td>
                            <td>Evidence</td>
                            <td>Findings</td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-006',
                        title: 'Audit Checklist',
                        documentType: 'Form',
                        department: 'Quality'
                    }
                },
                {
                    name: "Form: Customer Complaint",
                    content: `<h1>Customer Complaint Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Customer Name:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Complaint Description:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Investigation Results:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-007',
                        title: 'Customer Complaint',
                        documentType: 'Form',
                        department: 'Customer Service'
                    }
                },
                {
                    name: "Form: Risk Assessment",
                    content: `<h1>Risk Assessment Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Activity/Process:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align:center; background:#f0f0f0; padding:10px;"><strong>Risk Analysis</strong></td>
                        </tr>
                        <tr>
                            <td>Hazard</td>
                            <td>Likelihood</td>
                            <td>Severity</td>
                            <td>Control Measures</td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-008',
                        title: 'Risk Assessment',
                        documentType: 'Form',
                        department: 'HSE'
                    }
                },
                {
                    name: "Form: Document Review",
                    content: `<h1>Document Review Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Document Title:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Document ID:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Review Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Review Comments:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-009',
                        title: 'Document Review',
                        documentType: 'Form',
                        department: 'Quality'
                    }
                },
                {
                    name: "Form: Equipment Request",
                    content: `<h1>Equipment Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Requestor:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date Required:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Equipment Description:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Justification:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:50px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-010',
                        title: 'Equipment Request',
                        documentType: 'Form',
                        department: 'Operations'
                    }
                },
                {
                    name: "Form: Safety Observation",
                    content: `<h1>Safety Observation Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Observer:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Location:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Observation Details:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-011',
                        title: 'Safety Observation',
                        documentType: 'Form',
                        department: 'HSE'
                    }
                },
                {
                    name: "Form: Project Status Report",
                    content: `<h1>Project Status Report Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Project Name:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Project Manager:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Report Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Progress Summary:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-012',
                        title: 'Project Status Report',
                        documentType: 'Form',
                        department: 'Project Management'
                    }
                },
                {
                    name: "Form: Material Request",
                    content: `<h1>Material Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Requestor:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date Required:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align:center; background:#f0f0f0; padding:10px;"><strong>Materials Required</strong></td>
                        </tr>
                        <tr>
                            <td>Item Description</td>
                            <td>Quantity</td>
                            <td>Unit</td>
                            <td>Purpose</td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-013',
                        title: 'Material Request',
                        documentType: 'Form',
                        department: 'Procurement'
                    }
                },
                {
                    name: "Form: Employee Feedback",
                    content: `<h1>Employee Feedback Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Employee Name:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Department:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Feedback:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-014',
                        title: 'Employee Feedback',
                        documentType: 'Form',
                        department: 'HR'
                    }
                },
                {
                    name: "Form: Maintenance Request",
                    content: `<h1>Maintenance Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Requestor:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Equipment/Area:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Issue Description:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;"><div contenteditable="true" style="min-height:100px;"></div></td>
                        </tr>
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Priority Level:</strong></td>
                            <td colspan="3" style="padding:5px; border:1px solid #ddd;">
                                <select>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-015',
                        title: 'Maintenance Request',
                        documentType: 'Form',
                        department: 'Maintenance'
                    }
                },
                {
                    name: "Form: Asset Transfer",
                    content: `<h1>Asset Transfer Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Asset ID:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-016',
                        title: 'Asset Transfer',
                        documentType: 'Form',
                        department: 'Asset Management'
                    }
                },
                {
                    name: "Form: Security Incident",
                    content: `<h1>Security Incident Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Incident Type:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-017',
                        title: 'Security Incident',
                        documentType: 'Form',
                        department: 'Security'
                    }
                },
                {
                    name: "Form: Process Change",
                    content: `<h1>Process Change Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Process Name:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-018',
                        title: 'Process Change',
                        documentType: 'Form',
                        department: 'Operations'
                    }
                },
                {
                    name: "Form: Software Access",
                    content: `<h1>Software Access Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Software Name:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-019',
                        title: 'Software Access Request',
                        documentType: 'Form',
                        department: 'IT'
                    }
                },
                {
                    name: "Form: Budget Request",
                    content: `<h1>Budget Request Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Department:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-020',
                        title: 'Budget Request',
                        documentType: 'Form',
                        department: 'Finance'
                    }
                },
                {
                    name: "Form: Training Evaluation",
                    content: `<h1>Training Evaluation Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Training Title:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-021',
                        title: 'Training Evaluation',
                        documentType: 'Form',
                        department: 'Training'
                    }
                },
                {
                    name: "Form: Project Closure",
                    content: `<h1>Project Closure Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Project Name:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-022',
                        title: 'Project Closure',
                        documentType: 'Form',
                        department: 'Project Management'
                    }
                },
                {
                    name: "Form: Quality Deviation",
                    content: `<h1>Quality Deviation Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Product ID:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-023',
                        title: 'Quality Deviation',
                        documentType: 'Form',
                        department: 'Quality'
                    }
                },
                {
                    name: "Form: Risk Assessment",
                    content: `<h1>Risk Assessment Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Risk Category:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-024',
                        title: 'Risk Assessment',
                        documentType: 'Form',
                        department: 'Risk Management'
                    }
                },
                {
                    name: "Form: Supplier Assessment",
                    content: `<h1>Supplier Assessment Form</h1>
                    <table style="width:100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Supplier Name:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><div contenteditable="true"></div></td>
                            <td style="padding:5px; border:1px solid #ddd;"><strong>Date:</strong></td>
                            <td style="padding:5px; border:1px solid #ddd;"><input type="date"></td>
                        </tr>
                    </table>`,
                    settings: {
                        id: 'FORM-025',
                        title: 'Supplier Assessment',
                        documentType: 'Form',
                        department: 'Procurement'
                    }
                }
            ],
            iso9001: [
                {
                    name: "ISO 9001:2015 - 4.1 Context of the Organization",
                    content: `<h1>Understanding the Organization and its Context</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To define methods for determining external and internal issues relevant to organizational purpose and strategy.</p>
                    
                    <h3>1. Scope</h3>
                    <p>This document outlines processes for monitoring and reviewing information about external and internal issues.</p>
                    
                    <h3>2. External Context</h3>
                    <ul>
                        <li>Legal factors</li>
                        <li>Market environment</li>
                        <li>Social and cultural factors</li>
                        <li>Economic conditions</li>
                        <li>Technological innovations</li>
                        <li>Competition</li>
                    </ul>
                    
                    <h3>3. Internal Context</h3>
                    <ul>
                        <li>Values and culture</li>
                        <li>Organizational knowledge</li>
                        <li>Performance capabilities</li>
                        <li>Resource considerations</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-4.1',
                        title: 'Context of the Organization',
                        documentType: 'ISO 9001',
                        description: 'Procedures for understanding organizational context',
                        department: 'Quality'
                    }
                },
                {
                    name: "ISO 9001:2015 - 4.2 Interested Parties",
                    content: `<h1>Understanding Needs and Expectations of Interested Parties</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To identify relevant interested parties and their requirements.</p>
                    
                    <h3>1. Identification of Interested Parties</h3>
                    <ul>
                        <li>Customers</li>
                        <li>End users</li>
                        <li>Suppliers and partners</li>
                        <li>Employees</li>
                        <li>Shareholders</li>
                        <li>Regulatory bodies</li>
                    </ul>
                    
                    <h3>2. Requirements Monitoring</h3>
                    <p>Process for monitoring and reviewing stakeholder information:</p>
                    <ol>
                        <li>Regular stakeholder analysis</li>
                        <li>Feedback collection methods</li>
                        <li>Review frequency</li>
                        <li>Documentation requirements</li>
                    </ol>`,
                    settings: {
                        id: 'ISO-4.2',
                        title: 'Interested Parties',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 4.3 QMS Scope",
                    content: `<h1>Determining the Scope of the Quality Management System</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To define and document the scope of the QMS.</p>
                    
                    <h3>1. Scope Considerations</h3>
                    <ul>
                        <li>External and internal issues</li>
                        <li>Stakeholder requirements</li>
                        <li>Products and services</li>
                        <li>Organizational units</li>
                        <li>Functions and processes</li>
                    </ul>
                    
                    <h3>2. Documentation Requirements</h3>
                    <p>The scope statement must:</p>
                    <ul>
                        <li>Be maintained as documented information</li>
                        <li>State products/services covered</li>
                        <li>Provide justification for exclusions</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-4.3',
                        title: 'QMS Scope',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 4.4 QMS Processes",
                    content: `<h1>Quality Management System and its Processes</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish, implement, maintain, and continually improve the QMS.</p>
                    
                    <h3>1. Process Requirements</h3>
                    <ul>
                        <li>Inputs and outputs</li>
                        <li>Sequence and interaction</li>
                        <li>Criteria and methods</li>
                        <li>Resources needed</li>
                        <li>Responsibilities and authorities</li>
                        <li>Risks and opportunities</li>
                    </ul>
                    
                    <h3>2. Process Documentation</h3>
                    <p>Maintain information to:</p>
                    <ul>
                        <li>Support process operation</li>
                        <li>Ensure planned implementation</li>
                        <li>Demonstrate process effectiveness</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-4.4',
                        title: 'QMS Processes',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 5.1 Leadership",
                    content: `<h1>Leadership and Commitment</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To define top management's responsibilities regarding the QMS.</p>
                    
                    <h3>1. General Commitment</h3>
                    <ul>
                        <li>Accountability for QMS effectiveness</li>
                        <li>Quality policy and objectives establishment</li>
                        <li>QMS integration with business processes</li>
                        <li>Process approach promotion</li>
                        <li>Resource availability</li>
                        <li>QMS effectiveness communication</li>
                    </ul>
                    
                    <h3>2. Customer Focus</h3>
                    <p>Ensure that:</p>
                    <ul>
                        <li>Customer requirements are determined</li>
                        <li>Risks and opportunities are addressed</li>
                        <li>Customer satisfaction focus is maintained</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-5.1',
                        title: 'Leadership',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 5.2 Quality Policy",
                    content: `<h1>Quality Policy</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish and maintain the organization's quality policy.</p>
                    
                    <h3>1. Policy Requirements</h3>
                    <p>The quality policy must:</p>
                    <ul>
                        <li>Be appropriate to organization's purpose</li>
                        <li>Provide framework for quality objectives</li>
                        <li>Include commitment to continual improvement</li>
                        <li>Satisfy applicable requirements</li>
                    </ul>
                    
                    <h3>2. Communication</h3>
                    <p>The quality policy shall be:</p>
                    <ul>
                        <li>Available as documented information</li>
                        <li>Communicated within organization</li>
                        <li>Available to interested parties</li>
                        <li>Understood and applied</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-5.2',
                        title: 'Quality Policy',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 5.3 Roles and Responsibilities",
                    content: `<h1>Organizational Roles, Responsibilities and Authorities</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To define and communicate roles and responsibilities within the QMS.</p>
                    
                    <h3>1. Assignment of Responsibilities</h3>
                    <ul>
                        <li>QMS conformity assurance</li>
                        <li>Process performance reporting</li>
                        <li>Customer focus promotion</li>
                        <li>QMS integrity maintenance</li>
                    </ul>
                    
                    <h3>2. Documentation Requirements</h3>
                    <p>Documentation should include:</p>
                    <ul>
                        <li>Organizational structure</li>
                        <li>Role descriptions</li>
                        <li>Authority matrices</li>
                        <li>Delegation procedures</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-5.3',
                        title: 'Roles and Responsibilities',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 6.1 Risk Management",
                    content: `<h1>Actions to Address Risks and Opportunities</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish a systematic approach to risk and opportunity management.</p>
                    
                    <h3>1. Risk Assessment Process</h3>
                    <ol>
                        <li>Risk Identification
                            <ul>
                                <li>Process risks</li>
                                <li>Product/service risks</li>
                                <li>Strategic risks</li>
                                <li>Operational risks</li>
                            </ul>
                        </li>
                        <li>Risk Analysis
                            <ul>
                                <li>Probability assessment</li>
                                <li>Impact evaluation</li>
                                <li>Risk prioritization</li>
                            </ul>
                        </li>
                        <li>Risk Treatment
                            <ul>
                                <li>Prevention measures</li>
                                <li>Mitigation strategies</li>
                                <li>Action plans</li>
                            </ul>
                        </li>
                    </ol>
                    
                    <h3>2. Opportunity Management</h3>
                    <ul>
                        <li>Identification methods</li>
                        <li>Assessment criteria</li>
                        <li>Implementation planning</li>
                        <li>Effectiveness evaluation</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-6.1',
                        title: 'Risk Management',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 6.2 Quality Objectives",
                    content: `<h1>Quality Objectives and Planning</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish and maintain quality objectives at relevant functions, levels and processes.</p>
                    
                    <h3>1. Objective Requirements</h3>
                    <p>Quality objectives must be:</p>
                    <ul>
                        <li>Consistent with quality policy</li>
                        <li>Measurable</li>
                        <li>Monitored</li>
                        <li>Communicated</li>
                        <li>Updated as appropriate</li>
                    </ul>
                    
                    <h3>2. Planning Information</h3>
                    <p>For each objective, determine:</p>
                    <ul>
                        <li>What will be done</li>
                        <li>Resources required</li>
                        <li>Responsible person</li>
                        <li>Completion timeline</li>
                        <li>Evaluation methods</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-6.2',
                        title: 'Quality Objectives',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 6.3 Change Management",
                    content: `<h1>Planning of Changes</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure changes to the QMS are carried out in a planned manner.</p>
                    
                    <h3>1. Change Considerations</h3>
                    <ul>
                        <li>Purpose of changes</li>
                        <li>Potential consequences</li>
                        <li>QMS integrity</li>
                        <li>Resource availability</li>
                        <li>Responsibility allocation</li>
                    </ul>
                    
                    <h3>2. Change Process</h3>
                    <ol>
                        <li>Change Request</li>
                        <li>Impact Assessment</li>
                        <li>Planning</li>
                        <li>Implementation</li>
                        <li>Verification</li>
                        <li>Documentation</li>
                    </ol>
                    
                    <h3>3. Documentation Requirements</h3>
                    <ul>
                        <li>Change description</li>
                        <li>Risk assessment</li>
                        <li>Resource requirements</li>
                        <li>Implementation plan</li>
                        <li>Verification results</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-6.3',
                        title: 'Change Management',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 7.1 Resources",
                    content: `<h1>Resources</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure availability of resources needed for QMS effectiveness.</p>
                    
                    <h3>1. General Requirements</h3>
                    <ul>
                        <li>People</li>
                        <li>Infrastructure</li>
                        <li>Environment</li>
                        <li>Monitoring and measurement resources</li>
                        <li>Organizational knowledge</li>
                    </ul>
                    
                    <h3>2. Infrastructure</h3>
                    <p>Provide and maintain:</p>
                    <ul>
                        <li>Buildings and utilities</li>
                        <li>Equipment (hardware/software)</li>
                        <li>Transportation resources</li>
                        <li>Information technology</li>
                    </ul>
                    
                    <h3>3. Work Environment</h3>
                    <p>Control factors including:</p>
                    <ul>
                        <li>Social (non-discriminatory)</li>
                        <li>Psychological (stress reduction)</li>
                        <li>Physical (temperature, noise)</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-7.1',
                        title: 'Resources',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 7.2 Competence",
                    content: `<h1>Competence</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure personnel competency affecting quality performance.</p>
                    
                    <h3>1. Competence Requirements</h3>
                    <ul>
                        <li>Determine necessary competence</li>
                        <li>Ensure competence through:
                            <ul>
                                <li>Education</li>
                                <li>Training</li>
                                <li>Experience</li>
                            </ul>
                        </li>
                        <li>Take actions to acquire competence</li>
                        <li>Evaluate effectiveness</li>
                    </ul>
                    
                    <h3>2. Documentation</h3>
                    <p>Maintain evidence of:</p>
                    <ul>
                        <li>Qualification records</li>
                        <li>Training certificates</li>
                        <li>Skills assessments</li>
                        <li>Performance evaluations</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-7.2',
                        title: 'Competence',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 7.3 Awareness",
                    content: `<h1>Awareness</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To ensure personnel awareness of QMS requirements and their contribution.</p>
                    
                    <h3>1. Awareness Requirements</h3>
                    <p>Personnel must be aware of:</p>
                    <ul>
                        <li>Quality policy</li>
                        <li>Quality objectives</li>
                        <li>Their contribution to QMS</li>
                        <li>Implications of nonconformity</li>
                    </ul>
                    
                    <h3>2. Communication Methods</h3>
                    <ul>
                        <li>Induction training</li>
                        <li>Regular briefings</li>
                        <li>Notice boards</li>
                        <li>Internal newsletters</li>
                        <li>Electronic communications</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-7.3',
                        title: 'Awareness',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 7.4 Communication",
                    content: `<h1>Communication</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To define internal and external communications relevant to the QMS.</p>
                    
                    <h3>1. Communication Planning</h3>
                    <p>Determine:</p>
                    <ul>
                        <li>What to communicate</li>
                        <li>When to communicate</li>
                        <li>With whom to communicate</li>
                        <li>How to communicate</li>
                        <li>Who communicates</li>
                    </ul>
                    
                    <h3>2. Communication Methods</h3>
                    <ul>
                        <li>Internal Communication
                            <ul>
                                <li>Meetings</li>
                                <li>Email updates</li>
                                <li>Intranet</li>
                                <li>Notice boards</li>
                            </ul>
                        </li>
                        <li>External Communication
                            <ul>
                                <li>Website</li>
                                <li>Customer notifications</li>
                                <li>Supplier communications</li>
                                <li>Regulatory reporting</li>
                            </ul>
                        </li>
                    </ul>`,
                    settings: {
                        id: 'ISO-7.4',
                        title: 'Communication',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 7.5 Documented Information",
                    content: `<h1>Documented Information</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To control documented information required by the QMS.</p>
                    
                    <h3>1. General Requirements</h3>
                    <ul>
                        <li>Creation and updating</li>
                        <li>Format and media</li>
                        <li>Review and approval</li>
                        <li>Distribution control</li>
                    </ul>
                    
                    <h3>2. Document Control</h3>
                    <p>Ensure:</p>
                    <ul>
                        <li>Availability and suitability</li>
                        <li>Adequate protection</li>
                        <li>Distribution and access</li>
                        <li>Storage and preservation</li>
                        <li>Version control</li>
                        <li>Retention and disposition</li>
                    </ul>
                    
                    <h3>3. Records Control</h3>
                    <ul>
                        <li>Identification</li>
                        <li>Storage</li>
                        <li>Protection</li>
                        <li>Retrieval</li>
                        <li>Retention period</li>
                        <li>Disposition</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-7.5',
                        title: 'Documented Information',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 8.1 Operational Planning",
                    content: `<h1>Operational Planning and Control</h1>
                    <h2>Purpose and Scope</h2>
                    <p>To establish and implement processes needed to meet requirements.</p>
                    
                    <h3>1. Planning Requirements</h3>
                    <ul>
                        <li>Process criteria</li>
                        <li>Resource determination</li>
                        <li>Documentation needs</li>
                    </ul>`,
                    settings: {
                        id: 'ISO-8.1',
                        title: 'Operational Planning',
                        documentType: 'ISO 9001'
                    }
                },
                {
                    name: "ISO 9001:2015 - 8.2 Customer Requirements",
                    content: ``,
                    settings: {
                        id: 'ISO-8.2',
                        title: 'Customer Requirements',
                        documentType: 'ISO 9001'
                    }
                }
            ]
        };
    }

    getTemplatesByCategory(category) {
        return this.templates[category] || [];
    }

    getAllCategories() {
        return Object.keys(this.templates);
    }

    getCategoryDisplayName(category) {
        const displayNames = {
            'sop': 'Standard Operating Procedures',
            'workInstructions': 'Work Instructions',
            'policies': 'Policies',
            'forms': 'Forms',
            'iso9001': 'ISO 9001 Templates',
            'notifications': 'Notifications'
        };
        return displayNames[category] || category;
    }

    insertTemplate(templateName, category) {
        try {
            const templates = this.getTemplatesByCategory(category);
            const template = templates.find(t => t.name === templateName);
            
            if (!template) {
                console.warn('Template not found:', templateName);
                return;
            }

            // Clear existing pages except the first one
            const container = document.getElementById('documentContainer');
            if (!container) {
                console.error('Document container not found');
                return;
            }

            const pages = container.querySelectorAll('.document-page');
            for (let i = 1; i < pages.length; i++) {
                pages[i].remove();
            }

            // Convert template content into array of page contents
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = template.content || '';
            
            // Get all page-break elements and split content
            const contents = [];
            let currentContent = '';
            tempDiv.childNodes.forEach(node => {
                if (node.className === 'page-break' || node.innerHTML?.includes('page-break')) {
                    contents.push(currentContent);
                    currentContent = '';
                } else {
                    currentContent += node.outerHTML || node.textContent || '';
                }
            });
            if (currentContent) {
                contents.push(currentContent);
            }

            // Populate first page
            const firstPageContent = container.querySelector('.page-content');
            if (firstPageContent) {
                firstPageContent.innerHTML = contents[0] || '<p></p>';
            }

            // Create additional pages as needed
            for (let i = 1; i < contents.length; i++) {
                this.documentBuilder.addNewPage(contents[i]);
            }

            // Load template settings if they exist and are valid
            if (template.settings && typeof template.settings === 'object') {
                const mergedSettings = {
                    ...this.documentBuilder.getDocumentSettings(), // Get current settings as base
                    ...template.settings // Overlay template settings
                };
                this.documentBuilder.loadDocumentSettings(mergedSettings);
            }

            // Focus first page content
            if (firstPageContent) {
                firstPageContent.focus();
            }

        } catch (error) {
            console.error('Error inserting template:', error);
            // Handle error gracefully - could show user feedback here
        }
    }

    searchTemplates(searchTerm) {
        const results = [];
        Object.entries(this.templates).forEach(([category, templates]) => {
            templates.forEach(template => {
                if (template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    template.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                    results.push({
                        ...template,
                        category: category
                    });
                }
            });
        });
        return results;
    }

    async exportAllTemplates() {
        try {
            const templateData = {};
            Object.entries(this.templates).forEach(([category, templates]) => {
                templateData[category] = templates.map(template => ({
                    name: template.name,
                    settings: template.settings || {},
                    content: template.content
                }));
            });

            await this.exportAsText(templateData);

            await this.exportAsDOCX(templateData);

            await this.exportAsJSON(templateData);

            await this.exportAsCSV(templateData);

            await this.exportAsXLSX(templateData);

            await this.exportAsXML(templateData);

            return true;
        } catch (error) {
            console.error('Failed to export templates:', error);
            throw new Error('Failed to export templates: ' + error.message);
        }
    }

    async exportAsText(templateData) {
        let content = '';
        
        Object.entries(templateData).forEach(([category, templates]) => {
            content += `\n\n============== ${this.getCategoryDisplayName(category)} ==============\n\n`;
            templates.forEach((template, index) => {
                content += `--- Template ${index + 1}: ${template.name} ---\n\n`;
                content += 'Settings:\n';
                Object.entries(template.settings).forEach(([key, value]) => {
                    content += `${key}: ${value}\n`;
                });
                content += '\nContent:\n';
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template.content;
                content += tempDiv.textContent + '\n\n';
                content += '----------------------------------------\n\n';
            });
        });

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `MRC_Global_Templates_${new Date().toISOString().split('T')[0]}.txt`);
    }

    async exportAsDOCX(templateData) {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

        const docChildren = [];
        Object.entries(templateData).forEach(([category, templates]) => {
            docChildren.push(
                new Paragraph({
                    text: this.getCategoryDisplayName(category),
                    heading: HeadingLevel.HEADING_1,
                    spacing: { before: 400, after: 200 }
                })
            );

            templates.forEach((template, index) => {
                docChildren.push(
                    new Paragraph({
                        text: template.name,
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 100 }
                    })
                );

                docChildren.push(
                    new Paragraph({
                        text: 'Settings:',
                        heading: HeadingLevel.HEADING_3
                    })
                );

                Object.entries(template.settings).forEach(([key, value]) => {
                    docChildren.push(
                        new Paragraph({
                            children: [
                                new TextRun({ text: `${key}: `, bold: true }),
                                new TextRun(String(value))
                            ]
                        })
                    );
                });

                docChildren.push(
                    new Paragraph({
                        text: 'Content:',
                        heading: HeadingLevel.HEADING_3,
                        spacing: { before: 200, after: 100 }
                    })
                );

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template.content;
                docChildren.push(
                    new Paragraph({
                        text: tempDiv.textContent,
                        spacing: { after: 200 }
                    })
                );
            });
        });

        const doc = new Document({
            sections: [{
                properties: {},
                children: docChildren
            }]
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `MRC_Global_Templates_${new Date().toISOString().split('T')[0]}.docx`);
    }

    async exportAsJSON(templateData) {
        const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: 'application/json' });
        saveAs(blob, `MRC_Global_Templates_${new Date().toISOString().split('T')[0]}.json`);
    }

    async exportAsCSV(templateData) {
        const rows = [['Category', 'Template Name', 'Settings', 'Content']];

        Object.entries(templateData).forEach(([category, templates]) => {
            templates.forEach(template => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template.content;
                rows.push([
                    category,
                    template.name,
                    JSON.stringify(template.settings),
                    tempDiv.textContent.replace(/[\n\r]+/g, ' ')
                ]);
            });
        });

        const csvContent = rows.map(row => 
            row.map(cell => 
                `"${String(cell).replace(/"/g, '""')}"`
            ).join(',')
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, `MRC_Global_Templates_${new Date().toISOString().split('T')[0]}.csv`);
    }

    async exportAsXLSX(templateData) {
        const XLSX = await import('xlsx');

        const rows = [['Category', 'Template Name', 'Settings', 'Content']];

        Object.entries(templateData).forEach(([category, templates]) => {
            templates.forEach(template => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template.content;
                rows.push([
                    category,
                    template.name,
                    JSON.stringify(template.settings),
                    tempDiv.textContent
                ]);
            });
        });

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Templates');

        const xlsxBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
        const blob = new Blob([xlsxBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `MRC_Global_Templates_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    async exportAsXML(templateData) {
        let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xmlContent += '<templates>\n';

        Object.entries(templateData).forEach(([category, templates]) => {
            xmlContent += `  <category name="${this.escapeXml(category)}">\n`;
            templates.forEach(template => {
                xmlContent += '    <template>\n';
                xmlContent += `      <name>${this.escapeXml(template.name)}</name>\n`;
                xmlContent += '      <settings>\n';
                Object.entries(template.settings).forEach(([key, value]) => {
                    xmlContent += `        <${key}>${this.escapeXml(String(value))}</${key}>\n`;
                });
                xmlContent += '      </settings>\n';
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template.content;
                xmlContent += `      <content>${this.escapeXml(tempDiv.textContent)}</content>\n`;
                xmlContent += '    </template>\n';
            });
            xmlContent += '  </category>\n';
        });

        xmlContent += '</templates>';

        const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
        saveAs(blob, `MRC_Global_Templates_${new Date().toISOString().split('T')[0]}.xml`);
    }

    escapeXml(unsafe) {
        return unsafe.replace(/[<>&'"]/g, c => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
                default: return c;
            }
        });
    }
}