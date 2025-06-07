export interface BranchType {
    id: number;
    code: string;
    name: string;
    isActive: boolean;
}

export interface FetchAllBranchTypesParams {
    page: number; 
    size: number; 
    name?: string; 
}

export interface FetchAllBranchTypesResponse {
    success: boolean;
    message: string;
    data: {
        content: BranchType[]; 
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