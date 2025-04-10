import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    applicationDate: new Date(),
    link: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { company, role, status, applicationDate, link, notes } = formData;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const job = await jobService.getJobById(id);
        setFormData({
          company: job.company,
          role: job.role,
          status: job.status,
          applicationDate: new Date(job.applicationDate),
          link: job.link || '',
          notes: job.notes || ''
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch job details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
      
      await jobService.updateJob(id, formData);
      navigate('/');
    } catch (err) {
      setError('Failed to update job application');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !company) {
    return <div className="text-center">Loading job details...</div>;
  }

  return (
    <div className="form-container card">
      <h2>Edit Job Application</h2>
      
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
            {loading ? 'Saving...' : 'Update Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;