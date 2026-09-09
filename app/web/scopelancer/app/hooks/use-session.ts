import { api } from "@/lib/axios/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Get sessions
export const getSessions = useQuery({
  queryKey: ["sessions"],
  queryFn: async () => {
    const response = await api.get("/api/sessions/users");
    return response.data;
  },
});

// Get session by ID
export const getSessionById = (id: string) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const response = await api.get(`/api/sessions/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
