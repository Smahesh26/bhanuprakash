import InstructorAssignment from "@/dashboard/instructor-dashboard/instructor-assignment";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Assignment Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorAssignment />
      </Wrapper>
   )
}

export default index