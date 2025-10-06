import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderSeven from "@/layouts/headers/HeaderSeven";
import CourseArea from "./CourseArea";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";

const Course = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="All Courses" sub_title="Courses" />
            <CourseArea />
         </main>
      </>
   )
}

export default Course;
