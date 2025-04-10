import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Student Job Tracker</Link>
      </h1>
      <ul className="navbar-nav">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/add">Add Job</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;