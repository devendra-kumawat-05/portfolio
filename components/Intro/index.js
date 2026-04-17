import Link from "next/link";

import skills from "../../data/skills.json";
import usersInfo from "../../data/usersInfo.json";

export default function Intro() {
  return (
    <div className="relative z-10">
      <div
        className={`w-full h-auto mt-20 mb-20 px-4 bg-[#020617] relative before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08),transparent_60%)] before:pointer-events-none rounded-lg`}
      >
        <div
          className={`w-full justify-between flex flex-col md:flex-row items-center gap-10
`}
        >
          <div
            className={`w-full h-auto p-[10px] relative container md:w-[50%]`}
          >
            {/* boxes */}
            <IntroCards data={skills.skill} />
          </div>
          <div
            className={`w-full h-auto relative p-[10px] mb-[30px] md:mb-0 md:w-[45%]`}
          >
            <p className={`text-[12px] text-[#94A3B8] `}>Introduce</p>
            <div className={`relative`}>
              <h1
                data-aos="zoom-in-up"
                className={`text-[32px] md:text-[36px] font-bold text-[#E2E8F0] leading-snug`}
              >
                {usersInfo.greeting_type} I'm {usersInfo.full_name}.
              </h1>
              <br />
              <br />
              <p
                data-aos="zoom-in-right"
                className={`text-[15px] bg-[#1E293B]/60 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-3 text-[#CBD5F5] italic border-solid `}
              >
                {usersInfo.intro_tagline}
              </p>
              <br />
              <p
                data-aos="fade-up"
                className={`text-[14px] mb-5 text-white-200`}
              >
                {usersInfo.bio_desc[0]}
              </p>

              <Link href="/about">
                <a
                  data-aos="zoom-in-up"
                  className={`text-[14px] text-[#22C55E] hover:text-[#38BDF8] transition underline font-medium
`}
                >
                  Read More
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className={styles.companies}>
                <img src="https://avatars.githubusercontent.com/u/104397777?s=200&v=4" className={styles.compImage} alt="" />
                <img src="" className={styles.compImage} alt="" />
            </div>
            <br /> */}
      </div>
    </div>
  );
}

function IntroCards({ data }) {
  return (
    <div className="grid grid-cols-1 gap-5">
      {data.length > 0 ? (
        data.map((skill, i) => {
          return (
            <div
              data-aos="zoom-in-up"
              key={i}
              className={`group w-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]`}
            >
              <div className={`flex flex-col items-start justify-start`}>
                <p className={`m-0 font-extrabold text-green-100 `}>
                  {skill.name}
                </p>
                <span className={`text-[12px] text-white-300 pt-[10px]  `}>
                  {skill.description}
                </span>
              </div>
              <div className="mt-4 text-sm text-[#38BDF8] font-medium">
                {skill.projects_completed} Projects
              </div>

              <div className="absolute top-3 right-3 text-[#22C55E] opacity-70 group-hover:opacity-100 transition">
                <ion-icon name="color-wand"></ion-icon>
              </div>
            </div>
          );
        })
      ) : (
        <div
          data-aos="zoom-in-up"
          className={`group w-full bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]`}
        >
          <div className={`flex flex-col items-start justify-start`}>
            <p className={`m-0 text-[#22C55E] font-semibold text-[16px] `}>
              Frontend Development
            </p>
            <span
              className={`text-[#94A3B8] text-[13px] mt-2 leading-relaxed pt-[10px]  `}
            >
              Development of beautiful and unique user interfaces.
            </span>
          </div>
          <div className={`mt-4 text-sm text-[#38BDF8] font-medium`}>
            <a className={` text-[14px] text-white-200 font-bold underline `}>
              60 Projects
            </a>
          </div>
          <div className="absolute top-3 right-3 text-[#22C55E] opacity-70 group-hover:opacity-100 transition">
            <ion-icon name="color-wand"></ion-icon>
          </div>
        </div>
      )}
    </div>
  );
}
