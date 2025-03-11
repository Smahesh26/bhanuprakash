"use client"
import Image from "next/image"
import Link from "next/link"
import Social from "@/components/common/Social"
import logo from "@/assets/img/logo/secondary_logo.svg"
import { Color } from "three";

const FooterTwo = ({ style }: any) => {
   return (
      <footer className={`footer__area ${style ? "footer__area-five" : "footer__area-three"}`}>
         <div className="footer__top footer__top-two" style={{backgroundColor:"#168e6a;"}}>
            <div className="container">
               <div className="row">
                  <div className="col-xl-2 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <div className="logo mb-35">
                           <Link href="/"><h5 style={{color:"#fff"}}>Dr.Bhanu Prakash</h5></Link>
                        </div>
                        <div className="footer__content footer__content-two">
                           <p>Hyderabad</p>
                           <ul className="list-wrap">
                              <li><Link href="tel:0123456789">India</Link></li>
                              <li className="email"><a href="mailto:info@gmail.com">info@gmail.com</a></li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Useful Links</h4>
                        <div className="footer__link">
                           <ul className="list-wrap">
                           <li><Link href="">Terms and Conditions</Link></li>
                              <li><Link href="">Privacy Policy</Link></li>
                              <li><Link href="">Disclamer</Link></li>
                              {/* <li><Link href="/events-details">Terms and Conditions</Link></li>
                              <li><Link href="/events-details">Privacy Policy</Link></li>
                              <li><Link href="/events-details">Disclamer</Link></li> */}
                              {/* <li><Link href="/events-details">Become a partner</Link></li>
                              <li><Link href="/events-details">Work at Future Learn</Link></li>
                              <li><Link href="/events-details">Quizlet Plus</Link></li> */}
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Our Company</h4>
                        <div className="footer__link">
                           <ul className="list-wrap">
                              <li><Link href="/contact">Contact Us</Link></li>
                              {/* <li><Link href="/instructor-details">Become Teacher</Link></li> */}
                              <li><Link href="">Blog</Link></li>
                              <li><Link href="">Instructor</Link></li>
                              {/* <li><Link href="/events-details">Events</Link></li> */}
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Newsletter SignUp!</h4>
                        <div className="footer__newsletter">
                           <p>Get the latest news delivered to you inbox</p>
                           <form onSubmit={(e) => e.preventDefault()} className="footer__newsletter-form">
                              <input type="email" placeholder="Type your E-mail" style={{backgroundColor:"#fff !important"}}/>
                              <button type="submit">Subscribe</button>
                           </form>
                           <div className="footer__social-wrap">
                              <h6 className="title">Follow Us:</h6>
                           </div>
                           <ul className="list-wrap footer__social footer__social-two">
                              <Social />
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="footer__bottom-two" style={{backgroundColor:"#168e6a;"}}>
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-7">
                     <div className="copy-right-text">
                        <p style={{color:"#fff !important"}}>© 2025 FOTINO. All rights reserved.</p>
                     </div>
                  </div>
                  {/* <div className="col-md-5">
                     <div className="footer__bottom-menu">
                        <ul className="list-wrap">
                           <li><Link href="/contact">Term of Use</Link></li>
                           <li><Link href="/contact">Privacy Policy</Link></li>
                        </ul>
                     </div>
                  </div> */}
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterTwo
