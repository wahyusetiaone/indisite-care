// components/medicals/CreatePatientVisit.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
// Import the PDF generation function
import { generatePatientVisitPdf } from "../../libs/pdfGenerator";

const CreatePatientVisit = () => {
    // State to manage the current step of the form wizard (0-5)
    const [currentStep, setCurrentStep] = useState(0);

    // State to hold all form data, structured like PatientVisit
    const [formData, setFormData] = useState({
        // IDs for foreign keys (these would usually be selected from dropdowns and then assigned)
        patient_id: null,
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
    });

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
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 5)); // Max step index is 5 for 'Completed'
    };

    // Function to handle moving to the previous step
    const handleBack = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0)); // Min step index is 0
    };

    // Function to handle form submission (on the last step)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted Data:", formData);
        alert("Patient visit creation process completed! Check console for data.");
        // Optional: Generate PDF on form submission
        // generatePatientVisitPdf(formData);
        // Redirect or show success message
    };

    // Handler for the PDF button
    const handleGeneratePdfClick = () => {
        generatePatientVisitPdf(formData); // Pass the formData to the utility function
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header border-bottom">
                    <Link
                        href="page/clinic/patientvisits"
                        className="d-flex align-items-center text-primary-600"
                        style={{ textDecoration: 'none' }}
                    >
                        <Icon icon="ic:round-arrow-back" className="icon me-2" style={{ fontSize: '1.5rem' }} />
                        <h4 className="card-title mb-0">Create Patient Visit</h4>
                    </Link>
                </div>
                <div className="card-body">
                    <h6 className="mb-4 text-xl">Registration Step Fill Step</h6>
                    <p className="text-neutral-500">Fill up your details and proceed next steps.</p>

                    {/* Form Wizard Start */}
                    <div className="form-wizard">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                                <ul className="list-unstyled form-wizard-list style-two">
                                    <li className={`form-wizard-list__item ${currentStep >= 0 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">1</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Identity Patient</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 1 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">2</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Insurance</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 2 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">3</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">On Visit</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 3 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">4</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Treatment</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 4 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">5</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Polyclinic</span>
                                    </li>
                                    <li className={`form-wizard-list__item ${currentStep >= 5 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">6</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Completed</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Step 1: Identity Patient */}
                            <fieldset className={`wizard-fieldset ${currentStep === 0 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Patient Identity & Address</h6>
                                <div className="row gy-3">
                                    {/* PatientIdentity Fields */}
                                    <div className="col-sm-6">
                                        <label className="form-label">Full Name*</label>
                                        <input type="text" name="patient.identity.full_name" className="form-control wizard-required" placeholder="Enter Full Name" required value={formData.patient.identity.full_name} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Phone Number*</label>
                                        <input type="text" name="patient.identity.phone_number" className="form-control wizard-required" placeholder="Enter Phone Number" required value={formData.patient.identity.phone_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email*</label>
                                        <input type="email" name="patient.identity.email" className="form-control wizard-required" placeholder="Enter Email" required value={formData.patient.identity.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Gender*</label>
                                        <select name="patient.identity.gender" className="form-control wizard-required" required value={formData.patient.identity.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Blood Type*</label>
                                        <select name="patient.identity.blood_type" className="form-control wizard-required" required value={formData.patient.identity.blood_type} onChange={handleChange}>
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
                                        <input type="text" name="patient.identity.born" className="form-control wizard-required" placeholder="Enter Place of Birth" required value={formData.patient.identity.born} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Date of Birth*</label>
                                        <input type="date" name="patient.identity.date_of_birth" className="form-control wizard-required" required value={formData.patient.identity.date_of_birth} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Identity Type*</label>
                                        <select name="patient.identity.identity_type" className="form-control wizard-required" required value={formData.patient.identity.identity_type} onChange={handleChange}>
                                            <option value="">Select Identity Type</option>
                                            <option value="KTP">KTP</option>
                                            <option value="SIM">SIM</option>
                                            <option value="Passport">Passport</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Identity Number*</label>
                                        <input type="text" name="patient.identity.identity_number" className="form-control wizard-required" placeholder="Enter Identity Number" required value={formData.patient.identity.identity_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Mother's Name*</label>
                                        <input type="text" name="patient.identity.name_of_mother" className="form-control wizard-required" placeholder="Enter Mother's Name" required value={formData.patient.identity.name_of_mother} onChange={handleChange} />
                                    </div>

                                    {/* PatientAddress Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Patient Address</h6>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Full Address*</label>
                                        <textarea name="patient.address.full_address" className="form-control wizard-required" placeholder="Enter Full Address" required value={formData.patient.address.full_address} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Province*</label>
                                        <input type="text" name="patient.address.provincy" className="form-control wizard-required" placeholder="Enter Province" required value={formData.patient.address.provincy} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">City*</label>
                                        <input type="text" name="patient.address.city" className="form-control wizard-required" placeholder="Enter City" required value={formData.patient.address.city} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">District*</label>
                                        <input type="text" name="patient.address.district" className="form-control wizard-required" placeholder="Enter District" required value={formData.patient.address.district} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Village*</label>
                                        <input type="text" name="patient.address.village" className="form-control wizard-required" placeholder="Enter Village" required value={formData.patient.address.village} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">RT/RW*</label>
                                        <input type="text" name="patient.address.rt_rw" className="form-control wizard-required" placeholder="Enter RT/RW" required value={formData.patient.address.rt_rw} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Post Code*</label>
                                        <input type="text" name="patient.address.post_code" className="form-control wizard-required" placeholder="Enter Post Code" required value={formData.patient.address.post_code} onChange={handleChange} />
                                    </div>

                                    {/* PatientSocial Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Patient Social Information</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Religion*</label>
                                        <input type="text" name="patient.social.religion" className="form-control wizard-required" placeholder="Enter Religion" required value={formData.patient.social.religion} onChange={handleChange} />
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
                                        <input type="text" name="patient.social.work" className="form-control wizard-required" placeholder="Enter Work" required value={formData.patient.social.work} onChange={handleChange} />
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

                            {/* Step 2: Insurance */}
                            <fieldset className={`wizard-fieldset ${currentStep === 1 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Insurance Information</h6>
                                <div className="row gy-3">
                                    {/* InsuranceType Fields */}
                                    <div className="col-12">
                                        <label className="form-label">Insurance Name*</label>
                                        <input type="text" name="insurance_type.name" className="form-control wizard-required" placeholder="Enter Insurance Name" required value={formData.insurance_type.name} onChange={handleChange} />
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
                                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center"> {/* Added d-flex classes for icon */}
                                            <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Next</button>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Step 3: On Visit */}
                            <fieldset className={`wizard-fieldset ${currentStep === 2 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">On Visit Details</h6>
                                <div className="row gy-3">
                                    {/* VisitType Fields */}
                                    <div className="col-12">
                                        <label className="form-label">Visit Type Name*</label>
                                        <input type="text" name="visit_type.name" className="form-control wizard-required" placeholder="Enter Visit Type Name" required value={formData.visit_type.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Description*</label>
                                        <textarea name="visit_type.description" className="form-control wizard-required" placeholder="Enter Description" required value={formData.visit_type.description} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="visit_type.isActive" id="visitIsActive" checked={formData.visit_type.isActive} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="visitIsActive">
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

                            {/* Step 4: Treatment */}
                            <fieldset className={`wizard-fieldset ${currentStep === 3 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Treatment Details</h6>
                                <div className="row gy-3">
                                    {/* TreatmentType Fields */}
                                    <div className="col-12">
                                        <label className="form-label">Treatment Name*</label>
                                        <input type="text" name="treatment_type.name" className="form-control wizard-required" placeholder="Enter Treatment Name" required value={formData.treatment_type.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Category*</label>
                                        <input type="text" name="treatment_type.category" className="form-control wizard-required" placeholder="Enter Category" required value={formData.treatment_type.category} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="treatment_type.is_active" id="treatmentIsActive" checked={formData.treatment_type.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="treatmentIsActive">
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

                            {/* Step 5: Polyclinic */}
                            <fieldset className={`wizard-fieldset ${currentStep === 4 ? "show" : ""}`}>
                                <h6 className="text-md text-neutral-500">Polyclinic & Doctor</h6>
                                <div className="row gy-3">
                                    {/* Patient Visit Schedule */}
                                    <div className="col-12">
                                        <label className="form-label">Visit Schedule*</label>
                                        <input type="datetime-local" name="schedule" className="form-control wizard-required" required value={formData.schedule} onChange={handleChange} />
                                    </div>
                                    {/* Polyclinic Fields */}
                                    <div className="col-sm-6">
                                        <label className="form-label">Polyclinic Name*</label>
                                        <input type="text" name="polyclinic.name" className="form-control wizard-required" placeholder="Enter Polyclinic Name" required value={formData.polyclinic.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Floor*</label>
                                        <input type="number" name="polyclinic.floor" className="form-control wizard-required" placeholder="Enter Floor Number" required value={formData.polyclinic.floor} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Room Number*</label>
                                        <input type="text" name="polyclinic.room_number" className="form-control wizard-required" placeholder="Enter Room Number" required value={formData.polyclinic.room_number} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="polyclinic.is_active" id="polyclinicIsActive" checked={formData.polyclinic.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="polyclinicIsActive">
                                                Is Active
                                            </label>
                                        </div>
                                    </div>

                                    {/* Doctor Fields */}
                                    <div className="col-12">
                                        <h6 className="text-md text-neutral-500 mt-4">Doctor Information</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Doctor Name*</label>
                                        <input type="text" name="doctor.name" className="form-control wizard-required" placeholder="Enter Doctor Name" required value={formData.doctor.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Specialty*</label>
                                        <input type="text" name="doctor.specialty" className="form-control wizard-required" placeholder="Enter Specialty" required value={formData.doctor.specialty} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Phone*</label>
                                        <input type="text" name="doctor.phone" className="form-control wizard-required" placeholder="Enter Phone Number" required value={formData.doctor.phone} onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Email*</label>
                                        <input type="email" name="doctor.email" className="form-control wizard-required" placeholder="Enter Email" required value={formData.doctor.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="doctor.is_active" id="doctorIsActive" checked={formData.doctor.is_active} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="doctorIsActive">
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

                            {/* Step 6: Completed */}
                            <fieldset className={`wizard-fieldset ${currentStep === 5 ? "show" : ""}`}>
                                <div className="text-center mb-40">
                                    <img src="/assets/images/gif/success-img3.gif" alt="Success" className="gif-image mb-24" />
                                    <h6 className="text-md text-neutral-600">Congratulations </h6>
                                    <p className="text-neutral-400 text-sm mb-0">Well done! You have successfully completed.</p>
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-end gap-8">
                                    <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                                        <Icon icon="ic:round-arrow-back" className="icon me-2" /> Back
                                    </button>
                                    <button type="button" onClick={handleGeneratePdfClick} className="btn btn-info px-32">
                                        Generate PDF
                                    </button>
                                    <button type="submit" className="form-wizard-submit btn btn-primary-600 px-32">Publish</button>
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