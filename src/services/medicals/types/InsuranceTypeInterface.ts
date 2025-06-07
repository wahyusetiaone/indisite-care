export interface InsuranceType {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
}

export interface FetchAllInsuranceTypesParams {
    page: number;
    size: number;
    name?: string;
}

export interface FetchAllInsuranceTypesResponse {
    success: boolean;
    message: string;
    data: {
        content: InsuranceType[];
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

export type CreateInsuranceTypeDto = {
    name: string;
    description?: string | null;
    is_active: boolean;
};

export type UpdateInsuranceTypeDto = Partial<CreateInsuranceTypeDto>;
