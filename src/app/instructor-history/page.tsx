import InstructorHistory from "@/dashboard/instructor-dashboard/instructor-history";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor History Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorHistory />
      </Wrapper>
   )
}

export default index