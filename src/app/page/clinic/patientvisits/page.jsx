import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListPatientVisit from "@/modules/medicals/pages/patientvisits/ListPatientVisit";

export const metadata = {
    title: "Indisite Care",
    description: "Patient Visit",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Patient Visit' />
                <ListPatientVisit/>
            </MasterLayout>
        </>
    );
};

export default Page;

