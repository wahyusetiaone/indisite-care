import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreateDoctor from "@/modules/medicals/pages/doctors/CreateDoctor";

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
                <Breadcrumb title='Doctor' />

                {/* ListDoctor */}
                <CreateDoctor />
            </MasterLayout>
        </>
    );
};

export default Page;

