import {createAxiosWithAuth, createAxiosWithoutAuth} from "@/helper/axiosHelper";
import {
    FetchAllInsuranceTypesParams,
    FetchAllInsuranceTypesResponse,
    CreateInsuranceTypeDto,
    UpdateInsuranceTypeDto,
} from "./types/InsuranceTypeInterface";

const proxy = "medical-api";
const axiosWithAuth = createAxiosWithAuth(proxy);

export const fetchAllInsuranceTypes = async (params: FetchAllInsuranceTypesParams) => {
    const response = await axiosWithAuth.get("/insurance-types", { params });
    return response.data;
};

export const fetchInsuranceTypeById = async (id: string) => {
    const response = await axiosWithAuth.get(`/insurance-types/${id}`);
    return response.data;
};

export const createInsuranceType = async (data: CreateInsuranceTypeDto) => {
    const response = await axiosWithAuth.post("/insurance-types", data, {
        headers: { "Content-Type": "application/json" },
        transformRequest: [(data) => JSON.stringify(data)],
    });
    return response.data;
};

export const updateInsuranceType = async (id: string, data: UpdateInsuranceTypeDto) => {
    const response = await axiosWithAuth.put(`/insurance-types/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        transformRequest: [(data) => JSON.stringify(data)],
    });
    return response.data;
};

export const deleteInsuranceType = async (id: string) => {
    const response = await axiosWithAuth.delete(`/insurance-types/${id}`);
    return response.data;
};

export const fetchAllDataInsuranceTypes = async (searchQuery: string | null = null) => {
    const params = searchQuery ? { searchQuery: searchQuery } : {};
    const response = await axiosWithAuth.get("/insurance-types-all", { params });
    return response.data;
};
