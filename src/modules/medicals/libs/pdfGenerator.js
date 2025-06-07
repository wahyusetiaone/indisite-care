// lib/pdfGenerator.js
import jsPDF from "jspdf";

/**
 * Generates an empty PDF form for patient visit details.
 * The field names are derived from the structure of the provided formData object.
 * Designed for manual filling after printing.
 * @param {object} formData - The complete form data object. Its structure defines the fields in the PDF.
 */
export const generatePatientVisitPdf = (formData) => {
    const doc = new jsPDF();
    let yPos = 15; // Initial Y position for text, leave some top margin
    const startX = 15; // Starting X position for main content
    const lineHeight = 7; // Height for each line/field
    const defaultLineLength = 120; // Default length for input lines

    doc.setFontSize(18);
    doc.text("FORMULIR KUNJUNGAN PASIEN", startX, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text("PATIENT VISIT FORM", startX, yPos);
    yPos += 15;

    // Helper to check for new page and add if needed
    const checkNewPage = () => {
        if (yPos > doc.internal.pageSize.height - 20) { // Leave some bottom margin
            doc.addPage();
            yPos = 15; // Reset Y position for new page
        }
    };

    // Helper to add a section title
    const addSectionTitle = (title, description = "String") => {
        checkNewPage(); // Check for new page before adding title
        yPos += 5; // Add some space before title
        doc.setFillColor(224, 242, 247); // Light blue background
        doc.rect(startX, yPos - 4, doc.internal.pageSize.width - 2 * startX, 15, 'F'); // Draw filled rectangle
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // Black text for title
        doc.text(title, startX + 5, yPos + 2);
        doc.text(description, startX + 5, yPos + 7);
        yPos += 15; // Move yPos after title and its background
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Reset text color
    };

    // Helper to add a form field (label + line) dynamically
    const addFormField = (label, indent = 0, lineLength = defaultLineLength) => {
        checkNewPage(); // Check for new page before adding field
        const currentX = startX + indent;
        doc.text(label + ":", currentX, yPos);
        const textWidth = doc.getTextWidth(label + ":");
        doc.line(currentX + textWidth + 2, yPos, currentX + textWidth + 2 + lineLength, yPos); // Draw the line
        yPos += lineHeight;
    };

    // Helper to add checkbox/radio options (static, as we don't have dynamic options in formData structure)
    const addStaticOptionsRow = (label, options, type = 'checkbox', indent = 0) => {
        checkNewPage();
        let currentX = startX + indent;
        doc.text(label + ":", currentX, yPos);
        currentX += doc.getTextWidth(label + ":") + 5;

        options.forEach(option => {
            const boxSize = 3;
            if (type === 'checkbox') {
                doc.rect(currentX, yPos - boxSize / 2, boxSize, boxSize); // Draw square
            } else if (type === 'radio') {
                doc.circle(currentX + boxSize / 2, yPos, boxSize / 2); // Draw circle
            }
            doc.text(option, currentX + boxSize + 2, yPos);
            currentX += doc.getTextWidth(option) + boxSize + 10; // Move X for next option
        });
        yPos += lineHeight;
    };
    // Helper to add a field label and its value
    const addField = (label, value, indent = 0) => {
        // Check for new page before adding a field
        if (yPos + lineHeight > doc.internal.pageSize.height - 10) { // If field would go off page
            doc.addPage();
            yPos = 15; // Reset yPos for new page
        }

        const displayValue = value !== null && value !== undefined && value !== "" ? String(value) : 'N/A';
        doc.text(`${label}: ${displayValue}`, startX + indent, yPos);
        yPos += lineHeight;
    };

    // --- Dynamic Form Generation Based on formData Structure ---

    // Patient Visit Details (Main fields)
    addSectionTitle("Detail Kunjungan (Visit Details)", "Di isi oleh petugas");
    // Directly add fields from the top level of formData
    addFormField("Jadwal");
    addFormField("Patient ID");
    addFormField("Insurance Type ID");
    addFormField("Visit Type ID");
    addFormField("Treatment Type ID");
    addFormField("Polyclinic ID");
    addFormField("Doctor ID");
    // Add specific options as per original form, hardcoded as they are not in formData structure
    addStaticOptionsRow("Tipe Kunjungan", ["Reguler", "Marjin", "Day Trading"]);
    // This is an example of the complex "Nasabah akan bertindak sebagai:" part
    // You'd need to manually create this based on your image
    // For simplicity, I'm just showing generic fields from formData

    yPos += 5;

    // --- Patient Information Section ---
    if (formData.patient) {
        addSectionTitle("Informasi Pasien (Patient Information)", "Di isi oleh Pasien");

        // Patient Identity
        if (formData.patient.identity) {
            addField("Identitas Pasien", 0); // Sub-section label
            for (const key in formData.patient.identity) {
                // Convert snake_case to Title Case for better readability
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                addFormField(`  ${label}`, 10);
            }
        }
        yPos += 5;

        // Patient Address
        if (formData.patient.address) {
            addField("Alamat Pasien", 0); // Sub-section label
            for (const key in formData.patient.address) {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                addFormField(`  ${label}`, 10);
            }
        }
        yPos += 5;

        // Patient Social
        if (formData.patient.social) {
            addField("Informasi Sosial Pasien", 0); // Sub-section label
            for (const key in formData.patient.social) {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                addFormField(`  ${label}`, 10);
            }
        }
        yPos += 10;
    }

    // --- Other Sections (dynamically from formData structure) ---
    const topLevelObjects = ['insurance_type', 'visit_type', 'treatment_type', 'polyclinic', 'doctor'];

    topLevelObjects.forEach(objKey => {
        if (formData[objKey]) {
            // Convert 'insurance_type' to 'Tipe Asuransi' etc. for section title
            const sectionTitle = objKey.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            addSectionTitle(`${sectionTitle} (${sectionTitle})`,'Di isi oleh petugas'); // e.g., "Insurance Type (Insurance Type)"

            for (const key in formData[objKey]) {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                // Handle boolean fields for label clarity if needed, or just display "Is Active"
                if (typeof formData[objKey][key] === 'boolean') {
                    addFormField(`  ${label}`, 10);
                } else {
                    addFormField(`  ${label}`, 10);
                }
            }
            yPos += 10;
        }
    });

    // --- End of Dynamic Form Structure ---

    // Instructions
    yPos += 10;
    doc.setFontSize(8);
    doc.text("(*Wajib diisi / Must be filled in)", startX, yPos);
    yPos += 4;
    doc.text("(**Jika ada / If any)", startX, yPos);

    // Save the PDF
    doc.save(`PatientVisitForm_${new Date().toISOString().split('T')[0]}.pdf`);
};