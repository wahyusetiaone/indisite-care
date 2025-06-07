"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createDoctor } from "@/services/medicals/DoctorService";
import Link from "next/link";

const initialForm = {
  name: "",
  specialty: "",
  phone: "",
  email: "",
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
                <h4 className="card-title mb-0">Create Doctor</h4>
            </Link>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${
              validated ? " was-validated" : ""
            }`}
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
                {loading ? "Submitting..." : "Submit form"}
              </button>
              {success && <div className="alert alert-success mt-2">Doctor created successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
