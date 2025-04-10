import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="btn-primary">Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default NotFound;