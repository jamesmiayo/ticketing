import apiClient from '../configs/axiosConfigs'

export const OverviewAPI = {
  getAllData: async function () {
    try {
      const response = await apiClient.request({
        url: '/dashboard',
        method: 'GET',
      })
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error // Handle the error if needed in the calling function
    }
  },
}
