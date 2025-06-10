"use client";
import React, { useEffect, useState } from "react";
import { fetchScheduleById } from "@/services/medicals/ScheduleService";

export default function ShowScheduleModal({ id, onClose }) {
  const [form, setForm] = useState({
    doctor_id: "",
    polyclinic_id: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
    is_available: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchScheduleById(id)
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
  }, [id]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Schedule Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <form className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">Doctor ID</label>
                  <input
                    type="text"
                    name="doctor_id"
                    className="form-control"
                    value={form.doctor_id}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Polyclinic ID</label>
                  <input
                    type="text"
                    name="polyclinic_id"
                    className="form-control"
                    value={form.polyclinic_id}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Hari</label>
                  <input
                    type="text"
                    name="day_of_week"
                    className="form-control"
                    value={form.day_of_week}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Jam Mulai</label>
                  <input
                    type="text"
                    name="start_time"
                    className="form-control"
                    value={form.start_time}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Jam Selesai</label>
                  <input
                    type="text"
                    name="end_time"
                    className="form-control"
                    value={form.end_time}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Available</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_available"
                      checked={form.is_available}
                      disabled
                      id="isAvailableCheckShow"
                    />
                    <label className="form-check-label" htmlFor="isAvailableCheckShow">
                      Is Available
                    </label>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
