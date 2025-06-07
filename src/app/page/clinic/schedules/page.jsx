import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListSchedule from "@/modules/medicals/pages/schedules/ListSchedule";

export const metadata = {
    title: "Indisite Care",
    description: "Schedule",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Schedule' />
                <ListSchedule/>
            </MasterLayout>
        </>
    );
};

export default Page;

