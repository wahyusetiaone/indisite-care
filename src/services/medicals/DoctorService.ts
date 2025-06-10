import { createAxiosWithAuth, createAxiosWithoutAuth } from "@/helper/axiosHelper";
import { FetchAllDoctorsParams, FetchAllDoctorsResponse, CreateDoctorDto, UpdateDoctorDto } from "./types/DoctorInterface";

const proxy = "medical-api";

const axiosWithAuth = createAxiosWithoutAuth(proxy);

export const fetchAllDoctors = async (
    params: FetchAllDoctorsParams
): Promise<FetchAllDoctorsResponse> => {
    const response = await axiosWithAuth.get("/doctors", { params });
    return response.data;
};

export const fetchDoctorById = async (id: number) => {
    const response = await axiosWithAuth.get(`/doctors/${id}`);
    return response.data;
};

export const createDoctor = async (data: CreateDoctorDto) => {
    const response = await axiosWithAuth.post("/doctors", data);
    return response.data;
};

export const updateDoctor = async (id: number, data: UpdateDoctorDto) => {
    const response = await axiosWithAuth.put(`/doctors/${id}`, data);
    return response.data;
};

export const deleteDoctor = async (id: number) => {
    const response = await axiosWithAuth.delete(`/doctors/${id}`);
    return response.data;
};

export const fetchAllDataDoctors = async (searchQuery: string | null = null) => {
    const params = searchQuery ? { searchQuery: searchQuery } : {};
    const response = await axiosWithAuth.get("/doctors-all", { params });
    return response.data;
};
