"use client";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { fetchInsuranceTypeById } from "@/services/medicals/InsuranceTypeService";

export default function ShowInsuranceModal({ id, onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchInsuranceTypeById(id)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            description: data.data.description || "",
            is_active: data.data.is_active ?? true,
          });
        })
        .catch(() => setError("Gagal memuat data jenis asuransi"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Jenis Asuransi</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Memuat...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <form className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">Nama</label>
                  <div className="icon-field">
                    <span className="icon">
                      <Icon icon="f7:person" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Deskripsi</label>
                  <div className="icon-field">
                    <span className="icon">
                      <Icon icon="mdi:text" />
                    </span>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      value={form.description}
                      disabled
                    />
                  </div>
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
