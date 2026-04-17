import React, { useEffect, useState } from "react";

import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import usersInfo from "../../data/usersInfo.json";
import { socials } from "../../data/socials.json";
import avatar from "../../public/images/avatar/avatar.png";
import { BsFillPSquareFill, BsLinkedin } from "react-icons/bs";

function NavBar() {
  return (
    <React.Fragment>
      <div className="w-full py-[12px] border-b border-slate-700/50 bg-[#0F172A]/80 backdrop-blur-md sticky  top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className={`flex-1 flex items-center`}>
            <p
              className={`font-extrabold text-[22px] text-white text-[#E2E8F0] tracking-wide`}
            >
              {/* {usersInfo.github_username.charAt(0).toUpperCase() +
              usersInfo.github_username.slice(1)} */}
              Devendra Kumawat
            </p>
          </div>

          {/* CENTER - Nav */}

          <div className="flex-1 hidden md:flex justify-center">
            <ul className={`flex gap-8 text-[14px] text-[#94A3B8]`}>
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <li
                  key={item}
                  className="group relative cursor-pointer transition duration-300 hover:text-[#E2E8F0]"
                >
                  <Link
                    href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  >
                    {item}
                  </Link>

                  {/* Gradient underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#22C55E] to-[#38BDF8] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 hidden md:flex justify-end items-center gap-6 text-[#94A3B8]">
            {socials["github"] && (
              <a
                href={socials["github"]}
                target="_blank"
                className="hover:text-[#38BDF8] transition duration-300"
              >
                <FaGithub size={18} />
              </a>
            )}

            {socials["email"] && (
              <a
                href={`mailto:${socials["email"]}`}
                className="hover:text-[#22C55E] transition duration-300"
              >
                <FiMail size={18} />
              </a>
            )}

            {socials["linkedin"] && (
              <a
                href={socials["linkedin"]}
                className="hover:text-[#38BDF8] transition duration-300"
              >
                <BsLinkedin size={18} />
              </a>
            )}
          </div>
          {/* MOBILE AVATAR */}
          <div className="md:hidden">
            <img
              src={avatar.src}
              className="w-[40px] rounded-full border-2 border-[#22C55E]"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavBar;

export function ResponsiveNavbar({ activePage, pageName = "" }) {
  const [active, setActive] = useState(activePage || "home");

  function handleActive(e) {
    let tgt = e.target.dataset;
    let parent = e.target.parentElement.dataset;

    if (Object.entries(tgt).length === 0) {
      if (Object.entries(parent).length > 0) {
        let { name } = parent;
        setActive(name);
      }
      return;
    }
    let { name } = tgt;
    setActive(name);
  }

  return (
    <div className={`mobileNav`}>
      <div className={`main`}>
        <li
          className={active === "home" ? `active` : `li`}
          data-name="home"
          onClick={handleActive}
        >
          <Link href="/">
            <ion-icon name="home-outline" class={`icon`}></ion-icon>
          </Link>
          <label className={`label`}>Home</label>
        </li>
        <li
          className={active === "projects" ? `active` : `li`}
          data-name="projects"
          onClick={handleActive}
        >
          <Link href="/projects">
            <ion-icon name="cube-outline" class={`icon`}></ion-icon>
          </Link>
          <label className={`label`}>Projects</label>
        </li>
        <li
          className={active === "about" ? `active` : `li`}
          data-name="about"
          onClick={handleActive}
        >
          <Link href="/about">
            <ion-icon name="person-outline" class={`icon`}></ion-icon>
          </Link>
          <label className={`label`}>About</label>
        </li>
        <li
          className={active === "contact" ? `active mr-5` : `li mr-5`}
          data-name="contact"
          onClick={handleActive}
        >
          <Link href={pageName === "" ? "#contact" : "/#contact"}>
            <ion-icon name="mail-outline" class={`icon`}></ion-icon>
          </Link>
          <label className={`label`}>Contact</label>
        </li>
      </div>
    </div>
  );
}
