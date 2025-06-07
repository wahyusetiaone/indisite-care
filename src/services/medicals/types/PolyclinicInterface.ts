export interface Polyclinic {
    id: number;
    name: string;
    floor: number;
    room_number: string;
    is_active: boolean;
}

export interface FetchAllPolyclinicsParams {
    page: number;
    size: number;
    name?: string;
    floor?: number;
    room_number?: string;
}

export interface FetchAllPolyclinicsResponse {
    success: boolean;
    message: string;
    data: {
        content: Polyclinic[];
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

export type CreatePolyclinicDto = {
    name: string;
    floor: number;
    room_number: string;
    is_active: boolean;
};

export type UpdatePolyclinicDto = Partial<CreatePolyclinicDto>;
