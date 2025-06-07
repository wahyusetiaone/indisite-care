import { Doctor } from "./DoctorInterface";
import { Polyclinic } from "./PolyclinicInterface";

export interface Schedule {
    id: number;
    doctor_id: number;
    polyclinic_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
    created_at: string;
    updated_at: string;
    doctor: Doctor;
    polyclinic: Polyclinic;
}

export interface FetchAllSchedulesParams {
    page: number;
    size: number;
    doctor_id?: number;
    polyclinic_id?: number;
    day_of_week?: string;
    is_available?: boolean;
}

export interface FetchAllSchedulesResponse {
    success: boolean;
    message: string;
    data: {
        content: Schedule[];
        totalPages: number;
        totalElements: number;
        pageNumber: number;
        pageSize: number;
        isFirst: boolean;
        isLast: boolean;
    };
    errors: null | any;
    timestamp: string;
}

export type CreateScheduleDto = {
    doctor_id: number;
    polyclinic_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
};

export type UpdateScheduleDto = Partial<CreateScheduleDto>;
