import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListPatient from "@/modules/medicals/pages/patients/ListPatient";

export const metadata = {
    title: "Indisite Care",
    description: "Patient",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Patient' />
                <ListPatient/>
            </MasterLayout>
        </>
    );
};

export default Page;

