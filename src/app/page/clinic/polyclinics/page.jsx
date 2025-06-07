import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListPolyclinic from "@/modules/medicals/pages/polyclinics/ListPolyclinic";

export const metadata = {
    title: "Indisite Care",
    description: "Polyclinic",
};

const Page = () => {
    return (
        <>
            <MasterLayout>
                <Breadcrumb title='Polyclinic' />
                <ListPolyclinic/>
            </MasterLayout>
        </>
    );
};

export default Page;

