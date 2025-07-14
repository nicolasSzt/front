import { useQuery, } from "@tanstack/react-query";
import { verification } from "@/services/verifyService";

export const useVerify = (verify_token) => {
    const { data: isVerified = false, refetch, isLoading, isError, error } = useQuery({
        queryKey: ["checkVerification"],
        queryFn: () => verification(verify_token),
        enabled: !!verify_token,
        refetchOnWindowFocus: false,
    });

    console.log("isVerified", isVerified)
    
    return {
        isVerified,
        refetch,
        isLoading,
        isError,
        error,
    };
};
