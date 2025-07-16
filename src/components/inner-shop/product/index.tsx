import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import FooterTwo from "@/layouts/footers/FooterTwo"
import Headerseven from "@/layouts/headers/Headerseven"
import ProductArea from "./ProductArea"

const Product = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <BreadcrumbOne title="Shop Page" sub_title="Shop Page" />
            <ProductArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default Product
