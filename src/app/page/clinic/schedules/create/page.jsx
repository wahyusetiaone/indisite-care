import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreateSchedule from "@/modules/medicals/pages/schedules/CreateSchedule";

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
                <Breadcrumb title='Schedule' />

                {/* CreateSchedule */}
                <CreateSchedule />
            </MasterLayout>
        </>
    );
};

export default Page;

