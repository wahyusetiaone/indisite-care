export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    phone: string;
    email: string;
    is_active: boolean;
}

export interface FetchAllDoctorsParams {
    page: number;
    size: number;
    name?: string;
    specialty?: string;
    is_active?: boolean;
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
    name: string;
    specialty: string;
    phone: string;
    email: string;
    is_active: boolean;
};

export type UpdateDoctorDto = Partial<CreateDoctorDto>;
