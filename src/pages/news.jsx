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
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import './news.css';

const News = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const initialData = [
        { id: 1, title: 'Department Hosts AI & ML Seminar', desc: 'A seminar on recent advancements in AI & ML technologies was successfully conducted.', date: 'May 20, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=150&q=80' },
        { id: 2, title: 'Workshop on Data Science Concluded', desc: 'Five-day hands-on workshop on Data Science concluded with great participation.', date: 'May 18, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=150&q=80' },
        { id: 3, title: 'MoU Signed with Tech Innovators Pvt. Ltd.', desc: 'New MoU to promote research collaboration and student internships.', date: 'May 15, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80' },
        { id: 4, title: 'Guest Lecture on Cloud Computing', desc: 'Expert talk on Cloud Computing and its real-world application.', date: 'May 12, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=150&q=80' },
        { id: 5, title: 'Students Win Coding Competition', desc: 'Our students secured 1st position in the Inter-College Coding Championship.', date: 'May 10, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=80' },
        { id: 6, title: 'Department Picnic 2025', desc: 'A fun-filled department picnic organized for faculty and students.', date: 'May 08, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=150&q=80' },
        { id: 7, title: 'Research Paper Published in IEEE', desc: 'Faculty member\'s research paper published in IEEE Transactions.', date: 'May 05, 2025', status: 'Published', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=150&q=80' },
    ];

    const [items, setItems] = useState(initialData);

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
        <div className="news-page">
            <div className="news-header">
                <div className="news-header-left">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Dashboard</span>
                        <span className="breadcrumb-separator">&gt;</span>
                        <span className="breadcrumb-current">News & Event</span>
                    </div>
                    <h1>News & Event</h1>
                    <p className="news-subtitle">Manage all news & event published by your department.</p>
                </div>
                <button className="btn-add-news" onClick={handleAddNewClick}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add New News & Event
                </button>
            </div>

            <div className="news-content">
                <div className="news-list-section">
                    <div className="news-list-header">
                        <div className="search-box">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search news..."
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

                    <table className="news-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th style={{ width: '45%' }}>Title</th>
                                <th>Published Date</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="font-bold">{item.id}</td>
                                    <td>
                                        <div className="news-title-cell">
                                            <img src={item.image} alt="Thumbnail" className="news-thumbnail" />
                                            <div className="news-title-info">
                                                <span className="news-title-text">{item.title}</span>
                                                <span className="news-desc-text">{item.desc}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-muted">{item.date}</td>
                                    <td>
                                        <div className="status-cell">
                                            <span className="status-dot"></span>
                                            <span className="status-text">{item.status}</span>
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

                <div className="add-news-section">
                    <h2 className="form-title">{editingItem ? 'Edit News' : 'Add New News & Event'}</h2>
                    <form className="news-form">
                        <div className="form-group">
                            <label>Title <span className="required">*</span></label>
                            <input type="text" placeholder="Enter news title" defaultValue={editingItem?.title || ''} />
                        </div>

                        <div className="form-group" style={{ marginTop: '4px' }}>
                            <label>File Attachment <span className="label-hint">(PDF, DOC, DOCX)</span></label>
                            <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                                <FontAwesomeIcon icon={faUpload} className="upload-icon-blue" />
                                <p>Click to upload <span>or drag and drop</span></p>
                                <span className="upload-hint">Max file size: 10MB</span>
                                <input type="file" hidden ref={fileInputRef} accept=".pdf,.doc,.docx" />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginTop: '4px' }}>
                            <label>Link <span className="label-hint">(Optional)</span></label>
                            <input type="text" placeholder="https://example.com" />
                        </div>

                        <div className="form-group" style={{ marginTop: '4px' }}>
                            <label>News Image <span className="required">*</span></label>
                            <div className="upload-zone" onClick={() => imageInputRef.current.click()}>
                                <FontAwesomeIcon icon={faUpload} className="upload-icon-blue" />
                                <p>Click to upload <span>or drag and drop</span></p>
                                <span className="upload-hint">Recommended size: 1200x600px (Max 5MB)</span>
                                <input type="file" hidden ref={imageInputRef} accept=".jpg,.jpeg,.png,.webp" />
                            </div>
                        </div>

                        <div className="form-actions" style={{ marginTop: '24px' }}>
                            <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
                            <button type="button" className="btn-submit">{editingItem ? 'Update News' : 'Publish News'}</button>
                        </div>
                    </form>
                </div>
            </div>

            {viewingItem && (
                <div className="modal-overlay" onClick={() => setViewingItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>News Details</h2>
                            <button className="btn-close-modal" onClick={() => setViewingItem(null)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-details-grid">
                                <div className="detail-item full-width">
                                    <img src={viewingItem.image} alt={viewingItem.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '16px' }} />
                                </div>
                                <div className="detail-item full-width">
                                    <span className="detail-label">Title</span>
                                    <span className="detail-value font-medium text-dark">{viewingItem.title}</span>
                                </div>
                                <div className="detail-item full-width">
                                    <span className="detail-label">Description</span>
                                    <span className="detail-value">{viewingItem.desc}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Published Date</span>
                                    <span className="detail-value">{viewingItem.date}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Status</span>
                                    <span className="detail-value text-success">{viewingItem.status}</span>
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

export default News;
