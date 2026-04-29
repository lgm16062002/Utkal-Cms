import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faPlus,
  faEdit,
  faEllipsisV,
  faLink,
  faFilePdf,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import './notice.css';

const Notice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingNotice, setEditingNotice] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    link: '',
    publishedDate: '',
    lastDate: ''
  });

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initialData = [
    {
      id: 1,
      title: 'Internal Assessment Schedule',
      attachmentType: 'pdf',
      attachmentName: 'assessment-schedule.pdf',
      category: 'Academic',
      publishedDate: 'May 18, 2025',
      lastDate: 'May 30, 2025',
      status: 'Appr. Pending'
    },
    {
      id: 2,
      title: 'Lab Maintenance Notice',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/lab-maintenance',
      category: 'General',
      publishedDate: 'May 16, 2025',
      lastDate: 'May 20, 2025',
      status: 'Appr. Pending'
    },
    {
      id: 3,
      title: 'Holiday on May 21, 2025',
      attachmentType: 'pdf',
      attachmentName: 'holiday-may21.pdf',
      category: 'General',
      publishedDate: 'May 15, 2025',
      lastDate: 'May 21, 2025',
      status: 'Published'
    },
    {
      id: 4,
      title: 'Project Submission Deadline',
      attachmentType: 'pdf',
      attachmentName: 'project-deadline.pdf',
      category: 'Academic',
      publishedDate: 'May 12, 2025',
      lastDate: 'May 25, 2025',
      status: 'Published'
    },
    {
      id: 5,
      title: 'Library Access Update',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/library-update',
      category: 'General',
      publishedDate: 'May 10, 2025',
      lastDate: 'May 31, 2025',
      status: 'Appr. Pending'
    },
    {
      id: 6,
      title: 'Workshop on Data Science',
      attachmentType: 'pdf',
      attachmentName: 'workshop-details.pdf',
      category: 'Workshop',
      publishedDate: 'May 08, 2025',
      lastDate: 'May 28, 2025',
      status: 'Published'
    },
    {
      id: 7,
      title: 'AI & ML Seminar Announcement',
      attachmentType: 'pdf',
      attachmentName: 'seminar-announcement.pdf',
      category: 'Seminar',
      publishedDate: 'May 05, 2025',
      lastDate: 'May 24, 2025',
      status: 'Published'
    },
    {
      id: 8,
      title: 'Department Meeting Notice',
      attachmentType: 'pdf',
      attachmentName: 'meeting-notice.pdf',
      category: 'General',
      publishedDate: 'May 02, 2025',
      lastDate: 'May 10, 2025',
      status: 'Expired'
    },
    {
      id: 9,
      title: 'Research Methodology Workshop',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/research-workshop',
      category: 'Workshop',
      publishedDate: 'Apr 28, 2025',
      lastDate: 'May 05, 2025',
      status: 'Expired'
    }
  ];

  const [notices, setNotices] = useState(initialData);

  const handleDelete = (id) => {
    setNotices(notices.filter(n => n.id !== id));
    setActiveMenuId(null);
    if (editingNotice && editingNotice.id === id) {
      handleAddNewClick();
    }
  };

  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    setSelectedFile(null); // Clear selected file when switching to edit another notice
    setFormData({
      title: notice.title,
      category: notice.category,
      link: notice.attachmentType === 'link' ? notice.attachmentName : '',
      publishedDate: notice.publishedDate,
      lastDate: notice.lastDate
    });
    setActiveMenuId(null);
  };

  const handleAddNewClick = () => {
    setEditingNotice(null);
    setSelectedFile(null); // Clear selected file when adding a new notice
    setFormData({ title: '', category: '', link: '', publishedDate: '', lastDate: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCategoryClass = (cat) => {
    switch (cat) {
      case 'Academic': return 'cat-academic';
      case 'General': return 'cat-general';
      case 'Workshop': return 'cat-workshop';
      case 'Seminar': return 'cat-seminar';
      default: return '';
    }
  };

  return (
    <div className="notice-page">
      <div className="notice-header">
        <div className="notice-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Notice</span>
          </div>
          <h1>Notices</h1>
          <p className="notice-subtitle">Manage all notices published by your department.</p>
        </div>
        <button className="btn-add-notice" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Notice
        </button>
      </div>

      <div className="notice-content">
        <div className="notice-list-section">
          <div className="notice-list-header">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <div className="filter-box">
                <select defaultValue="All Categories">
                  <option value="All Categories">All Categories</option>
                  <option value="Academic">Academic</option>
                  <option value="General">General</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
              <div className="filter-box">
                <select defaultValue="All Status">
                  <option value="All Status">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
          </div>

          <table className="notice-table">
            <thead>
              <tr>
                <th className="col-id">#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Published Date</th>
                <th>Last Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, index) => (
                <tr key={notice.id}>
                  <td className="col-id">{notice.id}</td>
                  <td>
                    <div className="notice-title-cell">
                      <span className="notice-title-text">{notice.title}</span>
                      <div className={`notice-attachment ${notice.attachmentType}`}>
                        {notice.attachmentType === 'pdf' ? (
                          <FontAwesomeIcon icon={faFilePdf} />
                        ) : (
                          <FontAwesomeIcon icon={faLink} />
                        )}
                        <a href="#" className="attachment-name">
                          {notice.attachmentName}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${getCategoryClass(notice.category)}`}>
                      {notice.category}
                    </span>
                  </td>
                  <td className="col-date">{notice.publishedDate}</td>
                  <td className="col-last-date">{notice.lastDate}</td>
                  <td>
                    <div className={`status-indicator ${notice.status === 'Published' ? 'status-published' : 'status-expired'}`}>
                      <span className="status-dot"></span>
                      {notice.status}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" onClick={() => handleEditClick(notice)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <div className="action-menu-container" ref={activeMenuId === notice.id ? menuRef : null}>
                        <button className="action-btn" onClick={() => setActiveMenuId(activeMenuId === notice.id ? null : notice.id)}>
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        {activeMenuId === notice.id && (
                          <div className="action-dropdown">
                            <button className="dropdown-item delete-item" onClick={() => handleDelete(notice.id)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span className="pagination-text">Showing 1 to 9 of 9 entries</span>
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

        <div className="add-notice-section">
          <h2 className="form-title">{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h2>
          <form>
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter notice title" />
            </div>

            <div className="form-group">
              <label>Category <span className="required">*</span></label>
              <select className="form-control form-select" name="category" value={formData.category} onChange={handleInputChange}>
                <option value="" disabled hidden>Select category</option>
                <option value="Academic">Academic</option>
                <option value="General">General</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>

            <div className="form-group">
              <label>File Attachment <span style={{ color: '#64748b', fontWeight: '400' }}>(PDF, DOC, DOCX)</span></label>
              <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
                {selectedFile ? (
                  <div style={{ padding: '8px 0', color: '#6366f1', fontWeight: '600', fontSize: '13px' }}>
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px', color: '#dc2626' }} />
                    {selectedFile.name}
                  </div>
                ) : (
                  <>
                    <div className="upload-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="upload-text">Click to upload <span>or drag and drop</span></p>
                    <p className="upload-hint">Max file size: 10MB</p>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Link (Optional)</label>
              <input type="text" className="form-control" name="link" value={formData.link} onChange={handleInputChange} placeholder="https://example.com" />
            </div>

            <div className="form-group">
              <label>Publish Date <span className="required">*</span></label>
              <div className="date-input-wrapper">
                <input type="date" className="form-control" name="publishedDate" value={formData.publishedDate} onChange={handleInputChange} />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>Last Date <span className="required">*</span></label>
              <div className="date-input-wrapper">
                <input type="date" className="form-control" name="lastDate" value={formData.lastDate} onChange={handleInputChange} />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
              <button type="button" className="btn-submit">{editingNotice ? 'Update Notice' : 'Publish Notice'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Notice;