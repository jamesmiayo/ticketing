import apiClient from '../configs/axiosConfigs'

export const Department = {
  getDepartment: async function () {
    try {
      const response = await apiClient.request({
        url: '/maintenance/department',
        method: 'GET',
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error 
    }
  },
}
