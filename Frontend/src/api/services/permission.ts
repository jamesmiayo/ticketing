import apiClient from '../configs/axiosConfigs'

export const Permission = {
  getPermission: async function () {
    try {
      const response = await apiClient.request({
        url: '/maintenance/permission',
        method: 'GET',
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  },
  assignRolePermission: async function (role_id: string, data: any) {
    try {
      const response = await apiClient.request({
        url: '/maintenance/role-permission',
        method: 'POST',
        data: {
          role_id,
          data,
        },
      })

      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  },
  newPermission: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: '/maintenance/permission',
        method: 'POST',
        data: body,
      })

      return response.data
    } catch (error) {
      console.error('Error creating Permission:', error)
      throw error
    }
  },
  updatePermission: async function ({
    body,
    id,
  }: {
    body: Record<string, any>
    id: number
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/permission/${id}`,
        method: 'PUT',
        data: body,
      })

      return response.data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },
  deletePermission: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/permission/${id}`,
        method: 'DELETE',
      })

      return response.data
    } catch (error) {
      console.error('Error updating Permission:', error)
      throw error
    }
  },
}
