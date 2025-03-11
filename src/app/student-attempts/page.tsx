import StudentAttempts from "@/dashboard/student-dashboard/student-attempts";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Student Attempts Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <StudentAttempts />
      </Wrapper>
   )
}

export default index