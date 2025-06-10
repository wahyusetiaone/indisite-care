import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const GeneralConsentSection = ({ patientName, responsibleName, signature, onSignClick, showSignatureModal, setShowSignatureModal }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    // Dynamic import for markdown file (client-side fetch)
    fetch("/assets/markdown/generalconcentdummy.md")
      .then((res) => res.text())
        .then((text) => {
            let replaced = text
                .replace("_(otomatis: nama pasien)_", patientName || "-")
                .replace("_(otomatis: nama penanggung jawab)_", responsibleName || "-")
                .replace("_(otomatis: tanggal dibuat dokumen)_", (new Date()).toLocaleDateString("id-ID"));
            setMarkdown(replaced);})
  }, []);

  return (
    <div>
      <div className="mb-3">
        <ReactMarkdown>{markdown}</ReactMarkdown>
        <p>
          Dengan ini saya (<b>{patientName || "-"}</b>) dan atau penanggung jawab (<b>{responsibleName || "-"}</b>) menyatakan telah memahami dan menyetujui seluruh prosedur pelayanan medis yang akan dilakukan di fasilitas ini.
        </p>
      </div>
      <div className="mb-3">
        <label className="form-label">Tanda Tangan Persetujuan</label>
        <div>
          {!signature && (
            <button type="button" className="btn btn-outline-primary mb-2" onClick={onSignClick}>
              Tanda Tangan
            </button>
          )}
          {signature && (
            <div className="mt-2">
              <img src={signature} alt="Tanda Tangan" style={{ width: 350, height: 150, objectFit: "contain" }} />
              <div><span className="text-success">Tanda tangan sudah diisi</span></div>
            </div>
          )}
        </div>
        {showSignatureModal}
      </div>
    </div>
  );
};

export default GeneralConsentSection;
