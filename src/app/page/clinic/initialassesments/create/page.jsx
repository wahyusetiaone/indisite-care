import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreateDoctor from "@/modules/medicals/pages/doctors/CreateDoctor";
import CreateInitialAssesment from "@/modules/medicals/pages/initialassesments/CreateInitialAssesment";

export const metadata = {
    title: "Indisite Care",
    description: "Initial Assesment",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Pengkajian Awal' />

                {/* CreateInitialAssesment */}
                <CreateInitialAssesment />
            </MasterLayout>
        </>
    );
};

export default Page;

