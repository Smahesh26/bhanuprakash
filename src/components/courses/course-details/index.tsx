import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import CourseDetailsArea from "./CourseDetailsArea"
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo"
import HeaderTwo from "@/layouts/headers/HeaderTwo"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderSeven from "@/layouts/headers/HeaderSeven"

const CourseDetails = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbTwo title="Resolving Conflicts Between Designers And Engineers" sub_title="Courses" />
            <CourseDetailsArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default CourseDetails
