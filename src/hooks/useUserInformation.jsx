import { useQuery } from "@tanstack/react-query";
import { getAllUserInformation } from "@/services/userService";

export const useUserInformation = () => {
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUserInformation,
    refetchOnWindowFocus: false,
  });
  const users = data?.users || [];
  console.log("Users fetched:", users); 
  return {
    users, 
    isUserError,
    isUserLoading,
    error,
  };
};

export default useUserInformation;
