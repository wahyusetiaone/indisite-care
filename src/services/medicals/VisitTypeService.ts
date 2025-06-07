import { createAxiosWithAuth } from "@/helper/axiosHelper";
import {
  FetchAllVisitTypesParams,
  FetchAllVisitTypesResponse,
  CreateVisitTypeDto,
  UpdateVisitTypeDto,
} from "./types/VisitTypeInterface";

const proxy = "medical-api";
const axiosWithAuth = createAxiosWithAuth(proxy);

export const fetchAllVisitTypes = async (params: FetchAllVisitTypesParams) => {
  const response = await axiosWithAuth.get<FetchAllVisitTypesResponse>("/visit-types", { params });
  return response.data;
};

export const fetchVisitTypeById = async (id: string) => {
  const response = await axiosWithAuth.get(`/visit-types/${id}`);
  return response.data;
};

export const createVisitType = async (data: CreateVisitTypeDto) => {
  const response = await axiosWithAuth.post("/visit-types", data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const updateVisitType = async (id: string, data: UpdateVisitTypeDto) => {
  const response = await axiosWithAuth.put(`/visit-types/${id}`, data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const deleteVisitType = async (id: string) => {
  const response = await axiosWithAuth.delete(`/visit-types/${id}`);
  return response.data;
};
