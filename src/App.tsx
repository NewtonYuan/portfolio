import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

import githubIcon from "./assets/img/github.png";
import linkedinIcon from "./assets/img/linkedin.svg";
import arrowIcon from "./assets/img/arrow.png";
import carouselArrow from "./assets/img/carousel-arrow.png";
import Carousel from "react-elastic-carousel";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

const SocialIcons = () => {
  return (
    <div className="social-icon mt-6 lg:-mt-[6px]">
      <a
        href="https://www.linkedin.com/in/newton-yuan-a39667223/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={linkedinIcon} alt="" />
      </a>
      <a href="https://github.com/NewtonYuan" target="_blank" rel="noreferrer">
        <img src={githubIcon} alt="" />
      </a>
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerIsActive, setHamburgerIsActive] = useState(false);
  const [headerCardsHovered, setHeaderCardsHovered] = useState(false);
  const [cardOneFlipped, setCardOneFlipped] = useState(false);
  const [cardTwoFlipped, setCardTwoFlipped] = useState(false);
  const [cardThreeFlipped, setCardThreeFlipped] = useState(false);
  const [cardFourFlipped, setCardFourFlipped] = useState(false);

  const carousel = document.querySelector(".slider");

  const dragging = (e: any) => {
    carousel!.scrollLeft = e.pageX;
  };

  carousel?.addEventListener("mousemove", dragging);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const nameTitle = document.getElementById("nameTitle");
    if (nameTitle) {
      let iterations = 0;
      const interval = setInterval(() => {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomizedText = nameTitle.innerText
          .split("")
          .map((letter, index) => {
            if (index < iterations && nameTitle.dataset.value) {
              return nameTitle.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        nameTitle.innerText = randomizedText;
        if (iterations >= 11) clearInterval(interval);
        iterations += 1 / 4;
      }, 30);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const blob = document.getElementById("blob");
    if (blob !== null) {
      blob.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCardMouseMove = (e: any) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardMouseMove);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleCardMouseMove);
      });
    };
  }, []);

  return (
    <div>
      <div className="blob" id="blob"></div>
      <div className="blur" id="blur"></div>
      {/* NAVBAR */}
      <div className="text-white flex flex-col">
        <nav
          className={`${
            scrolled ? "-mt-6" : "lg:-mt-2"
          } z-50 -mt-6 duration-300`}
        >
          <div
            className={`px-[12%] md:px-[16%] xl:px-[20%] w-full fixed mx-auto py-12 text-[18px] font-bold duration-300 bg-[#54226b]/90 h-[100px] ${
              scrolled
                ? "h-[100px] lg:bg-[#54226b]/40"
                : "lg:h-[112px] lg:bg-transparent"
            }`}
          >
            <div className="flex flex-col lg:flex-row text-[#bfbfbf] justify-between">
              <div className="-mt-[6px] flex flex-row justify-between">
                <span>
                  <img
                    className="inline w-10"
                    src="https://cdn-icons-png.flaticon.com/512/1157/1157109.png"
                    alt="icon"
                  />
                  <a href="#" className="text-white ml-4">
                    Newton Yuan
                  </a>
                </span>
                <span className="lg:hidden">
                  <button
                    className={`hamburger ${
                      hamburgerIsActive ? "is-active" : ""
                    }`}
                    onClick={() => setHamburgerIsActive(!hamburgerIsActive)}
                  >
                    <div className="bar"></div>
                  </button>
                </span>
              </div>
              <div
                className={`bg-[#54226b]/90 lg:bg-transparent h-[312px] lg:h-full mt-[18px] lg:mt-0 relative w-[170%] lg:w-auto flex duration-500 lg:left-0 ${
                  hamburgerIsActive ? "-left-1/3" : "left-[134%]"
                }`}
              >
                <div
                  className={`relative flex -ml-3 mt-2 flex-col lg:flex-row lg:ml-0 lg:mt-0 lg:left-0 left-[19.5%]`}
                >
                  <ul className="flex lg:flex-row flex-col mr-4 text-[22px] lg:text-[18px]">
                    <li className="mx-4">
                      <a href="#" className="hover:text-white duration-300">
                        Home
                      </a>
                    </li>
                    <li className="mx-4">
                      <a
                        href="#skills"
                        className="hover:text-white duration-300"
                      >
                        Skills
                      </a>
                    </li>
                    <li className="mx-4">
                      <a
                        href="#projects"
                        className="hover:text-white duration-300"
                      >
                        Projects
                      </a>
                    </li>
                    <li className="mx-4">
                      <a
                        href="#contact"
                        className="hover:text-white duration-300"
                      >
                        Contact
                      </a>
                    </li>
                    <li
                      className="ml-4 -mr-4 hidden lg:block 2xl:hidden"
                      onClick={() => setHamburgerIsActive(!hamburgerIsActive)}
                    >
                      <a className="hover:text-white duration-300">More</a>
                    </li>
                  </ul>
                  <span
                    className="hidden lg:flex 2xl:hidden cursor-pointer flex-col"
                    onClick={() => setHamburgerIsActive(!hamburgerIsActive)}
                  >
                    <img
                      className={`w-6 arrow mt-[3px] ${
                        hamburgerIsActive ? "is-active" : ""
                      }`}
                      src={arrowIcon}
                      alt="icon"
                    />
                  </span>
                  <div
                    className={`-ml-28 relative left-28 2xl:left-0 2xl:ml-0 duration-500 2xl:opacity-100 ${
                      hamburgerIsActive
                        ? "left-28"
                        : "-left-10 opacity-0 -z-10 2xl:z-auto"
                    }`}
                  >
                    <SocialIcons />
                  </div>
                  <div className="-ml-40 float-right mt-4 left-40 lg:-mt-[10px] download-cv relative 2xl:left-0 2xl:ml-0 duration-500 2xl:block lg:hidden">
                    <button className="ml-4 border lg:py-3 lg:px-6 py-4 px-8 text-white lg:text-[14px] text-[18px] z-10">
                      Download CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* INTRODUCTION */}
        <div className="px-[12%] md:px-[16%] xl:px-[20%] flex flex-col lg:flex-row mt-[14rem] lg:mt-[22rem] lg:justify-between">
          <div className="flex flex-col">
            <span
              className="text-[54px] font-bold"
              id="nameTitle"
              data-value="Newton Yuan"
            >
              Newton Yuan
            </span>
            <span className="text-[24px] lg:max-w-[36rem] mt-[18px]">
              Full-stack web developer with experience in designing & building
              web apps, cloud hosting & databases, full development lifecycle
              which involves prototyping, trialling, releasing, marketing and
              showcasing.
            </span>
          </div>

          {/* Cards */}
          <div className="mx-auto mt-8 lg:ml-40 3xl:ml-0 3xl:mr-36 lg:mt-8 scale-75 sm:mt-16 sm:scale-90 xl:scale-100">
            <div
              onMouseEnter={() => setHeaderCardsHovered(true)}
              onMouseLeave={() => setHeaderCardsHovered(false)}
            >
              <div
                className={`header-card relative top-2 duration-300 ${
                  headerCardsHovered
                    ? "-rotate-[18deg] right-24"
                    : "right-3 -rotate-6"
                }`}
              >
                <div className="header-card-content"></div>
              </div>
              <div
                className={`header-card relative -mt-64 top-3 duration-300 ${
                  headerCardsHovered
                    ? "rotate-[24deg] left-48"
                    : "rotate-[8deg] left-3"
                }`}
              >
                <div className="header-card-content"></div>
              </div>
              <div
                className={`header-card relative -mt-64 top-2 duration-300 ${
                  headerCardsHovered
                    ? "rotate-[15deg] left-24"
                    : "rotate-3 left-3"
                }`}
              >
                <div className="header-card-content"></div>
              </div>
              <div className="header-card relative -mt-64 z-10">
                <div className="header-card-content"></div>
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-[48rem]" id="skills">
          <div className="px-[12%] md:px-[16%] xl:px-[20%] mt-48">
            <span className="text-[54px] font-bold">Skills</span>
            <div className="h-[1000px]">
              <Canvas>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} />
                <Box />
              </Canvas>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <div id="projects">
          <div className="slider-container">
            <img
              src={carouselArrow}
              alt="carousel arrow left"
              className="rotate-180 brightness-50 invert w-12 relative top-[220px]"
            />
            <div className="slider">
              <div className="slider-item">1</div>
              <div className="slider-item">2</div>
              <div className="slider-item">3</div>
              <div className="slider-item">4</div>
              <div className="slider-item">5</div>
            </div>
            <img
              src={carouselArrow}
              alt="carousel arrow left"
              className="brightness-50 invert w-12 relative bottom-[210px] ml-auto"
            />
          </div>
          <div className="px-[12%] md:px-[16%] xl:px-[20%]">
            <span className="text-[54px] font-bold mt-[32rem]">Projects</span>
            <div className="card-container mt-8 flex flex-row">
              <div
                className={`card rounded-[12px] ${
                  cardOneFlipped ? "flipped" : ""
                }`}
                onClick={() => setCardOneFlipped(!cardOneFlipped)}
              >
                <div className="card-border"></div>
                <div className="card-content py-8 px-10 flex flex-col">
                  <span className="text-[28px] font-bold">
                    Android Java Game
                  </span>
                  <span className="mt-4">
                    Launched a mobile game (“3 Heroes”) available on the Google
                    Play Store with 100+ downloads using Android Studio.
                  </span>
                </div>
                <div className="card-back">Back of card</div>
              </div>
              <div
                className={`card rounded-[12px] ml-4 ${
                  cardTwoFlipped ? "flipped" : ""
                }`}
                onClick={() => setCardTwoFlipped(!cardTwoFlipped)}
              >
                <div className="card-border"></div>
                <div className="card-content py-8 px-10 flex flex-col">
                  <span className="text-[28px] font-bold">Python Car AI</span>
                  <span className="mt-4">
                    Created a self-driving car that utilises Python’s OpenAI Gym
                    and Q-Learning to help itself around any track.
                  </span>
                </div>
                <div className="card-back">Back of card</div>
              </div>
              <div
                className={`card rounded-[12px] ml-4 ${
                  cardThreeFlipped ? "flipped" : ""
                }`}
                onClick={() => setCardThreeFlipped(!cardThreeFlipped)}
              >
                <div className="card-border"></div>
                <div className="card-content py-8 px-10 flex flex-col">
                  <span className="text-[28px] font-bold">
                    React TS Website
                  </span>
                  <span className="mt-4">
                    Designed and built a personal portfolio website implementing
                    features such as three.js, smooth-scrolling, animations,
                    etc.
                  </span>
                </div>
                <div className="card-back">Back of card</div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact">
          <div className="px-[12%] md:px-[16%] xl:px-[20%]">
            <span className="text-[54px] font-bold mt-[24rem]">Contact</span>
            <div className="w-2/3 mt-8">
              <div className="flex flex-row">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="w-1/2 text-white bg-white/10 py-4 px-6 rounded-[12px] placeholder:text-white/70 border border-white/30 focus:bg-white transition-all duration-300 focus:text-black"
                ></input>
                <input
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  className="ml-4 w-1/2 text-white bg-white/10 py-4 px-6 rounded-[12px] placeholder:text-white/70 border border-white/30 focus:bg-white transition-all duration-300 focus:text-black"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Message"
                  name="message"
                  className="mt-4 h-[120px] w-full text-white bg-white/10 py-4 px-6 rounded-[12px] placeholder:text-white/70 border border-white/30 focus:bg-white transition-all duration-300 focus:text-black"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-10 z-50">
        Copyright 2022. All Rights Reserved
      </div>
    </div>
  );
}

export default App;
