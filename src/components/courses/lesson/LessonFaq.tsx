import React from "react";
import Image from "next/image";
import Link from "next/link";

import icon_1 from "@/assets/img/icons/lock.svg"

interface DataType {
   id: number;
   title: string;
   show?: string;
   collapsed?: string;
   count: string;
   faq_details: {
      class_name?: string;
      lock: boolean;
      title: string;
      duration: string;
   }[]
}[]

const faq_data: DataType[] = [
   {
      id: 1,
      title: "Introduction",
      show: "show",
      count: "1/3",
      faq_details: [
         {
            class_name: "open-item",
            lock: false,
            title: "Lecture 1",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Lecture 2",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Lecture 3",
            duration: "10:48"
         },
      ]
   },
   {
      id: 2,
      title: "Course and its details",
      collapsed: "collapsed",
      count: "1/5",
      faq_details: [
         {
            lock: true,
            title: "Lecture 1",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Lecture 2",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Lecture 3",
            duration: "10:48"
         },
         {
            lock: true,
            title: "Lecture 4",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Lecture 5",
            duration: "10:48"
         },
      ]
   },
   {
      id: 3,
      title: "Final Releases",
      collapsed: "collapsed",
      count: "1/2",
      faq_details: [
         {
            lock: true,
            title: "Lecture 1",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Lecture 2",
            duration: "07:48"
         },
      ]
   },
];

const LessonFaq = () => {

   return (
      <div className="accordion" id="accordionExample">
         {faq_data.map((item) => (
            <div key={item.id} className="accordion-item">
               <h2 className="accordion-header">
                  <button className={`accordion-button ${item.collapsed}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${item.id}`} aria-expanded="true" aria-controls={`collapseOne${item.id}`}>
                     {item.title}
                     <span>{item.count}</span>
                  </button>
               </h2>
               <div id={`collapseOne${item.id}`} className={`accordion-collapse collapse ${item.show}`} data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                     <ul className="list-wrap">
                        {item.faq_details.map((list, i) => (
                           <React.Fragment key={i}>
                              {list.lock ? (
                                 <li className="course-item">
                                    <Link href="#" className="course-item-link">
                                       <span className="item-name">{list.title}</span>
                                       <div className="course-item-meta">
                                          <span className="item-meta duration">{list.duration}</span>
                                          <span className="item-meta course-item-status">
                                             <Image src={icon_1} alt="icon" />
                                          </span>
                                       </div>
                                    </Link>
                                 </li>) : (
                                 <li className="course-item open-item">
                                    <Link href="#" className="course-item-link popup-video">
                                       <span className="item-name">Course Installation</span>
                                       <div className="course-item-meta">
                                          <span className="item-meta duration">03:03</span>
                                       </div>
                                    </Link>
                                 </li>
                              )}
                           </React.Fragment>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default LessonFaq
