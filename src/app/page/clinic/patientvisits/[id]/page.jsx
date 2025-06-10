import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditPatientVisit from "@/modules/medicals/pages/patientvisits/EditPatientVisit";

export const metadata = {
    title: "Indisite Care",
    description: "Patient Visit",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Patient Visit' />

                {/* EditPatientVisit */}
                <EditPatientVisit/>
            </MasterLayout>
        </>
    );
};

export default Page;

