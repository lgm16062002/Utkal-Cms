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
import './seminar.css';

const Seminar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  
  const initialData = [
    { id: 1, year: '2025', name: 'Recent Advances in Artificial Intelligence', participants: '120', startDate: 'May 20, 2025', endDate: 'May 21, 2025' },
    { id: 2, year: '2025', name: 'Data Science Tools and Techniques', participants: '98', startDate: 'Apr 15, 2025', endDate: 'Apr 16, 2025' },
    { id: 3, year: '2025', name: 'Cyber Security and Ethical Hacking', participants: '110', startDate: 'Mar 10, 2025', endDate: 'Mar 11, 2025' },
    { id: 4, year: '2024', name: 'Machine Learning Applications', participants: '135', startDate: 'Dec 18, 2024', endDate: 'Dec 19, 2024' },
    { id: 5, year: '2024', name: 'Cloud Computing: Concepts and Practices', participants: '85', startDate: 'Oct 25, 2024', endDate: 'Oct 26, 2024' },
    { id: 6, year: '2024', name: 'Web Development with Modern Frameworks', participants: '100', startDate: 'Aug 22, 2024', endDate: 'Aug 23, 2024' },
    { id: 7, year: '2024', name: 'Research Methodology and IPR', participants: '75', startDate: 'Jul 12, 2024', endDate: 'Jul 13, 2024' },
    { id: 8, year: '2024', name: 'Innovation and Entrepreneurship', participants: '90', startDate: 'Jun 05, 2024', endDate: 'Jun 06, 2024' },
  ];

  const [items, setItems] = useState(initialData);
  const photoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleAddNewClick = () => {
    setEditingItem(null);
  };

  return (
    <div className="seminar-page">
      <div className="seminar-header">
        <div className="seminar-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Workshop / Seminar Details</span>
          </div>
          <h1>Workshop / Seminar Details</h1>
          <p className="seminar-subtitle">Manage all workshop and seminar details organized by your department.</p>
        </div>
        <button className="btn-add-seminar" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Workshop / Seminar
        </button>
      </div>

      <div className="seminar-content">
        <div className="seminar-list-section">
          <div className="seminar-list-header">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search workshop/seminar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <div className="filter-box">
                <select defaultValue="All Years">
                  <option value="All Years">All Years</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <button className="btn-filter-icon" type="button">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>

          <table className="seminar-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Year</th>
                <th style={{ width: '35%' }}>Name of Workshop / Seminar</th>
                <th>Number of Participants</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="font-bold">{item.id}</td>
                  <td className="font-medium text-dark">{item.year}</td>
                  <td className="font-medium text-dark">{item.name}</td>
                  <td className="text-muted">{item.participants}</td>
                  <td className="text-muted">{item.startDate}</td>
                  <td className="text-muted">{item.endDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" type="button" onClick={() => setViewingItem(item)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn" type="button" onClick={() => handleEditClick(item)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="action-btn delete-btn" type="button" onClick={() => handleDelete(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span className="pagination-text">Showing 1 to {items.length} of {items.length} entries</span>
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

        <div className="add-seminar-section">
          <h2 className="form-title">{editingItem ? 'Edit Workshop / Seminar' : 'Add New Workshop / Seminar'}</h2>
          <form className="seminar-form">
            <div className="form-group">
              <label>Name of Workshop / Seminar <span className="required">*</span></label>
              <input type="text" placeholder="Enter workshop/seminar name" defaultValue={editingItem?.name || ''} />
            </div>

            <div className="form-group">
              <label>Number of Participants <span className="required">*</span></label>
              <input type="number" placeholder="Enter number of participants" defaultValue={editingItem?.participants || ''} />
            </div>

            <div className="form-group" style={{ marginTop: '4px' }}>
              <label>Photo <span className="required">*</span></label>
              <div className="upload-zone" onClick={() => photoInputRef.current.click()}>
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <p>Click to upload <span>or drag and drop</span></p>
                <span className="upload-hint">JPG, PNG (Max size: 5MB)</span>
                <input type="file" hidden ref={photoInputRef} accept="image/jpeg, image/png" />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '4px' }}>
              <label>Broucher <span className="required">*</span></label>
              <div className="upload-zone" onClick={() => pdfInputRef.current.click()}>
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <p>Click to upload <span>or drag and drop</span></p>
                <span className="upload-hint">PDF (Max size: 10MB)</span>
                <input type="file" hidden ref={pdfInputRef} accept="application/pdf" />
              </div>
            </div>

            <div className="form-group">
              <label>Start Date <span className="required">*</span></label>
              <div className="date-input-wrap">
                <input type="text" placeholder="Select start date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>End Date <span className="required">*</span></label>
              <div className="date-input-wrap">
                <input type="text" placeholder="Select end date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '24px' }}>
              <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
              <button type="button" className="btn-submit">{editingItem ? 'Update Workshop / Seminar' : 'Save Workshop / Seminar'}</button>
            </div>
          </form>
        </div>
      </div>

      {viewingItem && (
        <div className="modal-overlay" onClick={() => setViewingItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Workshop / Seminar Details</h2>
              <button className="btn-close-modal" onClick={() => setViewingItem(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-details-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">Name</span>
                  <span className="detail-value font-medium text-dark">{viewingItem.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">{viewingItem.year}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Participants</span>
                  <span className="detail-value">{viewingItem.participants}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Start Date</span>
                  <span className="detail-value">{viewingItem.startDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">End Date</span>
                  <span className="detail-value">{viewingItem.endDate}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setViewingItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seminar;
