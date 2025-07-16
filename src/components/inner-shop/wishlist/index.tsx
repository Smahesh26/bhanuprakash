import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import Headerseven from "@/layouts/headers/Headerseven"
import WishlistArea from "./WishlistArea"
import FooterTwo from "@/layouts/footers/FooterTwo"

const Wishlist = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <BreadcrumbOne title="Wishlist" sub_title="Wishlist" />
            <WishlistArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Wishlist
