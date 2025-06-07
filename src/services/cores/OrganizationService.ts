import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllOrganizationsParams, FetchAllOrganizationsResponse } from "./types/OrganizationInterface";

const proxy = "core-api"; 

const axiosWithAuth = createAxiosWithoutAuth(proxy);

// Service untuk mengambil data organisasi (dengan autentikasi)
export const fetchAllOrganizations = async (
    params: FetchAllOrganizationsParams
): Promise<FetchAllOrganizationsResponse> => {
    const response = await axiosWithAuth.get("/organizations", { params });
    return response.data;
};