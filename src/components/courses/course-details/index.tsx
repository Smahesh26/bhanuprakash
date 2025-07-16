import FooterTwo from "@/layouts/footers/FooterTwo"
import Headerseven from "@/layouts/headers/Headerseven"
import CourseDetailsArea from "./CourseDetailsArea"
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo"
import Headerseven from "@/layouts/headers/Headerseven"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderSeven from "@/layouts/headers/HeaderSeven"

const CourseDetails = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <BreadcrumbTwo title="Resolving Conflicts Between Designers And Engineers" sub_title="Courses" />
            <CourseDetailsArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default CourseDetails
