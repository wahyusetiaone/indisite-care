export interface Role {
    id: number;
    code: string;
    name: string;
    isActive: boolean;
}

export interface FetchAllRolesParams {
    page: number; 
    size: number; 
    name?: string; 
}

export interface FetchAllRolesResponse {
    success: boolean;
    message: string;
    data: {
        content: Role[]; 
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