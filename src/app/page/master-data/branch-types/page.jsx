import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListBranchType from "@/modules/cores/pages/branch-types/ListBranchType";

export const metadata = {
    title: "Indisite Care",
    description:
        "Branch Types",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Branch Types' />

                {/* ListBranchType */}
                <ListBranchType/>
            </MasterLayout>
        </>
    );
};

export default Page;
