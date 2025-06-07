import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllRolesParams, FetchAllRolesResponse } from "./types/RoleInterface";

const proxy = "core-api"; 

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllRoles = async (
    params: FetchAllRolesParams
): Promise<FetchAllRolesResponse> => {
    const response = await axiosWithAuth.get("/roles", { params });
    return response.data;
};