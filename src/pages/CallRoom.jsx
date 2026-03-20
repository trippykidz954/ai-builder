import { useState } from 'react';
import { getNextFromQueue, logCall } from '../api/calls';
import Navbar from '../components/Navbar';

export default function CallRoom() {
  const [current, setCurrent] = useState(null);
  const [result, setResult] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const onNext = async () => {
    setMessage('');
    setCurrent(null);
    try {
      const res = await getNextFromQueue();
      if (!res.data) {
        setMessage('No leads in queue');
      } else {
        setCurrent(res.data);
      }
    } catch {
      setMessage('Failed to get next lead');
    }
  };

  const onLog = async () => {
    if (!current) return;
    setMessage('');
    try {
      await logCall({
        lead_id: current.lead_id || current.id,
        result,
        notes,
      });
      setResult('');
      setNotes('');
      setCurrent(null);
      setMessage('Call logged');
    } catch {
      setMessage('Failed to log call');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>AI Call Room</h2>
        {message && <div style={{ marginBottom: 10 }}>{message}</div>}
        <button onClick={onNext} style={{ marginBottom: 20 }}>
          Get Next Lead
        </button>

        {!current && <div>No active lead</div>}
        {current && (
          <div style={{ border: '1px solid #ccc', padding: 10 }}>
            <h3>Current Lead</h3>
            <p><strong>ID:</strong> {current.id}</p>
            <p><strong>Name:</strong> {current.name}</p>
            <p><strong>Email:</strong> {current.email}</p>
            <p><strong>Phone:</strong> {current.phone}</p>

            <h4>Call Result</h4>
            <input
              placeholder="Result (answered, voicemail, no answer, etc.)"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              style={{ width: '100%', marginBottom: 10 }}
            />
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              cols="50"
            />
            <br />
            <button onClick={onLog} style={{ marginTop: 10 }}>
              Log Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
