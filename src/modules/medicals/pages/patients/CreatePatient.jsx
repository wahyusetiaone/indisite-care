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
          <h5 className="card-title mb-0">Input Patient</h5>
        </div>
        <div className="card-body">
          <form
            className={`row gy-3 needs-validation${validated ? " was-validated" : ""}`}
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <h6>Identity</h6>
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <div className="icon-field has-validation">
                <span className="icon"><Icon icon="f7:person" /></span>
                <input type="text" name="full_name" className="form-control" placeholder="Enter Full Name" value={form.identity.full_name} onChange={e => handleChange('identity', e)} required />
                <div className="invalid-feedback">Please provide full name</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <div className="icon-field has-validation">
                <span className="icon"><Icon icon="solar:phone-calling-linear" /></span>
                <input type="text" name="phone_number" className="form-control" placeholder="Enter Phone Number" value={form.identity.phone_number} onChange={e => handleChange('identity', e)} required />
                <div className="invalid-feedback">Please provide phone number</div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <div className="icon-field has-validation">
                <span className="icon"><Icon icon="mage:email" /></span>
                <input type="email" name="email" className="form-control" placeholder="Enter Email" value={form.identity.email} onChange={e => handleChange('identity', e)} required />
                <div className="invalid-feedback">Please provide email</div>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Gender</label>
              <input type="text" name="gender" className="form-control" placeholder="Gender" value={form.identity.gender} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide gender</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Blood Type</label>
              <input type="text" name="blood_type" className="form-control" placeholder="Blood Type" value={form.identity.blood_type} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide blood type</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Born</label>
              <input type="text" name="born" className="form-control" placeholder="Born" value={form.identity.born} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide born</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input type="date" name="date_of_birth" className="form-control" value={form.identity.date_of_birth} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide date of birth</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Identity Type</label>
              <input type="text" name="identity_type" className="form-control" placeholder="Identity Type" value={form.identity.identity_type} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide identity type</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Identity Number</label>
              <input type="text" name="identity_number" className="form-control" placeholder="Identity Number" value={form.identity.identity_number} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide identity number</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Name of Mother</label>
              <input type="text" name="name_of_mother" className="form-control" placeholder="Name of Mother" value={form.identity.name_of_mother} onChange={e => handleChange('identity', e)} required />
              <div className="invalid-feedback">Please provide name of mother</div>
            </div>
            <h6>Address</h6>
            <div className="col-md-6">
              <label className="form-label">Full Address</label>
              <input type="text" name="full_address" className="form-control" placeholder="Full Address" value={form.address.full_address} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide full address</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Province</label>
              <input type="text" name="provincy" className="form-control" placeholder="Province" value={form.address.provincy} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide province</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">City</label>
              <input type="text" name="city" className="form-control" placeholder="City" value={form.address.city} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide city</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">District</label>
              <input type="text" name="district" className="form-control" placeholder="District" value={form.address.district} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide district</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Village</label>
              <input type="text" name="village" className="form-control" placeholder="Village" value={form.address.village} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide village</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">RT/RW</label>
              <input type="text" name="rt_rw" className="form-control" placeholder="RT/RW" value={form.address.rt_rw} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide RT/RW</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Post Code</label>
              <input type="text" name="post_code" className="form-control" placeholder="Post Code" value={form.address.post_code} onChange={e => handleChange('address', e)} required />
              <div className="invalid-feedback">Please provide post code</div>
            </div>
            <h6>Social</h6>
            <div className="col-md-4">
              <label className="form-label">Religion</label>
              <input type="text" name="religion" className="form-control" placeholder="Religion" value={form.social.religion} onChange={e => handleChange('social', e)} required />
              <div className="invalid-feedback">Please provide religion</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Marriage Status</label>
              <input type="text" name="marriage_status" className="form-control" placeholder="Marriage Status" value={form.social.marriage_status} onChange={e => handleChange('social', e)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Education Status</label>
              <input type="text" name="education_status" className="form-control" placeholder="Education Status" value={form.social.education_status} onChange={e => handleChange('social', e)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Work</label>
              <input type="text" name="work" className="form-control" placeholder="Work" value={form.social.work} onChange={e => handleChange('social', e)} required />
              <div className="invalid-feedback">Please provide work</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Language</label>
              <input type="text" name="language" className="form-control" placeholder="Language" value={form.social.language} onChange={e => handleChange('social', e)} />
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary-600" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit form"}
              </button>
              {success && <div className="alert alert-success mt-2">Patient created successfully!</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
