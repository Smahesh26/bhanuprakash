import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import FooterTwo from "@/layouts/footers/FooterTwo"
import Headerseven from "@/layouts/headers/Headerseven"
import dynamic from "next/dynamic"
const CartArea = dynamic(() => import("./CartArea"), { ssr: false });

const Cart = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <BreadcrumbOne title="Cart" sub_title="Cart" />
            <CartArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Cart
