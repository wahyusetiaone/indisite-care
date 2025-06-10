"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { fetchAllDataInsuranceTypes } from "@/services/medicals/InsuranceTypeService";
import { fetchAllDataVisitTypes } from "@/services/medicals/VisitTypeService";
import { fetchAllDataTreatmentTypes } from "@/services/medicals/TreatmentTypeService";
import { fetchAllDataPolyclinics } from "@/services/medicals/PolyclinicService";
import { fetchAllDataDoctors } from "@/services/medicals/DoctorService";
import { fetchPatientVisitById, updatePatientVisit } from "@/services/medicals/PatientVisitService";
import { useRouter, useParams } from "next/navigation";
import { showSuccess, showError } from "@/../contexts/toast";

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

const EditPatientVisit = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [insuranceTypes, setInsuranceTypes] = useState([]);
    const [visitTypes, setVisitTypes] = useState([]);
    const [treatmentTypes, setTreatmentTypes] = useState([]);
    const [polyclinics, setPolyclinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const formRef = useRef(null);
    const router = useRouter();
    const params = useParams();
    const visitId = params.id;

    // Fetch dropdown data on mount
    useEffect(() => {
        fetchAllDataInsuranceTypes().then(res => setInsuranceTypes(res.data));
        fetchAllDataVisitTypes().then(res => setVisitTypes(res.data));
        fetchAllDataTreatmentTypes().then(res => setTreatmentTypes(res.data));
        fetchAllDataPolyclinics().then(res => setPolyclinics(res.data));
        fetchAllDataDoctors().then(res => setDoctors(res.data));
    }, []);

    // Fetch patient visit data by id
    useEffect(() => {
        if (visitId) {
            fetchPatientVisitById(visitId)
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
                        responsible_person_id: data.responsible_person_id || initialFormData.responsible_person_id,
                        responsible_person: data.responsible_person || initialFormData.responsible_person,
                    });
                })
                .catch(() => setError("Failed to fetch patient visit data"));
        }
    }, [visitId]);

    // Effect to manage step visibility and active classes
    useEffect(() => {
        if (formRef.current) {
            const fieldsets = formRef.current.querySelectorAll(".wizard-fieldset");
            const wizardItems = formRef.current.querySelectorAll(".form-wizard-list__item");
            fieldsets.forEach((fieldset, index) => {
                if (index === currentStep) {
                    fieldset.classList.add("show");
                } else {
                    fieldset.classList.remove("show");
                }
            });
            wizardItems.forEach((item, index) => {
                if (index <= currentStep) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        }
    }, [currentStep]);

    // Handle input changes with nested state updates
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nameParts = name.split('.');
        if (nameParts.length === 3) {
            const [section, subSection, field] = nameParts;
            setFormData((prevData) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [subSection]: {
                        ...prevData[section][subSection],
                        [field]: type === "checkbox" ? checked : value,
                    },
                },
            }));
        } else if (nameParts.length === 2) {
            const [section, field] = nameParts;
            setFormData((prevData) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [field]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    // Step navigation
    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    // Dropdown handlers
    const handleInsuranceSelect = (e) => {
        const selectedName = e.target.value;
        const selected = insuranceTypes.find(i => i.name === selectedName);
        setFormData(prev => ({
            ...prev,
            insurance_type_id: selected ? selected.id : null,
            insurance_type: {
                ...prev.insurance_type,
                name: selectedName,
            },
        }));
    };
    const handleVisitTypeSelect = (e) => {
        const selectedName = e.target.value;
        const selected = visitTypes.find(i => i.name === selectedName);
        setFormData(prev => ({
            ...prev,
            visit_type_id: selected ? selected.id : null,
            visit_type: {
                ...prev.visit_type,
                name: selectedName,
            },
        }));
    };
    const handleTreatmentTypeSelect = (e) => {
        const selectedName = e.target.value;
        const selected = treatmentTypes.find(i => i.name === selectedName);
        setFormData(prev => ({
            ...prev,
            treatment_type_id: selected ? selected.id : null,
            treatment_type: {
                ...prev.treatment_type,
                name: selectedName,
            },
        }));
    };
    const handlePolyclinicSelect = (e) => {
        const selectedName = e.target.value;
        const selected = polyclinics.find(i => i.name === selectedName);
        setFormData(prev => ({
            ...prev,
            polyclinic_id: selected ? selected.id : null,
            polyclinic: {
                ...prev.polyclinic,
                name: selectedName,
            },
        }));
    };
    const handleDoctorSelect = (e) => {
        const selectedName = e.target.value;
        const selected = doctors.find(i => i.name === selectedName);
        setFormData(prev => ({
            ...prev,
            doctor_id: selected ? selected.id : null,
            doctor: {
                ...prev.doctor,
                name: selectedName,
            },
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            await updatePatientVisit(visitId, formData);
            showSuccess("Patient visit updated successfully!");
            setSuccess(true);
            setTimeout(() => router.push("/page/clinic/patientvisits"), 1000);
        } catch (err) {
            showError(err?.message || "Failed to update patient visit");
            setError(err?.message || "Failed to update patient visit");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <Link
                        href="/page/clinic/patientvisits"
                        className="d-flex align-items-center text-primary-600"
                        style={{ textDecoration: 'none' }}
                    >
                        <Icon icon="ic:round-arrow-back" className="icon me-2" style={{ fontSize: '1.5rem' }} />
                        <h4 className="card-title mb-0">Edit Patient Visit</h4>
                    </Link>
                </div>
                <div className="card-body">
                    <h6 className="mb-4 text-xl">Edit Registration Step</h6>
                    <p className="text-neutral-500">Edit details and proceed next steps.</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">Patient visit updated successfully!</div>}
                    <div className="form-wizard">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                                <ul className="list-unstyled form-wizard-list style-two">
                                    <li className={`form-wizard-list__item ${currentStep >= 0 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">1</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Identitas Pasien</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 1 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">2</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Penanggung Jawab</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 2 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">3</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Asuransi</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 3 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">4</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Kunjungan</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 4 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">5</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Tindakan</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 5 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">6</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Poliklinik</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 6 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">7</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Persetujuan</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 7 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">8</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Selesai</span>
                                    </li>
                                </ul>
                            </div>
                            {/* Step 1: Identity Patient (no patient dropdown) */}
                            <fieldset className={`wizard-fieldset ${currentStep === 0 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Patient Identity & Address</h6>
                                <div className="row gy-3">
                                    {/* PatientIdentity Fields */}
                                    <div className="col-sm-6">
                                        <label className="form-label">Full Name*</label>
                                        <input type="text" name="patient.identity.full_name" className="form-control wizard-required" placeholder="Enter Full Name" value={formData.patient.identity.full_name} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Phone Number*</label>
                                        <input type="text" name="patient.identity.phone_number" className="form-control wizard-required" placeholder="Enter Phone Number" value={formData.patient.identity.phone_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email*</label>
                                        <input type="email" name="patient.identity.email" className="form-control wizard-required" placeholder="Enter Email" value={formData.patient.identity.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Gender*</label>
                                        <select name="patient.identity.gender" className="form-control wizard-required" value={formData.patient.identity.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Blood Type*</label>
                                        <select name="patient.identity.blood_type" className="form-control wizard-required" value={formData.patient.identity.blood_type} onChange={handleChange}>
                                            <option value="">Select Blood Type</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Place of Birth*</label>
                                        <input type="text" name="patient.identity.born" className="form-control wizard-required" placeholder="Enter Place of Birth" value={formData.patient.identity.born} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Date of Birth*</label>
                                        <input type="date" name="patient.identity.date_of_birth" className="form-control wizard-required" value={formData.patient.identity.date_of_birth} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Identity Type*</label>
                                        <select name="patient.identity.identity_type" className="form-control wizard-required" value={formData.patient.identity.identity_type} onChange={handleChange}>
                                            <option value="">Select Identity Type</option>
                                            <option value="KTP">KTP</option>
                                            <option value="SIM">SIM</option>
                                            <option value="Passport">Passport</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Identity Number*</label>
                                        <input type="text" name="patient.identity.identity_number" className="form-control wizard-required" placeholder="Enter Identity Number" value={formData.patient.identity.identity_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Mother's Name*</label>
                                        <input type="text" name="patient.identity.name_of_mother" className="form-control wizard-required" placeholder="Enter Mother's Name" value={formData.patient.identity.name_of_mother} onChange={handleChange} />
                                    </div>
                                    {/* PatientAddress Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Patient Address</h6>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Full Address*</label>
                                        <textarea name="patient.address.full_address" className="form-control wizard-required" placeholder="Enter Full Address" value={formData.patient.address.full_address} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Province*</label>
                                        <input type="text" name="patient.address.provincy" className="form-control wizard-required" placeholder="Enter Province" value={formData.patient.address.provincy} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">City*</label>
                                        <input type="text" name="patient.address.city" className="form-control wizard-required" placeholder="Enter City" value={formData.patient.address.city} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">District*</label>
                                        <input type="text" name="patient.address.district" className="form-control wizard-required" placeholder="Enter District" value={formData.patient.address.district} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Village*</label>
                                        <input type="text" name="patient.address.village" className="form-control wizard-required" placeholder="Enter Village" value={formData.patient.address.village} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">RT/RW*</label>
                                        <input type="text" name="patient.address.rt_rw" className="form-control wizard-required" placeholder="Enter RT/RW" value={formData.patient.address.rt_rw} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Post Code*</label>
                                        <input type="text" name="patient.address.post_code" className="form-control wizard-required" placeholder="Enter Post Code" value={formData.patient.address.post_code} onChange={handleChange} />
                                    </div>
                                    {/* PatientSocial Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Patient Social Information</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Religion*</label>
                                        <input type="text" name="patient.social.religion" className="form-control wizard-required" placeholder="Enter Religion" value={formData.patient.social.religion} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Marriage Status</label>
                                        <input type="text" name="patient.social.marriage_status" className="form-control" placeholder="Enter Marriage Status" value={formData.patient.social.marriage_status} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Education Status</label>
                                        <input type="text" name="patient.social.education_status" className="form-control" placeholder="Enter Education Status" value={formData.patient.social.education_status} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Work*</label>
                                        <input type="text" name="patient.social.work" className="form-control wizard-required" placeholder="Enter Work" value={formData.patient.social.work} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Language</label>
                                        <input type="text" name="patient.social.language" className="form-control" placeholder="Enter Language" value={formData.patient.social.language} onChange={handleChange} />
                                    </div>
                                    <div className="form-group text-end mt-4">
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 2: Penanggung Jawab */}
                            <fieldset className={`wizard-fieldset ${currentStep === 1 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Penanggung Jawab</h6>
                                <div className="row gy-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Nama Lengkap*</label>
                                        <input type="text" name="responsible_person.full_name" className="form-control wizard-required" placeholder="Masukkan Nama Lengkap" value={formData.responsible_person?.full_name || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nomor Identitas*</label>
                                        <input type="text" name="responsible_person.national_id_number" className="form-control wizard-required" placeholder="Masukkan Nomor Identitas" value={formData.responsible_person?.national_id_number || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Tanggal Lahir*</label>
                                        <input type="date" name="responsible_person.date_of_birth" className="form-control wizard-required" value={formData.responsible_person?.date_of_birth || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Hubungan dengan Pasien*</label>
                                        <input type="text" name="responsible_person.relationship_to_patient" className="form-control wizard-required" placeholder="Masukkan Hubungan" value={formData.responsible_person?.relationship_to_patient || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Jenis Kelamin*</label>
                                        <select name="responsible_person.gender" className="form-control wizard-required" value={formData.responsible_person?.gender || ""} onChange={handleChange}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Male">Laki-laki</option>
                                            <option value="Female">Perempuan</option>
                                            <option value="Other">Lainnya</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nomor Telepon*</label>
                                        <input type="text" name="responsible_person.phone_number" className="form-control wizard-required" placeholder="Masukkan Nomor Telepon" value={formData.responsible_person?.phone_number || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Alamat*</label>
                                        <textarea name="responsible_person.address" className="form-control wizard-required" placeholder="Masukkan Alamat" value={formData.responsible_person?.address || ""} onChange={handleChange} rows="2"></textarea>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 3: Insurance */}
                            <fieldset className={`wizard-fieldset ${currentStep === 2 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Insurance Information</h6>
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">Insurance Name*</label>
                                        <select name="insurance_type.name" className="form-control wizard-required" value={formData.insurance_type.name} onChange={handleInsuranceSelect}>
                                            <option value="">Select Insurance</option>
                                            {Array.isArray(insuranceTypes) && insuranceTypes.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Description</label>
                                        <textarea name="insurance_type.description" className="form-control" placeholder="Enter Description" value={formData.insurance_type.description} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="insurance_type.is_active" id="insuranceIsActive" checked={formData.insurance_type.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="insuranceIsActive">
                                                Is Active
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 4: On Visit */}
                            <fieldset className={`wizard-fieldset ${currentStep === 3 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">On Visit Details</h6>
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">Visit Type Name*</label>
                                        <select name="visit_type.name" className="form-control wizard-required" value={formData.visit_type.name} onChange={handleVisitTypeSelect}>
                                            <option value="">Select Visit Type</option>
                                            {Array.isArray(visitTypes) && visitTypes.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 5: Treatment */}
                            <fieldset className={`wizard-fieldset ${currentStep === 4 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Treatment Details</h6>
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">Treatment Name*</label>
                                        <select name="treatment_type.name" className="form-control wizard-required" value={formData.treatment_type.name} onChange={handleTreatmentTypeSelect}>
                                            <option value="">Select Treatment</option>
                                            {Array.isArray(treatmentTypes) && treatmentTypes.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 6: Polyclinic */}
                            <fieldset className={`wizard-fieldset ${currentStep === 5 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Polyclinic & Doctor</h6>
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">Visit Schedule*</label>
                                        <input type="datetime-local" name="schedule" className="form-control wizard-required" value={formData.schedule} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Polyclinic Name*</label>
                                        <select name="polyclinic.name" className="form-control wizard-required" value={formData.polyclinic.name} onChange={handlePolyclinicSelect}>
                                            <option value="">Select Polyclinic</option>
                                            {Array.isArray(polyclinics) && polyclinics.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Floor*</label>
                                        <input type="number" name="polyclinic.floor" className="form-control wizard-required" placeholder="Enter Floor Number" value={formData.polyclinic.floor} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Room Number*</label>
                                        <input type="text" name="polyclinic.room_number" className="form-control wizard-required" placeholder="Enter Room Number" value={formData.polyclinic.room_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="polyclinic.is_active" id="polyclinicIsActive" checked={formData.polyclinic.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="polyclinicIsActive">
                                                Is Active
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Informasi Dokter</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nama Dokter*</label>
                                        <select name="doctor.name" className="form-control wizard-required" value={formData.doctor.name} onChange={handleDoctorSelect}>
                                            <option value="">Pilih Dokter</option>
                                            {Array.isArray(doctors) && doctors.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Spesialisasi*</label>
                                        <input type="text" name="doctor.specialty" className="form-control wizard-required" placeholder="Masukkan Spesialisasi" value={formData.doctor.specialty} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">NIK*</label>
                                        <input type="text" name="doctor.nik" className="form-control wizard-required" placeholder="Masukkan NIK" value={formData.doctor.nik || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Satu Sehat ID*</label>
                                        <input type="text" name="doctor.satu_sehat_id" className="form-control wizard-required" placeholder="Masukkan Satu Sehat ID" value={formData.doctor.satu_sehat_id || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Alamat*</label>
                                        <input type="text" name="doctor.address" className="form-control wizard-required" placeholder="Masukkan Alamat" value={formData.doctor.address || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Kota*</label>
                                        <input type="text" name="doctor.city" className="form-control wizard-required" placeholder="Masukkan Kota" value={formData.doctor.city || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nomor STR*</label>
                                        <input type="text" name="doctor.str_number" className="form-control wizard-required" placeholder="Masukkan Nomor STR" value={formData.doctor.str_number || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Tanggal Mulai*</label>
                                        <input type="date" name="doctor.start_date" className="form-control wizard-required" value={formData.doctor.start_date || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Telepon*</label>
                                        <input type="text" name="doctor.phone" className="form-control wizard-required" placeholder="Masukkan Nomor Telepon" value={formData.doctor.phone} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Email*</label>
                                        <input type="email" name="doctor.email" className="form-control wizard-required" placeholder="Masukkan Email" value={formData.doctor.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="doctor.is_active" id="doctorIsActive" checked={formData.doctor.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="doctorIsActive">
                                                Aktif
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 7: Persetujuan */}
                            <fieldset className={`wizard-fieldset ${currentStep === 6 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Persetujuan</h6>
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">Consent Details</label>
                                        <textarea name="consent.details" className="form-control" placeholder="Enter Consent Details" value={formData.consent?.details} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="consent.is_active" id="consentIsActive" checked={formData.consent?.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="consentIsActive">
                                                Consent Given
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>
                            {/* Step 8: Completed */}
                            <fieldset className={`wizard-fieldset ${currentStep === 7 ? "show" : ""}`}>
                                <div className="text-center mb-40">
                                    <img src="/assets/images/gif/success-img3.gif" alt="Success" className="gif-image mb-24" />
                                    <h6 className="text-md text-neutral-600">Congratulations </h6>
                                    <p className="text-neutral-400 text-sm mb-0">Well done! You have successfully completed.</p>
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-end gap-8">
                                    <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                        <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                    </button>
                                    <button type="submit" className="form-wizard-submit btn btn-primary-600 px-32" disabled={isSubmitting}>
                                        {isSubmitting ? "Updating..." : "Update"}
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPatientVisit;
