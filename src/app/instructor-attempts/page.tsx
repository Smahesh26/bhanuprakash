import InstructorAttempts from "@/dashboard/instructor-dashboard/instructor-attempts";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Attempts Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorAttempts />
      </Wrapper>
   )
}

export default index