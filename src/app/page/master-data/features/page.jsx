import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListFeature from "@/modules/cores/pages/features/ListFeature";

export const metadata = {
    title: "Indisite Care",
    description:
        "Features",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Features' />

                {/* ListOrganization */}
                <ListFeature/>
            </MasterLayout>
        </>
    );
};

export default Page;
