import HeaderSeven from "@/layouts/headers/HeaderSeven"
import FooterTwo from "@/layouts/footers/FooterTwo"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import BlogArea from "../blog/BlogArea"

const BlogTwo = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <BreadcrumbOne title="Blog Left Sidebar" sub_title="Blogs" />
            <BlogArea style_1={true} />
         </main>
         <FooterTwo />
      </>
   )
}

export default BlogTwo;

