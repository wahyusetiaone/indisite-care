import DashBoardLayerOne from "@/components/DashBoardLayerOne";
import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";
import DashBoardLayerNine from "@/components/DashBoardLayerNine";

export const metadata = {
  title: "Indisite Care",
  description:
    "Dashboard",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Overview' />

        {/* DashBoardLayerOne */}
          <DashBoardLayerNine />
      </MasterLayout>
    </>
  );
};

export default Page;
