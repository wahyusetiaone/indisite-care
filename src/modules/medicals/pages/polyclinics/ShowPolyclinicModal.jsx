"use client";
import React, { useEffect, useState } from "react";
import { fetchPolyclinicById } from "@/services/medicals/PolyclinicService";

export default function ShowPolyclinicModal({ id, onClose }) {
  const [form, setForm] = useState({
    name: "",
    floor: "",
    room_number: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchPolyclinicById(id)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            floor: data.data.floor || "",
            room_number: data.data.room_number || "",
            is_active: data.data.is_active ?? true,
          });
        })
        .catch(() => setError("Gagal memuat data poliklinik"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Poliklinik</h5>
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
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Lantai</label>
                  <input
                    type="number"
                    name="floor"
                    className="form-control"
                    value={form.floor}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nomor Ruangan</label>
                  <input
                    type="text"
                    name="room_number"
                    className="form-control"
                    value={form.room_number}
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
