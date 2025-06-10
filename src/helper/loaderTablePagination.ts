"use client";
import {useEffect, useState} from "react";

// Definisi tipe untuk data response dari API
interface PaginationResponse<T> {
    data: {
        content : T[],
        currentPage: number,
        totalPages: number,
        perPage: number,
        totalData: number,
        data?: {} | null,
        current_page?: number | null,
        total?: number | null,
        per_page?: number | null,
    }; 
    errors: [];
    message: string; 
    success: boolean;
    timestamp: string; 
}

// Tipe untuk fungsi fetch API
type FetchFunction<T> = (params: {
    page: number;
    perPage: number;
    search?: string;
    [key: string]: any; // Untuk data selain "page", "perPage", dan "search" (misalnya filter)
}) => Promise<PaginationResponse<T>>;

// Tipe untuk parameter penggunaan hook
interface UseLoaderTablePaginationParams<T> {
    fetchFunction: FetchFunction<T>; // Fungsi untuk fetch data dari API
    initialPage?: number; // Halaman awal (default: 1)
    initialPerPage?: number; // Jumlah data per halaman (default: 10)
}

// Tipe untuk informasi pagination
interface PaginationState {
    currentPage: number;
    totalPages: number;
    perPage: number;
    totalData: number;
}

// Hook untuk tabel, pagination, search, filter, dan export
export const useLoaderTablePagination = <T>({
                                                fetchFunction,
                                                initialPage = 1,
                                                initialPerPage = 10,
                                            }: UseLoaderTablePaginationParams<T>) => {
    // State untuk data tabel
    const [data, setData] = useState<T[]>([]); // Data berbentuk array
    const [loading, setLoading] = useState<boolean>(false);

    // State untuk pagination
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: initialPage,
        totalPages: 0,
        perPage: initialPerPage,
        totalData: 0,
    });

    // State untuk search dan filter
    const [searchQuery, setSearchQuery] = useState<string>(""); // Query pencarian
    const [filters, setFilters] = useState<Record<string, any>>({}); // Filter tambahan

    // Fungsi untuk mengambil data dari API
    const fetchData = async (page = pagination.currentPage, perPage = pagination.perPage) => {
        setLoading(true);
        try {
            // Panggil fungsi fetchFunction untuk mengambil data
            const response = await fetchFunction({
                page,
                perPage,
                search: searchQuery,
                ...filters,
            })

            console.log("Response from API:", response.data);
            // Set data tabel dan pagination
            let finalData = response?.data?.content;
            if (!Array.isArray(finalData) || finalData.length === 0) {
                const fallback = response?.data?.data;
                if (Array.isArray(fallback) && fallback.length > 0) {
                    // Bungkus fallback dalam objek baru dengan key 'content'
                    const dataObj = { content: fallback };
                    // @ts-ignore
                    finalData = dataObj;
                } else {
                    finalData = []; // fallback juga kosong
                }
            }

            setData(finalData);
            console.log("Response from DATA:", finalData);
            setPagination({
                currentPage: response.data.currentPage || page || response.data.current_page,
                totalPages: response.data.totalPages || Math.ceil(response.data.totalData / perPage) || response.data.total,
                perPage: response.data.perPage || perPage || response.data.per_page,
                totalData: response.data.totalData || response.data.total,
            });
            
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk navigasi halaman
    const goToPage = (page: number) => {
        if (page < 1 || page > pagination.totalPages) return;
        fetchData(page, pagination.perPage);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset halaman ke 1
    };

    const applyFilters = (newFilters: Record<string, any>) => {
        setFilters(newFilters);
        setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset halaman ke 1
    };


    // Fungsi untuk ekspor data ke Excel (stub untuk implementasi lebih lanjut)
    const exportToExcel = () => {
        console.log("Exporting data with filters and search:", { searchQuery, filters });
        // Tambahkan logika ekspor data, misalnya memanggil endpoint backend
    };

    const prevPage = () => goToPage(pagination.currentPage - 1);
    const nextPage = () => goToPage(pagination.currentPage + 1);
    
    useEffect(() => {
        fetchData()
    }, [searchQuery, filters, pagination.currentPage, pagination.perPage]);

    // Return state dan fungsi yang tersedia
    return {
        data,
        loading,
        pagination,
        fetchData,
        goToPage,
        handleSearch,
        applyFilters,
        exportToExcel,
        searchQuery,
        filters,
        nextPage
    };
};