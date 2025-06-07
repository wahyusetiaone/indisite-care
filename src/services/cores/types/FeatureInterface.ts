import {BranchType} from "@/services/cores/types/BranchTypeInterface";

export interface Feature {
    id: number;
    code: string;
    name: string;
    branchType: BranchType;
    isActive: boolean;
}

export interface FetchAllFeaturesParams {
    page: number; 
    size: number; 
    name?: string; 
}

export interface FetchAllFeaturesResponse {
    success: boolean;
    message: string;
    data: {
        content: Feature[]; 
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