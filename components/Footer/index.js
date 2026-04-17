import { Container } from "..";
import { FaTwitter, FaGithub, FaFacebook, FaVoicemail } from "react-icons/fa";
import { BsFillPSquareFill, BsLinkedin } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";

import { socials } from "../../data/socials.json";
import usersInfo from "../../data/usersInfo.json";

function Footer() {
  return (
    <div
      id="footer"
      className="relative w-screen px-3 bg-[#020617] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.1),transparent_60%)] before:pointer-events-none "
    >
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
      <div className="w-full mx-auto md:w-[80%]">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="left flex flex-row">
            <h1 className=" text-[16px] text-[#E2E8F0] ">
              <span className="font-extrabold">
                {/* {usersInfo.github_username} */}
                Devendra Kumawat
              </span>
            </h1>
            <small className="md:ml-4 text-[#94A3B8] text-[13px] ">
              &copy; {new Date().getFullYear()} All Right Reserved.
            </small>
          </div>
          <div className="right">
            <div className="socials flex flex-row items-center justify-center gap-2">
              {socials["twitter"] !== "" && (
                <SocialLink
                  url={socials["twitter"]}
                  children={<FaTwitter className="hover:text-[#38BDF8]" />}
                />
              )}

              {socials["github"] !== "" && (
                <SocialLink
                  url={socials["github"]}
                  children={<FaGithub className="hover:text-[#38BDF8]" />}
                />
              )}

              {socials["email"] !== "" && (
                <SocialLink
                  url={socials["email"]}
                  children={<AiFillMail className="hover:text-[#22C55E]" />}
                />
              )}

              {socials["peerlist"] !== "" && (
                <SocialLink
                  url={socials["peerlist"]}
                  children={
                    <BsFillPSquareFill className="hover:text-[#22C55E]" />
                  }
                />
              )}
              {socials["linkedin"] !== "" && (
                <SocialLink
                  url={socials["linkedin"]}
                  children={<BsLinkedin className="hover:text-[#38BDF8]" />}
                />
              )}
            </div>
          </div>

          {/* Leave this just to give some credits about the maker */}
        </div>
      </div>
      <Refer />
    </div>
  );
}

export default Footer;

function SocialLink({ url, children }) {
  return (
    <a
      href={url}
      target="_blank"
      className=" flex items-center justify-center w-10 h-10 rounded-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 text-[#94A3B8] hover:text-white hover:scale-110 transition duration-300 "
    >
      {children}
    </a>
  );
}

function Refer() {
  return (
    <div className="w-screen flex flex-row items-center justify-center relative mt-8">
      <span className="py-2 text-[12px] text-[#94A3B8] ">
        Crafted with 💖 by{" "}
        <a
          target="_blank"
          href="https://github.com/devendra-kumawat-05"
          className="text-[#22C55E] hover:text-[#38BDF8] transition underline"
        >
          Devendra Kumawat
        </a>
      </span>
    </div>
  );
}
