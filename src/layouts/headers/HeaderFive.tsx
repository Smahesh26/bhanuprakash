"use client"
import Link from "next/link"
import HeaderTopTwo from "./menu/HeaderTopTwo"
import Image from "next/image"
import NavMenuOne from "./menu/NavMenu"
import InjectableSvg from "@/hooks/InjectableSvg"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import MobileSidebar from "./menu/MobileSidebar"
import dynamic from "next/dynamic"
const TotalCart = dynamic(() => import("@/components/common/TotalCart"), { ssr: false });

import logo from "@/assets/img/logo/logo.svg"

const HeaderSeven = () => {

   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);

   return (

      <>
         <header>
            <div id="header-fixed-height"></div>
            <HeaderTopTwo />
            <div id="sticky-header" className={`tg-header__area tg-header__style-five ${sticky ? "sticky-menu" : ""}`}>
               <div className="container custom-container">
                  <div className="row">
                     <div className="col-12">
                        <div className="tgmenu__wrap">
                           <nav className="tgmenu__nav">
                              <div className="logo">
                                 <Link href="/"><Image src={logo} alt="Logo" /></Link>
                              </div>
                              <div className="tgmenu__categories select-grp-two d-none d-md-block">
                                 <div className="dropdown">
                                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                       <i className="skillgro-list"></i>
                                       Categories
                                    </button>
                                    <ul className="dropdown-menu">
                                       <li><Link className="dropdown-item" href="/courses">Business</Link></li>
                                       <li><Link className="dropdown-item" href="/courses">Data Science</Link></li>
                                       <li><Link className="dropdown-item" href="/courses">Art & Design</Link></li>
                                       <li><Link className="dropdown-item" href="/courses">Marketing</Link></li>
                                       <li><Link className="dropdown-item" href="/courses">Finance</Link></li>
                                    </ul>
                                 </div>
                              </div>
                              <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                 <NavMenuOne />
                              </div>
                              <div className="tgmenu__action tgmenu__action-five">
                                 <ul className="list-wrap">
                                    <li>
                                       <div className="tgmenu__search tgmenu__search-two  d-none d-md-block">
                                          <form onSubmit={(e) => e.preventDefault()} className="tgmenu__search-form tgmenu__search-form-two">
                                             <div className="input-grp">
                                                <input type="text" placeholder="Search . . ." />
                                                <button type="submit"><i className="flaticon-search"></i></button>
                                             </div>
                                          </form>
                                       </div>
                                    </li>
                                    <li className="header-user">
                                       <Link href="/instructor-dashboard"><InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" /></Link>
                                    </li>
                                    <li className="mini-cart-icon">
                                       <Link href="/cart" className="cart-count">
                                          <InjectableSvg src="/assets/img/icons/cart.svg" className="injectable" alt="img" />
                                          <TotalCart />
                                       </Link>
                                    </li>
                                    <li className="header-contact">
                                       <div className="icon">
                                          <i className="skillgro-phone-call"></i>
                                       </div>
                                       <div className="content">
                                          <span>Call to Question</span>
                                          <Link href="tel:0123456789">+123 599 8989</Link>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                              <div className="mobile-login-btn">
                                 <Link href="/login"><InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" /></Link>
                              </div>
                              <div onClick={() => setIsActive(true)} className="mobile-nav-toggler"><i className="tg-flaticon-menu-1"></i></div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} /></>
   )
}

export default HeaderSeven
