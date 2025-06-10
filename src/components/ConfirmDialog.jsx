"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

const ConfirmDialogProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [onConfirm, setOnConfirm] = useState(null);

    const show = useCallback((msg, onOk) => {
        setMessage(msg);
        setOnConfirm(() => onOk);
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
        setMessage("");
        setOnConfirm(null);
    };

    const handleOk = () => {
        if (onConfirm) onConfirm();
        handleClose();
    };

    return (
        <ConfirmDialogContext.Provider value={{ show }}>
            {children}
            {open && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleOk}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmDialogContext.Provider>
    );
};

export default ConfirmDialogProvider;

