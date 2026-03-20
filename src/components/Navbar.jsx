import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!auth) return null;

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to="/leads" style={{ marginRight: 10 }}>Leads</Link>
      <Link to="/call-room" style={{ marginRight: 10 }}>Call Room</Link>
      <span style={{ marginRight: 10 }}>({auth.user?.email})</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
