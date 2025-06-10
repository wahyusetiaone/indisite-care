import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";
import EditTreatmentType from "@/modules/medicals/pages/treatments/EditTreatmentType";

export const metadata = {
    title: "Indisite Care",
    description: "Treatment",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Treatment' />

                {/* EditTreatmentType */}
                <EditTreatmentType/>
            </MasterLayout>
        </>
    );
};

export default Page;

