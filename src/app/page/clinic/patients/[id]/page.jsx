import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";
import EditPatient from "@/modules/medicals/pages/patients/EditPatient";

export const metadata = {
    title: "Indisite Care",
    description: "Patient",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Patient' />

                {/* EditPatient */}
                <EditPatient/>
            </MasterLayout>
        </>
    );
};

export default Page;

