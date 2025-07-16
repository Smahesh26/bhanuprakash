import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorAnnouncementArea from './InstructorAnnouncementArea'

const InstructorAnnouncement = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorAnnouncementArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorAnnouncement
