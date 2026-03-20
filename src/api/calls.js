import api from './client';

export const queueLead = (lead_id) =>
  api.post('/calls/queue', { lead_id });

export const getNextFromQueue = () =>
  api.get('/calls/queue/next');

export const logCall = (data) =>
  api.post('/calls/log', data);
