import apiClient from "../configs/axiosConfigs";

export const FAQ = {
  getFAQ: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/FAQ-HDR",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newFAQ: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/FAQ-HDR",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating FAQ:", error);
      throw error;
    }
  },
  updateFAQ: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/FAQ-HDR/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteFAQ: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/FAQ-HDR/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating FAQ:", error);
      throw error;
    }
  },
  getFAQDTL: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/FAQ-DTL",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newFAQDTL: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/FAQ-DTL",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating FAQDTL", error);
      throw error;
    }
  },
  updateFAQDTL: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/FAQ-DTL/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteFAQDTL: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/FAQ-DTL/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating DTL:", error);
      throw error;
    }
  },
};
