import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllBranchsParams, FetchAllBranchsResponse } from "./types/BranchInterface";

const proxy = "core-api"; 

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllBranchs = async (
    params: FetchAllBranchsParams
): Promise<FetchAllBranchsResponse> => {
    const response = await axiosWithAuth.get("/branches", { params });
    return response.data;
};