import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, DomHead, Footer, NavBar } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { ResponsiveNavbar } from "../components/Navbar";
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

import { projects } from "../data/projects.json";
import userInfo from "../data/usersInfo.json";

function Projects() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  return (
    <div>
      <DomHead pageName="Projects" />
      <div className="w-screen h-auto bg-[#020617] ">
        <NavBar />
      </div>
      <div
        id="top-head"
        className="relative w-full min-h-[35vh] p-3 flex flex-col justify-center bg-[#0F172A] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)] before:pointer-events-none "
      >
        <Container className="relative z-10 flex flex-col justify-center h-full">
          <Link href={"/"}>
            <FaArrowLeft className="p-2 text-[#E2E8F0] text-[28px] bg-[#1E293B]/70 backdrop-blur-md border border-slate-700/50 rounded-md hover:scale-105 transition cursor-pointer" />
          </Link>
          <br />
          <h1 className="text-[48px] font-bold text-[#E2E8F0] ">Projects</h1>
          <p className="text-[15px] text-[#94A3B8] ">
            Here are my completed projects.
          </p>
        </Container>
      </div>
      <div className="w-screen h-auto bg-[#020617] py-10 ">
        <br />
        <Container>
          <div
            id="head"
            className="w-full py-2 mx-auto flex flex-row justify-start items-start"
          >
            <h2 className="text-[20px] text-[#E2E8F0] font-semibold px-4 md:px-4 p-2">
              Personal Projects
            </h2>
          </div>
          <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
            {/* <Categories /> */}
            <ProjectsCard />
          </div>
          <div
            id="head"
            className="w-full py-5 mx-auto flex flex-row justify-start items-start p-5 "
          >
            <h2 className=" text-[20px] text-white-200 p-4 md:p-0 ">
              Github Repos
            </h2>
          </div>
          <div
            id="head"
            className="w-full space-x-0 py-4 p-4 mx-auto flex flex-row justify-start items-start flex-wrap mb-[50px] gap-10 md:flex-row md:space-x-0 "
          >
            <GithubRepo />
          </div>
        </Container>
      </div>
      <Footer />
      {windowWidth <= 700 && <ResponsiveNavbar pageName={"projects"} />}
    </div>
  );
}

export default Projects;

function ProjectsCard() {
  return (
    <>
      {projects.length > 0
        ? projects.map((list, i) => {
            return (
              <div
                key={i}
                className={`w-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]`}
              >
                <div className="relative w-full h-[190px] overflow-hidden rounded-lg group">
                  <img
                    src={
                      list.imageUrl === "" || list.imageUrl === null
                        ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg"
                        : list.imageUrl
                    }
                    alt="project"
                    className="w-full h-full object-contain object-center transition duration-300 group-hover:scale-105"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>

                <div className={`w-full p-[10px] bottom-[5px]`}>
                  <div className="w-full h-auto">
                    <p className={`text-[16px] text-[#E2E8F0] font-semibold`}>
                      {list.title === "" ? "Project Title" : list.title}
                    </p>
                    <br />
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                      {list.description === ""
                        ? "some dummy description"
                        : list.description.length > 150
                          ? list.description.slice(0, 100) + "..."
                          : list.description}
                    </p>
                  </div>
                  <br />
                  <div
                    className={` bottom-[5px] left-[5px] p-0 flex items-start justify-start`}
                  >
                    {list.tags.length > 0
                      ? list.tags.slice(0, 3).map((tag, i) => {
                          return (
                            <span
                              key={i}
                              className={`text-[10px] px-2 py-1 bg-[#020617] border border-slate-700/50 text-[#38BDF8] rounded-full `}
                            >
                              {tag}
                            </span>
                          );
                        })
                      : ""}
                  </div>
                  <span
                    className={`absolute  my-[-20px] right-[10px] text-[12px] flex items-center justify-start`}
                  >
                    {list.project_url !== "" ? (
                      <>
                        <a
                          href={list.project_url}
                          className={`text-[#22C55E] hover:text-[#38BDF8] flex items-center gap-1 transition`}
                        >
                          View
                        </a>
                        <ion-icon
                          name="arrow-forward-outline"
                          className={`ml-[10px] p-[10px]`}
                        ></ion-icon>
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
}

function GithubRepo() {
  const [repos, setRepo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchRepos() {
    let res;
    let url = `https://api.github.com/users/${userInfo.github_username}/repos`;
    if (localStorage.getItem("user_repos") === null) {
      try {
        setLoading(true);
        res = await fetch(url);
        let data = await res.json();
        setLoading(false);

        if (data && data.length > 0) {
          const sortedData = [...data].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          );

          localStorage.setItem("user_repo", JSON.stringify(sortedData));

          setRepo(sortedData);
          return;
        }
        setError("No github repo found");
        setLoading(false);
      } catch (err) {
        setError(`FAILED FETCHING REPO'S: ${err.message}`);
        setLoading(false);
      }
    }

    let userReopos = JSON.parse(localStorage.getItem("user_repos"));

    setRepo(userReopos);
  }

  useEffect(() => {
    (async () => {
      await fetchRepos();
    })();
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : error !== null ? (
        <p>{error}</p>
      ) : repos.length > 0 ? (
        repos.map((rep, i) => {
          return (
            <div
              key={i}
              className="relative w-full md:w-[300px] vbg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]"
            >
              <h2 className="w-full text-[20px] ">{rep.name}</h2>
              <p className=" w-full text-[15px] text-white-300 ">
                {rep.description && rep.description.length > 50
                  ? rep.description.slice(0, 80) + "..."
                  : rep.description}
              </p>
              <br />
              <div className="mt-4 flex items-center justify-between">
                <span className="mr-2 flex flex-row items-start justify-start">
                  <StarRatings title="star" count={rep.stargazers_count} />
                </span>
                <span className="mr-2 flex flex-row items-start justify-start">
                  <StarRatings title="fork" count={rep.forks} />
                </span>
              </div>

              <div className="mt-4 flex justify-start">
                <a
                  href={rep.html_url}
                  className="text-[#22C55E] hover:text-[#38BDF8] flex items-center gap-1 transition"
                >
                  View <FaArrowRight size={12} />
                </a>
              </div>
            </div>
          );
        })
      ) : (
        "Opps, No Github Repo was found."
      )}
    </>
  );
}

function StarRatings({ count = 1, size = 3, title = "star" }) {
  return (
    <>
      {Array(1)
        .fill(1)
        .map((i) => {
          return (
            <>
              {title === "star" ? (
                <FaStar
                  key={i * Math.random()}
                  className={`text-[#22C55E] text-[${size}px] `}
                />
              ) : title === "fork" ? (
                <AiFillGithub
                  key={i * Math.random()}
                  className={`text-[#22C55E] text-[${size}px] `}
                />
              ) : (
                ""
              )}
            </>
          );
        })}
      <small className="ml-2 text-white-200 font-extrabold">{count}</small>
      <small className="ml-2 text-white-200">{title}</small>
    </>
  );
}
