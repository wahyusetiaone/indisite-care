import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListOrganization from "@/modules/cores/pages/organizations/ListOrganization";

export const metadata = {
    title: "Indisite Care",
    description:
        "List Organization",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='List Organization' />

                {/* ListOrganization */}
                <ListOrganization/>
            </MasterLayout>
        </>
    );
};

export default Page;
