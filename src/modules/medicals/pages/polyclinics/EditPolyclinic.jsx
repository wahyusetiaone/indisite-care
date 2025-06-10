"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchPolyclinicById, updatePolyclinic } from "@/services/medicals/PolyclinicService";
import { useRouter, useParams } from "next/navigation";

const initialForm = {
  name: "",
  floor: "",
  room_number: "",
  is_active: true,
};

export default function EditPolyclinic() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const polyclinicId = params.id;

  useEffect(() => {
    if (polyclinicId) {
      setLoading(true);
      fetchPolyclinicById(polyclinicId)
        .then((data) => {
          setForm({
            name: data.data.name || "",
            floor: data.data.floor || "",
            room_number: data.data.room_number || "",
            is_active: data.data.is_active ?? true,
          });
        })
        .catch(() => setError("Failed to fetch polyclinic data"))
        .finally(() => setLoading(false));
    }
  }, [polyclinicId]);

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
      await updatePolyclinic(polyclinicId, form);
      setSuccess(true);
      setTimeout(() => router.push("/page/clinic/polyclinics"), 1000);
    } catch (err) {
      setError(err?.message || "Failed to update polyclinic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Polyclinic</h5>
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
              <label className="form-label">Lantai</label>
              <input
                type="number"
                name="floor"
                className="form-control"
                value={form.floor}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan lantai</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nomor Ruangan</label>
              <input
                type="text"
                name="room_number"
                className="form-control"
                value={form.room_number}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Silakan masukkan nomor ruangan</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Active</label>
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
                  Is Active
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary-600" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Polyclinic"}
              </button>
              {success && <div className="alert alert-success mt-2">Polyclinic updated successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
