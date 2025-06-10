import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";
import EditVisitType from "@/modules/medicals/pages/visittypes/EditVisitType";

export const metadata = {
    title: "Indisite Care",
    description: "Visit Type",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Visit Type' />

                {/* EditVisitType */}
                <EditVisitType/>
            </MasterLayout>
        </>
    );
};

export default Page;

