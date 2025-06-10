"use client"
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const steps = [
  "Tanda - tanda vital",
  "Data Kesehatan",
  "Pemeriksaan Fisik",
  "Fungsional",
  "PsikoSoBud",
  "Pemeriksaan",
  "Tindakan",
  "Selesai"
];

const CreateInitialAssesment = () => {
  // State to hold all form data
  const [formData, setFormData] = useState({
    patient_id: null,
    vital_sign_id: null,
    healty_data_id: null,
    physical_measurement_id: null,
    fuctional_data_id: null,
    psiko_sos_bud_id: null,
    examination_id: null,
    requare_action_id: null,
    vital_sign: {
      body_temperature: '', // Celcius
      pulse: '', // Times/Minute
      systolic: '', // mmHg
      diastolic: '', // mmHg
      respiratory_rate: '', // Times/Minute
    },
    healty_data: {
      is_pregnant_or_breastfeeding: false, // Hamil/Menyusui
      smoker_status: false, // Status Perokok
      main_complaint: '', // Keluhan Utama
      anamnesis: '', // Anamnesa
      disease_history: '', // Riwayat Penyakit
      drug_allergy_history: '', // Riwayat Alergi Obat
      other_allergy_history: '', // Riwayat Alergi Lainnya
    },
    physical_measurement: {
      height_cm: '', // Tinggi Badan (cm)
      weight_kg: '', // Berat Badan (kg)
      bmi: '', // IMT
    },
    functional_data: {
      assistive_device: false, // Alat Bantu
      physical_disability: false, // Cacat Fisik
      daily_activity: '', // Aktivitas Sehari-hari
      daily_activity_options: [
        'Mandiri',
        'Perlu Bantuan'
      ],
      note: '', //note
    },
    psiko_sos_bud: {
      psychological: '', // Psikologis
      psychological_options: [
        'Tenang',
        'Menangis',
        'Marah',
        'Takut',
        'Cemas'
      ],
      living_with: '', // Tinggal dengan
      daily_language: '', // Bahasa Sehari-hari
    },
    examination: {
      consciousness: '', // Kesadaran
      consciousness_options: [
        'Sadar penuh',
        'Tampak mengantuk / gelisah bicara tidak jelas',
        'Tidak Sadar'
      ],
      respiration: '', // Pernafasan
      respiration_options: [
        'Normal',
        'Tampak Sesak'
      ],
      get_up_and_go_test: '', // Get Up & Go Test
      get_up_and_go_test_options: [
        'A. Cara berjalan pasien tidak seimbang / limbung / sempoyongan / jalan menggunakan alat bantu (kruk, tripot, kursi roda, orang lain)',
        'B. Menopang saat akan duduk tampak memegang pinggiran kursi atau meja atau benda lain sebagai penopang'
      ],
      fall_risk: '', // Resiko Jatuh
      fall_risk_options: [
        'Tidak beresiko (jawaban a dan b tidak)',
        'Resiko rendah (salah satu jawaban ya)',
        'Resiko Tinggi (semua jawaban ya)'
      ],
      pain_scale: '', // Skala Nyeri
      pain_scale_options: [
        'Tidak ada nyeri yang dirasakan.',
        'Sedikit Nyeri',
        'Nyeri',
        'Nyeri lumayan parah',
        'Nyeri Parah',
        'Nyeri sangat parah'
      ],
      cough: '', // Batuk
      cough_options: [
        'Tidak ada',
        'Batuk < 2 Minggu',
        'Batuk > 2 Minggu'
      ]
    },
    requare_action: {
      polyclinic_by_queue: false, // Polyclinic by queue
      prioritized_polyclinic: false, // Prioritized polyclinic
      igd: false, // Emergency Room
    },
  });
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef(null);

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

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header border-bottom">
          <Link
            href="../patientassessments"
            className="d-flex align-items-center text-primary-600"
            style={{ textDecoration: 'none' }}
          >
            <Icon icon="ic:round-arrow-back" className="icon me-2" style={{ fontSize: '1.5rem' }} />
            <h4 className="card-title mb-0">Buat Initial Assessment</h4>
          </Link>
        </div>
        <div className="card-body">
          <h6 className="mb-4 text-xl">Langkah Assessment</h6>
          <p className="text-neutral-500">Isi detail assessment dan lanjutkan ke langkah berikutnya.</p>
          <div className="row mb-4">
            <div className="col-md-3">
              <label className="form-label">Nomor Rekam Medis</label>
              <input type="text" className="form-control" value={"medical_record_number"} disabled />
            </div>
            <div className="col-md-3">
              <label className="form-label">Nama Pasien</label>
              <input type="text" className="form-control" value={"patient.identity.full_name"} disabled />
            </div>
            <div className="col-md-3">
              <label className="form-label">Tanggal Lahir</label>
              <input type="text" className="form-control" value={"patient.identity.date_of_birth"} disabled />
            </div>
            <div className="col-md-3">
              <label className="form-label">Jenis Kelamin</label>
              <input type="text" className="form-control" value={"patient.identity.gender"} disabled />
            </div>
          </div>
          <div className="form-wizard">
            <form ref={formRef}>
              <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                <ul className="list-unstyled form-wizard-list style-two">
                  {steps.map((step, idx) => (
                    <li key={step} className={`form-wizard-list__item ${currentStep >= idx ? "active" : ""}`}>
                      <div className="form-wizard-list__line">
                        <span className="count">{idx + 1}</span>
                      </div>
                      <span className="text text-xs fw-semibold">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {steps.map((step, idx) => (
                <fieldset key={step} className={`wizard-fieldset ${currentStep === idx ? "show" : ""}`}>
                  <div className="row gy-3">
                    <div className="col-12">
                      <h5>{step}</h5>
                      {/* Render fields based on step */}
                      {step === "Tanda - tanda vital" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Suhu Tubuh (°C)</label>
                            <input type="number" className="form-control" placeholder="Masukkan suhu tubuh" value={formData.vital_sign.body_temperature} onChange={e => setFormData(f => ({...f, vital_sign: {...f.vital_sign, body_temperature: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Nadi (Kali/Menit)</label>
                            <input type="number" className="form-control" placeholder="Masukkan nadi" value={formData.vital_sign.pulse} onChange={e => setFormData(f => ({...f, vital_sign: {...f.vital_sign, pulse: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Sistole (mmHg)</label>
                            <input type="number" className="form-control" placeholder="Masukkan sistole" value={formData.vital_sign.systolic} onChange={e => setFormData(f => ({...f, vital_sign: {...f.vital_sign, systolic: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Diastole (mmHg)</label>
                            <input type="number" className="form-control" placeholder="Masukkan diastole" value={formData.vital_sign.diastolic} onChange={e => setFormData(f => ({...f, vital_sign: {...f.vital_sign, diastolic: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Frekuensi Pernafasan (Kali/Menit)</label>
                            <input type="number" className="form-control" placeholder="Masukkan frekuensi pernafasan" value={formData.vital_sign.respiratory_rate} onChange={e => setFormData(f => ({...f, vital_sign: {...f.vital_sign, respiratory_rate: e.target.value}}))} />
                          </div>
                        </div>
                      )}
                      {step === "Data Kesehatan" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Hamil/Menyusui</label>
                            <select className="form-select" value={formData.healty_data.is_pregnant_or_breastfeeding} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, is_pregnant_or_breastfeeding: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Status Perokok</label>
                            <select className="form-select" value={formData.healty_data.smoker_status} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, smoker_status: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Keluhan Utama</label>
                            <input type="text" className="form-control" placeholder="Masukkan keluhan utama" value={formData.healty_data.main_complaint} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, main_complaint: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Anamnesa</label>
                            <input type="text" className="form-control" placeholder="Masukkan anamnesa" value={formData.healty_data.anamnesis} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, anamnesis: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Riwayat Penyakit</label>
                            <input type="text" className="form-control" placeholder="Masukkan riwayat penyakit" value={formData.healty_data.disease_history} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, disease_history: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Riwayat Alergi Obat</label>
                            <input type="text" className="form-control" placeholder="Masukkan riwayat alergi obat" value={formData.healty_data.drug_allergy_history} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, drug_allergy_history: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Riwayat Alergi Lainnya</label>
                            <input type="text" className="form-control" placeholder="Masukkan riwayat alergi lainnya" value={formData.healty_data.other_allergy_history} onChange={e => setFormData(f => ({...f, healty_data: {...f.healty_data, other_allergy_history: e.target.value}}))} />
                          </div>
                        </div>
                      )}
                      {step === "Pemeriksaan Fisik" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Tinggi Badan (cm)</label>
                            <input type="number" className="form-control" placeholder="Masukkan tinggi badan" value={formData.physical_measurement.height_cm} onChange={e => setFormData(f => ({...f, physical_measurement: {...f.physical_measurement, height_cm: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Berat Badan (kg)</label>
                            <input type="number" className="form-control" placeholder="Masukkan berat badan" value={formData.physical_measurement.weight_kg} onChange={e => setFormData(f => ({...f, physical_measurement: {...f.physical_measurement, weight_kg: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">IMT</label>
                            <input type="number" className="form-control" placeholder="Masukkan IMT" value={formData.physical_measurement.bmi} onChange={e => setFormData(f => ({...f, physical_measurement: {...f.physical_measurement, bmi: e.target.value}}))} />
                          </div>
                        </div>
                      )}
                      {step === "Fungsional" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Alat Bantu</label>
                            <select className="form-select" value={formData.functional_data.assistive_device} onChange={e => setFormData(f => ({...f, functional_data: {...f.functional_data, assistive_device: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Cacat Fisik</label>
                            <select className="form-select" value={formData.functional_data.physical_disability} onChange={e => setFormData(f => ({...f, functional_data: {...f.functional_data, physical_disability: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Aktivitas Sehari-hari</label>
                            <select className="form-select" value={formData.functional_data.daily_activity} onChange={e => setFormData(f => ({...f, functional_data: {...f.functional_data, daily_activity: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.functional_data.daily_activity_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                      {step === "PsikoSoBud" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Psikologis</label>
                            <select className="form-select" value={formData.psiko_sos_bud.psychological} onChange={e => setFormData(f => ({...f, psiko_sos_bud: {...f.psiko_sos_bud, psychological: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.psiko_sos_bud.psychological_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Tinggal dengan</label>
                            <input type="text" className="form-control" placeholder="Masukkan tinggal dengan" value={formData.psiko_sos_bud.living_with} onChange={e => setFormData(f => ({...f, psiko_sos_bud: {...f.psiko_sos_bud, living_with: e.target.value}}))} />
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Bahasa Sehari-hari</label>
                            <input type="text" className="form-control" placeholder="Masukkan bahasa sehari-hari" value={formData.psiko_sos_bud.daily_language} onChange={e => setFormData(f => ({...f, psiko_sos_bud: {...f.psiko_sos_bud, daily_language: e.target.value}}))} />
                          </div>
                        </div>
                      )}
                      {step === "Pemeriksaan" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Kesadaran</label>
                            <select className="form-select" value={formData.examination.consciousness} onChange={e => setFormData(f => ({...f, examination: {...f.examination, consciousness: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.examination.consciousness_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Pernafasan</label>
                            <select className="form-select" value={formData.examination.respiration} onChange={e => setFormData(f => ({...f, examination: {...f.examination, respiration: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.examination.respiration_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Get Up & Go Test</label>
                            <select className="form-select" value={formData.examination.get_up_and_go_test} onChange={e => setFormData(f => ({...f, examination: {...f.examination, get_up_and_go_test: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.examination.get_up_and_go_test_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Resiko Jatuh</label>
                            <select className="form-select" value={formData.examination.fall_risk} onChange={e => setFormData(f => ({...f, examination: {...f.examination, fall_risk: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.examination.fall_risk_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Skala Nyeri</label>
                            <select className="form-select" value={formData.examination.pain_scale} onChange={e => setFormData(f => ({...f, examination: {...f.examination, pain_scale: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.examination.pain_scale_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Batuk</label>
                            <select className="form-select" value={formData.examination.cough} onChange={e => setFormData(f => ({...f, examination: {...f.examination, cough: e.target.value}}))}>
                              <option value="">Pilih</option>
                              {formData.examination.cough_options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                      {step === "Tindakan" && (
                        <div className="row">
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Poliklinik sesuai antrian</label>
                            <select className="form-select" value={formData.requare_action.polyclinic_by_queue} onChange={e => setFormData(f => ({...f, requare_action: {...f.requare_action, polyclinic_by_queue: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">Poliklinik didahulukan</label>
                            <select className="form-select" value={formData.requare_action.prioritized_polyclinic} onChange={e => setFormData(f => ({...f, requare_action: {...f.requare_action, prioritized_polyclinic: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                          <div className="col-sm-6 mb-3">
                            <label className="form-label">IGD</label>
                            <select className="form-select" value={formData.requare_action.igd} onChange={e => setFormData(f => ({...f, requare_action: {...f.requare_action, igd: e.target.value === 'true'}}))}>
                              <option value="true">Ya</option>
                              <option value="false">Tidak</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
                      {idx > 0 && (
                        <button type="button" onClick={handleBack} className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32 d-flex align-items-center justify-content-center">
                          <Icon icon="ic:round-arrow-back" className="icon me-2" /> Kembali
                        </button>
                      )}
                      {idx < steps.length - 1 && (
                        <button type="button" onClick={handleNext} className="form-wizard-next-btn btn btn-primary-600 px-32">Berikutnya</button>
                      )}
                      {idx === steps.length - 1 && (
                        <button type="submit" className="form-wizard-submit btn btn-primary-600 px-32">Selesai</button>
                      )}
                    </div>
                  </div>
                </fieldset>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInitialAssesment;
