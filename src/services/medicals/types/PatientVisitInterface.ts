import { Patient } from "./PatientInterface";
import { InsuranceType } from "./InsuranceTypeInterface";
import { VisitType } from "./VisitTypeInterface";
import { TreatmentType } from "./TreatmentTypeInterface";
import { Polyclinic } from "./PolyclinicInterface";
import { Doctor } from "./DoctorInterface";
import {ResponsiblePerson} from "@/services/medicals/types/ResponsiblePersonInterface";

export interface PatientVisit {
    id: number;
    patient_id: number | null;
    responsible_person_id: number | null;
    insurance_type_id: number | null;
    visit_type_id: number | null;
    treatment_type_id: number | null;
    polyclinic_id: number | null;
    doctor_id: number | null;
    schedule: string;
    created_at: string;
    updated_at: string;
    patient?: Patient;
    responsible_person?: ResponsiblePerson;
    insurance_type?: InsuranceType;
    visit_type?: VisitType;
    treatment_type?: TreatmentType;
    polyclinic?: Polyclinic;
    doctor?: Doctor;
}


export interface FetchAllPatientVisitsParams {
    page: number;
    size: number;
    patient_id?: number;
    doctor_id?: number;
    polyclinic_id?: number;
    insurance_type_id?: number;
    visit_type_id?: number;
    treatment_type_id?: number;
    schedule?: string;
}

export interface FetchAllPatientVisitsResponse {
    success: boolean;
    message: string;
    data: {
        content: PatientVisit[];
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

export type CreatePatientVisitDto = {
    patient_id: number;
    insurance_type_id: number;
    visit_type_id: number;
    treatment_type_id: number;
    polyclinic_id: number;
    doctor_id: number;
    schedule: string;
};

export type UpdatePatientVisitDto = Partial<CreatePatientVisitDto>;
