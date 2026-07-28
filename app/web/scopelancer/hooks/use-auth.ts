import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/react";
import { client } from "@/lib/betterauth/client";
const {useSession} = createAuthClient();


export type Session = typeof client.$Infer.Session

export const useGetUser = () => {
    const {data, error, isPending} = useSession();
    
}


export const useGetUsers = () => {
    const {data, error, isPending} = useSession();

}