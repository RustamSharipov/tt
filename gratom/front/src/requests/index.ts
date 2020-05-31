import axios from 'axios';

import { IContact } from 'types';

const requests = {
  contacts: {
    fetch: () => axios.get('/api/contacts'),
  },
  contact: {
    add: (data: IContact) => axios.post('/api/contact/', data),
    fetch: (id: string) => axios.get(`/api/contact/${id}`),
    update: (id: string, data: any) => axios.patch(`/api/contact/${id}`, data),
    delete: (id: string) => axios.delete(`/api/contact/${id}`),
  },
};

export default requests;
