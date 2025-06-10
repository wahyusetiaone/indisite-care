"use client";
import React, { useEffect, useState } from "react";
import { fetchTreatmentTypeById } from "@/services/medicals/TreatmentTypeService";

export default function ShowTreatmentTypeModal({ id, onClose }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchTreatmentTypeById(id)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            category: data.data.category || "",
            is_active: data.data.is_active ?? true,
          });
        })
        .catch(() => setError("Gagal mengambil data jenis perawatan"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Jenis Perawatan</h5>
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
                  <label className="form-label">Kategori</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={form.category}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Aktif</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={form.is_active}
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
