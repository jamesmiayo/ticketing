import apiClient from '../configs/axiosConfigs'

export const User = {
  getUser: async function () {
    try {
      const response = await apiClient.request({
        url: '/get-user',
        method: 'GET',
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error 
    }
  },

  getUserTicket: async function () {
    try {
      const response = await apiClient.request({
        url: '/user/ticket',
        method: 'GET',
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error 
    }
  },
}
