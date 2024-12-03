import apiClient from '../configs/axiosConfigs';

export const LogoutAPI = {
  logout: async function () {
    const response = await apiClient.request({
      url: '/logout',
      method: 'POST',
      data: {},
    });
    return Promise.resolve(response.data);
  },
};
