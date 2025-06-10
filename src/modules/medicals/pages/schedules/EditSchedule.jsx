"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchScheduleById, updateSchedule } from "@/services/medicals/ScheduleService";
import { useRouter, useParams } from "next/navigation";

const initialForm = {
  doctor_id: "",
  polyclinic_id: "",
  day_of_week: "",
  start_time: "",
  end_time: "",
  is_available: true,
};

export default function EditSchedule() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const scheduleId = params.id;

  useEffect(() => {
    if (scheduleId) {
      setLoading(true);
      fetchScheduleById(scheduleId)
        .then((data) => {
          setForm({
            doctor_id: data.data.doctor_id || "",
            polyclinic_id: data.data.polyclinic_id || "",
            day_of_week: data.data.day_of_week || "",
            start_time: data.data.start_time || "",
            end_time: data.data.end_time || "",
            is_available: data.data.is_available ?? true,
          });
        })
        .catch(() => setError("Failed to fetch schedule data"))
        .finally(() => setLoading(false));
    }
  }, [scheduleId]);

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
      await updateSchedule(scheduleId, form);
      setSuccess(true);
      setTimeout(() => router.push("/page/clinic/schedules"), 1000);
    } catch (err) {
      setError(err?.message || "Failed to update schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Schedule</h5>
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
              <input
                type="text"
                name="doctor_id"
                className="form-control"
                value={form.doctor_id}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide doctor id</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Polyclinic ID</label>
              <input
                type="text"
                name="polyclinic_id"
                className="form-control"
                value={form.polyclinic_id}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide polyclinic id</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Day of Week</label>
              <input
                type="text"
                name="day_of_week"
                className="form-control"
                value={form.day_of_week}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide day of week</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Start Time</label>
              <input
                type="text"
                name="start_time"
                className="form-control"
                value={form.start_time}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please provide start time</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">End Time</label>
              <input
                type="text"
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
                {loading ? "Updating..." : "Update Schedule"}
              </button>
              {success && <div className="alert alert-success mt-2">Schedule updated successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

