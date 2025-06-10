"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef } from "react";
import { createPatient } from "@/services/medicals/PatientService";

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

export default function CreatePatient() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

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
      await createPatient(form);
      setSuccess(true);
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setError(err?.message || "Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Input Pasien</h5>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <h6>Identitas</h6>
            <div className="col-md-6">
              <label className="form-label">Nama Lengkap</label>
              <div className="icon-field has-validation">
                <span className="icon"><Icon icon="f7:person" /></span>
                <input type="text" name="full_name" className="form-control" placeholder="Masukkan Nama Lengkap" value={form.identity.full_name} onChange={e => handleChange('identity', e)} required />
                <div className="invalid-feedback">Silakan masukkan nama lengkap</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nomor Telepon</label>
              <div className="icon-field has-validation">
                <span className="icon"><Icon icon="solar:phone-calling-linear" /></span>
                <input type="text" name="phone_number" className="form-control" placeholder="Masukkan Nomor Telepon" value={form.identity.phone_number} onChange={e => handleChange('identity', e)} required />
                <div className="invalid-feedback">Silakan masukkan nomor telepon</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <div className="icon-field has-validation">
                <span className="icon"><Icon icon="mage:email" /></span>
                <input type="email" name="email" className="form-control" placeholder="Masukkan Email" value={form.identity.email} onChange={e => handleChange('identity', e)} required />
                <div className="invalid-feedback">Silakan masukkan email</div>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Jenis Kelamin</label>
              <input type="text" name="gender" className="form-control" placeholder="Jenis Kelamin" value={form.identity.gender} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan jenis kelamin</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Golongan Darah</label>
              <input type="text" name="blood_type" className="form-control" placeholder="Golongan Darah" value={form.identity.blood_type} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan golongan darah</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tempat Lahir</label>
              <input type="text" name="born" className="form-control" placeholder="Tempat Lahir" value={form.identity.born} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan tempat lahir</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tanggal Lahir</label>
              <input type="date" name="date_of_birth" className="form-control" value={form.identity.date_of_birth} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan tanggal lahir</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tipe Identitas</label>
              <input type="text" name="identity_type" className="form-control" placeholder="Tipe Identitas" value={form.identity.identity_type} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan tipe identitas</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nomor Identitas</label>
              <input type="text" name="identity_number" className="form-control" placeholder="Nomor Identitas" value={form.identity.identity_number} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan nomor identitas</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nama Ibu</label>
              <input type="text" name="name_of_mother" className="form-control" placeholder="Nama Ibu" value={form.identity.name_of_mother} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Silakan masukkan nama ibu</div>
            </div>
            <h6>Alamat</h6>
            <div className="col-md-6">
              <label className="form-label">Alamat Lengkap</label>
              <input type="text" name="full_address" className="form-control" placeholder="Alamat Lengkap" value={form.address.full_address} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan alamat lengkap</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Provinsi</label>
              <input type="text" name="provincy" className="form-control" placeholder="Provinsi" value={form.address.provincy} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan provinsi</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Kota</label>
              <input type="text" name="city" className="form-control" placeholder="Kota" value={form.address.city} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan kota</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Kecamatan</label>
              <input type="text" name="district" className="form-control" placeholder="Kecamatan" value={form.address.district} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan kecamatan</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Desa</label>
              <input type="text" name="village" className="form-control" placeholder="Desa" value={form.address.village} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan desa</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">RT/RW</label>
              <input type="text" name="rt_rw" className="form-control" placeholder="RT/RW" value={form.address.rt_rw} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan RT/RW</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Kode Pos</label>
              <input type="text" name="post_code" className="form-control" placeholder="Kode Pos" value={form.address.post_code} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Silakan masukkan kode pos</div>
            </div>
            <h6>Sosial</h6>
            <div className="col-md-4">
              <label className="form-label">Agama</label>
              <input type="text" name="religion" className="form-control" placeholder="Agama" value={form.social.religion} onChange={e => handleChange('social', e)} required />
              <div className="invalid-feedback">Silakan masukkan agama</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Status Pernikahan</label>
              <input type="text" name="marriage_status" className="form-control" placeholder="Status Pernikahan" value={form.social.marriage_status} onChange={e => handleChange('social', e)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Status Pendidikan</label>
              <input type="text" name="education_status" className="form-control" placeholder="Status Pendidikan" value={form.social.education_status} onChange={e => handleChange('social', e)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pekerjaan</label>
              <input type="text" name="work" className="form-control" placeholder="Pekerjaan" value={form.social.work} onChange={e => handleChange('social', e)} required />
              <div className="invalid-feedback">Silakan masukkan pekerjaan</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Bahasa</label>
              <input type="text" name="language" className="form-control" placeholder="Bahasa" value={form.social.language} onChange={e => handleChange('social', e)} />
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary-600" type="submit" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Formulir"}
              </button>
              {success && <div className="alert alert-success mt-2">Pasien berhasil dibuat!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
