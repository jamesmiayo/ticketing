import apiClient from "../configs/axiosConfigs";

export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await apiClient.request<{ isValid: boolean }>({
      url: "auth/validate-token",
      method: "POST",
    });

    return response.data.isValid;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};
