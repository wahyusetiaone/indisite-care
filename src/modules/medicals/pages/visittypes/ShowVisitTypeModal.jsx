"use client";
import React, { useEffect, useState } from "react";
import { fetchVisitTypeById } from "@/services/medicals/VisitTypeService";

export default function ShowVisitTypeModal({ id, onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchVisitTypeById(id)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            description: data.data.description || "",
            isActive: data.data.isActive ?? true,
          });
        })
        .catch(() => setError("Gagal mengambil data jenis kunjungan"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Jenis Kunjungan</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <form className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Deskripsi</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={form.description}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Aktif</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      disabled
                      id="isActiveCheckShow"
                    />
                    <label className="form-check-label" htmlFor="isActiveCheckShow">
                      Aktif
                    </label>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
