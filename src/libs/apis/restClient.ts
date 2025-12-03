import ky from 'ky';

const api = ky.create({
  prefixUrl: '/api',
});

// ky의 prefixUrl 사용 시 URL 앞의 슬래시 제거
const normalizeUrl = (url: string) => url.replace(/^\/+/, '');

const extractDataResponse = async <T>(promiseCallback: Promise<Response>) => {
  const response = await promiseCallback;
  const data = (await response.json()) as T;
  return {
    status: response.status,
    data,
  };
};

const paramsSerializer = (params: object): URLSearchParams => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((subValue) => searchParams.append(key, subValue));
    } else {
      searchParams.append(key, String(value));
    }
  });
  return searchParams;
};

const restClient = {
  get: async <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse<T>(
      api.get(normalizeUrl(url), {
        searchParams: paramsSerializer(params),
        ...config,
      }),
    );
  },
  post: <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse<T>(api.post(normalizeUrl(url), { json: params, ...config }));
  },
  put: <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse<T>(api.put(normalizeUrl(url), { json: params, ...config }));
  },
  patch: <T>(url: string, params = {}, config = {}) => {
    return extractDataResponse<T>(api.patch(normalizeUrl(url), { json: params, ...config }));
  },
  delete: <T>(url: string, params = {}) => {
    return extractDataResponse<T>(api.delete(normalizeUrl(url), { json: params }));
  },
};

export default restClient;
