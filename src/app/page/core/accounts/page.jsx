import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ListAccount from "@/modules/cores/pages/accounts/ListAccount";

export const metadata = {
    title: "Indisite Care",
    description:
        "Accounts",
};

const Page = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Accounts' />

                {/* ListAccount */}
                <ListAccount/>
            </MasterLayout>
        </>
    );
};

export default Page;
