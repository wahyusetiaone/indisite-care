// Tipe dasar untuk data organisasi
export interface Organization {
    id: number;
    code: string;
    name: string;
    isActive: boolean;
}

// Tipe untuk parameter API "fetchAllOrganizations"
export interface FetchAllOrganizationsParams {
    page: number;  // Halaman data
    size: number;  // Jumlah data per halaman
    name?: string; // Filter berdasarkan nama (opsional)
}

// Tipe untuk response API "fetchAllOrganizations"
export interface FetchAllOrganizationsResponse {
    success: boolean;
    message: string;
    data: {
        content: Organization[]; // Konten berupa array organisasi
        totalPages: number;      // Total halaman
        totalElements: number;   // Total jumlah data
        pageNumber: number;      // Nomor halaman saat ini
        pageSize: number;        // Ukuran halaman
        isFirst: boolean;        // Apakah ini halaman pertama
        isLast: boolean;         // Apakah ini halaman terakhir
    };
    errors: null | any;       // Error jika ada
    timestamp: string;        // Timestamp dari API
}