import apiClient from "../configs/axiosConfigs";

export const Announcement = {
  getAnnouncement: async function () {
    try {
      const response = await apiClient.request({
        url: "/announcement",
        method: "GET",
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  createAnnouncement: async function (data:any) {
    try {
      const response = await apiClient.request({
        url: "/announcement",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            title: data.get("title"),
            description: data.get("description"),
            attachments: data.get("file"),
        },  
    });

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  updateAnnouncement: async function (data:any , announcement_id?:string) {
    try {
      const response = await apiClient.request({
        url: `/update/announcement/${announcement_id}`,
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: {
            title: data.get("title"),
            description: data.get("description"),
            attachments: data.get("file") || null,
        },  
    });

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
}