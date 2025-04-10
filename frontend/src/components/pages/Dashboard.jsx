import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/api';
import JobCard from '../jobs/JobCard';
import FilterControls from '../jobs/FilterControls';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    sortBy: 'applicationDate'
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs(filters);
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch job applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await jobService.deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (err) {
        setError('Failed to delete job application');
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Job Applications</h2>
        <Link to="/add" className="btn btn-primary">
          <button>Add New Job</button>
        </Link>
      </div>

      <FilterControls filters={filters} onFilterChange={handleFilterChange} />

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">Loading job applications...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center">
          <p>No job applications found. Start by adding your first job application!</p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <JobCard 
              key={job._id} 
              job={job} 
              onDelete={() => handleDeleteJob(job._id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;