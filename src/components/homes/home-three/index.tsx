import Banner from "./Banner"
import Features from "./Features"
import About from "./About"
import Course from "./Course"
import Choose from "./Choose"
import Event from "./Event"
import Counter from "./Counter"
import Cta from "./Cta"
import FooterTwo from "@/layouts/footers/FooterTwo"
import Testimonial from "./Testimonial"
import Headerseven from "@/layouts/headers/Headerseven"
import Blog from "./Blog"

const HomeThree = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <Banner />
            <Features />
            <About />
            <Course />
            <Choose />
            <Event />
            <Counter />
            <Cta />
            <Testimonial />
            <Blog />
         </main>
         <FooterTwo />
      </>
   )
}

export default HomeThree
