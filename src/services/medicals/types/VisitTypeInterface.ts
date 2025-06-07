export interface VisitType {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

export interface FetchAllVisitTypesParams {
    page: number; 
    size: number; 
    name?: string; 
}

export interface FetchAllVisitTypesResponse {
    success: boolean;
    message: string;
    data: {
        content: VisitType[]; 
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

export type CreateVisitTypeDto = {
    name: string;
    description: string;
    isActive: boolean;
};

export type UpdateVisitTypeDto = Partial<CreateVisitTypeDto>;
