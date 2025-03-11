import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import CourseArea from "./CourseArea"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import HeaderSeven from "@/layouts/headers/HeaderSeven"
import FooterTwo from "@/layouts/footers/FooterTwo"

const Course = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="All Courses" sub_title="Courses" />
            <CourseArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Course
