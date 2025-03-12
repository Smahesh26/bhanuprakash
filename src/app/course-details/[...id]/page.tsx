import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import CourseDetailsArea from "@/components/courses/course-details/CourseDetailsArea";
import courses_data from "@/data/inner-data/InnerCourseData";
import FooterOne from "@/layouts/footers/FooterOne";
import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderOne from "@/layouts/headers/HeaderOne";
import HeaderSeven from "@/layouts/headers/HeaderSeven";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Course Details Dr.Bhanu Prakash Online Educational Platform",
};
const index = ({ params }: { params: { id: number } }) => {

   const courses = courses_data;
   const single_course = courses.find((item) => Number(item.id) === Number(params.id));

   return (
      <Wrapper>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="Course Details" sub_title="Course Details" />
            <CourseDetailsArea single_course={single_course} />
         </main>
         <FooterTwo />
      </Wrapper>
   )
}

export default index