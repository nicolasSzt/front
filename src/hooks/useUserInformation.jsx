import { getAllUserInformation } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useUserInformation = () => {
  const { data = {}, isLoading, isError, error } = useQuery({
    queryKey: ["userInformation"],
    queryFn: () => getAllUserInformation(),
    enabled: true, 
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error en useQuery:", error);
    },
  });

  const users = data.users ?? [];

  return {
    users,
    isLoading,
    isError,
    error,
  };
};

export default useUserInformation;
