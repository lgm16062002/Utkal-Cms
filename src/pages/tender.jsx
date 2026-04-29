import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faPlus,
  faEdit,
  faEye,
  faTrash,
  faLink,
  faFilePdf,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import './tender.css';

const Tender = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTender, setEditingTender] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    link: '',
    startDate: '',
    endDate: ''
  });

  const initialData = [
    {
      id: 1,
      title: 'Procurement of Laboratory Equipment',
      attachmentType: 'pdf',
      attachmentName: 'tender-lab-equipment.pdf',
      startDate: 'May 20, 2025',
      endDate: 'Jun 10, 2025',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Annual Maintenance Contract for Computers',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/amc-computers',
      startDate: 'May 18, 2025',
      endDate: 'Jun 05, 2025',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Renovation of Department Building',
      attachmentType: 'pdf',
      attachmentName: 'renovation-tender.pdf',
      startDate: 'May 15, 2025',
      endDate: 'Jun 02, 2025',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Supply of Office Stationery',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/stationery-supply',
      startDate: 'May 10, 2025',
      endDate: 'May 25, 2025',
      status: 'Upcoming'
    },
    {
      id: 5,
      title: 'Printing and Binding Services',
      attachmentType: 'pdf',
      attachmentName: 'printing-binding.pdf',
      startDate: 'May 08, 2025',
      endDate: 'May 20, 2025',
      status: 'Upcoming'
    },
    {
      id: 6,
      title: 'Website Development Services',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/website-development',
      startDate: 'May 01, 2025',
      endDate: 'May 18, 2025',
      status: 'Closed'
    },
    {
      id: 7,
      title: 'CCTV Installation and Maintenance',
      attachmentType: 'pdf',
      attachmentName: 'cctv-installation.pdf',
      startDate: 'Apr 25, 2025',
      endDate: 'May 10, 2025',
      status: 'Closed'
    },
    {
      id: 8,
      title: 'Landscaping and Gardening Services',
      attachmentType: 'link',
      attachmentName: 'https://bit.ly/landscaping-services',
      startDate: 'Apr 20, 2025',
      endDate: 'May 05, 2025',
      status: 'Expired'
    },
    {
      id: 9,
      title: 'Furniture Supply for Seminar Hall',
      attachmentType: 'pdf',
      attachmentName: 'furniture-supply.pdf',
      startDate: 'Apr 15, 2025',
      endDate: 'Apr 30, 2025',
      status: 'Expired'
    }
  ];

  const [tenders, setTenders] = useState(initialData);

  const handleDelete = (id) => {
    setTenders(tenders.filter(t => t.id !== id));
    if (editingTender && editingTender.id === id) {
      handleAddNewClick();
    }
  };

  const handleEditClick = (tender) => {
    setEditingTender(tender);
    setSelectedFile(null);
    setFormData({
      title: tender.title,
      link: tender.attachmentType === 'link' ? tender.attachmentName : '',
      startDate: tender.startDate,
      endDate: tender.endDate
    });
  };

  const handleAddNewClick = () => {
    setEditingTender(null);
    setSelectedFile(null);
    setFormData({ title: '', link: '', startDate: '', endDate: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Upcoming': return 'status-upcoming';
      case 'Closed': return 'status-closed';
      case 'Expired': return 'status-expired';
      default: return '';
    }
  };

  return (
    <div className="tender-page">
      <div className="tender-header">
        <div className="tender-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Tender</span>
          </div>
          <h1>Tenders</h1>
          <p className="tender-subtitle">Manage all tenders uploaded by your department.</p>
        </div>
        <button className="btn-add-tender" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Tender
        </button>
      </div>

      <div className="tender-content">
        <div className="tender-list-section">
          <div className="tender-list-header">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search tenders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <div className="filter-box">
                <select defaultValue="All Status">
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Closed">Closed</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
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

          <table className="tender-table">
            <thead>
              <tr>
                <th className="col-id">#</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender.id}>
                  <td className="col-id">{tender.id}</td>
                  <td>
                    <div className="tender-title-cell">
                      <span className="tender-title-text">{tender.title}</span>
                      <div className={`tender-attachment ${tender.attachmentType}`}>
                        {tender.attachmentType === 'pdf' ? (
                          <FontAwesomeIcon icon={faFilePdf} />
                        ) : (
                          <FontAwesomeIcon icon={faLink} />
                        )}
                        <a href="#" className="attachment-name">
                          {tender.attachmentName}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="col-date">{tender.startDate}</td>
                  <td className="col-date">{tender.endDate}</td>
                  <td>
                    <div className={`status-indicator ${getStatusClass(tender.status)}`}>
                      <span className="status-dot"></span>
                      {tender.status}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" type="button" onClick={() => handleEditClick(tender)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="action-btn delete-btn" type="button" onClick={() => handleDelete(tender.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
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

        <div className="add-tender-section">
          <h2 className="form-title">{editingTender ? 'Edit Tender' : 'Add New Tender'}</h2>
          <form>
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter tender title" />
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
                  <div style={{ padding: '8px 0', color: '#4f46e5', fontWeight: '600', fontSize: '13px' }}>
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
              <label>Start Date <span className="required">*</span></label>
              <div className="date-input-wrapper">
                <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              </div>
            </div>

            <div className="form-group">
              <label>End Date <span className="required">*</span></label>
              <div className="date-input-wrapper">
                <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
              <button type="button" className="btn-submit">{editingTender ? 'Update Tender' : 'Save Tender'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tender;
