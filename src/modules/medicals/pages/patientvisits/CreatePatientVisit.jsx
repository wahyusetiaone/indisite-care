// components/medicals/CreatePatientVisit.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
// Import the PDF generation function
import { generatePatientVisitPdf } from "../../libs/pdfGenerator";
// Import fetchAllData services
import { fetchAllDataInsuranceTypes } from "@/services/medicals/InsuranceTypeService";
import { fetchAllDataVisitTypes } from "@/services/medicals/VisitTypeService";
import { fetchAllDataTreatmentTypes } from "@/services/medicals/TreatmentTypeService";
import { fetchAllDataPolyclinics } from "@/services/medicals/PolyclinicService";
import { fetchAllDataDoctors } from "@/services/medicals/DoctorService";
import { createPatientVisit} from "@/services/medicals/PatientVisitService";
import { fetchAllDataPatients } from "@/services/medicals/PatientService";
import { useRouter } from "next/navigation";
import { showSuccess, showError } from "@/../contexts/toast";
import { Modal, Button } from "react-bootstrap";
import PatientModal from "./PatientModal";
import SignatureModal from "@/components/SignatureModal";

const CreatePatientVisit = () => {
    // State to manage the current step of the form wizard (0-6)
    const [currentStep, setCurrentStep] = useState(0);

    // State to hold all form data, structured like PatientVisit
    const [formData, setFormData] = useState({
        // IDs for foreign keys (these would usually be selected from dropdowns and then assigned)
        patient_id: null,
        responsible_person_id: null,
        insurance_type_id: null,
        visit_type_id: null,
        treatment_type_id: null,
        polyclinic_id: null,
        doctor_id: null,
        schedule: "", // Assuming schedule is a direct field of PatientVisit

        // Nested objects mirroring your interfaces
        patient: {
            identity: {
                full_name: "",
                phone_number: "",
                email: "",
                gender: "",
                blood_type: "",
                born: "", // Place of birth
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
            is_active: false, // Default boolean value
        },
        visit_type: {
            name: "",
            description: "",
            isActive: false, // Default boolean value
        },
        treatment_type: {
            name: "",
            category: "",
            is_active: false, // Default boolean value
        },
        polyclinic: {
            name: "",
            floor: "", // Storing as string initially, convert to number on submission
            room_number: "",
            is_active: false, // Default boolean value
        },
        doctor: {
            name: "",
            specialty: "",
            phone: "",
            email: "",
            is_active: false, // Default boolean value
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
        signature: "", // base64 signature for consent
    });
    const signaturePadRef = useRef(null);

    // Dropdown data states
    const [insuranceTypes, setInsuranceTypes] = useState([]);
    const [visitTypes, setVisitTypes] = useState([]);
    const [treatmentTypes, setTreatmentTypes] = useState([]);
    const [polyclinics, setPolyclinics] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // Patient dropdown and search state
    const [patientOptions, setPatientOptions] = useState([]);
    const [patientSearch, setPatientSearch] = useState("");
    const [isPatientLoading, setIsPatientLoading] = useState(false);

    // Loading state for submit
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Modal state for patient modal
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [showSignatureModal, setShowSignatureModal] = useState(false);

    // Handle input changes with nested state updates
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nameParts = name.split('.'); // Split name like "patient.identity.full_name"

        if (nameParts.length === 3) { // It's a deeply nested field (e.g., patient.identity.full_name)
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
        } else if (nameParts.length === 2) { // It's a direct nested object field (e.g., insurance_type.name)
            const [section, field] = nameParts;
            setFormData((prevData) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [field]: type === "checkbox" ? checked : value,
                },
            }));
        }
        else { // It's a top-level field (e.g., schedule)
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };


    // Ref to access the form element and its fieldsets
    const formRef = useRef(null);
    const router = useRouter();

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

    // Function to handle moving to the next step
    const handleNext = () => {
        // You might add validation here before moving to the next step
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 7)); // Max step index is 6 for 'Completed'
    };

    // Function to handle moving to the previous step
    const handleBack = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0)); // Min step index is 0
    };

    // Function to handle form submission (on the last step)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await createPatientVisit(formData);
            showSuccess("Patient visit created successfully!");
            router.push("/page/clinic/patientvisits");
        } catch (error) {
            showError("Failed to create patient visit. See console for details.");
            console.error("API Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handler for the PDF button
    const handleGeneratePdfClick = () => {
        generatePatientVisitPdf(formData); // Pass the formData to the utility function
    };

    // Fetch dropdown data on mount
    useEffect(() => {
        fetchAllDataInsuranceTypes().then(res => setInsuranceTypes(res.data));
        fetchAllDataVisitTypes().then(res => setVisitTypes(res.data));
        fetchAllDataTreatmentTypes().then(res => setTreatmentTypes(res.data));
        fetchAllDataPolyclinics().then(res => setPolyclinics(res.data));
        fetchAllDataDoctors().then(res => setDoctors(res.data));
    }, []);

    // Fetch patients for dropdown (with search)
    useEffect(() => {
        let active = true;
        setIsPatientLoading(true);
        fetchAllDataPatients(patientSearch)
            .then(res => {
                console.log("Fetched patients:", res.data);
                if (active) setPatientOptions(res.data || []);
            })
            .finally(() => { if (active) setIsPatientLoading(false); });
        return () => { active = false; };
    }, [patientSearch]);

    // Open/close modal handlers
    const handleOpenPatientModal = () => setShowPatientModal(true);
    const handleClosePatientModal = () => setShowPatientModal(false);

    // Handle patient selection from modal list
    const handlePatientSelectFromModal = (selectedPatient) => {
        setFormData(prev => ({
            ...prev,
            patient_id: selectedPatient.id,
            patient: {
                identity: { ...selectedPatient.identity },
                address: { ...selectedPatient.address },
                social: { ...selectedPatient.social },
            }
        }));
        setShowPatientModal(false);
    };

    // Handler for insurance select
    const handleInsuranceSelect = (e) => {
        const selectedName = e.target.value;
        setFormData((prevData) => {
            const selected = insuranceTypes.find((item) => item.name === selectedName);
            return {
                ...prevData,
                insurance_type: selected
                    ? { ...selected }
                    : { name: '', description: '', is_active: false },
                insurance_type_id: selected ? selected.id : null,
            };
        });
    };

    // Handler for visit type select
    const handleVisitTypeSelect = (e) => {
        const selectedName = e.target.value;
        setFormData((prevData) => {
            const selected = visitTypes.find((item) => item.name === selectedName);
            return {
                ...prevData,
                visit_type: selected
                    ? { ...selected }
                    : { name: '', description: '', isActive: false },
                visit_type_id: selected ? selected.id : null,
            };
        });
    };

    // Handler for treatment type select
    const handleTreatmentTypeSelect = (e) => {
        const selectedName = e.target.value;
        setFormData((prevData) => {
            const selected = treatmentTypes.find((item) => item.name === selectedName);
            return {
                ...prevData,
                treatment_type: selected
                    ? { ...selected }
                    : { name: '', category: '', is_active: false },
                treatment_type_id: selected ? selected.id : null,
            };
        });
    };

    // Handler for polyclinic select
    const handlePolyclinicSelect = (e) => {
        const selectedName = e.target.value;
        setFormData((prevData) => {
            const selected = polyclinics.find((item) => item.name === selectedName);
            return {
                ...prevData,
                polyclinic: selected
                    ? { ...selected }
                    : { name: '', floor: '', room_number: '', is_active: false },
                polyclinic_id: selected ? selected.id : null,
            };
        });
    };

    // Handler for doctor select
    const handleDoctorSelect = (e) => {
        const selectedName = e.target.value;
        setFormData((prevData) => {
            const selected = doctors.find((item) => item.name === selectedName);
            return {
                ...prevData,
                doctor: selected
                    ? { ...selected }
                    : { name: '', specialty: '', phone: '', email: '', is_active: false },
                doctor_id: selected ? selected.id : null,
            };
        });
    };

    // Handler for signature from modal
    const handleSignatureSave = (dataUrl) => {
        setFormData((prev) => ({ ...prev, signature: dataUrl }));
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <Link
                        href="../patientvisits"
                        className="d-flex align-items-center text-primary-600"
                        style={{ textDecoration: 'none' }}
                    >
                        <Icon icon="ic:round-arrow-back" className="icon me-2" style={{ fontSize: '1.5rem' }} />
                        <h4 className="card-title mb-0">Buat Kunjungan Pasien</h4>
                    </Link>
                </div>
                <div className="card-body">
                    <h6 className="mb-4 text-xl">Langkah Registrasi</h6>
                    <p className="text-neutral-500">Isi detail Anda dan lanjutkan ke langkah berikutnya.</p>

                    {/* Form Wizard Start */}
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

                            {/* Step 1: Identity Patient */}
                            <fieldset className={`wizard-fieldset ${currentStep === 0 ? "show" : ""}`}>
                                <div className="row gy-3">
                                    {/* Patient Modal Search Button */}
                                    <div className="col-12 d-flex align-items-center mb-2">
                                        <div className="w-100 d-flex flex-column align-items-center">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                                                style={{ width: 300 }}
                                                onClick={handleOpenPatientModal}
                                            >
                                                <Icon icon="ic:round-search" className="me-2" /> Cari Pasien
                                            </button>
                                            <div className="w-100 text-center mt-2">
                                                <span className="text-bold">Atau daftarkan Pasien Baru dengan mengisi form di bawah ini</span>
                                            </div>
                                        </div>
                                        {formData.patient.identity.full_name && (
                                            <span className="ms-3 text-success">{formData.patient.identity.full_name}</span>
                                        )}
                                    </div>
                                    {/* Patient Modal */}
                                    <PatientModal
                                        show={showPatientModal}
                                        onHide={handleClosePatientModal}
                                        patientSearch={patientSearch}
                                        setPatientSearch={setPatientSearch}
                                        isPatientLoading={isPatientLoading}
                                        patientOptions={patientOptions}
                                        onSelectPatient={handlePatientSelectFromModal}
                                    />

                                    <h6 className="text-md text-neutral-500">Identitas Pasien</h6>
                                    {/* PatientIdentity Fields */}
                                    <div className="col-sm-6">
                                        <label className="form-label">Nama Lengkap*</label>
                                        <input type="text" name="patient.identity.full_name" className="form-control wizard-required" placeholder="Masukkan Nama Lengkap" value={formData.patient.identity.full_name} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nomor Telepon*</label>
                                        <input type="text" name="patient.identity.phone_number" className="form-control wizard-required" placeholder="Masukkan Nomor Telepon" value={formData.patient.identity.phone_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email*</label>
                                        <input type="email" name="patient.identity.email" className="form-control wizard-required" placeholder="Masukkan Email" value={formData.patient.identity.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Jenis Kelamin*</label>
                                        <select name="patient.identity.gender" className="form-control wizard-required" value={formData.patient.identity.gender} onChange={handleChange}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Male">Laki-laki</option>
                                            <option value="Female">Perempuan</option>
                                            <option value="Other">Lainnya</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Golongan Darah*</label>
                                        <select name="patient.identity.blood_type" className="form-control wizard-required" value={formData.patient.identity.blood_type} onChange={handleChange}>
                                            <option value="">Pilih Golongan Darah</option>
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
                                        <label className="form-label">Tempat Lahir*</label>
                                        <input type="text" name="patient.identity.born" className="form-control wizard-required" placeholder="Masukkan Tempat Lahir" value={formData.patient.identity.born} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Tanggal Lahir*</label>
                                        <input type="date" name="patient.identity.date_of_birth" className="form-control wizard-required" value={formData.patient.identity.date_of_birth} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Tipe Identitas*</label>
                                        <select name="patient.identity.identity_type" className="form-control wizard-required" value={formData.patient.identity.identity_type} onChange={handleChange}>
                                            <option value="">Pilih Tipe Identitas</option>
                                            <option value="KTP">KTP</option>
                                            <option value="SIM">SIM</option>
                                            <option value="Passport">Paspor</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nomor Identitas*</label>
                                        <input type="text" name="patient.identity.identity_number" className="form-control wizard-required" placeholder="Masukkan Nomor Identitas" value={formData.patient.identity.identity_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Nama Ibu*</label>
                                        <input type="text" name="patient.identity.name_of_mother" className="form-control wizard-required" placeholder="Masukkan Nama Ibu" value={formData.patient.identity.name_of_mother} onChange={handleChange} />
                                    </div>

                                    {/* PatientAddress Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Alamat Pasien</h6>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Alamat Lengkap*</label>
                                        <textarea name="patient.address.full_address" className="form-control wizard-required" placeholder="Masukkan Alamat Lengkap" value={formData.patient.address.full_address} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Provinsi*</label>
                                        <input type="text" name="patient.address.provincy" className="form-control wizard-required" placeholder="Masukkan Provinsi" value={formData.patient.address.provincy} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Kota*</label>
                                        <input type="text" name="patient.address.city" className="form-control wizard-required" placeholder="Masukkan Kota" value={formData.patient.address.city} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Kecamatan*</label>
                                        <input type="text" name="patient.address.district" className="form-control wizard-required" placeholder="Masukkan Kecamatan" value={formData.patient.address.district} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Kelurahan*</label>
                                        <input type="text" name="patient.address.village" className="form-control wizard-required" placeholder="Masukkan Kelurahan" value={formData.patient.address.village} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">RT/RW*</label>
                                        <input type="text" name="patient.address.rt_rw" className="form-control wizard-required" placeholder="Masukkan RT/RW" value={formData.patient.address.rt_rw} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Kode Pos*</label>
                                        <input type="text" name="patient.address.post_code" className="form-control wizard-required" placeholder="Masukkan Kode Pos" value={formData.patient.address.post_code} onChange={handleChange} />
                                    </div>

                                    {/* PatientSocial Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Informasi Sosial Pasien</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Agama*</label>
                                        <input type="text" name="patient.social.religion" className="form-control wizard-required" placeholder="Masukkan Agama" value={formData.patient.social.religion} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Status Pernikahan</label>
                                        <input type="text" name="patient.social.marriage_status" className="form-control" placeholder="Masukkan Status Pernikahan" value={formData.patient.social.marriage_status} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Status Pendidikan</label>
                                        <input type="text" name="patient.social.education_status" className="form-control" placeholder="Masukkan Status Pendidikan" value={formData.patient.social.education_status} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Pekerjaan*</label>
                                        <input type="text" name="patient.social.work" className="form-control wizard-required" placeholder="Masukkan Pekerjaan" value={formData.patient.social.work} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Bahasa</label>
                                        <input type="text" name="patient.social.language" className="form-control" placeholder="Masukkan Bahasa" value={formData.patient.social.language} onChange={handleChange} />
                                    </div>

                                    <div className="form-group text-end mt-4">
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
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
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Step 3: Insurance */}
                            <fieldset className={`wizard-fieldset ${currentStep === 2 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Informasi Asuransi</h6>
                                <div className="row gy-3">
                                    {/* InsuranceType Fields */}
                                    <div className="col-12">
                                        <label className="form-label">Nama Asuransi*</label>
                                        <select name="insurance_type.name" className="form-control wizard-required" value={formData.insurance_type.name} onChange={handleInsuranceSelect}>
                                            <option value="">Pilih Asuransi</option>
                                            {Array.isArray(insuranceTypes) && insuranceTypes.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Deskripsi</label>
                                        <textarea name="insurance_type.description" className="form-control" placeholder="Masukkan Deskripsi" value={formData.insurance_type.description} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="insurance_type.is_active" id="insuranceIsActive" checked={formData.insurance_type.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="insuranceIsActive">
                                                Aktif
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Step 4: On Visit */}
                            <fieldset className={`wizard-fieldset ${currentStep === 3 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Detail Kunjungan</h6>
                                <div className="row gy-3">
                                    {/* VisitType Fields */}
                                    <div className="col-12">
                                        <label className="form-label">Jenis Kunjungan*</label>
                                        <select name="visit_type.name" className="form-control wizard-required" value={formData.visit_type.name} onChange={handleVisitTypeSelect}>
                                            <option value="">Pilih Jenis Kunjungan</option>
                                            {Array.isArray(visitTypes) && visitTypes.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Step 5: Treatment */}
                            <fieldset className={`wizard-fieldset ${currentStep === 4 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Detail Tindakan</h6>
                                <div className="row gy-3">
                                    {/* TreatmentType Fields */}
                                    <div className="col-12">
                                        <label className="form-label">Nama Tindakan*</label>
                                        <select name="treatment_type.name" className="form-control wizard-required" value={formData.treatment_type.name} onChange={handleTreatmentTypeSelect}>
                                            <option value="">Pilih Tindakan</option>
                                            {Array.isArray(treatmentTypes) && treatmentTypes.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Step 6: Polyclinic */}
                            <fieldset className={`wizard-fieldset ${currentStep === 5 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Poliklinik & Dokter</h6>
                                <div className="row gy-3">
                                    {/* Patient Visit Schedule */}
                                    <div className="col-12">
                                        <label className="form-label">Jadwal Kunjungan*</label>
                                        <input type="datetime-local" name="schedule" className="form-control wizard-required" value={formData.schedule} onChange={handleChange} />
                                    </div>
                                    {/* Polyclinic Fields */}
                                    <div className="col-sm-6">
                                        <label className="form-label">Nama Poliklinik*</label>
                                        <select name="polyclinic.name" className="form-control wizard-required" value={formData.polyclinic.name} onChange={handlePolyclinicSelect}>
                                            <option value="">Pilih Poliklinik</option>
                                            {Array.isArray(polyclinics) && polyclinics.map((item) => (
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Lantai*</label>
                                        <input type="number" name="polyclinic.floor" className="form-control wizard-required" placeholder="Masukkan Nomor Lantai" value={formData.polyclinic.floor} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Nomor Ruangan*</label>
                                        <input type="text" name="polyclinic.room_number" className="form-control wizard-required" placeholder="Masukkan Nomor Ruangan" value={formData.polyclinic.room_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="polyclinic.is_active" id="polyclinicIsActive" checked={formData.polyclinic.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="polyclinicIsActive">
                                                Aktif
                                            </label>
                                        </div>
                                    </div>

                                    {/* Doctor Fields */}
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
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Step 7: Persetujuan (General Consent) */}
                            <fieldset className={`wizard-fieldset ${currentStep === 6 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Persetujuan Umum</h6>
                                <div className="mb-3">
                                    <p>
                                        Dengan ini saya (<b>{formData.patient.identity.full_name || "-"}</b>) dan penanggung jawab (<b>{formData.responsible_person.full_name || "-"}</b>) menyatakan telah memahami dan menyetujui seluruh prosedur pelayanan medis yang akan dilakukan di fasilitas ini.
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tanda Tangan Persetujuan</label>
                                    <div>
                                        {!formData.signature && (
                                            <button type="button" className="btn btn-outline-primary mb-2" onClick={() => setShowSignatureModal(true)}>
                                                Tanda Tangan
                                            </button>
                                        )}
                                        {formData.signature && (
                                            <div className="mt-2">
                                                <img src={formData.signature} alt="Tanda Tangan" style={{ width: 350, height: 150, objectFit: "contain" }} />
                                                <div><span className="text-success">Tanda tangan sudah diisi</span></div>
                                            </div>
                                        )}
                                    </div>
                                    <SignatureModal
                                        show={showSignatureModal}
                                        onClose={() => setShowSignatureModal(false)}
                                        onSave={handleSignatureSave}
                                        initialSignature={formData.signature}
                                    />
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                                    <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                        <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                    </button>
                                    <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32" disabled={!formData.signature}>Berikutnya</button>
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
                                        <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                                    </button>
                                    <button type="button" onClick={handleGeneratePdfClick} className="btn btn-info px-32">
                                        Generate PDF
                                    </button>
                                    <button type="submit" className="form-wizard-submit btn btn-primary-600 px-32" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Publish"}
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    {/* Form Wizard End */}
                </div>
            </div>
        </div>
    );
};

export default CreatePatientVisit;
