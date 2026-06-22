import mockApi from './api.mock';
import realApi from './api.real';

const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

const api = useMockApi ? mockApi : realApi;

export default api;
