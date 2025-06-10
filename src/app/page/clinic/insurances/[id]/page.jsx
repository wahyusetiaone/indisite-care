import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";
import EditInsurance from "@/modules/medicals/pages/insurances/EditInsurance";

export const metadata = {
    title: "Indisite Care",
    description: "Insurance",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Insurance' />

                {/* EditInsurance */}
                <EditInsurance/>
            </MasterLayout>
        </>
    );
};

export default Page;

