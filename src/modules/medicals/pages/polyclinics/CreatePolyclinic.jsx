"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createPolyclinic } from "@/services/medicals/PolyclinicService";

const initialForm = {
  name: "",
  floor: "",
  room_number: "",
  is_active: true,
};

export default function CreatePolyclinic() {
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
      // Convert floor to number before sending
      await createPolyclinic({ ...form, floor: Number(form.floor) });
      setSuccess(true);
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setError(err?.message || "Failed to create polyclinic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input Polyclinic</h5>
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
                  <Icon icon="mdi:hospital-building" />
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
              <label className="form-label">Floor</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:stairs" />
                </span>
                <input
                  type="number"
                  name="floor"
                  className="form-control"
                  placeholder="Enter Floor"
                  value={form.floor}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide floor</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Room Number</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:door" />
                </span>
                <input
                  type="text"
                  name="room_number"
                  className="form-control"
                  placeholder="Enter Room Number"
                  value={form.room_number}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide room number</div>
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
              {success && <div className="alert alert-success mt-2">Polyclinic created successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

