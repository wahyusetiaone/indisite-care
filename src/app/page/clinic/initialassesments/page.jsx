import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListInitialAssesment from "@/modules/medicals/pages/initialassesments/ListInitialAssesment";

export const metadata = {
    title: "Indisite Care",
    description: "Initial Assesment",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Doctor' />

                {/* ListInitialAssesment */}
                <ListInitialAssesment/>
            </MasterLayout>
        </>
    );
};

export default Page;

