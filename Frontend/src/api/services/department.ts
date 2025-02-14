import apiClient from "../configs/axiosConfigs";

export const Department = {
  getDepartment: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/department",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getDepartmentList: async function () {
    try {
      const response = await apiClient.request({
        url: "/list/maintenance/department",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newDepartment: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/department",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating department:", error);
      throw error;
    }
  },
  updateDepartment: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/department/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteDepartment: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/department/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating department:", error);
      throw error;
    }
  },
};
