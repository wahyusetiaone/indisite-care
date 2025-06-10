"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createTreatmentType } from "@/services/medicals/TreatmentTypeService";

const initialForm = {
  name: "",
  category: "",
  is_active: true,
};

export default function CreateTreatmentType() {
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
      await createTreatmentType(form);
      setSuccess(true);
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setError(err?.message || "Gagal membuat jenis perawatan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input Jenis Perawatan</h5>
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
                  <Icon icon="mdi:medical-bag" />
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
              <label className="form-label">Kategori</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:format-list-bulleted-type" />
                </span>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Masukkan Kategori"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Silakan masukkan kategori</div>
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
              {success && <div className="alert alert-success mt-2">Jenis perawatan berhasil dibuat!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
