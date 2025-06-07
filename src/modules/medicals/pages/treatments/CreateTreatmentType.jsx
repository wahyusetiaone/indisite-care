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
      setError(err?.message || "Failed to create treatment type");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input Treatment Type</h5>
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
                  <Icon icon="mdi:medical-bag" />
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
              <label className="form-label">Category</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:format-list-bulleted-type" />
                </span>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Enter Category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Please provide category</div>
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
              {success && <div className="alert alert-success mt-2">Treatment type created successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

