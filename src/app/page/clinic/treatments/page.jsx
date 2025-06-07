import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListTreatment from "@/modules/medicals/pages/treatments/ListTreatment";

export const metadata = {
    title: "Indisite Care",
    description: "Treatment",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Treatment' />
                <ListTreatment/>
            </MasterLayout>
        </>
    );
};

export default Page;

