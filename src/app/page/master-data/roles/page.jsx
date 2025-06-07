import Breadcrumb from "@/components/Breadcrumb";
import TableBasicLayer from "@/components/TableBasicLayer";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListRole from "@/modules/cores/pages/roles/ListRole";

export const metadata = {
    title: "Indisite Care",
    description:
        "Roles",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Roles' />

                {/* ListRole */}
                <ListRole/>
            </MasterLayout>
        </>
    );
};

export default Page;
