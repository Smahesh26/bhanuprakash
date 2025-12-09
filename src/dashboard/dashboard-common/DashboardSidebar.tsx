"use client"
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'

interface DataType {
   id: number;
   title: string;
   class_name?: string;
   sidebar_details: {
      id: number;
      link: string;
      icon: string;
      title: string;
   }[];
}[];

const sidebar_data: DataType[] = [
   {
      id: 1,
      title: "Welcome, admin",
      sidebar_details: [
         {
            id: 1,
            link: "/instructor-dashboard",
            icon: "fas fa-home",
            title: "Dashboard",
         },
         {
            id: 6,
            link: "/instructor-banner-videos",
            icon: "skillgro-video-tutorial",
            title: "Add Banner Videos",
         },
         {
            id: 7,
            link: "/instructor-upload-course",
            icon: "skillgro-video-tutorial",
            title: "Upload Main Course",
         },
         {
            id: 5,
            link: "/instructor-course-pages", // new route
            icon: "skillgro-group",
            title: "Add New Course",
         },
         {
            id: 9,
            link: "/manage-homepage-courses",
            icon: "skillgro-home",
            title: "Homepage Courses",
         },
         {
            id: 10,
            link: "/instructor-testimonials",
            icon: "skillgro-group",
            title: "Testimonials",
         },
         {
            id: 4,
            link: "/instructor-student", // new route
            icon: "skillgro-group",
            title: "Students",
         },
         {
            id: 8,
            link: "/instructor-blogs", // new route
            icon: "skillgro-group",
            title: "Blogs",
         },
         {
            id: 2,
            link: "/instructor-profile",
            icon: "skillgro-avatar",
            title: "My Profile",
         },
        

      
         
       
         // {
         //    id: 4,
         //    link: "/instructor-wishlist",
         //    icon: "skillgro-label",
         //    title: "Wishlist",
         // },
         // {
         //    id: 5,
         //    link: "/instructor-review",
         //    icon: "skillgro-book-2",
         //    title: "Reviews",
         // },
         // {
         //    id: 6,
         //    link: "/instructor-attempts",
         //    icon: "skillgro-question",
         //    title: "My Quiz Attempts",
         // },
         // {
         //    id: 7,
         //    link: "/instructor-history",
         //    icon: "skillgro-satchel",
         //    title: "Order History",
         // },
      ],
   },
   // {
   //    id: 2,
   //    title: "INSTRUCTOR",
   //    class_name: "mt-40",
   //    sidebar_details: [
   //       {
   //          id: 1,
   //          link: "/instructor-courses",
   //          icon: "skillgro-video-tutorial",
   //          title: "My Courses",
   //       },
   //       {
   //          id: 2,
   //          link: "/instructor-announcement",
   //          icon: "skillgro-marketing",
   //          title: "Announcements",
   //       },
   //       {
   //          id: 3,
   //          link: "/instructor-quiz",
   //          icon: "skillgro-chat",
   //          title: "Quiz Attempts",
   //       },
   //       {
   //          id: 4,
   //          link: "/instructor-assignment",
   //          icon: "skillgro-list",
   //          title: "Assignments",
   //       },
   //    ],
   // },
   {
      id: 3,
      title: "User",
      class_name: "mt-30",
      sidebar_details: [
         {
            id: 1,
            link: "/instructor-setting",
            icon: "skillgro-settings",
            title: "Settings",
         },
         {
            id: 2,
            link: "/",
            icon: "skillgro-logout",
            title: "Logout",
         },
      ],
   },
];

const DashboardSidebar = () => {

   const pathname = usePathname();

   return (
      <div className="col-lg-3">
         <div className="dashboard__sidebar-wrap">
            {sidebar_data.map((item) => (
               <React.Fragment key={item.id}>
                  <div className={`dashboard__sidebar-title mb-20 ${item.class_name}`}>
                     <h6 className="title">{item.title}</h6>
                  </div>
                  <nav className="dashboard__sidebar-menu">
                     <ul className="list-wrap">
                        {item.sidebar_details.map((list) => (
                           <li key={list.id} className={pathname === list.link ? 'active' : ''}>
                              <Link href={list.link}>
                                 <i className={list.icon}></i>
                                 {list.title}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </nav>
               </React.Fragment>
            ))}
         </div>
      </div>
   )
}

export default DashboardSidebar
