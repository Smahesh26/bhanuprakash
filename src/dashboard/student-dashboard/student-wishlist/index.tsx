import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentWishlistArea from './StudentWishlistArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentWishlist = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentWishlistArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentWishlist
