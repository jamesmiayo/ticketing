import apiClient from '../configs/axiosConfigs'

export const getCategoryAPI = {
  getAllData: async function () {
    try {
      const response = await apiClient.request({
        url: '/maintenance/category',
        method: 'GET',
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error // Handle the error if needed in the calling function
    }
  },
}
