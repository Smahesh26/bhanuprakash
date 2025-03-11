import BlogDetails from "@/components/blogs/blog-details";
import BlogThree from "@/components/blogs/blog-three";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Blog Dr.Bhanu Prakash Online Educational Platform",
};
const index = () => {
   return (
      <Wrapper>
         <BlogDetails />
      </Wrapper>
   )
}

export default index