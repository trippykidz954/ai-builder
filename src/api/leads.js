import api from './client';

export const getLeads = () => api.get('/leads');
export const getLead = (id) => api.get('/leads/' + id);
export const createLead = (data) => api.post('/leads', data);
export const updateLead = (id, data) => api.put('/leads/' + id, data);
export const deleteLead = (id) => api.delete('/leads/' + id);
export const getLeadNotes = (id) => api.get('/leads/' + id + '/notes');
export const addLeadNote = (id, data) => api.post('/leads/' + id + '/notes', data);
