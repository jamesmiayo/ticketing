import apiClient from "../configs/axiosConfigs";

interface ValidateToken {
  isValid: boolean;
  user: any;
  notifications: any;
  announcement:any;
}

export const validateToken = async (): Promise<ValidateToken> => {
  try {
    const response = await apiClient.request<ValidateToken>({
      url: "auth/validate-token",
      method: "POST",
    });
    return response.data;
  } catch (error) {
    console.error("Token validation failed:", error);

    return { isValid: false, user: null , notifications: null, announcement:null};
  }
};
