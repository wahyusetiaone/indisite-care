import React, { useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const SignatureModal = ({ show, onClose, onSave, initialSignature }) => {
  const signaturePadRef = useRef(null);

  useEffect(() => {
    if (show && initialSignature && signaturePadRef.current) {
      signaturePadRef.current.fromDataURL(initialSignature);
    } else if (show && signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  }, [show, initialSignature]);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.getCanvas().toDataURL("image/png");
      onSave(dataUrl);
    } else {
      onSave("");
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="xl" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Tanda Tangan Digital</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <SignatureCanvas
            ref={signaturePadRef}
            penColor="black"
            canvasProps={{ width: 700, height: 250, className: "sigCanvas border rounded" }}
            backgroundColor="#fff"
          />
          <div className="mt-3">
            <Button variant="secondary" className="me-2" onClick={handleClear}>Bersihkan</Button>
            <Button variant="primary" onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignatureModal;
