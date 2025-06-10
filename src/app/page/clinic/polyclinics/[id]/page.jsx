import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";
import EditPolyclinic from "@/modules/medicals/pages/polyclinics/EditPolyclinic";

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
                <Breadcrumb title='Edit Polyclinic' />

                {/* EditPolyclinic */}
                <EditPolyclinic/>
            </MasterLayout>
        </>
    );
};

export default Page;

