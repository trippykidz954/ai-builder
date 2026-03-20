import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLead, getLeadNotes, addLeadNote } from '../api/leads';
import { queueLead } from '../api/calls';
import Navbar from '../components/Navbar';

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [message, setMessage] = useState('');

  const loadLead = async () => {
    try {
      const res = await getLead(id);
      setLead(res.data);
    } catch {
      setMessage('Failed to load lead');
    }
  };

  const loadNotes = async () => {
    try {
      const res = await getLeadNotes(id);
      setNotes(res.data || []);
    } catch {
      setMessage('Failed to load notes');
    }
  };

  useEffect(() => {
    loadLead();
    loadNotes();
  }, [id]);

  const onAddNote = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await addLeadNote(id, { text: noteText });
      setNoteText('');
      loadNotes();
    } catch {
      setMessage('Failed to add note');
    }
  };

  const onQueue = async () => {
    setMessage('');
    try {
      await queueLead(Number(id));
      setMessage('Lead added to outbound call queue');
    } catch {
      setMessage('Failed to queue lead');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Lead Details</h2>
        {message && <div style={{ marginBottom: 10 }}>{message}</div>}
        {!lead && <div>Loading...</div>}
        {lead && (
          <>
            <p><strong>ID:</strong> {lead.id}</p>
            <p><strong>Name:</strong> {lead.name}</p>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Phone:</strong> {lead.phone}</p>
            <p><strong>Status:</strong> {lead.status}</p>
            <button onClick={onQueue} style={{ marginBottom: 20 }}>
              Add to Call Queue
            </button>

            <h3>Notes</h3>
            <form onSubmit={onAddNote} style={{ marginBottom: 10 }}>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows="3"
                cols="50"
              />
              <br />
              <button type="submit">Add Note</button>
            </form>
            <ul>
              {notes.map((n) => (
                <li key={n.id}>
                  [{n.created_at}] {n.text}
                </li>
              ))}
              {notes.length === 0 && <li>No notes yet</li>}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
