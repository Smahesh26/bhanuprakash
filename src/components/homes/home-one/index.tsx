import BrandOne from "@/components/common/brands/BrandOne"
import Banner from "../home-seven/Banner"
import About from "./About"
import CourseArea from "./CourseArea"
import Newsletter from "./Newsletter"
import Instructor from "./Instructor"
import Counter from "./Counter"
import FaqArea from "./FaqArea"
import Features from "./Features"
import InstructorTwo from "./InstructorTwo"
import Blog from "./Blog"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Categories from "./Categories"
import HeaderSeven from "@/layouts/headers/HeaderSeven"
import Courses from "../home-seven/Courses"
import Cta from "../home-seven/Cta"
import Choose from "../home-seven/Choose"
import Categories1 from "../home-seven/Categories1"
import Testimonial from "../home-seven/Testimonial"
import FooterTwo from "@/layouts/footers/FooterTwo"
const HomeOne = () => {
   return (
      <>
         {/* <HeaderOne />
         <main className="main-area fix">
            <Banner />
            <Categories />
            <BrandOne />
            <About />
            <CourseArea />
            <Newsletter />
            <Instructor />
            <Counter />
            <FaqArea />
            <Features />
            <InstructorTwo />
            <Blog />
         </main>
         <FooterOne /> */}
           <HeaderSeven />
                  <main className="main-area fix">
                     <Banner />
                     {/* <Features /> */}
                     <Courses />
                     <Cta />
                     <Choose />
                     <Categories />
                     <Counter/>
                     {/* <Categories1/> */}
                     {/* <Instructor /> */}
                     <Testimonial />
                     {/* <BrandTwo /> */}
                     {/* <Blog /> */}
                     <Newsletter />
                  </main>
                  <FooterTwo style={true} />
      </>
   )
}

export default HomeOne
