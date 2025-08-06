import axios, { type AxiosResponse } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const extractDataResponse = async <T>(promiseCallback: Promise<AxiosResponse<T, any>>) => {
  const response = await promiseCallback;
  return {
    status: response.status,
    data: response.data,
  };
};

const paramsSerializer = (params: object) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((subValue) => `${key}=${subValue}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');
};

const restClient = {
  get: async <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse(
      axios.get<T>(url, {
        params: params,
        paramsSerializer: paramsSerializer,
        ...config,
      }),
    );
  },
  post: <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse(axios.post<T>(url, params, config));
  },
  put: <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse(axios.put<T>(url, params, config));
  },
  patch: <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse(axios.patch<T>(url, params, config));
  },
  delete: <T>(url: string, params = {}) => {
    return extractDataResponse(
      axios.delete<T>(url, {
        data: params,
      }),
    );
  },
};

export default restClient;
