import Wrapper from "@/layouts/Wrapper";
import BannerManager from "@/dashboard/instructor-dashboard/banner/BannerManager";

export const metadata = { title: "Instructor - Banner Videos" };

export default function InstructorBannerPage() {
  return (
    <Wrapper>
      <main style={{ padding: 18 }}>
        <BannerManager />
      </main>
    </Wrapper>
  );
}