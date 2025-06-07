"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchAllFeatures } from "@/services/cores/FeatureService"; 
import { useLoaderTablePagination } from "@/helper/loaderTablePagination"; 

const ListFeature = () => {
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
            await fetchAllFeatures({
                page: page - 1, 
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
                    {/* Card Title */}
                    <h4 className="card-title mb-3">List Feature</h4>

                    <div className="d-flex align-items-center">
                        {/* Search Bar */}
                        <form className="navbar-search d-flex me-2" onSubmit={onSearchSubmit}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="form-control"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search state
                            />
                            <button type="submit" style={{ border: "none", background: "none" }}>
                                <Icon icon="ion:search-outline" className="icon ms-2" />
                            </button>
                        </form>


                        {/* Filter Icon */}
                        <button
                            onClick={applyFilters}
                            className="btn btn-outline-secondary bg-secondary-focus text-secondary-main d-flex align-items-center me-3"
                        >
                            <Icon icon="material-symbols:filter-list" className="icon" />
                        </button>

                        {/* Excel Icon */}
                        <Link
                            href="#"
                            className="btn btn-outline-primary-600 bg-danger-focus text-danger-main d-flex align-items-center me-auto"
                        >
                            <Icon icon="fa-solid:file-excel" className="icon" />
                        </Link>

                        {/* Add Button */}
                        <Link
                            href="#"
                            className="btn bg-primary-light text-primary-600 rounded d-flex align-items-center ms-auto"
                        >
                            <Icon icon="ant-design:plus-outlined" className="icon me-2" />
                            Add Feature
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {loading ? ( // Loader
                            <div className="text-center">
                                <p>Loading...</p>
                            </div>
                        ) : (
                        <table className="table striped-table mb-0">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Code </th>
                                <th scope="col" className="text-center">
                                    Status
                                </th>
                                <th scope="col">Branch </th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.length === 0 ? ( // Tampilkan jika data kosong
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No data found.
                                    </td>
                                </tr>
                            ) : (
                                data.map((org, index) => (
                                    <tr key={org.id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <h6 className="text-md mb-0 fw-normal">{org.name}</h6>
                                                    <span className="text-sm text-secondary-light fw-normal">
                                                    Company
                                                </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{org.code}</td>
                                        <td className="text-center">
                                        <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                            {org.isActive ? "Active" : "Inactive"}
                                        </span>
                                        </td>
                                        <td>{org.branchType.name}</td>
                                        <td>
                                            <Link
                                                href='#'
                                                className='w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center'
                                            >
                                                <Icon icon='iconamoon:eye-light' />
                                            </Link>
                                            <Link
                                                href='#'
                                                className='w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center'
                                            >
                                                <Icon icon='lucide:edit' />
                                            </Link>
                                            <Link
                                                href='#'
                                                className='w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center'
                                            >
                                                <Icon icon='mingcute:delete-2-line' />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
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
                                    onClick={goToPage(pagination.currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>
                            <span>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <li className='page-item'>
                                <button
                                    disabled={pagination.currentPage >= pagination.totalPages}
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                    onClick={goToPage(pagination.currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            {/* card end */}
        </div>
    )
}

export default ListFeature