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
    console.log("Search Term:", e.target.value);
  };

  return (
    <>
      <header className="header-seven" style={{ background: "#fff !important", color: "#1E293B", boxShadow: "0 2px 12px #0001" }}>
        <div id="header-fixed-height"></div>
        <div
          id="sticky-header"
          className={`tg-header__area tg-header__style-seven ${
            sticky ? "sticky-menu" : ""
          }`}
          style={{
            background: "#230908",
            color: "#ffffff",
            padding: "18px 0", // more vertical spacing
            // borderRadius: 12, // rounded corners
            // margin: "8px", // spacing from edges
            // boxShadow: "0 6px 20px rgba(0,0,0,0.25)", // subtle elevation
          }}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav" style={{ color: "#ffffff !important" }}>
                    <div className="logo">
                      <Link href="/" style={{ display: "inline-block" }}>
                        <img
                          src={logo.src}
                          style={{
                            height: "84px", // make logo bigger
                            width: "auto",
                            display: "block",
                            marginRight: "16px",
                          }}
                          alt="Logo"
                        />
                      </Link>
                    </div>
                    <div
                      className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex"
                      style={{ color: "#ffffff" }}
                    >
                      <NavMenuOne />
                    </div>
                    <div className="tgmenu__action tgmenu__action-seven">
                      <ul className="list-wrap" style={{ color: "#ffffff" }}>
                        <li className="header-search">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                              padding: "8px 12px",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: "20px",
                              marginRight: "10px",
                              background: "transparent",
                              color: "#ffffff",
                            }}
                          />
                        </li>
                        <li>
                          <Link
                            href="/registration"
                            className="btn arrow-btn fw-bold"
                            style={{
                              width: "fit-content",
                              backgroundColor: "#f9a116",
                              color: "#ffffff",
                              borderRadius: 30,
                              padding: "10px 25px",
                              textDecoration: "none",
                              display: "inline-block",
                            }}
                          >
                            Register Now &nbsp; →
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-login-btn">
                      <Link href="/login" style={{ color: "#ffffff" }}>
                        <InjectableSvg
                          src="/assets/img/icons/user.svg"
                          alt=""
                          className="injectable"
                          // ensure svg inherits white color
                          {...({ style: { color: "#ffffff" } } as any)}
                        />
                      </Link>
                    </div>
                    <div
                      onClick={() => setIsActive(true)}
                      className="mobile-nav-toggler"
                    >
                      <i className="tg-flaticon-menu-1" style={{ color: "#fff" }}></i>
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