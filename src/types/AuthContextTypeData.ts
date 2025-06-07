// Tipe untuk informasi akun
export interface Account {
    email: string;
    username: string;
}

// Tipe untuk role
export interface Role {
    id: number;
    code: string;
    name: string;
}

// Tipe untuk fitur di dalam branch
export interface Feature {
    id: number;
    code: string;
    name: string;
    hiddenKeys: {
        id: number;
        code: string;
        name: string;
        isHidden: boolean;
    }[];
}

// Tipe untuk branchType di dalam cabang
export interface BranchType {
    id: number;
    code: string;
    name: string;
    features: Feature[];
}

// Tipe untuk cabang
export interface Branch {
    id: number;
    code: string;
    name: string;
    address: string;
    phone: string;
    branchType: BranchType;
}

// Tipe untuk state
export type Roles = Role[];
export type Branches = Branch[];
export type Features = Feature[];