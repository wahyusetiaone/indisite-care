"use client";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { fetchDoctorById } from "@/services/medicals/DoctorService";

export default function ShowDoctorModal({ doctorId, onClose }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    fetchDoctorById(doctorId)
      .then((data) => setDoctor(data.data))
      .catch(() => setError("Gagal memuat data dokter"))
      .finally(() => setLoading(false));
  }, [doctorId]);

  if (!doctorId) return null;

  return (
    <div
      className="modal modal-xl show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Dokter</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Memuat...</div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : doctor ? (
              <form className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">NIK</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.nik}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">ID Satu Sehat</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.satu_sehat_id}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.name}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Spesialisasi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.specialty}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Alamat</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.address}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Kota</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.city}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Telepon</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.phone}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nomor STR</label>
                  <input
                    type="text"
                    className="form-control"
                    value={doctor.str_number}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tanggal Mulai</label>
                  <input
                    type="date"
                    className="form-control"
                    value={doctor.start_date}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Aktif</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={doctor.is_active}
                      disabled
                      id="isActiveCheckShow"
                    />
                    <label className="form-check-label" htmlFor="isActiveCheckShow">
                      Aktif
                    </label>
                  </div>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
