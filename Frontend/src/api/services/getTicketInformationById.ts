import apiClient from "../configs/axiosConfigs";

export const TicketPerId = {
  getInformation: async function (ticketId: any) {
    try {
      const response = await apiClient.request({
        url: `/ticket/ticket-hdr/${ticketId}`,
        method: "GET",
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching ticket information:", error);
    }
  },
};
