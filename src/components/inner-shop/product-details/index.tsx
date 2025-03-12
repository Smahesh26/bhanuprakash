import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import ProductDetailsArea from "./ProductDetailsArea"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderSeven from "@/layouts/headers/HeaderSeven"

const ProductDetails = () => {
  return (
    <>
      <HeaderSeven />
      <main className="main-area fix">
        <BreadcrumbOne title="Course Details" sub_title="Course Details" />
        <ProductDetailsArea />
      </main>
      <FooterOne />
    </>
  )
}

export default ProductDetails
