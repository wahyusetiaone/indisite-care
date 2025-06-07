import React from "react";
import CreatePatientVisit from "@/modules/medicals/pages/patientvisits/CreatePatientVisit";
import MasterLayout from "@/masterLayout/MasterLayout";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
    title: "Indisite Care",
    description: "Patient Visit",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Pendaftaran Patient Visit' />
                <CreatePatientVisit/>
            </MasterLayout>
        </>
    );
};

export default Page;