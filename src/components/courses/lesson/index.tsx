import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
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
