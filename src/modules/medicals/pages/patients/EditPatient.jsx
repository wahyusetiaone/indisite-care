"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchPatientById, updatePatient } from "@/services/medicals/PatientService";
import { useRouter, useParams } from "next/navigation";

const initialForm = {
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
};

export default function EditPatient() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const patientId = params.id;

  useEffect(() => {
    if (patientId) {
      setLoading(true);
      fetchPatientById(patientId)
        .then((data) => {
          setForm({
            identity: { ...initialForm.identity, ...data.data.identity },
            address: { ...initialForm.address, ...data.data.address },
            social: { ...initialForm.social, ...data.data.social },
          });
        })
        .catch(() => setError("Gagal mengambil data pasien"))
        .finally(() => setLoading(false));
    }
  }, [patientId]);

  const handleChange = (section, e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
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
      await updatePatient(patientId, form);
      setSuccess(true);
      setTimeout(() => router.push("/page/clinic/patients"), 1000);
    } catch (err) {
      setError(err?.message || "Gagal memperbarui pasien");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Edit Pasien</h5>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <h6>Identitas</h6>
            {Object.entries(form.identity).map(([key, value]) => (
              <div className="col-md-6" key={key}>
                <label className="form-label">{key.replace(/_/g, " ")}</label>
                <input
                  type="text"
                  name={key}
                  className="form-control"
                  value={value || ""}
                  onChange={(e) => handleChange("identity", e)}
                  required={key === "full_name"}
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
                  onChange={(e) => handleChange("address", e)}
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
                  onChange={(e) => handleChange("social", e)}
                />
              </div>
            ))}
            <div className="col-md-12">
              <button className="btn btn-primary-600" type="submit" disabled={loading}>
                {loading ? "Memperbarui..." : "Perbarui Pasien"}
              </button>
              {success && <div className="alert alert-success mt-2">Pasien berhasil diperbarui!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
