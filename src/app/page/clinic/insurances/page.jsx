import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListInsurance from "@/modules/medicals/pages/insurances/ListInsurance";

export const metadata = {
    title: "Indisite Care",
    description: "Insurance",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Insurance' />
                <ListInsurance/>
            </MasterLayout>
        </>
    );
};

export default Page;

