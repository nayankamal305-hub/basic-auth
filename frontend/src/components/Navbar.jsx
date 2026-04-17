import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-brand">MyApp</Link>
      <div className="nav-links">
        {token ? (
          <>
            <span style={{ marginRight: '1rem', color: 'var(--text-light)' }}>
              Hello, {user?.name}
            </span>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== '/login' && <Link to="/login" className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>Login</Link>}
            {location.pathname !== '/register' && <Link to="/register" className="btn" style={{ padding: '0.4rem 1rem' }}>Sign Up</Link>}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
