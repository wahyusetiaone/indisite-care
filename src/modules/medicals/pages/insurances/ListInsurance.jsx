"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchAllInsuranceTypes } from "@/services/medicals/InsuranceTypeService";
import { useLoaderTablePagination } from "@/helper/loaderTablePagination";

const ListInsurance = () => {
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
            await fetchAllInsuranceTypes({
                page: page,
                size: perPage,
                name: search || undefined,
            }),
        initialPage: 1,
        initialPerPage: 10,
    });

    const [searchQuery, setSearchQuery] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <h4 className="card-title mb-3">List Insurance Types</h4>
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
                            href="/page/clinic/insurances/create"
                            className="btn bg-primary-light text-primary-600 rounded d-flex align-items-center ms-auto"
                        >
                            <Icon icon="ant-design:plus-outlined" className="icon me-2" />
                            Add Insurance Type
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
                                        <th scope="col">Name</th>
                                        <th scope="col" className="text-center">
                                            Status
                                        </th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.content?.length > 0 ? (
                                        data.content.map((insurance, idx) => (
                                            <tr key={insurance.id}>
                                                <td>{idx + 1}</td>
                                                <td>{insurance.name}</td>
                                                <td className="text-center">
                                                    <span
                                                        className={`px-32 py-4 rounded-pill fw-medium text-sm
                                                        ${insurance.is_active
                                                            ? 'bg-success-focus text-success-main'
                                                            : 'bg-secondary text-secondary-dark'
                                                        }`}
                                                    >
                                                      {insurance.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-sm btn-info me-1" title="View">
                                                        <Icon icon="mdi:eye-outline" />
                                                    </button>
                                                    <button className="btn btn-sm btn-warning me-1" title="Edit">
                                                        <Icon icon="mdi:pencil-outline" />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" title="Delete">
                                                        <Icon icon="mdi:delete-outline" />
                                                    </button>
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
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        Page {pagination?.page} of {pagination?.totalPages || 1}
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page === 1}>
                            Previous
                        </button>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => goToPage(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListInsurance;
