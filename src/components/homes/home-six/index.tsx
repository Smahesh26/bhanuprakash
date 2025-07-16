import FooterTwo from "@/layouts/footers/FooterTwo"
import Banner from "./Banner"
import Categories from "./Categories"
import Choose from "./Choose"
import Courses from "./Courses"
import Faq from "./Faq"
import Counter from "../home-two/Counter"
import Blog from "./Blog"
import Testimonial from "./Testimonial"
import Headerseven from "@/layouts/headers/Headerseven"

const HomeSix = () => {
   return (
      <>
         <Headerseven />
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
