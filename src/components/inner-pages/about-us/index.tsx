import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import About from "./About"
import BrandOne from "@/components/common/brands/BrandOne"
import Feature from "@/components/homes/home-two/Feature"
import Newsletter from "@/components/homes/home-two/Newsletter"
import Features from "@/components/homes/home-one/Features"
import Testimonial from "./Testimonial"
import FooterTwo from "@/layouts/footers/FooterTwo"
import HeaderSeven from "@/layouts/headers/HeaderSeven"

const AboutUs = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="Who We Are" sub_title="About Us" />
            <About />
            {/* <BrandOne /> */}
            <Feature style={true} />
            <Newsletter />
            <Features />
            {/* <Testimonial /> */}
         </main>
         <FooterTwo />
      </>
   )
}

export default AboutUs
