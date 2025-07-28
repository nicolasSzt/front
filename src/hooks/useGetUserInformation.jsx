import { useQuery } from "@tanstack/react-query";
import { getUserInformation } from "@/services/userService";

export const useGetUserInformation = ({ userId }) => {

    const { data: userInformation = [], isLoading, isError, error } = useQuery({
        queryKey: ["userInformation",],
        queryFn: () => getUserInformation(),
        refetchOnWindowFocus: false,
    });
    
    const userName = userInformation.find((user) => user._id === userId)?.name

    return {
        userName,
        isLoading,
        isError,
        error,
    };
};

export default useGetUserInformation;

