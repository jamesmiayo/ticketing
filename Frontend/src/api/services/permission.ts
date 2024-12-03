import apiClient from "../configs/axiosConfigs";

export const Permission = {
  getPermission: async function () {
    try {
      const response = await apiClient.request({
        url: "/maintenance/permission",
        method: "GET",
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  assignRolePermission: async function (role_id: string , data:any) {
    try {
      const response = await apiClient.request({
        url: "/maintenance/role-permission",
        method: "POST",
        data:{
            role_id,
            data
        }
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};
