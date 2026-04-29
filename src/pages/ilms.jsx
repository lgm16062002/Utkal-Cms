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
  faFilePdf,
  faFileVideo,
  faFilePowerpoint,
  faFileWord,
  faFileArchive,
  faLink,
  faCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './ilms.css';

const ILMS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  
  const initialData = [
    { id: 1, type: 'pdf', title: 'Data Structures and Algorithms', description: 'Study material for Data Structures course', fileName: 'datastructures.pdf', fileSize: '2.45 MB', date: 'May 20, 2025', status: 'Published' },
    { id: 2, type: 'video', title: 'Introduction to Machine Learning', description: 'Video lectures and resources', fileName: 'intro_ml.mp4', fileSize: '120.6 MB', date: 'May 18, 2025', status: 'Published' },
    { id: 3, type: 'ppt', title: 'Database Management Systems', description: 'PPT slides for DBMS unit', fileName: 'dbms_slides.pptx', fileSize: '3.12 MB', date: 'May 15, 2025', status: 'Published' },
    { id: 4, type: 'doc', title: 'Operating Systems Notes', description: 'Complete notes for OS', fileName: 'os_notes.pdf', fileSize: '1.85 MB', date: 'May 12, 2025', status: 'Published' },
    { id: 5, type: 'link', title: 'Python Programming Resources', description: 'Useful links and references', fileName: 'View Link', fileSize: 'https://example.com', date: 'May 10, 2025', status: 'Published' },
    { id: 6, type: 'zip', title: 'Previous Year Question Papers', description: 'PYQs with solutions', fileName: 'pyq_cs.zip', fileSize: '15.3 MB', date: 'May 08, 2025', status: 'Published' },
    { id: 7, type: 'pdf', title: 'Computer Networks Handout', description: 'Unit-wise handouts', fileName: 'cn_handout.pdf', fileSize: '2.01 MB', date: 'May 05, 2025', status: 'Published' },
    { id: 8, type: 'video', title: 'Compiler Design Lectures', description: 'Recorded lectures', fileName: 'compiler_design_mp4', fileSize: '98.7 MB', date: 'May 02, 2025', status: 'Published' },
  ];

  const [items, setItems] = useState(initialData);
  const fileInputRef = useRef(null);

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

  const getIconForType = (type) => {
    switch(type) {
      case 'pdf': return { icon: faFilePdf, class: 'icon-pdf' };
      case 'video': return { icon: faFileVideo, class: 'icon-video' };
      case 'ppt': return { icon: faFilePowerpoint, class: 'icon-ppt' };
      case 'doc': return { icon: faFileWord, class: 'icon-doc' };
      case 'link': return { icon: faLink, class: 'icon-link' };
      case 'zip': return { icon: faFileArchive, class: 'icon-zip' };
      default: return { icon: faFilePdf, class: 'icon-pdf' };
    }
  };

  return (
    <div className="ilms-page">
      <div className="ilms-header">
        <div className="ilms-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">ILMS</span>
          </div>
          <h1>ILMS Resources</h1>
          <p className="ilms-subtitle">Manage all ILMS resources uploaded by your department.</p>
        </div>
        <button className="btn-add-ilms" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New ILMS
        </button>
      </div>

      <div className="ilms-content">
        <div className="ilms-list-section">
          <div className="ilms-list-header">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search ILMS resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <div className="filter-box">
                <select defaultValue="All Status">
                  <option value="All Status">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <button className="btn-filter-icon" type="button">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>

          <table className="ilms-table">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ width: '35%' }}>Title</th>
                <th>File</th>
                <th>Uploaded On</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const typeInfo = getIconForType(item.type);
                return (
                  <tr key={item.id}>
                    <td className="font-bold">{item.id}</td>
                    <td>
                      <div className="ilms-title-cell">
                        <div className={`ilms-icon-box ${typeInfo.class}`}>
                          <FontAwesomeIcon icon={typeInfo.icon} />
                        </div>
                        <div className="ilms-title-text">
                          <span className="font-medium text-dark">{item.title}</span>
                          <span className="text-light-muted">{item.description}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="ilms-file-cell">
                        <span className={item.type === 'link' ? "text-link-primary font-medium" : "text-dark font-medium"}>{item.fileName}</span>
                        <span className={item.type === 'link' ? "text-link-secondary" : "text-light-muted"}>{item.fileSize}</span>
                      </div>
                    </td>
                    <td className="text-muted">{item.date}</td>
                    <td>
                      <div className="status-badge published">
                        <FontAwesomeIcon icon={faCircle} className="status-dot" />
                        {item.status}
                      </div>
                    </td>
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
                );
              })}
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

        <div className="add-ilms-section">
          <h2 className="form-title">{editingItem ? 'Edit ILMS' : 'Add New ILMS'}</h2>
          <form className="ilms-form">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input type="text" placeholder="Enter ILMS title" defaultValue={editingItem?.title || ''} />
            </div>

            <div className="form-group">
              <label>Description <span className="required">*</span></label>
              <textarea placeholder="Enter description of the resource" rows="4" defaultValue={editingItem?.description || ''}></textarea>
            </div>

            <div className="form-group" style={{ marginTop: '4px' }}>
              <label>File Attachment (PDF, DOC, DOCX, PPT, MP4, ZIP, etc.) <span className="required">*</span></label>
              <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <p>Click to upload <span>or drag and drop</span></p>
                <span className="upload-hint">Max file size: 100MB</span>
                <input type="file" hidden ref={fileInputRef} />
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '24px' }}>
              <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
              <button type="button" className="btn-submit">{editingItem ? 'Update ILMS' : 'Save ILMS'}</button>
            </div>
          </form>
        </div>
      </div>

      {viewingItem && (
        <div className="modal-overlay" onClick={() => setViewingItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ILMS Details</h2>
              <button className="btn-close-modal" onClick={() => setViewingItem(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-details-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">Title</span>
                  <span className="detail-value font-medium text-dark">{viewingItem.title}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Description</span>
                  <span className="detail-value">{viewingItem.description}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">File Type</span>
                  <span className="detail-value" style={{textTransform: 'uppercase'}}>{viewingItem.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">File Size</span>
                  <span className="detail-value">{viewingItem.fileSize}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Uploaded On</span>
                  <span className="detail-value">{viewingItem.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value status-badge published" style={{marginTop:'4px'}}><FontAwesomeIcon icon={faCircle} className="status-dot" /> {viewingItem.status}</span>
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

export default ILMS;
