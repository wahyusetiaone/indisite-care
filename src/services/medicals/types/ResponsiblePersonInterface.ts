export interface ResponsiblePerson {
    id: number;
    full_name: string;
    national_id_number: string;
    date_of_birth: string;
    relationship_to_patient: string;
    gender: string;
    phone_number: string;
    address: string;
    created_at: string;
    updated_at: string;
}


export interface FetchAllResponsiblePersonsParams {
    page: number;
    size: number;
    full_name?: string;
}

export interface FetchAllResponsiblePersonsResponse {
    success: boolean;
    message: string;
    data: {
        content: ResponsiblePerson[];
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

export type CreateResponsiblePersonDto = Omit<ResponsiblePerson, "id" | "created_at" | "updated_at">;
export type UpdateResponsiblePersonDto = Partial<CreateResponsiblePersonDto>;
