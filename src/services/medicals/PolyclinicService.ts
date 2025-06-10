import { createAxiosWithAuth } from "@/helper/axiosHelper";
import {
  FetchAllPolyclinicsParams,
  FetchAllPolyclinicsResponse,
  CreatePolyclinicDto,
  UpdatePolyclinicDto,
} from "./types/PolyclinicInterface";

const proxy = "medical-api";
const axiosWithAuth = createAxiosWithAuth(proxy);

export const fetchAllPolyclinics = async (params: FetchAllPolyclinicsParams) => {
  const response = await axiosWithAuth.get("/polyclinics", { params });
  return response.data;
};

export const fetchPolyclinicById = async (id: string) => {
  const response = await axiosWithAuth.get(`/polyclinics/${id}`);
  return response.data;
};

export const createPolyclinic = async (data: CreatePolyclinicDto) => {
  const response = await axiosWithAuth.post("/polyclinics", data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const updatePolyclinic = async (id: string, data: UpdatePolyclinicDto) => {
  const response = await axiosWithAuth.put(`/polyclinics/${id}`, data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const deletePolyclinic = async (id: string) => {
  const response = await axiosWithAuth.delete(`/polyclinics/${id}`);
  return response.data;
};

export const fetchAllDataPolyclinics = async (searchQuery: string | null = null) => {
  const params = searchQuery ? { searchQuery: searchQuery } : {};
  const response = await axiosWithAuth.get("/polyclinics-all", { params });
  return response.data;
};
