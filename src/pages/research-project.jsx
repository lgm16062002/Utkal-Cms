import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faPlus,
  faEdit,
  faEye,
  faTrash,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faUpload,
  faCalendarAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './research-project.css';

const ResearchProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  
  const initialData = [
    { id: 1, title: 'AI Based Crop Disease Detection System', agency: 'ICAR', amount: '12,50,000', periodStr: 'Jan 2025 - Dec 2026', duration: '(24 Months)', pi: 'Dr. Priyanka Mohanty', role: '(PI)' },
    { id: 2, title: 'Smart Water Quality Monitoring Using IoT', agency: 'DST', amount: '18,00,000', periodStr: 'Apr 2024 - Mar 2026', duration: '(24 Months)', pi: 'Dr. Suresh C. Dash', role: '(PI)' },
    { id: 3, title: 'Machine Learning Approaches for Sentiment Analysis', agency: 'SERB', amount: '9,80,000', periodStr: 'Feb 2024 - Jan 2026', duration: '(24 Months)', pi: 'Dr. Ranjan K. Panigrahi', role: '(Co-PI)' },
    { id: 4, title: 'Development of Secure Blockchain Framework', agency: 'MeitY', amount: '15,00,000', periodStr: 'Jun 2024 - May 2026', duration: '(24 Months)', pi: 'Dr. Sunita Patra', role: '(Co-PI)' },
    { id: 5, title: 'Natural Language Processing for Regional Languages', agency: 'UGC', amount: '7,50,000', periodStr: 'Aug 2024 - Jul 2025', duration: '(12 Months)', pi: 'Dr. Debasis Samantaray', role: '(Coordinator)' },
    { id: 6, title: 'Green Energy Optimization Using Hybrid Models', agency: 'MNRE', amount: '20,00,000', periodStr: 'Jan 2025 - Dec 2026', duration: '(24 Months)', pi: 'Dr. Ajit K. Behera', role: '(PI)' },
    { id: 7, title: 'Cyber Security Awareness and Threat Detection', agency: 'AICTE', amount: '5,60,000', periodStr: 'Mar 2024 - Feb 2025', duration: '(12 Months)', pi: 'Dr. Madhusmita Kar', role: '(Coordinator)' },
    { id: 8, title: 'Cloud Based E-Learning Platform Development', agency: 'UGC', amount: '8,75,000', periodStr: 'May 2024 - Apr 2025', duration: '(24 Months)', pi: 'Dr. Bikash R. Nayak', role: '(Co-PI)' },
  ];

  const [projects, setProjects] = useState(initialData);
  const fileInputRef = useRef(null);

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    if (editingProject && editingProject.id === id) {
      setEditingProject(null);
    }
  };

  const handleEditClick = (proj) => {
    setEditingProject(proj);
  };

  const handleAddNewClick = () => {
    setEditingProject(null);
  };

  return (
    <div className="rp-page">
      <div className="rp-header">
        <div className="rp-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Research Projects</span>
          </div>
          <h1>Research Projects</h1>
          <p className="rp-subtitle">Manage all research projects uploaded by your department.</p>
        </div>
        <button className="btn-add-rp" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Project
        </button>
      </div>

      <div className="rp-content">
        <div className="rp-list-section">
          <div className="rp-list-header">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <div className="filter-box">
                <select defaultValue="All Projects">
                  <option value="All Projects">All Projects</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
              <button className="btn-filter-icon" type="button">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>

          <table className="rp-table">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ width: '25%' }}>Project Title</th>
                <th>Funding Agency</th>
                <th>Amount (₹)</th>
                <th>Period</th>
                <th>PI / Coordinator</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj.id}>
                  <td className="font-bold">{proj.id}</td>
                  <td className="font-medium text-dark rp-title-cell">{proj.title}</td>
                  <td className="text-muted">{proj.agency}</td>
                  <td className="text-muted">{proj.amount}</td>
                  <td>
                    <div className="rp-period">
                      <span>{proj.periodStr}</span>
                      <span className="text-light-muted">{proj.duration}</span>
                    </div>
                  </td>
                  <td>
                    <div className="rp-pi">
                      <span className="font-medium text-dark">{proj.pi}</span>
                      <span className="text-light-muted">{proj.role}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" type="button" onClick={() => setViewingProject(proj)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn" type="button" onClick={() => handleEditClick(proj)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="action-btn delete-btn" type="button" onClick={() => handleDelete(proj.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span className="pagination-text">Showing 1 to {projects.length} of {projects.length} entries</span>
            <div className="pagination-controls">
              <div className="page-btn">
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
              <div className="page-btn active">1</div>
              <div className="page-btn">
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </div>
        </div>

        <div className="add-rp-section">
          <h2 className="form-title">{editingProject ? 'Edit Research Project' : 'Add New Research Project'}</h2>
          <form className="rp-form">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input type="text" placeholder="Enter project title" defaultValue={editingProject?.title || ''} />
            </div>

            <div className="form-group">
              <label>Funding Agency <span className="required">*</span></label>
              <input type="text" placeholder="Enter funding agency" defaultValue={editingProject?.agency || ''} />
            </div>

            <div className="form-group">
              <label>Amount (₹) <span className="required">*</span></label>
              <input type="number" placeholder="Enter amount" defaultValue={editingProject?.amount?.replace(/,/g, '') || ''} />
            </div>

            <div className="form-group">
              <label>Period <span className="required">*</span></label>
              <div className="period-inputs">
                <div className="date-input-wrap">
                  <input type="text" placeholder="Start Date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
                  <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                </div>
                <span className="period-separator">-</span>
                <div className="date-input-wrap">
                  <input type="text" placeholder="End Date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
                  <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>PI / Co-PI / Coordinator (Add Name) <span className="required">*</span></label>
              <input type="text" placeholder="Enter name" defaultValue={editingProject?.pi || ''} />
            </div>

            <div className="form-group" style={{ marginTop: '4px' }}>
              <label>Sanctioned Letter (PDF) <span className="required">*</span></label>
              <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <p>Click to upload <span>or drag and drop</span></p>
                <span className="upload-hint">PDF files only. Max size: 10MB</span>
                <input type="file" hidden ref={fileInputRef} accept="application/pdf" />
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '24px' }}>
              <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
              <button type="button" className="btn-submit">{editingProject ? 'Update Project' : 'Save Project'}</button>
            </div>
          </form>
        </div>
      </div>

      {viewingProject && (
        <div className="modal-overlay" onClick={() => setViewingProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Project Details</h2>
              <button className="btn-close-modal" onClick={() => setViewingProject(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-details-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">Project Title</span>
                  <span className="detail-value font-medium text-dark">{viewingProject.title}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Funding Agency</span>
                  <span className="detail-value">{viewingProject.agency}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value">₹ {viewingProject.amount}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Period</span>
                  <span className="detail-value">{viewingProject.periodStr} <span className="text-light-muted">{viewingProject.duration}</span></span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">PI / Coordinator</span>
                  <span className="detail-value">{viewingProject.pi} <span className="text-light-muted">{viewingProject.role}</span></span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setViewingProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchProject;
