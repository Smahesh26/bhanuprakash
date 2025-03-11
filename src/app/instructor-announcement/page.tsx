import InstructorAnnouncement from "@/dashboard/instructor-dashboard/instructor-announcement";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Instructor Announcement Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <InstructorAnnouncement />
      </Wrapper>
   )
}

export default index