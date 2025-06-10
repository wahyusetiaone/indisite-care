"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchVisitTypeById, updateVisitType } from "@/services/medicals/VisitTypeService";
import { useRouter, useParams } from "next/navigation";

const initialForm = {
  name: "",
  description: "",
  isActive: true,
};

export default function EditVisitType() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const visitTypeId = params.id;

  useEffect(() => {
    if (visitTypeId) {
      setLoading(true);
      fetchVisitTypeById(visitTypeId)
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
  }, [visitTypeId]);

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
      await updateVisitType(visitTypeId, form);
      setSuccess(true);
      setTimeout(() => router.push("/page/clinic/visittypes"), 1000);
    } catch (err) {
      setError(err?.message || "Gagal memperbarui jenis kunjungan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Jenis Kunjungan</h5>
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
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan nama</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Deskripsi</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={form.description}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan deskripsi</div>
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
                {loading ? "Memperbarui..." : "Perbarui Jenis Kunjungan"}
              </button>
              {success && <div className="alert alert-success mt-2">Jenis kunjungan berhasil diperbarui!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
