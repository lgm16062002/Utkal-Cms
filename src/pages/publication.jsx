import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faPlus,
  faEdit,
  faEye,
  faTrash,
  faFilter,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';
import './publication.css';

const Publication = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPub, setEditingPub] = useState(null);
  const [formData, setFormData] = useState({ content: '' });
  
  const initialData = [
    {
      id: 1,
      content: `
        <div class="pub-inner-table-wrapper">
          <table class="pub-inner-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Title of Paper</th>
                <th>Author(s)</th>
                <th>Journal</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>An Efficient Algorithm for Data Classification</td>
                <td>S. Dash, P. Mohanty</td>
                <td>IEEE Access</td>
                <td>2024</td>
              </tr>
              <tr>
                <td>2</td>
                <td>A Novel Approach to Machine Learning</td>
                <td>R. Panigrahi, S. Patra</td>
                <td>Springer</td>
                <td>2024</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Deep Neural Networks for Image Recognition</td>
                <td>P. Mohanty, R. Kar</td>
                <td>Elsevier</td>
                <td>2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      date: 'May 20, 2025'
    },
    {
      id: 2,
      content: `
        <div class="pub-content-block">
          <h4 class="pub-title">Conference Publications</h4>
          <ul class="pub-ul">
            <li>Deep Learning Approaches for Big Data Analytics - R. Panigrahi, S. Patra (ICCCNT 2024)</li>
            <li>Cloud Computing Security: A Review - S. Dash, P. Mohanty (ICACCS 2024)</li>
            <li>IoT Based Smart Systems - P. Mohanty, R. Kar (ICIT 2023)</li>
          </ul>
        </div>
      `,
      date: 'May 15, 2025'
    },
    {
      id: 3,
      content: `
        <div class="pub-content-block">
          <h4 class="pub-title">Book / Book Chapter</h4>
          <div class="pub-text-lines">
            <p><strong>Title:</strong> Data Science Essentials</p>
            <p><strong>Author(s):</strong> P. Mohanty</p>
            <p><strong>Publisher:</strong> Springer</p>
            <p><strong>Year:</strong> 2023</p>
            <p><strong>ISBN:</strong> 978-3-030-12345-6</p>
          </div>
        </div>
      `,
      date: 'Apr 28, 2025'
    },
    {
      id: 4,
      content: `
        <div class="pub-content-block">
          <h4 class="pub-title">Patents</h4>
          <ol class="pub-ol">
            <li>Smart Traffic Management System - S. Dash, R. Kar - IN202341012345 - 2023</li>
            <li>Intelligent Energy Monitoring Device - P. Mohanty - IN202341045678 - 2023</li>
          </ol>
        </div>
      `,
      date: 'Apr 10, 2025'
    }
  ];

  const [publications, setPublications] = useState(initialData);

  const handleDelete = (id) => {
    setPublications(publications.filter(p => p.id !== id));
    if (editingPub && editingPub.id === id) {
      setEditingPub(null);
      setFormData({ content: '' });
    }
  };

  const handleEditClick = (pub) => {
    setEditingPub(pub);
    setFormData({ content: pub.content });
  };

  const handleAddNewClick = () => {
    setEditingPub(null);
    setFormData({ content: '' });
  };

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, content });
  };

  return (
    <div className="pub-page">
      <div className="pub-header">
        <div className="pub-header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-link">Dashboard</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Publication</span>
          </div>
          <h1>Publications</h1>
          <p className="pub-subtitle">Manage all publications added in the department.</p>
        </div>
        <button className="btn-add-pub" onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New Publication
        </button>
      </div>

      <div className="pub-content">
        <div className="pub-list-section">
          <div className="pub-list-header">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search publications..."
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
                  <option value="2023">2023</option>
                </select>
              </div>
              <button className="btn-filter-icon" type="button">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>

          <table className="pub-table">
            <tbody>
              {publications.map((pub) => (
                <tr key={pub.id}>
                  <td className="col-id">{pub.id}</td>
                  <td className="col-content-data" dangerouslySetInnerHTML={{ __html: pub.content }}>
                  </td>
                  <td className="col-date">{pub.date}</td>
                  <td className="col-actions">
                    <div className="action-buttons">
                      <button className="action-btn" type="button">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="action-btn" type="button" onClick={() => handleEditClick(pub)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="action-btn delete-btn" type="button" onClick={() => handleDelete(pub.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <span className="pagination-text">Showing 1 to {publications.length} of {publications.length} entries</span>
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

        <div className="add-pub-section">
          <h2 className="form-title">{editingPub ? 'Edit Publication' : 'Add New Publication'}</h2>
          <form>
            <div className="form-group">
              <label>Content <span className="required">*</span></label>
              
              <div className="editor-container" style={{ border: '1px solid #e2e8f0', borderRadius: '5px', overflow: 'hidden', marginBottom: '24px' }}>
                <Editor
                  apiKey="gay7tvvz05utun98h7fbl382wq33n92ukos3du9ngok8xjjj"
                  value={formData.content}
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 380,
                    menubar: false,
                    branding: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'blocks | ' +
                      'bold italic underline | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'link image table | undo redo | removeformat | help',
                    content_style: 'body { font-family:Inter,sans-serif; font-size:14px; color:#334155; }'
                  }}
                />
              </div>
              
              <p className="editor-hint">Use the editor to add or format your publication content. You can insert tables, lists, links, images, and more.</p>
            </div>

            <div className="form-actions" style={{ marginTop: '40px' }}>
              <button type="button" className="btn-cancel" onClick={handleAddNewClick}>Cancel</button>
              <button type="button" className="btn-submit">{editingPub ? 'Update Publication' : 'Save Publication'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publication;
