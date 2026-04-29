import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faEye,
  faEdit,
  faTrash,
  faPlus,
  faUpload,
  faFilePdf,
  faFileWord,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './notice.css';

const Notice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const newsData = [
    {
      id: 1,
      title: 'Internal Assessment Schedule for Semester V',
      description: 'The internal assessment schedule for semester V has been announced...',
      publishedDate: '2025-04-15',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Lab Maintenance Notice - Block A',
      description: 'Block A labs will be under maintenance from 20th to 22nd April...',
      publishedDate: '2025-04-14',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Holiday on May 21, 2025 - Buddha Purnima',
      description: 'The college will remain closed on account of Buddha Purnima...',
      publishedDate: '2025-04-13',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494?w=200&h=200&fit=crop',
    },
    {
      id: 4,
      title: 'Project Submission Deadline Extended',
      description: 'The deadline for final year project submission has been extended...',
      publishedDate: '2025-04-12',
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1517694712202-14e953944de7?w=200&h=200&fit=crop',
    },
    {
      id: 5,
      title: 'Library Access Update - New Timings',
      description: 'Library timings have been revised effective from next week...',
      publishedDate: '2025-04-11',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=200&h=200&fit=crop',
    },
    {
      id: 6,
      title: 'Guest Lecture on Machine Learning',
      description: 'A guest lecture on ML applications will be held on 25th April...',
      publishedDate: '2025-04-10',
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop',
    },
    {
      id: 7,
      title: 'Placement Drive - Tech Companies',
      description: 'Placement drive for tech companies scheduled for next month...',
      publishedDate: '2025-04-09',
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop',
    },
  ];

  const getStatusBadge = (status) => {
    return status === 'Published' ? (
      <span className="status-badge published">Published</span>
    ) : (
      <span className="status-badge draft">Draft</span>
    );
  };

  return (
    <div className="notice-page">
      <div className="notice-header">
        <div className="notice-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Department News</span>
          </div>
          <h1>Department News</h1>
          <p className="notice-subtitle">Manage all news published by your department.</p>
        </div>
        <button className="btn-add-news">
          <FontAwesomeIcon icon={faPlus} />
          Add New News
        </button>
      </div>

      <div className="notice-content">
        {/* Left Column - News List */}
        <div className="news-list-section">
          <div className="news-controls">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          <div className="news-table-wrapper">
            <table className="news-table">
              <thead>
                <tr>
                  <th className="col-hash">#</th>
                  <th className="col-title">Title</th>
                  <th className="col-date">Published Date</th>
                  <th className="col-status">Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {newsData.map((news, index) => (
                  <tr key={news.id}>
                    <td className="col-hash">{String(index + 1).padStart(2, '0')}</td>
                    <td className="col-title">
                      <div className="news-title-row">
                        <img src={news.image} alt="News" className="news-thumb" />
                        <div className="news-info">
                          <h4>{news.title}</h4>
                          <p>{news.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="col-date">{news.publishedDate}</td>
                    <td className="col-status">{getStatusBadge(news.status)}</td>
                    <td className="col-actions">
                      <button className="action-btn view">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn edit">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="action-btn delete">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span className="pagination-info">Showing 1 to 7 of 7 entries</span>
            <div className="pagination-controls">
              <button className="pagination-btn" disabled>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn" disabled>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Add New News Form */}
        <div className="add-news-section">
          <div className="form-card">
            <h2>Add New News</h2>
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter news title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>File Attachment</label>
                <div className="upload-area">
                  <div className="upload-content">
                    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                    <p className="upload-text">
                      Drag and drop files here or <span className="upload-link">browse</span>
                    </p>
                    <p className="upload-hint">
                      <FontAwesomeIcon icon={faFilePdf} /> PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Link (Optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>News Image</label>
                <div className="upload-area">
                  <div className="upload-content">
                    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                    <p className="upload-text">
                      Drag and drop image here or <span className="upload-link">browse</span>
                    </p>
                    <p className="upload-hint">
                      Recommended: 800x600px (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-publish">
                  Publish News
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;