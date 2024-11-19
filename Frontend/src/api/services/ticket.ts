import apiClient from "../configs/axiosConfigs";

interface TicketData {
  title: string;
  concern: string;
  subcategory_id: string;
  status: string;
}

interface Category {
  id: number;
  category_description: string;
}

interface SubCategory {
  id: number;
  subcategory_description: string;
  category: Category;
  category_id: number;
}

interface User {
  id: number;
  name: string;
  branch?: string | null;
  branch_id?: number | null;
}

export interface TicketInformation {
  id: number;
  ticket_id: string;
  emp_id: number;
  subcategory_id: number;
  title: string;
  body: string;
  b_status: string;
  created_at: string;
  updated_at: string;
  sub_category?: SubCategory;
  ticket_status: string;
  user?: User;
}
interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

export const ticketApi = {
  getTicketData: async function (data: any, page?: string) {
    try {
      const response = await apiClient.request({
        url: `/ticket/ticket-hdr`,
        method: "GET",
        params: {
          page: page,
          ticket_id: data?.ticket_id,
          title: data?.title,
          category_id: data?.category_id,
          subcategory_id: data?.subcategory_id,
          start_date: data?.start_date,
          status: data?.status,
          end_date: data?.end_date,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getInformation: async function (ticketId: any) {
    try {
      const response = await apiClient.request<ApiResponse<TicketInformation>>({
        url: `/ticket/ticket-hdr/${ticketId}`,
        method: "GET",
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching ticket information:", error);
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
        url: "/ticket/ticket-hdr", // Adjust the endpoint as needed
        method: "POST",
        data: {
          title,
          body: concern,
          subcategory_id,
          b_status: status,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },
};
