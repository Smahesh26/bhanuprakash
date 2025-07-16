import Headerseven from "@/layouts/headers/Headerseven"
import FooterTwo from "@/layouts/footers/FooterTwo"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import LoginArea from "./LoginArea"
import HeaderSeven from "@/layouts/headers/Headerseven"

const Login = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="Student Login" sub_title="Login" />
            <LoginArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Login

