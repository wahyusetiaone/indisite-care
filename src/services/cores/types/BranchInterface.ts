import {Organization} from "@/services/cores/types/OrganizationInterface";
import {BranchType} from "@/services/cores/types/BranchTypeInterface";

export interface Branch {
    id: number;
    code: string;
    name: string;
    address: string;
    phoneNumber: string;
    organization: Organization;
    branchType: BranchType;
    isActive: boolean;
}

export interface FetchAllBranchsParams {
    page: number; 
    size: number; 
    name?: string; 
}

export interface FetchAllBranchsResponse {
    success: boolean;
    message: string;
    data: {
        content: Branch[]; 
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