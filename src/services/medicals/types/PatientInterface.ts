export interface PatientIdentity {
    id: number;
    full_name: string;
    phone_number: string;
    email: string;
    gender: string;
    blood_type: string;
    born: string;
    date_of_birth: string;
    identity_type: string;
    identity_number: string;
    name_of_mother: string;
    created_at: string;
    updated_at: string;
}

export interface PatientAddress {
    id: number;
    full_address: string;
    provincy: string;
    city: string;
    district: string;
    village: string;
    rt_rw: string;
    post_code: string;
    created_at: string;
    updated_at: string;
}

export interface PatientSocial {
    id: number;
    religion: string;
    marriage_status: string | null;
    education_status: string | null;
    work: string;
    language: string | null;
    created_at: string;
    updated_at: string;
}

export interface Patient {
    id: number;
    identity_id: number;
    address_id: number;
    social_id: number;
    created_at: string;
    updated_at: string;
    identity: PatientIdentity;
    address: PatientAddress;
    social: PatientSocial;
}

export interface FetchAllPatientsParams {
    page: number;
    size: number;
    full_name?: string;
    gender?: string;
    blood_type?: string;
}

export interface FetchAllPatientsResponse {
    success: boolean;
    message: string;
    data: {
        content: Patient[];
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

export type CreatePatientDto = {
    identity: Omit<PatientIdentity, 'id' | 'created_at' | 'updated_at'>;
    address: Omit<PatientAddress, 'id' | 'created_at' | 'updated_at'>;
    social: Omit<PatientSocial, 'id' | 'created_at' | 'updated_at'>;
};

export type UpdatePatientDto = Partial<CreatePatientDto>;
