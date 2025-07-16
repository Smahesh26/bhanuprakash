import dynamic from "next/dynamic";
import Wrapper from "@/layouts/Wrapper";

// ✅ Dynamic import to prevent SSR-related errors
const HomeSeven = dynamic(() => import("@/components/homes/home-seven"), {
  ssr: false,
});

export const metadata = {
  title: "Home Seven Dr.Bhanu Prakash Online Educational Platform",
};

const Page = () => {
  return (
    <Wrapper>
      <HomeSeven />
    </Wrapper>
  );
};

export default Page;
