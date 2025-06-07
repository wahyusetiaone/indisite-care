export interface Account {
    id: number;
    email: string;
    username: string;
    lastLoginAt: string | null;
    isActive: boolean;
}

export interface FetchAllAccountsParams {
    page: number; 
    size: number; 
    name?: string; 
}

export interface FetchAllAccountsResponse {
    success: boolean;
    message: string;
    data: {
        content: Account[]; 
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