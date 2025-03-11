import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import RegistrationArea from "./RegistrationArea"
import HeaderSeven from "@/layouts/headers/HeaderSeven"
import FooterTwo from "@/layouts/footers/FooterTwo"

const Registration = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="Student SingUp" sub_title="SingUp" />
            <RegistrationArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Registration

