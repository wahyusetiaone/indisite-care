import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreatePolyclinic from "@/modules/medicals/pages/polyclinics/CreatePolyclinic";

export const metadata = {
    title: "Indisite Care",
    description: "Polyclinic",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Polyclinic' />

                {/* CreatePolyclinic */}
                <CreatePolyclinic />
            </MasterLayout>
        </>
    );
};

export default Page;

