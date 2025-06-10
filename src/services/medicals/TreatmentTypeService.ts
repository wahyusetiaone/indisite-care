import { createAxiosWithAuth } from "@/helper/axiosHelper";
import {
  FetchAllTreatmentTypesParams,
  FetchAllTreatmentTypesResponse,
  CreateTreatmentTypeDto,
  UpdateTreatmentTypeDto,
} from "./types/TreatmentTypeInterface";

const proxy = "medical-api";
const axiosWithAuth = createAxiosWithAuth(proxy);

export const fetchAllTreatmentTypes = async (params: FetchAllTreatmentTypesParams) => {
  const response = await axiosWithAuth.get<FetchAllTreatmentTypesResponse>("/treatment-types", { params });
  return response.data;
};

export const fetchTreatmentTypeById = async (id: string) => {
  const response = await axiosWithAuth.get(`/treatment-types/${id}`);
  return response.data;
};

export const createTreatmentType = async (data: CreateTreatmentTypeDto) => {
  const response = await axiosWithAuth.post("/treatment-types", data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const updateTreatmentType = async (id: string, data: UpdateTreatmentTypeDto) => {
  const response = await axiosWithAuth.put(`/treatment-types/${id}`, data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const deleteTreatmentType = async (id: string) => {
  const response = await axiosWithAuth.delete(`/treatment-types/${id}`);
  return response.data;
};

export const fetchAllDataTreatmentTypes = async (searchQuery: string | null = null) => {
  const params = searchQuery ? { searchQuery: searchQuery } : {};
  const response = await axiosWithAuth.get("/treatment-types-all", { params });
  return response.data;
};
