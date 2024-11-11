import apiClient from '../configs/axiosConfigs'

export const ticketApi = {
  getTicketData: async function () {
    try {
      const response = await apiClient.request({
        url: '/ticket/ticket-hdr',
        method: 'GET',
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error // Handle the error if needed in the calling function
    }
  },
}
