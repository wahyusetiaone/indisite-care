"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createSchedule } from "@/services/medicals/ScheduleService";

const initialForm = {
  doctor_id: "",
  polyclinic_id: "",
  day_of_week: "",
  start_time: "",
  end_time: "",
  is_available: true,
};

export default function CreateSchedule() {
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
      await createSchedule({
        ...form,
        doctor_id: Number(form.doctor_id),
        polyclinic_id: Number(form.polyclinic_id),
      });
      setSuccess(true);
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setError(err?.message || "Failed to create schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input Schedule</h5>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="col-md-6">
              <label className="form-label">Doctor ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="number"
                  name="doctor_id"
                  className="form-control"
                  placeholder="Masukkan ID Dokter"
                  value={form.doctor_id}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Silakan masukkan ID Dokter</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Polyclinic ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mdi:hospital-building" />
                </span>
                <input
                  type="number"
                  name="polyclinic_id"
                  className="form-control"
                  placeholder="Masukkan ID Poliklinik"
                  value={form.polyclinic_id}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Silakan masukkan ID Poliklinik</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Day of Week</label>
              <input
                type="text"
                name="day_of_week"
                className="form-control"
                placeholder="Enter Day of Week"
                value={form.day_of_week}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide day of week</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                name="start_time"
                className="form-control"
                value={form.start_time}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide start time</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">End Time</label>
              <input
                type="time"
                name="end_time"
                className="form-control"
                value={form.end_time}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide end time</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Available</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                  id="isAvailableCheck"
                />
                <label className="form-check-label" htmlFor="isAvailableCheck">
                  Is Available
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary-600" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit form"}
              </button>
              {success && <div className="alert alert-success mt-2">Schedule created successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
