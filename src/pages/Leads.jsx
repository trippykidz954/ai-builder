import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeads, createLead } from '../api/leads';
import Navbar from '../components/Navbar';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const loadLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data || []);
    } catch (err) {
      setError('Failed to load leads');
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createLead(form);
      setForm({ name: '', email: '', phone: '' });
      loadLeads();
    } catch (err) {
      setError('Failed to create lead');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Leads</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <form onSubmit={onSubmit} style={{ marginBottom: 20 }}>
          <h3>Add Lead</h3>
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
              style={{ marginRight: 5 }}
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              style={{ marginRight: 5 }}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={onChange}
              style={{ marginRight: 5 }}
            />
            <button type="submit">Add</button>
          </div>
        </form>

        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <Link to={`/leads/${lead.id}`}>{lead.id}</Link>
                </td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.status}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan="5">No leads yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
