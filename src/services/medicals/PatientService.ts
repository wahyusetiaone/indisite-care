import { createAxiosWithAuth } from "@/helper/axiosHelper";
import {
  FetchAllPatientsParams,
  FetchAllPatientsResponse,
  CreatePatientDto,
  UpdatePatientDto,
} from "./types/PatientInterface";

const proxy = "medical-api";
const axiosWithAuth = createAxiosWithAuth(proxy);

export const fetchAllPatients = async (params) => {
  const response = await axiosWithAuth.get("/patients", { params });
  return response.data;
};

export const fetchPatientById = async (id) => {
  const response = await axiosWithAuth.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (data) => {
  const response = await axiosWithAuth.post("/patients", data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const updatePatient = async (id, data) => {
  const response = await axiosWithAuth.put(`/patients/${id}`, data, {
    headers: { "Content-Type": "application/json" },
    transformRequest: [(data) => JSON.stringify(data)],
  });
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await axiosWithAuth.delete(`/patients/${id}`);
  return response.data;
};

export const fetchAllDataPatients = async (searchQuery: string | null = null) => {
  const params = searchQuery ? { searchQuery: searchQuery } : {};
  const response = await axiosWithAuth.get("/patients-all", { params });
  return response.data;
};
