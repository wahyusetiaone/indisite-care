import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListDoctor from "@/modules/medicals/pages/doctors/ListDoctor";

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
                <ListDoctor/>
            </MasterLayout>
        </>
    );
};

export default Page;

