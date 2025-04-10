import { Link } from 'react-router-dom';

const JobCard = ({ job, onDelete }) => {
  const { _id, company, role, status, applicationDate, link } = job;

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'status-applied';
      case 'Interview':
        return 'status-interview';
      case 'Offer':
        return 'status-offer';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{company}</h3>
        <span className={`job-status ${getStatusClass(status)}`}>{status}</span>
      </div>
      <div className="job-card-body">
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Applied:</strong> {formatDate(applicationDate)}</p>
        {link && (
          <p>
            <strong>Link:</strong>{' '}
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Job Posting
            </a>
          </p>
        )}
      </div>
      <div className="job-card-footer">
        <div className="job-actions">
          <Link to={`/edit/${_id}`}>
            <button>Edit</button>
          </Link>
          <button className="btn-danger" onClick={() => onDelete(_id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;