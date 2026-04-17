import { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/items/${editId}`, formData);
      } else {
        await api.post('/items', formData);
      }
      setIsModalOpen(false);
      setFormData({ title: '', description: '', status: 'Pending' });
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/items/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditModal = (item) => {
    setFormData({ title: item.title, description: item.description, status: item.status });
    setEditId(item._id);
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Tasks</h2>
        <button 
          className="btn" 
          style={{ width: 'auto' }} 
          onClick={() => {
            setFormData({ title: '', description: '', status: 'Pending' });
            setEditId(null);
            setIsModalOpen(true);
          }}
        >
          + Add New Task
        </button>
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : items.length === 0 ? (
        <div className="glass-panel text-center">
          <p style={{ color: 'var(--text-light)' }}>You have no tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <div key={item._id} className="glass-panel item-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3>{item.title}</h3>
                  <span className={`badge ${item.status === 'Pending' ? 'pending' : item.status === 'In Progress' ? 'progress' : 'completed'}`}>
                    {item.status}
                  </span>
                </div>
                <p>{item.description}</p>
              </div>
              <div className="item-actions">
                <button className="btn btn-secondary" style={{ padding: '0.4rem', fontSize: '0.9rem' }} onClick={() => openEditModal(item)}>Edit</button>
                <button className="btn btn-danger" style={{ padding: '0.4rem', fontSize: '0.9rem' }} onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editId ? 'Edit Task' : 'New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  className="form-input" 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn">{editId ? 'Save Changes' : 'Create Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
