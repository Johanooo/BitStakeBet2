import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AdminUser {
  id: string;
  username: string;
  role?: string;
}

interface AuthSession {
  authenticated: boolean;
  user?: AdminUser;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface SetupCredentials {
  username: string;
  password: string;
  email?: string;
}

async function fetchSession(): Promise<AuthSession> {
  const response = await fetch("/api/admin/auth/session", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }
  
  return response.json();
}

async function checkNeedsSetup(): Promise<boolean> {
  const response = await fetch("/api/admin/auth/needs-setup", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Failed to check setup status");
  }
  
  const data = await response.json();
  return data.needsSetup;
}

export function useAdminAuth() {
  const queryClient = useQueryClient();
  
  const { data: session, isLoading: sessionLoading } = useQuery<AuthSession>({
    queryKey: ["/api/admin/auth/session"],
    queryFn: fetchSession,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const { data: needsSetup, isLoading: setupCheckLoading } = useQuery<boolean>({
    queryKey: ["/api/admin/auth/needs-setup"],
    queryFn: checkNeedsSetup,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest("POST", "/api/admin/auth/login", credentials);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth/session"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/auth/logout", {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/admin/auth/session"], { authenticated: false });
    },
  });

  const setupMutation = useMutation({
    mutationFn: async (credentials: SetupCredentials) => {
      const response = await apiRequest("POST", "/api/admin/auth/setup", credentials);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth/session"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth/needs-setup"] });
    },
  });

  return {
    user: session?.user || null,
    isLoading: sessionLoading || setupCheckLoading,
    isAuthenticated: session?.authenticated || false,
    needsSetup: needsSetup || false,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    setup: setupMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSettingUp: setupMutation.isPending,
    loginError: loginMutation.error,
    setupError: setupMutation.error,
  };
}
