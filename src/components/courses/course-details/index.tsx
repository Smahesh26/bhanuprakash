import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderSeven from "@/layouts/headers/HeaderSeven"
import CourseDetailsArea from "./CourseDetailsArea"
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo"
// import { useParams } from "next/navigation"; // For App Router

const CourseDetails = ({ playlistId }: { playlistId: string }) => {
   // For App Router, you could use:
   // const params = useParams();
   // const playlistId = params?.playlistId as string;

   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbTwo title="Resolving Conflicts Between Designers And Engineers" sub_title="Courses" />
            <CourseDetailsArea playlistId={playlistId} />
         </main>
         <FooterTwo />
      </>
   )
}

export default CourseDetails
