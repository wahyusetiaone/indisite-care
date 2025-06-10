"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import { fetchInsuranceTypeById, updateInsuranceType } from "@/services/medicals/InsuranceTypeService";
import { useRouter, useParams } from "next/navigation";

const initialForm = {
  name: "",
  description: "",
  is_active: true,
};

export default function EditInsurance() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const insuranceId = params.id;

  useEffect(() => {
    if (insuranceId) {
      setLoading(true);
      fetchInsuranceTypeById(insuranceId)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            description: data.data.description || "",
            is_active: data.data.is_active ?? true,
          });
        })
        .catch(() => setError("Gagal mengambil data jenis asuransi"))
        .finally(() => setLoading(false));
    }
  }, [insuranceId]);

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
      await updateInsuranceType(insuranceId, form);
      setSuccess(true);
      setTimeout(() => router.push("/page/clinic/insurances"), 1000);
    } catch (err) {
      setError(err?.message || "Gagal memperbarui jenis asuransi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Jenis Asuransi</h5>
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
                {loading ? "Memperbarui..." : "Perbarui Jenis Asuransi"}
              </button>
              {success && <div className="alert alert-success mt-2">Jenis asuransi berhasil diperbarui!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
