import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentSettingArea from './StudentSettingArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentSetting = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentSettingArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentSetting

