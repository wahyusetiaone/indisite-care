import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditDoctor from "@/modules/medicals/pages/doctors/EditDoctor";
import EditSchedule from "@/modules/medicals/pages/schedules/EditSchedule";

export const metadata = {
    title: "Indisite Care",
    description: "Schedule",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Edit Schedule' />

                {/* EditSchedule */}
                <EditSchedule/>
            </MasterLayout>
        </>
    );
};

export default Page;

