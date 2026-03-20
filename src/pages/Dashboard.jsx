import { useEffect, useState } from 'react';
import { getStats } from '../api/dashboard';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (err) {
        setError('Failed to load stats');
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Dashboard</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!stats && !error && <div>Loading...</div>}
        {stats && (
          <div>
            <p><strong>Total Leads:</strong> {stats.total_leads}</p>
            <p><strong>New Leads Today:</strong> {stats.new_leads_today}</p>
            <p><strong>Calls Made:</strong> {stats.calls_made}</p>
            <p><strong>Calls Answered:</strong> {stats.calls_answered}</p>
            <p><strong>Conversion Rate:</strong> {stats.conversion_rate}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
