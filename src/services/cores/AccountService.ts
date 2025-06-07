import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllAccountsParams, FetchAllAccountsResponse } from "./types/AccountInterface";

const proxy = "core-api"; 

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllAccounts = async (
    params: FetchAllAccountsParams
): Promise<FetchAllAccountsResponse> => {
    const response = await axiosWithAuth.get("/accounts", { params });
    return response.data;
};