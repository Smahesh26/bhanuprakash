import EventDetails from "@/components/inner-pages/events/event-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Event Details Dr.Bhanu Prakash Online Educational Platform",
};
const page = () => {
   return (
      <Wrapper>
         <EventDetails />
      </Wrapper>
   )
}

export default page