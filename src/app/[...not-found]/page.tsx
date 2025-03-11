import NotFound from "@/components/inner-pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dr.Bhanu Prakash Online Educational Platform",
};
const page = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default page