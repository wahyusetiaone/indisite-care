"use client";
import React, { useEffect, useState } from "react";
import { fetchPatientVisitById } from "@/services/medicals/PatientVisitService";

const initialFormData = {
  patient_id: null,
  responsible_person_id: null,
  insurance_type_id: null,
  visit_type_id: null,
  treatment_type_id: null,
  polyclinic_id: null,
  doctor_id: null,
  schedule: "",
  patient: {
    identity: {
      full_name: "",
      phone_number: "",
      email: "",
      gender: "",
      blood_type: "",
      born: "",
      date_of_birth: "",
      identity_type: "",
      identity_number: "",
      name_of_mother: "",
    },
    address: {
      full_address: "",
      provincy: "",
      city: "",
      district: "",
      village: "",
      rt_rw: "",
      post_code: "",
    },
    social: {
      religion: "",
      marriage_status: "",
      education_status: "",
      work: "",
      language: "",
    },
  },
  insurance_type: {
    name: "",
    description: "",
    is_active: false,
  },
  visit_type: {
    name: "",
    description: "",
    isActive: false,
  },
  treatment_type: {
    name: "",
    category: "",
    is_active: false,
  },
  polyclinic: {
    name: "",
    floor: "",
    room_number: "",
    is_active: false,
  },
  doctor: {
    name: "",
    specialty: "",
    phone: "",
    email: "",
    is_active: false,
  },
  responsible_person: {
    full_name: "",
    national_id_number: "",
    date_of_birth: "",
    relationship_to_patient: "",
    gender: "",
    phone_number: "",
    address: "",
  },
};

const TABS = [
  { key: "identity", label: "Identitas Pasien" },
  { key: "responsible", label: "Penanggung Jawab" },
  { key: "insurance", label: "Asuransi" },
  { key: "visit", label: "Kunjungan" },
  { key: "treatment", label: "Tindakan" },
  { key: "polyclinic", label: "Poliklinik" },
  { key: "consent", label: "Persetujuan" },
  { key: "completed", label: "Selesai" },
];

