import { StaticImageData } from "next/image";

import icon_1 from "@/assets/img/icons/features_icon01.svg";
import icon_2 from "@/assets/img/icons/features_icon02.svg";
import icon_3 from "@/assets/img/icons/features_icon03.svg";
import icon_4 from "@/assets/img/icons/features_icon04.svg";
import homefFeature_1 from "@/assets/img/icons/h4_features_icon01.svg"
import homefFeature_2 from "@/assets/img/icons/h4_features_icon02.svg"
import homefFeature_3 from "@/assets/img/icons/h4_features_icon03.svg"

interface DataType {
   id: number;
   page: string;
   icon?: StaticImageData;
   icon_2?: string;
   icon_3?: string;
   title: string;
   desc: string;
}[];

const feature_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      icon: icon_1,
      title: "Learn with Experts",
      desc: "Curate anding area share Pluralsight content to reach your",
   },
   {
      id: 2,
      page: "home_1",
      icon: icon_2,
      title: "Learn Anything",
      desc: "Curate anding area share Pluralsight content to reach your",
   },
   {
      id: 3,
      page: "home_1",
      icon: icon_3,
      title: "Get Online Certificate",
      desc: "Curate anding area share Pluralsight content to reach your",
   },
   {
      id: 4,
      page: "home_1",
      icon: icon_4,
      title: "E-mail Marketing",
      desc: "Curate anding area share Pluralsight content to reach your",
   },

   // home_2

   {
      id: 1,
      page: "home_2",
      icon_2: "/assets/img/icons/h2_features_icon01.svg",
      title: "Expert Tutors",
      desc: "Our tutors are highly qualified and deeply committed to simplifying complex medical concepts. They bring a wealth of academic and clinical experience to each lecture, ensuring that intricate theories become relatable and understandable. By combining expert knowledge with relatable teaching methods, they help demystify topics ranging from basic sciences to advanced surgical procedures, all while nurturing critical thinking skills vital for any healthcare professional.",
   },

   {
      id: 2,
      page: "home_2",
      icon_2: "/assets/img/icons/h2_features_icon02.svg",
      title: "Effective Courses",
      desc: "Every course on our platform is built on a clear, step-by-step framework that guides you through subjects sequentially. This thoughtful organization helps you connect theoretical knowledge with clinical practice, reinforcing retention and understanding. Whether you need to revisit foundational content or delve deeper into advanced topics, our structured curriculum—complete with subject-wise chapters and targeted modules—offers a solid, cohesive path to mastery.",
   },

   {
      id: 3,
      page: "home_2",
      icon_2: "/assets/img/icons/h2_features_icon03.svg",
      title: "Premium Features",
      desc: "To further enrich your learning experience, MedSchool Simplified provides premium features such as in-depth lecture notes, advanced case discussions, and specialized MCQs tailored to major medical exams. By upgrading to our premium offerings, you gain exclusive access to refined learning tools that sharpen clinical reasoning, deepen conceptual clarity, and keep you well-prepared for both theoretical and practical challenges in your medical journey.",
   },

   // home_3

   {
      id: 1,
      page: "home_3",
      icon_2: "assets/img/icons/h3_features_icon01.svg",
      title: "Scholarship Facility",
      desc: "Eestuidar University we prepare you to launch your.",
   },
   {
      id: 2,
      page: "home_3",
      icon_2: "assets/img/icons/h3_features_icon02.svg",
      title: "Learn From Experts",
      desc: "Eestuidar University we prepare you to launch your.",
   },
   {
      id: 3,
      page: "home_3",
      icon_2: "assets/img/icons/h3_features_icon03.svg",
      title: "Graduation Courses",
      desc: "Eestuidar University we prepare you to launch your.",
   },
   {
      id: 4,
      page: "home_3",
      icon_2: "assets/img/icons/h3_features_icon04.svg",
      title: "Certificate Program",
      desc: "Eestuidar University we prepare you to launch your.",
   },

   // home_4

   {
      id: 1,
      page: "home_4",
      icon: homefFeature_1,
      title: "Support & Motivation",
      desc: "We are able to offer every yoga training experienced & best yoga trainer.",
   },
   {
      id: 2,
      page: "home_4",
      icon: homefFeature_2,
      title: "Strong Body Life",
      desc: "We are able to offer every yoga training experienced & best yoga trainer.",
   },
   {
      id: 3,
      page: "home_4",
      icon: homefFeature_3,
      title: "Increased Flexibility",
      desc: "We are able to offer every yoga training experienced & best yoga trainer.",
   },

   // home-five

   {
      id: 1,
      page: "home_5",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-video-tutorial",
      title: "Easy Class",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },
   {
      id: 2,
      page: "home_5",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-verified",
      title: "Safety & Security",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },
   {
      id: 3,
      page: "home_5",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-instructor",
      title: "Skilled Teacher",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },
   {
      id: 4,
      page: "home_5",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-book-1",
      title: "Clean Curriculum",
      desc: "Dear Psum Dolor Amettey Adipis Aecing Eiusmod Incididutt Reore",
   },

   // home_8

   {
      id: 1,
      page: "home_8",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-book-1",
      title: "Learn skills with 120k+",
      desc: "video courses.",
   },
   {
      id: 2,
      page: "home_8",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-instructor",
      title: "Choose courses",
      desc: "real-world experts.",
   },
   {
      id: 3,
      page: "home_8",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-tutorial",
      title: "processional Tutors",
      desc: "video courses.",
   },
   {
      id: 4,
      page: "home_8",
      icon_3: "/assets/img/others/h5_features_item_shape02.svg",
      icon_2: "skillgro-graduated",
      title: "Online Degrees",
      desc: "Study flexibly online",
   },

];

export default feature_data;