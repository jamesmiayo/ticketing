import apiClient from "../configs/axiosConfigs";

interface TicketData {
  title: string;
  concern: string;
  subcategory_id: string;
  status: string;
  division_id: string;
  files:any;
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
          priority: data?.priority,
          title: data?.title,
          category_id: data?.category_id,
          subcategory_id: data?.subcategory_id,
          start_date: data?.start_date,
          status: data?.status,
          end_date: data?.end_date,
          requested_by: data?.requested_by,
          assigned_by: data?.assigned_by,
          branch_id: data?.branch_id,
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

  createTicket: async function (data: TicketData, FormData: any) {
    try {
      const response = await apiClient.request({
        url: "/ticket/ticket-hdr",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          division_id: data.division_id,
          title: data.title,
          body: data.concern,
          subcategory_id: data.subcategory_id,
          b_status: data.status,
          files: FormData.getAll('files')
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  createMessage: async function ({ ticket_id, message }: any) {
    try {
      const response = await apiClient.request({
        url: "/ticket/sent-message",
        method: "POST",
        data: {
          ticket_id,
          message,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  getMessage: async function ({ ticket_id }: any) {
    try {
      const response = await apiClient.request({
        url: `/ticket/sent-message/${ticket_id}`,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },
  getDocuments: async ({ ticket_id }: any) => {
    try {
      const response = await apiClient.get(
        `/ticket/documents?ticket_id=${ticket_id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  ticketAssignee: async function (ticket_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: "/ticket/assign",
        method: "POST",
        data: {
          ticket_id,
          message: data.message,
          emp_id: data.emp_id,
          remarks: data.remarks,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  updatePriority: async function (ticket_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: "/ticket/priority",
        method: "PUT",
        data: {
          ticket_id,
          priority: data.priority,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },
  updateRemarks: async function (ticket_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: `/ticket/update-remarks/${ticket_id}`,
        method: "PUT",
        data: data,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },
  uploadAttachment: async function (ticket_id: number, data: FormData) {
    try {
      const response = await apiClient.request({
        url: `/ticket/upload`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          thread_id: data.get("thread_id"),
          ticket_id: ticket_id,
          message: data.get("message"),
          attachments: data.getAll("attachments"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading attachment:", error);
      throw error;
    }
  },

  createSatisfactory: async function (ticket_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: "/ticket/satisfactory",
        method: "POST",
        data: {
          ticket_id,
          satisfactory_1: data.satisfactory_1,
          satisfactory_2: data.satisfactory_2,
          satisfactory_3: data.satisfactory_3,
          satisfactory_4: data.satisfactory_4,
          satisfactory_5: data.satisfactory_5,
          feedback: data.feedback,
          overall_satisfaction: data.overall_satisfaction,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  changeStatusTicket: async function (ticket_id: any , data: any) {
    try {
      const response = await apiClient.request({
        url: `/ticket/change-status/${ticket_id}`,
        method: "PUT",
        data: data
      });
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }
};
