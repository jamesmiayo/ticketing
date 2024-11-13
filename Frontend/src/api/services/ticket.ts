import apiClient from '../configs/axiosConfigs';

interface TicketData {
  title: string;
  concern: string;
  subcategory_id: string;
  status: string;
}

export const ticketApi = {
  getTicketData: async function () {
    try {
      const response = await apiClient.request({
        url: '/ticket/ticket-hdr',
        method: 'GET',
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  createTicket: async function ({
    title,
    concern,
    subcategory_id,
    status,
  }: TicketData) {
    try {
      const response = await apiClient.request({
        url: '/ticket/ticket-hdr', // Adjust the endpoint as needed
        method: 'POST',
        data: {
          title,
          body: concern,
          subcategory_id,
          b_status:status,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },
};
