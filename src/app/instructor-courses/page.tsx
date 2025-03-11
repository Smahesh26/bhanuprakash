import InstructorCourses from "@/dashboard/instructor-dashboard/instructor-courses";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Courses Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorCourses />
      </Wrapper>
   )
}

export default index