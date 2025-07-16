import FooterTwo from "@/layouts/footers/FooterTwo"
import Banner from "./Banner"
import Features from "./Features"
import About from "./About"
import Cta from "./Cta"
import Categories from "./Categories"
import Blog from "./Blog"
import Course from "./Course"
import Testimonial from "./Testimonial"
import Newsletter from "./Newsletter"
const HomeEight = () => {
   return (
      <>
         <main className="main-area fix">
            <Banner />
            <Features />
            <Course />
            <About />
            <Cta />
            <Categories />
            <Testimonial />
            <Blog />
            <Newsletter />
         </main>
         <FooterTwo style_2={true} />
      </>
   )
}

export default HomeEight
