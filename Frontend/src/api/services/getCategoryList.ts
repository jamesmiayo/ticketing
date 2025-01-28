import apiClient from "../configs/axiosConfigs";

export const getCategoryAPI = {
  getAllData: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/category",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getCategoryList: async function () {
    try {
      const response = await apiClient.request({
        url: "/list/maintenance/category",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newCategory: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/category",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },
  updateCategory: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/category/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteCategory: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/category/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  getAllSubCategory: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/sub-category",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  newSubCategory: async function (body: Record<string, any>) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/sub-category",
        method: "POST",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },
  updateSubCategory: async function ({
    body,
    id,
  }: {
    body: Record<string, any>;
    id: number;
  }) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/sub-category/${id}`,
        method: "PUT",
        data: body,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
  deleteSubCategory: async function (id: number) {
    try {
      const response = await apiClient.request({
        url: `/maintenance/sub-category/${id}`,
        method: "DELETE",
      });

      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },
};
