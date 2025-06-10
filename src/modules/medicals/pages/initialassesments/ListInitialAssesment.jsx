"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const ListInitialAssesment = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading] = useState(false);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        // handle search (API belum ada)
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <h4 className="card-title mb-3 d-flex align-items-center gap-2">
                        Daftar Initial Assessment
                        <span className="badge bg-warning text-dark ms-2" style={{fontSize: '0.8rem'}}>DEVELOPMENT</span>
                    </h4>
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
                            className="btn btn-outline-secondary bg-secondary-focus text-secondary-main d-flex align-items-center me-3"
                            disabled
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
                            href="/page/clinic/initialassesments/create"
                            className="btn bg-primary-light text-primary-600 rounded d-flex align-items-center ms-auto"
                        >
                            <Icon icon="ant-design:plus-outlined" className="icon me-2" />
                            Tambah Initial Assessment
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
                                        <th scope="col">Nama Pasien</th>
                                        <th scope="col">Tanggal Assessment</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={5} className="text-center">Tidak ada data</td>
                                    </tr>
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
                                    disabled
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                >
                                    Sebelumnya
                                </button>
                            </li>
                            <span>
                                Halaman 1 dari 1
                            </span>
                            <li className='page-item'>
                                <button
                                    disabled
                                    className='page-link bg-base border text-secondary-light fw-medium radius-8 border-0  py-10 d-flex align-items-center justify-content-center h-48-px'
                                >
                                    Berikutnya
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListInitialAssesment;
