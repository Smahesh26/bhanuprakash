import InstructorEnrolledCourse from "@/dashboard/instructor-dashboard/instructor-enrolled-courses";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Enrolled Course Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorEnrolledCourse />
      </Wrapper>
   )
}

export default index