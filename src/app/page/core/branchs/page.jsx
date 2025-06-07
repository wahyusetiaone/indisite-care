import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListBranch from "@/modules/cores/pages/branchs/ListBranch";

export const metadata = {
    title: "Indisite Care",
    description:
        "Branch",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Branch' />

                {/* ListBranch */}
                <ListBranch/>
            </MasterLayout>
        </>
    );
};

export default Page;
