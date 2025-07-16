import FooterTwo from '@/layouts/footers/FooterTwo'
import HeaderSeven from '@/layouts/headers/HeaderSeven'
import InstructorAnnouncementArea from './InstructorAnnouncementArea'

const InstructorAnnouncement = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <InstructorAnnouncementArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorAnnouncement
