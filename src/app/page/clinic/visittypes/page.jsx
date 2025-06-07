import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListVisitType from "@/modules/medicals/pages/visittypes/ListVisitType";

export const metadata = {
    title: "Indisite Care",
    description: "Visit Type",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Visit Type' />
                <ListVisitType/>
            </MasterLayout>
        </>
    );
};

export default Page;

