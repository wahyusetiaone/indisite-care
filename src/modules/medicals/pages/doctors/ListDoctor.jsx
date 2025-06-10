"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchAllDoctors, deleteDoctor } from "@/services/medicals/DoctorService";
import { useLoaderTablePagination } from "@/helper/loaderTablePagination";
import ShowDoctorModal from "./ShowDoctorModal";

const ListDoctor = () => {
    const {
        data,
        loading,
        pagination,
        fetchData,
        applyFilters,
        prevPage,
        nextPage,
        handleSearch,
    } = useLoaderTablePagination({
        fetchFunction: async ({ page, perPage, search }) =>
            await fetchAllDoctors({
                page: page,
                size: perPage,
                name: search || undefined,
            }),
        initialPage: 1,
        initialPerPage: 10,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(null);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus dokter ini?")) return;
        try {
            await deleteDoctor(id);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus dokter");
        }
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <h4 className="card-title mb-3">Daftar Dokter</h4>
                    <div className="d-flex align-items-center">
                        <form className="navbar-search d-flex me-2" onSubmit={onSearchSubmit}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Cari"
                                className="form-control"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" style={{ border: "none", background: "none" }}>
                                <Icon icon="ion:search-outline" className="icon ms-2" />
                            </button>
                        </form>
                        <button
                            onClick={applyFilters}
                            className="btn btn-outline-secondary bg-secondary-focus text-secondary-main d-flex align-items-center me-3"
                        >
                            <Icon icon="material-symbols:filter-list" className="icon" />
                        </button>
                        <Link
                            href="#"
                            className="btn btn-outline-primary-600 bg-danger-focus text-danger-main d-flex align-items-center me-auto"
                        >
                            <Icon icon="fa-solid:file-excel" className="icon" />
                        </Link>
                        <Link
                            href="/page/clinic/doctors/create"
                            className="btn bg-primary-light text-primary-600 rounded d-flex align-items-center ms-auto"
                        >
                            <Icon icon="ant-design:plus-outlined" className="icon me-2" />
                            Tambah Dokter
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center">
                                <p>Memuat...</p>
                            </div>
                        ) : (
                            <table className="table striped-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Spesialisasi</th>
                                        <th scope="col" className="text-center">
                                            Status
                                        </th>
                                        <th scope="col" className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.content?.length > 0 ? (
                                        data.content.map((doctor, idx) => (
                                            <tr key={doctor.id}>
                                                <td>{idx+1}</td>
                                                <td>{doctor.name}</td>
                                                <td>{doctor.specialty || '-'}</td>
                                                <td className="text-center">
                                                    <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                                        {doctor.is_active ? "Aktif" : "Tidak Aktif"}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <Link
                                                        href='#'
                                                        className='w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center'
                                                        title="Lihat"
                                                        onClick={() => setShowModal(doctor.id)}
                                                    >
                                                        <Icon icon='iconamoon:eye-light' />
                                                    </Link>
                                                    <Link
                                                        className='w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center'
                                                        href={`/page/clinic/doctors/${doctor.id}`}
                                                        title="Edit"
                                                    >
                                                        <Icon icon='lucide:edit' />
                                                    </Link>
                                                    <Link
                                                        href='#'
                                                        className='w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center'
                                                        title="Hapus"
                                                        onClick={() => handleDelete(doctor.id)}
                                                    >
                                                        <Icon icon='mingcute:delete-2-line' />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        <ul className='pagination d-flex flex-wrap align-items-center gap-2 justify-content-center mt-24'>
                            <li className='page-item'>
                                <button
                                    disabled={pagination.currentPage === 1}
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                    onClick={prevPage}
                                >
                                    Sebelumnya
                                </button>
                            </li>
                            <span>
                                Halaman {pagination.currentPage} dari {pagination.totalPages}
                            </span>
                            <li className='page-item'>
                                <button
                                    disabled={pagination.currentPage >= pagination.totalPages}
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                    onClick={nextPage}
                                >
                                    Berikutnya
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {showModal && (
                <ShowDoctorModal doctorId={showModal} onClose={() => setShowModal(null)} />
            )}
        </div>
    );
};

export default ListDoctor;
