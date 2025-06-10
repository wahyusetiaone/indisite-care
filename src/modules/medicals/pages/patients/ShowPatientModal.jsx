"use client";
import React, { useEffect, useState } from "react";
import { fetchPatientById } from "@/services/medicals/PatientService";

export default function ShowPatientModal({ id, onClose }) {
  const [form, setForm] = useState({
    identity: {},
    address: {},
    social: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchPatientById(id)
        .then((data) => {
          setForm({
            identity: data.data.identity || {},
            address: data.data.address || {},
            social: data.data.social || {},
          });
        })
        .catch(() => setError("Gagal memuat data pasien"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Pasien</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Memuat...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <form className="row gy-3">
                <h6>Identitas</h6>
                {Object.entries(form.identity).map(([key, value]) => (
                  <div className="col-md-6" key={key}>
                    <label className="form-label">{key.replace(/_/g, " ")}</label>
                    <input
                      type="text"
                      name={key}
                      className="form-control"
                      value={value || ""}
                      disabled
                    />
                  </div>
                ))}
                <h6>Alamat</h6>
                {Object.entries(form.address).map(([key, value]) => (
                  <div className="col-md-6" key={key}>
                    <label className="form-label">{key.replace(/_/g, " ")}</label>
                    <input
                      type="text"
                      name={key}
                      className="form-control"
                      value={value || ""}
                      disabled
                    />
                  </div>
                ))}
                <h6>Sosial</h6>
                {Object.entries(form.social).map(([key, value]) => (
                  <div className="col-md-6" key={key}>
                    <label className="form-label">{key.replace(/_/g, " ")}</label>
                    <input
                      type="text"
                      name={key}
                      className="form-control"
                      value={value || ""}
                      disabled
                    />
                  </div>
                ))}
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
