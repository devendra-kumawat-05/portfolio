import React from "react";
import { Container } from "..";

import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import userInfo from "../../data/usersInfo.json";

function Quote() {
  return (
    <div className="relative z-10">
      <div className="w-full h-auto py-20 bg-[#0F172A] relative before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_60%)] before:pointer-events-none">
        <Container>
          <div className="head mx-auto items-center justify-center text-center md:items-center md:justify-start md:px-0 flex flex-col gap-2">
            <h1
              data-aos="fade-right"
              className="text-[32px] md:text-[36px] text-[#E2E8F0] font-bold md:mr-[50px]"
            >
              Favorite Quote
            </h1>
            <p
              data-aos="fade-left"
              className="text-[12px] text-[#94A3B8] text-sm "
            >
              My favorite motivational quote.
            </p>
          </div>
          <div
            id="quote-cont"
            className="w-full h-auto mt-12 relative p-2 md:p-0"
          >
            <QuoteCard />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Quote;

function QuoteCard() {
  return (
    <div
      id="t-box"
      className="group relative w-full max-w-3xl mx-auto bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 rounded-xl px-6 py-8 md:px-10 md:py-10 transition duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
    >
        
      <FaQuoteRight
        data-aos="fade-left"
        className="absolute top-[20px] right-[25px] text-[#38BDF8] opacity-20 text-[60px]"
      />
      <div
        id="ratings"
        className="w-full flex flex-row items-center justify-start"
      >
        <StarRatings count={5} size={5} />
        <small className="text-[#94A3B8] text-sm font-medium ml-2">
          {userInfo.github_username.charAt(0).toUpperCase() +
            userInfo.github_username.slice(1)}
        </small>
      </div>
      <br />
      <div
        id="body"
        className="w-full flex flex-row items-start justify-start mt-4"
      >
        <p className="text-[16px] md:text-[18px] text-[#CBD5F5] leading-relaxed italic">
          {userInfo.favorites_quote}
        </p>
      </div>
    </div>
  );
}

function StarRatings({ count = 5 }) {
  return (
    <div className="flex items-center gap-1 text-[#22C55E] text-sm">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} />
        ))}
    </div>
  );
}
