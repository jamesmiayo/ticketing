import apiClient from "../configs/axiosConfigs";

export const User = {
  getUserNotification: async function () {
    try {
      const response = await apiClient.request({
        url: "/user/notification",
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getUser: async function (data: any) {
    try {
      const response = await apiClient.request({
        url: "/get-user",
        method: "GET",
        params: data,
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getUserProfile: async function () {
    try {
      const response = await apiClient.request({
        url: "/user/profile",
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getUserTicket: async function () {
    try {
      const response = await apiClient.request({
        url: "/user/ticket",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  updateUserBranch: async function (user_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: "/user/branch",
        method: "POST",
        data: {
          user_id,
          branch_id: data.branch_id,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  updateUserSection: async function (user_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: "/user/section",
        method: "POST",
        data: {
          user_id,
          section_id: data.section_id,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  updateUserRole: async function (user_id: any, data: any) {
    try {
      const response = await apiClient.request({
        url: "/user/role",
        method: "POST",
        data: {
          user_id,
          role_id: data.role_id,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  updateUserPhoneNumber: async function (data: any) {
    try {
      const response = await apiClient.request({
        url: "/user/phone-number",
        method: "POST",
        data: data
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  updateUserBranchSection: async function (data: any) {
    try {
      const response = await apiClient.request({
        url: "/user/branch-section",
        method: "POST",
        data: data,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  uploadProfile: async function (data: FormData) {
    try {
      const response = await apiClient.request({
        url: `/user/upload-profile`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          profile_picture: data.get("profile_picture"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  },
};
