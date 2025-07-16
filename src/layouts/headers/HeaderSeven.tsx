"use client";
import Image from "next/image";
import Link from "next/link";
import NavMenuOne from "./menu/NavMenu";
import InjectableSvg from "@/hooks/InjectableSvg";
import UseSticky from "@/hooks/UseSticky";
import { useState } from "react";
import MobileSidebar from "./menu/MobileSidebar";

import logo from "@/assets/img/bg/logo1.png";

const HeaderSeven = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // You can implement your search logic here based on searchTerm
    console.log("Search Term:", e.target.value);
  };

  return (
    <>
      <header>
        <div id="header-fixed-height"></div>
        <div
          id="sticky-header"
          className={`tg-header__area tg-header__style-seven ${
            sticky ? "sticky-menu" : ""
          }`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo">
                      <Link href="/">
                        <img src={logo.src} style={{ height: "100px" }} />
                      </Link>
                    </div>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                      <NavMenuOne />
                    </div>
                    <div className="tgmenu__action tgmenu__action-seven">
                      <ul className="list-wrap">
                        <li className="header-search">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                              padding: "8px 12px",
                              border: "1px solid #ccc",
                              borderRadius: "20px",
                              marginRight: "10px",
                            }}
                          />
                        </li>
                        <li>
                          <Link
                            href="/registration"
                            className="btn arrow-btn"
                          >
                            Register Now
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-login-btn">
                      <Link href="/login">
                        <InjectableSvg
                          src="/assets/img/icons/user.svg"
                          alt=""
                          className="injectable"
                        />
                      </Link>
                    </div>
                    <div
                      onClick={() => setIsActive(true)}
                      className="mobile-nav-toggler"
                    >
                      <i className="tg-flaticon-menu-1"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default HeaderSeven;