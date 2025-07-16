import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorWishlistArea from './InstructorWishlistArea'

const InstructorWishlist = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorWishlistArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorWishlist
