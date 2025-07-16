import FooterTwo from '@/layouts/footers/FooterTwo'
import HeaderSeven from '@/layouts/headers/HeaderSeven'
import InstructorAssignmentArea from './InstructorAssignmentArea'

const InstructorAssignment = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <InstructorAssignmentArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorAssignment
