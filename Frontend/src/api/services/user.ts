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

  updateUserBranch: async function (user_id:any , data:any) {
    try {
      const response = await apiClient.request({
        url: '/user/branch',
        method: 'POST',
        data: {
          user_id,
          branch_id: data.branch_id,
        },
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error 
    }
  },

  updateUserSection: async function (user_id:any , data:any) {
    try {
      const response = await apiClient.request({
        url: '/user/section',
        method: 'POST',
        data: {
          user_id,
          section_id: data.section_id,
        },
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error 
    }
  },

  updateUserRole: async function (user_id:any , data:any) {
    try {
      const response = await apiClient.request({
        url: '/user/role',
        method: 'POST',
        data: {
          user_id,
          role_id: data.role_id,
        },
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error 
    }
  },
}
