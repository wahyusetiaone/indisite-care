import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllFeaturesParams, FetchAllFeaturesResponse } from "./types/FeatureInterface";

const proxy = "core-api"; 

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllFeatures = async (
    params: FetchAllFeaturesParams
): Promise<FetchAllFeaturesResponse> => {
    const response = await axiosWithAuth.get("/branch-type-features", { params });
    return response.data;
};