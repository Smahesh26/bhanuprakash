import Headerseven from "@/layouts/headers/Headerseven"
import FooterTwo from "@/layouts/footers/FooterTwo"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import EventArea from "./EventArea"

const Event = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <BreadcrumbOne title="All Events" sub_title="Events" />
            <EventArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Event

