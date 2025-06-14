"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createVisitType } from "@/services/medicals/VisitTypeService";

const initialForm = {
  name: "",
  description: "",
  isActive: true,
};

export default function CreateVisitType() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentForm = formRef.current;
    if (currentForm && !currentForm.checkValidity()) {
      setValidated(true);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createVisitType(form);
      setSuccess(true);
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setError(err?.message || "Gagal membuat jenis kunjungan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input Jenis Kunjungan</h5>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="col-md-6">
              <label className="form-label">Nama</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:clipboard-text" />
                </span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Masukkan Nama"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Silakan masukkan nama</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Deskripsi</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:text" />
                </span>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Masukkan Deskripsi"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Silakan masukkan deskripsi</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Aktif</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  id="isActiveCheck"
                />
                <label className="form-check-label" htmlFor="isActiveCheck">
                  Aktif
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary-600" type="submit" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Formulir"}
              </button>
              {success && <div className="alert alert-success mt-2">Jenis kunjungan berhasil dibuat!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
