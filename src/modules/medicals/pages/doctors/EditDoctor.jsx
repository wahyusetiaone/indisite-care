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
        .catch((err) => setError("Failed to fetch doctor data"))
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
      setError(err?.message || "Failed to update doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Doctor</h5>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide name</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Specialty</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="specialty"
                  className="form-control"
                  placeholder="Enter Specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide specialty</div>
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
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide email address</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="solar:phone-calling-linear" />
                </span>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide phone number</div>
              </div>
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
                {loading ? "Updating..." : "Update Doctor"}
              </button>
              {success && <div className="alert alert-success mt-2">Doctor updated successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

