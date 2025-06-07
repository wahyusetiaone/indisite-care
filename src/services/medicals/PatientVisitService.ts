import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllPatientVisitsParams, FetchAllPatientVisitsResponse, CreatePatientVisitDto, UpdatePatientVisitDto } from "./types/PatientVisitInterface";

const proxy = "medical-api";

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllPatientVisits = async (
    params: FetchAllPatientVisitsParams
): Promise<FetchAllPatientVisitsResponse> => {
    const response = await axiosWithAuth.get("/patient-visits", { params });
    return response.data;
};

export const fetchPatientVisitById = async (id: number) => {
    const response = await axiosWithAuth.get(`/patient-visits/${id}`);
    return response.data;
};

export const createPatientVisit = async (data: CreatePatientVisitDto) => {
    const response = await axiosWithAuth.post("/patient-visits", data);
    return response.data;
};

export const updatePatientVisit = async (id: number, data: UpdatePatientVisitDto) => {
    const response = await axiosWithAuth.put(`/patient-visits/${id}`, data);
    return response.data;
};

export const deletePatientVisit = async (id: number) => {
    const response = await axiosWithAuth.delete(`/patient-visits/${id}`);
    return response.data;
};
