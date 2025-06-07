export interface TreatmentType {
    id: number;
    name: string;
    category: string;
    is_active: boolean;
}

export interface FetchAllTreatmentTypesParams {
    page: number;
    size: number;
    name?: string;
    category?: string;
}

export interface FetchAllTreatmentTypesResponse {
    success: boolean;
    message: string;
    data: {
        content: TreatmentType[];
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

export type CreateTreatmentTypeDto = {
    name: string;
    category: string;
    is_active: boolean;
};

export type UpdateTreatmentTypeDto = Partial<CreateTreatmentTypeDto>;
