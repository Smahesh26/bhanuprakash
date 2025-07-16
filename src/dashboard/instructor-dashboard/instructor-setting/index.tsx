import FooterTwo from '@/layouts/footers/FooterTwo'
import HeaderSeven from '@/layouts/headers/HeaderSeven'
import InstructorSettingArea from './InstructorSettingArea'
import HeaderSeven from '@/layouts/headers/HeaderSeven'

const InstructorSetting = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <InstructorSettingArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorSetting
