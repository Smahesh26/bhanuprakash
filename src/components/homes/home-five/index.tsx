import Banner from "./Banner"
import Features from "./Features"
import About from "./About"
import Courses from "./Courses"
import Faq from "./Faq"
import Instructor from "./Instructor"
import Blog from "./Blog"
import Testimonial from "./Testimonial"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderSeven from "@/layouts/headers/HeaderSeven"

const HomeFive = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <Banner />
            <Features />
            <About/>
            <Courses />
            <Faq />
            <Instructor />
            <Testimonial />
            <Blog />
         </main>
         <FooterTwo />
      </>
   )
}

export default HomeFive
