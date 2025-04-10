import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    applicationDate: new Date(),
    link: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { company, role, status, applicationDate, link, notes } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, applicationDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!company || !role) {
      setError('Company and Role fields are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await jobService.createJob(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to add job application');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container card">
      <h2>Add New Job Application</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            placeholder="Enter job title/role"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="applicationDate">Application Date</label>
          <DatePicker
            id="applicationDate"
            selected={applicationDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="date-picker"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="link">Job Posting Link</label>
          <input
            type="url"
            id="link"
            name="link"
            value={link}
            onChange={handleChange}
            placeholder="https://example.com/job-posting"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={handleChange}
            placeholder="Add any additional notes about this application"
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;