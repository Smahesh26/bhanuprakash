import Headerseven from "@/layouts/headers/Headerseven"
import FooterTwo from "@/layouts/footers/FooterTwo"
import ErrorArea from "./ErrorArea"
import HeaderSeven from "@/layouts/headers/Headerseven"
const NotFound = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <ErrorArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default NotFound

