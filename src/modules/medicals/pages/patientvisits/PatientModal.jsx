import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

const PatientModal = ({
  show,
  onHide,
  patientSearch,
  setPatientSearch,
  isPatientLoading,
  patientOptions,
  onSelectPatient
}) => (
  <Modal show={show} onHide={onHide} centered size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Cari Pasien</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Cari nama pasien..."
        value={patientSearch}
        onChange={e => setPatientSearch(e.target.value)}
        autoFocus
      />
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {isPatientLoading ? (
          <div className="text-center py-3">Loading...</div>
        ) : (
          patientOptions.length === 0 ? (
            <div className="text-center text-muted">Tidak ada pasien ditemukan.</div>
          ) : (
            <ul className="list-group">
              {patientOptions.map(opt => (
                <li
                  key={opt.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectPatient(opt)}
                >
                  <div className="fw-semibold">{opt.identity?.full_name}</div>
                  <div className="small text-muted">{opt.identity?.identity_number} | {opt.identity?.phone_number}</div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Tutup
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PatientModal;

