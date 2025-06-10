export interface Doctor {
    id: number;
    nik: string;
    satu_sehat_id: string;
    name: string;
    specialty: string;
    address: string;
    city: string;
    phone: string;
    str_number: string;
    start_date: string;
    is_active: boolean;
}

export interface FetchAllDoctorsParams {
    page: number;
    size: number;
    name?: string;
    specialty?: string;
    is_active?: boolean;
    city?: string;
}

export interface FetchAllDoctorsResponse {
    success: boolean;
    message: string;
    data: {
        content: Doctor[];
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

export type CreateDoctorDto = {
    nik: string;
    satu_sehat_id: string;
    name: string;
    specialty: string;
    address: string;
    city: string;
    phone: string;
    str_number: string;
    start_date: string;
    is_active: boolean;
};

export type UpdateDoctorDto = Partial<CreateDoctorDto>;
