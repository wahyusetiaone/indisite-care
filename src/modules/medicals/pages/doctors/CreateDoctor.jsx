"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createDoctor } from "@/services/medicals/DoctorService";
import Link from "next/link";

const initialForm = {
  nik: "",
  satu_sehat_id: "",
  name: "",
  specialty: "",
  address: "",
  city: "",
  phone: "",
  str_number: "",
  start_date: "",
  is_active: true,
};

export default function CreateDoctor() {
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
      await createDoctor(form);
      setSuccess(true);
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setError(err?.message || "Failed to create doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
            <Link
                href="/page/clinic/doctors"
                className="d-flex align-items-center text-primary-600"
                style={{ textDecoration: 'none' }}
            >
                <Icon icon="ic:round-arrow-back" className="icon me-2" style={{ fontSize: '1.5rem' }} />
                <h4 className="card-title mb-0">Buat Dokter</h4>
            </Link>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="col-md-6">
              <label className="form-label">NIK</label>
              <input
                type="text"
                name="nik"
                className="form-control"
                placeholder="Masukkan NIK"
                value={form.nik}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan NIK</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">ID Satu Sehat</label>
              <input
                type="text"
                name="satu_sehat_id"
                className="form-control"
                placeholder="Masukkan ID Satu Sehat"
                value={form.satu_sehat_id}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan ID Satu Sehat</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nama</label>
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
            <div className="col-md-6">
              <label className="form-label">Spesialisasi</label>
              <input
                type="text"
                name="specialty"
                className="form-control"
                placeholder="Masukkan Spesialisasi"
                value={form.specialty}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan spesialisasi</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Alamat</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Masukkan Alamat"
                value={form.address}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan alamat</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Kota</label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="Masukkan Kota"
                value={form.city}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan kota</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Telepon</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Masukkan Nomor Telepon"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan nomor telepon</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nomor STR</label>
              <input
                type="text"
                name="str_number"
                className="form-control"
                placeholder="Masukkan Nomor STR"
                value={form.str_number}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan nomor STR</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tanggal Mulai</label>
              <input
                type="date"
                name="start_date"
                className="form-control"
                value={form.start_date}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan tanggal mulai</div>
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
              {success && <div className="alert alert-success mt-2">Dokter berhasil dibuat!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
