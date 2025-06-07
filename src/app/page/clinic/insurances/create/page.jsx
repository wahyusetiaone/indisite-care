import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreateInsuranceType from "@/modules/medicals/pages/insurances/CreateInsuranceType";

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
                <Breadcrumb title='Insurance' />

                {/* ListDoctor */}
                <CreateInsuranceType />
            </MasterLayout>
        </>
    );
};

export default Page;