export default function ShowPatientVisitModal({ id, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("identity");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchPatientVisitById(id)
        .then((res) => {
          const data = res.data;
          setFormData({
            patient_id: data.patient_id,
            insurance_type_id: data.insurance_type_id,
            visit_type_id: data.visit_type_id,
            treatment_type_id: data.treatment_type_id,
            polyclinic_id: data.polyclinic_id,
            doctor_id: data.doctor_id,
            schedule: data.schedule || "",
            patient: data.patient || initialFormData.patient,
            insurance_type: data.insurance_type || initialFormData.insurance_type,
            visit_type: data.visit_type || initialFormData.visit_type,
            treatment_type: data.treatment_type || initialFormData.treatment_type,
            polyclinic: data.polyclinic || initialFormData.polyclinic,
            doctor: data.doctor || initialFormData.doctor,
            responsible_person: data.responsible_person || initialFormData.responsible_person,
          });
        })
        .catch(() => setError("Failed to fetch patient visit data"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "identity":
        return (
          <div className="row gy-3">
            <div className="col-sm-6">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" value={formData.patient.identity.full_name} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-control" value={formData.patient.identity.phone_number} disabled />
            </div>
            <div className="col-12">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={formData.patient.identity.email} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Gender</label>
              <input type="text" className="form-control" value={formData.patient.identity.gender} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Blood Type</label>
              <input type="text" className="form-control" value={formData.patient.identity.blood_type} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Place of Birth</label>
              <input type="text" className="form-control" value={formData.patient.identity.born} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-control" value={formData.patient.identity.date_of_birth} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Identity Type</label>
              <input type="text" className="form-control" value={formData.patient.identity.identity_type} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Identity Number</label>
              <input type="text" className="form-control" value={formData.patient.identity.identity_number} disabled />
            </div>
            <div className="col-12">
              <label className="form-label">Mother's Name</label>
              <input type="text" className="form-control" value={formData.patient.identity.name_of_mother} disabled />
            </div>
            <div className="col-12 mt-3">
              <h6 className="text-md text-neutral-500">Patient Address</h6>
            </div>
            <div className="col-12">
              <label className="form-label">Full Address</label>
              <textarea className="form-control" value={formData.patient.address.full_address} disabled rows="2"></textarea>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Province</label>
              <input type="text" className="form-control" value={formData.patient.address.provincy} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">City</label>
              <input type="text" className="form-control" value={formData.patient.address.city} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">District</label>
              <input type="text" className="form-control" value={formData.patient.address.district} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Village</label>
              <input type="text" className="form-control" value={formData.patient.address.village} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">RT/RW</label>
              <input type="text" className="form-control" value={formData.patient.address.rt_rw} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Post Code</label>
              <input type="text" className="form-control" value={formData.patient.address.post_code} disabled />
            </div>
            <div className="col-12 mt-3">
              <h6 className="text-md text-neutral-500">Patient Social Information</h6>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Religion</label>
              <input type="text" className="form-control" value={formData.patient.social.religion} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Marriage Status</label>
              <input type="text" className="form-control" value={formData.patient.social.marriage_status} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Education Status</label>
              <input type="text" className="form-control" value={formData.patient.social.education_status} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Work</label>
              <input type="text" className="form-control" value={formData.patient.social.work} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Language</label>
              <input type="text" className="form-control" value={formData.patient.social.language} disabled />
            </div>
          </div>
        );
      case "responsible":
        return (
          <div className="row gy-3">
            <div className="col-sm-6">
              <label className="form-label">Nama Lengkap</label>
              <input type="text" className="form-control" value={formData.responsible_person?.full_name || "-"} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Nomor Identitas</label>
              <input type="text" className="form-control" value={formData.responsible_person?.national_id_number || "-"} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Tanggal Lahir</label>
              <input type="date" className="form-control" value={formData.responsible_person?.date_of_birth || "-"} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Hubungan dengan Pasien</label>
              <input type="text" className="form-control" value={formData.responsible_person?.relationship_to_patient || "-"} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Jenis Kelamin</label>
              <input type="text" className="form-control" value={formData.responsible_person?.gender || "-"} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Nomor Telepon</label>
              <input type="text" className="form-control" value={formData.responsible_person?.phone_number || "-"} disabled />
            </div>
            <div className="col-12">
              <label className="form-label">Alamat</label>
              <textarea className="form-control" value={formData.responsible_person?.address || "-"} disabled rows="2"></textarea>
            </div>
          </div>
        );
      case "insurance":
        return (
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">Insurance Name</label>
              <input type="text" className="form-control" value={formData.insurance_type.name} disabled />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={formData.insurance_type.description} disabled rows="2"></textarea>
            </div>
            <div className="col-12">
              <label className="form-label">Is Active</label>
              <input type="checkbox" className="form-check-input ms-2" checked={formData.insurance_type.is_active} disabled />
            </div>
          </div>
        );
      case "visit":
        return (
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">Visit Type Name</label>
              <input type="text" className="form-control" value={formData.visit_type.name} disabled />
            </div>
          </div>
        );
      case "treatment":
        return (
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">Treatment Name</label>
              <input type="text" className="form-control" value={formData.treatment_type.name} disabled />
            </div>
          </div>
        );
      case "polyclinic":
        return (
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">Jadwal Kunjungan</label>
              <input type="datetime-local" className="form-control" value={formData.schedule} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Nama Poliklinik</label>
              <input type="text" className="form-control" value={formData.polyclinic.name} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Lantai</label>
              <input type="number" className="form-control" value={formData.polyclinic.floor} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Nomor Ruangan</label>
              <input type="text" className="form-control" value={formData.polyclinic.room_number} disabled />
            </div>
            <div className="col-12">
              <label className="form-label">Poliklinik Aktif</label>
              <input type="checkbox" className="form-check-input ms-2" checked={formData.polyclinic.is_active} disabled />
            </div>
            <div className="col-12 mt-3">
              <h6 className="text-md text-neutral-500">Informasi Dokter</h6>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Nama Dokter</label>
              <input type="text" className="form-control" value={formData.doctor.name} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Spesialisasi</label>
              <input type="text" className="form-control" value={formData.doctor.specialty} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">NIK</label>
              <input type="text" className="form-control" value={formData.doctor.nik || ''} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Satu Sehat ID</label>
              <input type="text" className="form-control" value={formData.doctor.satu_sehat_id || ''} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Alamat</label>
              <input type="text" className="form-control" value={formData.doctor.address || ''} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Kota</label>
              <input type="text" className="form-control" value={formData.doctor.city || ''} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Nomor STR</label>
              <input type="text" className="form-control" value={formData.doctor.str_number || ''} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Tanggal Mulai</label>
              <input type="date" className="form-control" value={formData.doctor.start_date || ''} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Telepon</label>
              <input type="text" className="form-control" value={formData.doctor.phone} disabled />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={formData.doctor.email} disabled />
            </div>
            <div className="col-12">
              <label className="form-label">Dokter Aktif</label>
              <input type="checkbox" className="form-check-input ms-2" checked={formData.doctor.is_active} disabled />
            </div>
          </div>
        );
      case "consent":
        return (
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">Detail Persetujuan</label>
              <textarea className="form-control" value={formData.consent?.details || ""} disabled rows="3"></textarea>
            </div>
            <div className="col-12">
              <label className="form-label">Persetujuan Diberikan</label>
              <input type="checkbox" className="form-check-input ms-2" checked={formData.consent?.is_active || false} disabled />
            </div>
          </div>
        );
      case "completed":
        return (
          <div className="text-center mb-40">
            <img src="/assets/images/gif/success-img3.gif" alt="Success" className="gif-image mb-24" />
            <h6 className="text-md text-neutral-600">Completed</h6>
            <p className="text-neutral-400 text-sm mb-0">This patient visit data is read-only.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-xl"
        role="document"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Patient Visit Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <>
                <ul className="nav nav-tabs mb-3">
                  {TABS.map((tab) => (
                    <li className="nav-item" key={tab.key}>
                      <button
                        className={`nav-link${activeTab === tab.key ? " active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div>{renderTabContent()}</div>
              </>
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
