import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllBranchTypesParams, FetchAllBranchTypesResponse } from "./types/BranchTypeInterface";

const proxy = "core-api"; 

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllBranchTypes = async (
    params: FetchAllBranchTypesParams
): Promise<FetchAllBranchTypesResponse> => {
    const response = await axiosWithAuth.get("/branch-types", { params });
    return response.data;
};