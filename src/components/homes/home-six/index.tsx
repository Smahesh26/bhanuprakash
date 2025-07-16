import FooterTwo from "@/layouts/footers/FooterTwo"
import Banner from "./Banner"
import Categories from "./Categories"
import Choose from "./Choose"
import Courses from "./Courses"
import Faq from "./Faq"
import Counter from "../home-two/Counter"
import Blog from "./Blog"
import Testimonial from "./Testimonial"
import HeaderSeven from "@/layouts/headers/HeaderSeven"

const HomeSix = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <Banner />
            <Categories />
            <Choose />
            <Courses />
            <Faq />
            <Testimonial />
            <Counter style={true} />
            <Blog />
         </main>
         <FooterTwo />
      </>
   )
}

export default HomeSix
