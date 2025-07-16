import FooterTwo from "@/layouts/footers/FooterTwo"
import Headerseven from "@/layouts/headers/Headerseven"
import LessonArea from "./LessonArea"
import HeaderSeven from "@/layouts/headers/HeaderSeven"
import FooterTwo from "@/layouts/footers/FooterTwo"

const Lesson = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <LessonArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Lesson
