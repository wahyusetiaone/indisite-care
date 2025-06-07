import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreatePatient from "@/modules/medicals/pages/patients/CreatePatient";

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
                <Breadcrumb title='Patient' />

                {/* ListDoctor */}
                <CreatePatient />
            </MasterLayout>
        </>
    );
};

export default Page;

