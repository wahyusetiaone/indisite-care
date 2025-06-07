import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";

export const metadata = {
    title: "Indisite Care",
    description: "Doctor",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Doctor' />

                {/* EditDoctor */}
                <EditDoctor/>
            </MasterLayout>
        </>
    );
};

export default Page;

