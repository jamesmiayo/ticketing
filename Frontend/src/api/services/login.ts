// Correct the import statement for apiClient
import apiClient from '../configs/axiosConfigs';

export const LoginAPI = {
  login: async function (request:any) {
    const response = await apiClient.request({
      url: '/auth/login',
      method: 'POST',
      data: {
        username: request.username,
        password: request.password,
      },
    });
    return Promise.resolve(response.data);
  },
};
