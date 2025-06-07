import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import CreateVisitType from "@/modules/medicals/pages/visittypes/CreateVisitType";

export const metadata = {
    title: "Indisite Care",
    description: "VisitType",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='VisitType' />

                {/* CreateVisitType */}
                <CreateVisitType />
            </MasterLayout>
        </>
    );
};

export default Page;

