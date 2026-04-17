import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

import { projects } from "../../data/projects.json";
import userInfo from "../../data/usersInfo.json";

function Projects() {
  const [repo, setRepo] = useState([]);
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
        setLoading(false);
        setError(`No github repos found.`);
      } catch (err) {
        console.error(`FAILED: ${err.message}`);
        setLoading(false);
        setError(`Failed fetching repo: ${err.message}`);
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
    <div className="relative z-10">
      <div
        className={`projectCont w-full h-auto relative mt-16 py-16 px-4 bg-[#020617] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_60%)] before:pointer-events-none rounded-lg`}
      >
        <div
          className={`w-full flex flex-col items-center justify-center gap-3`}
        >
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[2px] bg-gradient-to-r from-[#22C55E] to-[#38BDF8] md:w-[120px]`}
          ></span>
          <p
            data-aos="fade-up"
            className={`text-[#94A3B8] text-[14px] tracking-wide uppercase`}
          >
            Latest Works
          </p>
          <span
            data-aos="zoom-in"
            className={`w-[100px] h-[2px] rounded-[30px] m-[2px] bg-gradient-to-r from-[#22C55E] to-[#38BDF8] md:w-[120px]`}
          ></span>

          <Link href="/projects">
            <a
              data-aos="zoom-in-up"
              className={`text-center text-green-200 underline mt-2 text-sm text-[#22C55E] hover:text-[#38BDF8] transition text-[14px]`}
            >
              All Projects
            </a>
          </Link>
        </div>

        <div
          className={`projects w-full h-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`}
        >
          {projects.length > 0
            ? projects.slice(0, 6).map((list, i) => {
                return (
                  <div
                    data-aos="zoom-in"
                    key={i}
                    className={`group w-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]`}
                  >
                    <div className="imgCont relative">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition rounded-xl"></div>
                    </div>
                    <style jsx>{`
                      .imgCont {
                        width: 100%;
                        height: 190px;
                        background-image: url(${list.imageUrl === "" ||
                        list.imageUrl === null
                          ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg"
                          : list.imageUrl});
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        // box-shadow: 0px 0px 3px #000;
                        border-radius: 5px;
                      }
                    `}</style>
                    <div className={`w-full p-[10px] bottom-[5px]`}>
                      <div className="w-full h-auto">
                        <p
                          className={`text-[#E2E8F0] font-semibold text-[16px]`}
                        >
                          {list.title === "" ? "Project Title" : list.title}
                        </p>
                        <br />
                        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                          {list.description === ""
                            ? "some dummy description"
                            : list.description}
                        </p>
                      </div>
                      <br />
                      <div
                        className={` bottom-[5px] left-[5px] p-0 flex items-start justify-start`}
                      >
                        {list.tags.length > 0
                          ? list.tags.map((tag, i) => {
                              return (
                                <span
                                  key={i}
                                  className={`mr-[2px] bg-[#020617] border border-slate-700/50 text-[#38BDF8] rounded-full px-3 py-1 text-[11px]`}
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
        </div>
        <div className="h-auto mb-5 p-3 items-center w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            "Loading..."
          ) : error !== null ? (
            <p>{error}</p>
          ) : (
            <GithubRepo repos={repo} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;

function GithubRepo({ repos }) {
  return (
    <>
      {repos.length > 0
        ? repos.slice(0, 3).map((rep, i) => {
            return (
              <div
                data-aos="zoom-in"
                key={i}
                className="group relative w-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]"
              >
                <h2 className="text-[18px] font-semibold text-[#E2E8F0] ">
                  {rep.name}
                </h2>
                <br />
                <p className=" w-full text-[#94A3B8] text-[14px] leading-relaxed mt-2 ">
                  {rep.description && rep.description.length > 50
                    ? rep.description.slice(0, 60) + "...."
                    : rep.description}
                </p>
                <br />
                <div className="mt-4 flex items-center gap-4">
                  <span className="mr-2 flex flex-row items-start justify-start">
                    <StarRatings title="star" count={rep.stargazers_count} />
                  </span>
                  <span className="mr-2 flex flex-row items-start justify-start">
                    <StarRatings title="fork" count={rep.forks} />
                  </span>
                </div>

                <div className="mt-4 flex justify-top">
                  <a
                    href={rep.html_url}
                    target="_blank"
                    className="text-[#22C55E] hover:text-[#38BDF8] flex items-center gap-1 transition"
                  >
                    View <FaArrowRight size={12} />
                  </a>
                </div>
              </div>
            );
          })
        : "Opps, No Github Repo was found."}
    </>
  );
}

function StarRatings({ count = 1, size = 3, title = "star" }) {
  return (
    <>
      {title === "star" ? (
        Array(1)
          .fill(1)
          .map((i) => {
            return (
              <FaStar
                key={i * Math.floor(Math.random() * 1000)}
                className={`text-[#22C55E] text-sm `}
              />
            );
          })
      ) : (
        <AiFillGithub className={`text-[#22C55E] text-[${size}px] `} />
      )}
      <small className="ml-2 text-white-200 font-extrabold">{count}</small>
      <small className="ml-2 text-white-200">{title}</small>
    </>
  );
}
