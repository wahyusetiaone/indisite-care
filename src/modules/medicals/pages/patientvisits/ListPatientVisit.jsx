"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchAllPatientVisits, deletePatientVisit } from "@/services/medicals/PatientVisitService";
import { useLoaderTablePagination } from "@/helper/loaderTablePagination";
import ShowPatientVisitModal from "./ShowPatientVisitModal";
import { useConfirmDialog } from "@/components/ConfirmDialog";
import { showSuccess, showError } from "@/../contexts/toast";

const ListPatientVisit = () => {
    const {
        data,
        loading,
        pagination,
        fetchData,
        applyFilters,
        goToPage,
        handleSearch,
    } = useLoaderTablePagination({
        fetchFunction: async ({ page, perPage, search }) =>
            await fetchAllPatientVisits({
                page: page,
                size: perPage,
                name: search || undefined,
            }),
        initialPage: 1,
        initialPerPage: 10,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(null);
    const { show: showConfirm } = useConfirmDialog();

    const onSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleDelete = async (id) => {
        showConfirm("Are you sure to delete this data?", async () => {
            try {
                await deletePatientVisit(id);
                fetchData();
                showSuccess("Patient visit deleted successfully");
            } catch (err) {
                showError("Failed to delete patient visit");
            }
        });
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <h4 className="card-title mb-3">List Patient Visit</h4>
                    <div className="d-flex align-items-center">
                        <form className="navbar-search d-flex me-2" onSubmit={onSearchSubmit}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
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
                            href="/page/clinic/patientvisits/create"
                            className="btn bg-primary-light text-primary-600 rounded d-flex align-items-center ms-auto"
                        >
                            <Icon icon="ant-design:plus-outlined" className="icon me-2" />
                            Add Patient Visit
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {loading ? (
                            <div className="text-center">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <table className="table striped-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Patient Name</th>
                                        <th scope="col">Visit Date</th>
                                        <th scope="col" className="text-center">
                                            Status
                                        </th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.content?.length > 0 ? (
                                        data.content.map((visit, idx) => (
                                            <tr key={visit.id}>
                                                <td>{idx + 1}</td>
                                                <td>{visit.patient.identity.full_name || '-'}</td>
                                                <td>{visit.schedule || '-'}</td>
                                                <td className="text-center">
                                                    <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                                        {visit.is_active ? "Pending" : "Hadir"}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <Link
                                                        href="#"
                                                        className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                                        title="View"
                                                        onClick={() => setShowModal(visit.id)}
                                                    >
                                                        <Icon icon="iconamoon:eye-light" />
                                                    </Link>
                                                    <Link
                                                        className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                                        href={`/page/clinic/patientvisits/${visit.id}`}
                                                        title="Edit"
                                                    >
                                                        <Icon icon="lucide:edit" />
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                                        title="Delete"
                                                        onClick={() => handleDelete(visit.id)}
                                                    >
                                                        <Icon icon="mingcute:delete-2-line" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center">No data</td>
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
                                    disabled={pagination.page === 1}
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                    onClick={() => goToPage(pagination.page - 1)}
                                >
                                    Previous
                                </button>
                            </li>
                            <span>
                                Page {pagination.page} of {pagination.totalPages || 1}
                            </span>
                            <li className='page-item'>
                                <button
                                    disabled={pagination.page >= pagination.totalPages}
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                    onClick={() => goToPage(pagination.page + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {showModal && (
                    <ShowPatientVisitModal id={showModal} onClose={() => setShowModal(null)} />
                )}
            </div>
        </div>
    );
};

export default ListPatientVisit;
