import useSWR, { SWRConfiguration, mutate as globalMutate } from "swr";
import apiClient from "../api/configs/axiosConfigs";

const fetcher = async <T>(url: string, params?: any): Promise<T> => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error:any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error fetching data");
  }
};

export function useFetch<T>(endpoint: string, params?: any, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    [endpoint, params],  // Use params as a dependency
    ([url, queryParams]) => fetcher<T>(url, queryParams), // Pass params to fetcher
    {
      revalidateOnFocus: true,
      ...options,
    }
  );

  return { data, error, isLoading, mutate, globalMutate };
}
