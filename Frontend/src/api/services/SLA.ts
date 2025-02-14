import apiClient from "../configs/axiosConfigs";

export const SLA = {
  getSLA: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/SLA",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getSLAReport: async function (params?:any) {
    try {
      const response = await apiClient.request({
        url: `/ticket/SLA-REPORT`,
        method: "GET",
        params: params
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newSLA: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/SLA",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating SLA:", error);
      throw error;
    }
  },
  updateSLA: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/SLA/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating SLA:", error);
      throw error;
    }
  },
  deleteSLA: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/SLA/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating SLA:", error);
      throw error;
    }
  },
  getSLADTL: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/SLA-DTL",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newSLADTL: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/SLA-DTL",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating SLADTL", error);
      throw error;
    }
  },
  updateSLADTL: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/SLA-DTL/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating SLA:", error);
      throw error;
    }
  },
  deleteSLADTL: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/SLA/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating SLA:", error);
      throw error;
    }
  },
};
