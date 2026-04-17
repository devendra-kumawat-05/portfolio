import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, DomHead, Footer, NavBar } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { ResponsiveNavbar } from "../components/Navbar";

import userInfo from "../data/usersInfo.json";

function About() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  useEffect(() => {
    let useravatar = JSON.parse(localStorage.getItem("github_avatar"));
    setAvatar(useravatar);
  }, []);

  return (
    <div>
      <DomHead pageName="About" />
      <div className="w-screen h-auto bg-[#020617] ">
        <NavBar />
      </div>
      <div
        id="top-head"
        className="relative w-full min-h-[35vh] flex justify-center p-3 flex-col items-start bg-[#0F172A] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)] before:pointer-events-none "
      >
        <Container className="relative z-10">
          <Link href={"/"}>
            <FaArrowLeft className="p-2 text-[#E2E8F0] text-[28px] bg-[#1E293B]/70 backdrop-blur-md border border-slate-700/50 rounded-md cursor-pointer hover:scale-105 transition" />
          </Link>
          <br />
          <h1 className="text-[48px] font-bold text-[#E2E8F0]">About</h1>
          <p className="text-[15px] text-[#94A3B8] ">About Me.</p>
          <div className="w-[80px] h-[2px] mt-3 bg-gradient-to-r from-[#22C55E] to-[#38BDF8] rounded-full"></div>
        </Container>
      </div>

      <div className="w-screen h-auto bg-[#020617] py-10 ">
        <Container>
          <div className="w-full h-auto flex flex-col items-center justify-between p-6 gap-12 md:flex-row">
            <div className="w-full md:w-[50%] flex justify-center md:justify-start ">
              <div
                className="w-full h-[450px] bg-cover bg-center bg-no-repeat md:w-[350px] rounded-xl border border-slate-700/50 shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:scale-[1.02] transition duration-300"
                style={{
                  backgroundImage: `url(${avatar})`,
                }}
              ></div>
            </div>
            <div className="w-full md:w-[50%] ">
              <div
                className={`w-full h-auto relative top-[20px] p-[10px] mb-[30px] md:mb-0 md:top-0`}
              >
                <p
                  className={`text-[12px] text-[#38BDF8] uppercase tracking-wider `}
                >
                  Introduce
                </p>
                <div className={`relative top-[20px]`}>
                  <h1
                    className={`text-[36px] font-bold mb-[20px] text-[#E2E8F0]`}
                  >
                    {userInfo.greeting_type} I'm {userInfo.full_name}
                  </h1>
                  <br />
                  <br />
                  <p
                    className={`text-[15px] text-[#CBD5F5] p-4 px-5 bg-[#1E293B]/60 backdrop-blur-sm border border-slate-700/50 rounded-lg italic`}
                  >
                    {userInfo.intro_tagline}
                  </p>
                  <br />
                  {userInfo.bio_desc.length > 0
                    ? userInfo.bio_desc.map((bio, i) => {
                        return (
                          <p
                            className={`text-[15px] mb-5 text-[#94A3B8] leading-relaxed`}
                          >
                            {bio}
                          </p>
                        );
                      })
                    : "Opps, 😬 looks like I dont have a bio."}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
      {windowWidth <= 700 && <ResponsiveNavbar pageName={"projects"} />}
    </div>
  );
}

export default About;
