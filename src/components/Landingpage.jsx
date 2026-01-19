import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import About from './About';
import Contact from './Contact'; // Fixed import
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-linear-to-br from-[#0f0529] to-[#1b0f3a] text-white">

      <Navbar />

      <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 py-16 gap-12" id="home">

        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Analyse{" "}
            <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Resume
            </span>
            <br />
            like never before!
          </h1>

          <p className="mt-6 text-gray-300">
            We believe that your resume should reflect all the skills you have.
            Our intelligent platform verifies your claims against real-world data.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src="/hero.png"
            alt="3D Characters"
            className="w-75 md:w-105 drop-shadow-2xl"
          />
        </div>
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  )
}

export default Landingpage;