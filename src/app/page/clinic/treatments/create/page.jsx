import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreateTreatmentType from "@/modules/medicals/pages/treatments/CreateTreatmentType";

export const metadata = {
    title: "Indisite Care",
    description: "TreatmentType",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='TreatmentType' />

                {/* CreateSchedule */}
                <CreateTreatmentType />
            </MasterLayout>
        </>
    );
};

export default Page;

