"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import { fetchDoctorById, updateDoctor } from "@/services/medicals/DoctorService";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const initialForm = {
  name: "",
  specialty: "",
  phone: "",
  email: "",
  is_active: true,
};

export default function EditDoctor() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id;

  useEffect(() => {
    if (doctorId) {
      console.log(doctorId);
      setLoading(true);
      fetchDoctorById(doctorId)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            specialty: data.data.specialty || "",
            phone: data.data.phone || "",
            email: data.data.email || "",
            is_active: data.is_active ?? true,
          });
        })
        .catch((err) => setError("Gagal mengambil data dokter"))
        .finally(() => setLoading(false) );
    }
  }, [doctorId]);

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
      await updateDoctor(doctorId, form);
      setSuccess(true);
      setTimeout(() => router.push("/page/clinic/doctors"), 1000);
    } catch (err) {
      setError(err?.message || "Gagal memperbarui dokter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Dokter</h5>
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
                  <Icon icon="f7:person" />
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
              <label className="form-label">Spesialisasi</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
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
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mage:email" />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Masukkan Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Silakan masukkan alamat email</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Telepon</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="solar:phone-calling-linear" />
                </span>
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
                {loading ? "Memperbarui..." : "Perbarui Dokter"}
              </button>
              {success && <div className="alert alert-success mt-2">Dokter berhasil diperbarui!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
