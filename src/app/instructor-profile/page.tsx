import InstructorProfile from "@/dashboard/instructor-dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Instructor Profile Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
  return (
    <Wrapper>
      <InstructorProfile />
    </Wrapper>
  )
}

export default index