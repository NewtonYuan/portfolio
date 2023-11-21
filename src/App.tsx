import "./App.css";
import { useEffect, useRef, useState } from "react";

import githubIcon from "./assets/img/github.png";
import linkedinIcon from "./assets/img/linkedin.svg";
import arrowIcon from "./assets/img/arrow.png";
import carouselArrow from "./assets/img/carousel-arrow.png";
import javascript from "./assets/img/javascript.png";
import python from "./assets/img/python.png";
import java from "./assets/img/java.png";
import c from "./assets/img/c.png";
import emailjs from "@emailjs/browser";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

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
  const form = useRef<HTMLFormElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerIsActive, setHamburgerIsActive] = useState(false);
  const [headerCardsHovered, setHeaderCardsHovered] = useState(false);
  const [cardOneFlipped, setCardOneFlipped] = useState(false);
  const [cardTwoFlipped, setCardTwoFlipped] = useState(false);
  const [cardThreeFlipped, setCardThreeFlipped] = useState(false);
  const [cardFourFlipped, setCardFourFlipped] = useState(false);
  const [cardFiveFlipped, setCardFiveFlipped] = useState(false);
  const [cardSixFlipped, setCardSixFlipped] = useState(false);
  const [firstTimeFlipped, setFirstTimeFlipped] = useState(false);
  const [graphShown, setGraphShown] = useState(false);
  const [buttonText, setButtonText] = useState("Send");

  const carousel = document.querySelector(".slider");
  const leftArrow = document.querySelector(".slider-arrow-left");
  const rightArrow = document.querySelector(".slider-arrow-right");
  const firstCard = document.querySelectorAll(".card")[0];
  const graph = document.querySelector(".graph");

  var windowWidth = window.innerWidth;
  const onResize = () => {
    windowWidth = window.innerWidth;
  };
  window.addEventListener("resize", onResize);

  emailjs.init("dnD5OITSWBgErkcW-");

  let dragStart = false,
    prevPageX: number,
    prevScrollLeft: number;

  const handleSubmit = (e) => {
    if (form.current) {
      e.preventDefault();
      setButtonText("Sending...");
      const formData = new FormData(form.current);

      // Convert FormData to a plain object
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      emailjs
        .send("service_5qktbxi", "template_01810fd", formDataObject)
        .then(() => {
          enqueueSnackbar(
            "Message sent! I will try to get back to you when I can! Thanks for reaching out.",
            { variant: "success" }
          );
        })
        .catch((error) => {
          enqueueSnackbar("Something went wrong...", { variant: "error" });
          console.log(error);
        });
      setButtonText("Send");
    }
  };

  if (graph) {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGraphShown(true);
          return;
        }
        setGraphShown(false);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );
    observer.observe(graph);
  }

  if (carousel) {
    leftArrow?.addEventListener("click", () => {
      carousel!.scrollLeft -= firstCard.clientWidth;
    });
    rightArrow?.addEventListener("click", () => {
      carousel!.scrollLeft += firstCard.clientWidth;
    });

    const startDrag = (e: any) => {
      dragStart = true;
      prevPageX = e.pageX;
      prevScrollLeft = carousel!.scrollLeft;
    };

    const stopDrag = () => {
      dragStart = false;
      carousel?.classList.remove("dragging");
    };

    const dragging = (e: any) => {
      if (dragStart) {
        e.preventDefault();
        carousel?.classList.add("dragging");
        let positionDiff = e.pageX - prevPageX;
        carousel!.scrollLeft = prevScrollLeft - positionDiff;
      }
    };

    carousel?.addEventListener("mousedown", startDrag);
    document?.addEventListener("mouseup", stopDrag);
    carousel?.addEventListener("mousemove", dragging);
  }

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
    if (windowWidth > 1040) {
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
        <nav className={`z-50 -mt-6 duration-300`}>
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
                    onClick={() => {
                      setHamburgerIsActive(!hamburgerIsActive);
                    }}
                  >
                    <div className="bar"></div>
                  </button>
                </span>
              </div>
              <div
                className={`dropdown bg-[#54226b]/90 lg:bg-transparent h-[312px] lg:h-full mt-[18px] lg:mt-0 absolute top-[82px] lg:relative lg:top-0 w-[170%] lg:w-auto flex duration-500 lg:left-0 ${
                  hamburgerIsActive ? "-left-[20%]" : `left-[134%]`
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
                        href="#about"
                        className="hover:text-white duration-300"
                      >
                        About
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
              className="text-[40px] md:text-[54px] font-bold"
              id="nameTitle"
              data-value="Newton Yuan"
            >
              Newton Yuan
            </span>
            <span className="text-[18px] md:text-[24px] lg:max-w-[36rem] mt-[18px]">
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
                <div className="header-card-content flex justify-center items-center">
                  <img src={java} alt="java icon" className={`w-[60%]`} />
                </div>
              </div>
              <div
                className={`header-card relative -mt-64 top-3 duration-300 ${
                  headerCardsHovered
                    ? "rotate-[24deg] left-48"
                    : "rotate-[8deg] left-3"
                }`}
              >
                <div className="header-card-content flex justify-center items-center">
                  <img src={c} alt="c icon" className={`w-[60%]`} />
                </div>
              </div>
              <div
                className={`header-card relative -mt-64 top-2 duration-300 ${
                  headerCardsHovered
                    ? "rotate-[15deg] left-24"
                    : "rotate-3 left-3"
                }`}
              >
                <div className="header-card-content flex justify-center items-center ">
                  <img src={python} alt="python icon" className={`w-[60%]`} />
                </div>
              </div>
              <div className="header-card relative -mt-64 z-10">
                <div className="header-card-content text-white text-center flex flex-col justify-center items-center text-2xl font-bold">
                  <img
                    src={javascript}
                    alt="javascript icon"
                    className={`relative ease-in-out duration-300 ${
                      headerCardsHovered
                        ? "translate-y-8"
                        : "-translate-y-24 opacity-0"
                    }`}
                  />
                  <p
                    className={`relative ease-in-out duration-300 bottom-12 ${
                      headerCardsHovered ? "opacity-0" : ""
                    }`}
                  >
                    Hover
                    <br />
                    <span className={`magic text-4xl font-bold`}>ME</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-[24rem]" id="about">
          <div className="px-[12%] md:px-[16%] xl:px-[20%] mt-48">
            <span className="text-[54px] font-bold">About</span>
            <div className="flex lg:flex-row flex-col">
              <div className="text-base md:text-lg w-full lg:w-1/2">
                <p className="italic">
                  Student at the University of Auckland studying Engineering. I
                  was introduced to programming at 12 years old in early 2018.
                  Starting with Python, my projects started stacking up and I
                  realised I needed new languages for different tasks. Then came
                  HTML/CSS and JavaScript/Typescript for web development. Java
                  and Android because I wanted to create a mobile game, and C++,
                  C#, C along the way.{" "}
                </p>
                <p className="mt-4 text-sm md:text-base">
                  My most proficient languages include; <br />
                  <span className="text-[#bdfffd]">
                    <span className="text-2xl font-bold">JavaScript</span>,{" "}
                    <span className="text-2xl font-bold">TypeScript</span>,{" "}
                    <span className="text-xl font-bold">Python</span>,{" "}
                    <span className="text-xl font-bold">Java</span>, HTML/CSS.
                  </span>
                  <br />
                  <br />
                  Languages that I will need more work on include; <br />
                  <span className="text-[#bdfffd]">
                    <span className="text-2xl font-bold">C++</span>, Matlab,
                    Flutter, C#, C.
                  </span>
                  <br />
                  <br />
                  Some packages that I like using are; <br />
                  <span className="text-[#bdfffd]">
                    <span className="text-2xl font-bold">React</span>,{" "}
                    <span className="text-xl font-bold">Tailwind</span>, MUI,
                    OpenAI, etc.
                  </span>
                  <br />
                  <br />
                  And some tools that I'm experienced with are; <br />
                  <span className="text-[#bdfffd]">
                    MongoDB Atlas/Compass,{" "}
                    <span className="text-2xl font-bold">Heroku</span>,{" "}
                    <span className="text-xl font-bold">Android Studio</span>,
                    etc.
                  </span>
                </p>
                <p className="mt-4 text-sm">
                  I'm always on the look-out for new market opportunies for
                  personal projects than can hone my skills and teach me new
                  ones. And currently my main project is a cross-platform
                  flutter app that encourages users to stay on task, and
                  increase productivity.
                </p>
              </div>
              <div className="graph ml-0 lg:ml-12 font-bold text-base lg:text-xl lg:w-1/2 mt-12 lg:mt-0">
                <div>
                  Python
                  <div
                    className={`w-[30px] graph-bar ${
                      graphShown ? "w-[99.9%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-300`}
                    >
                      6 Years
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  HTML/CSS
                  <div
                    className={`w-[30px] graph-bar ${
                      graphShown ? "w-[92%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-300`}
                    >
                      5.5 Years
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  JavaScript
                  <div
                    className={`w-[30px] graph-bar ${
                      graphShown ? "w-[75%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-300`}
                    >
                      4.5 Years
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  C++
                  <div
                    className={`w-[30px] graph-bar ${
                      graphShown ? "w-[42%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-300`}
                    >
                      2.5 Years
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  Java
                  <div
                    className={`w-[30px] graph-bar ${
                      graphShown ? "w-[33%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-300`}
                    >
                      2 Years
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  Android
                  <div
                    className={`w-[30px] graph-bar ${
                      graphShown ? "w-[33%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-300`}
                    >
                      2 Years
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  React
                  <div
                    className={`w-[20px] graph-bar ${
                      graphShown ? "w-[25%]" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-1000`}
                    >
                      {windowWidth < 480 ? "1.5Y" : "1.5 Years"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full">
                  TypeScript
                  <div
                    className={`w-[17px] graph-bar ${
                      graphShown ? "last-bar" : ""
                    }`}
                  >
                    <span
                      className={`${
                        graphShown ? "opacity-100" : "opacity-0"
                      } duration-1000`}
                    >
                      {windowWidth < 480 ? "1Y" : "1 Year"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="projects" className="mt-[12rem]"></div>

        {/* PROJECTS */}
        <div className="mt-[12rem]">
          <div className="px-[12%] md:px-[16%] xl:px-[20%]">
            <span className="text-[54px] font-bold mt-[32rem]">Projects</span>
            <div className="slider-container transition ease-in-out delay-150">
              <img
                src={carouselArrow}
                alt="carousel arrow left"
                className="rotate-180 brightness-50 invert w-12 relative top-[220px] slider-arrow-left z-20"
              />
              <div className="slider">
                <div
                  className={`card rounded-[12px] ${
                    cardOneFlipped ? "flipped" : ""
                  }`}
                  onClick={() => {
                    setCardOneFlipped(!cardOneFlipped);
                    setFirstTimeFlipped(true);
                  }}
                >
                  <div className="card-border"></div>
                  <div className="card-content py-8 px-10 flex flex-col">
                    <span className="text-[28px] font-bold">
                      Android Java Game
                    </span>
                    <span className="mt-4">
                      Launched a mobile game (“3 Heroes”) available on the
                      Google Play Store with 100+ downloads using Android
                      Studio.
                    </span>
                    <span
                      className={`absolute bottom-8 right-8 ${
                        firstTimeFlipped ? "opacity-0" : "opacity-100"
                      } ease-in-out duration-700`}
                    >
                      Click to{" "}
                      <span className={`magic text-2xl font-bold`}>FLIP</span>
                    </span>
                  </div>
                  <div className="card-back">
                    <span>Language: Java, Android</span>
                    <span className="mt-4">Google Play:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.prestige.prestigegame&hl=en_NZ&gl=US"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                    <span className="mt-4">Source Code:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://github.com/NewtonYuan/threeheroesandroid"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                  </div>
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
                      Created a self-driving car that utilises Python’s OpenAI
                      Gym and Q-Learning to help itself around any track.
                    </span>
                  </div>
                  <div className="card-back">
                    <span>Language: Python, OpenAI</span>
                    <span className="mt-4">Source Code:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://github.com/NewtonYuan/CarAI"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                  </div>
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
                      Designed and built a personal portfolio website
                      implementing features such as three.js, smooth-scrolling,
                      animations, etc.
                    </span>
                  </div>
                  <div className="card-back">
                    <span>Language: React, TypeScript, CSS</span>
                    <span className="mt-4">Website:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://www.newtonyuan.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                    <span className="mt-4">Source Code:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://github.com/NewtonYuan/portfolio"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                  </div>
                </div>
                <div
                  className={`card rounded-[12px] ml-4 ${
                    cardFourFlipped ? "flipped" : ""
                  }`}
                  onClick={() => setCardFourFlipped(!cardFourFlipped)}
                >
                  <div className="card-border"></div>
                  <div className="card-content py-8 px-10 flex flex-col">
                    <span className="text-[28px] font-bold">DiscordJS Bot</span>
                    <span className="mt-4">
                      Bot that records all messages sent in a guild, giving
                      users XP and levels along with many other features. Uses
                      MongoDB Atlas/Compass and Heroku.
                    </span>
                  </div>
                  <div className="card-back">
                    <span>Language: JavaScript, DiscordJS</span>
                    <span className="mt-4">Documentation:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://docs.google.com/document/d/1anriC1HQ30P0qzUkPs4wpYFZvY1s742uoYUMH57aeIA/edit"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                    <span className="mt-4">Source Code:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://github.com/NewtonYuan/3amdiscordbot"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                  </div>
                </div>
                <div
                  className={`card rounded-[12px] ml-4 ${
                    cardFiveFlipped ? "flipped" : ""
                  }`}
                  onClick={() => setCardFiveFlipped(!cardFiveFlipped)}
                >
                  <div className="card-border"></div>
                  <div className="card-content py-8 px-10 flex flex-col">
                    <span className="text-[28px] font-bold">
                      DiscordJS Self-bot
                    </span>
                    <span className="mt-4">
                      Using Eris, this bot tricks discord into thinking it's a
                      user, allowing it to use user commands and interactions.
                    </span>
                  </div>
                  <div className="card-back">
                    <span>Language: JavaScript, DiscordJS, Eris</span>
                    <span className="mt-4">Documentation:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://docs.google.com/document/d/1mjvZU8idNrcoC5DxBD8N2_f-QPq53ir0b5YpQgaiglM/edit"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                    <span className="mt-4">Source Code:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://github.com/NewtonYuan/selfbotdiscord"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                  </div>
                </div>
                <div
                  className={`card rounded-[12px] ml-4 ${
                    cardSixFlipped ? "flipped" : ""
                  }`}
                  onClick={() => setCardSixFlipped(!cardSixFlipped)}
                >
                  <div className="card-border"></div>
                  <div className="card-content py-8 px-10 flex flex-col">
                    <span className="text-[28px] font-bold">
                      C++ Miner & Server
                    </span>
                    <span className="mt-4">
                      Client and server hash miner, uses PicoSHA2 and Httplib to
                      send requests and mine until a certain digit of desireable
                      hashes is obtained.
                    </span>
                  </div>
                  <div className="card-back">
                    <span>Language: C++, C, Http</span>
                    <span className="mt-4">Source Code:</span>
                    <span className="magic text-xl font-bold">
                      <a
                        href="https://github.com/NewtonYuan/serverclientminer"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <img
                src={carouselArrow}
                alt="carousel arrow left"
                className="brightness-50 invert w-12 relative bottom-[214px] ml-auto slider-arrow-right"
              />
            </div>
          </div>
        </div>

        <div id="contact" className="mt-[24rem]">
          <div className="px-[12%] md:px-[16%] xl:px-[20%]">
            <form ref={form} onSubmit={handleSubmit}>
              <span className="text-[54px] font-bold mt-[24rem]">Contact</span>
              <div className="w-full lg:w-2/3 mt-8">
                <div className="flex flex-row">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="w-1/2 text-white bg-white/10 py-4 px-6 rounded-[12px] placeholder:text-white/70 border border-white/30 focus:bg-white transition-all duration-300 focus:text-black"
                  ></input>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    className="ml-4 w-1/2 text-white bg-white/10 py-4 px-6 rounded-[12px] placeholder:text-white/70 border border-white/30 focus:bg-white transition-all duration-300 focus:text-black"
                  ></input>
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    name="message"
                    className="mt-4 h-[120px] w-full text-white bg-white/10 py-4 px-6 rounded-[12px] placeholder:text-white/70 border border-white/30 focus:bg-white transition-all duration-300 focus:text-black"
                  ></textarea>
                </div>
                <div className="mt-4 download-cv relative duration-500 h-[80%]">
                  <SnackbarProvider />
                  <button className="border py-3 px-12 text-white font-bold text-[18px] z-10">
                    {buttonText}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center py-10 z-50 mt-[14rem] text-white opacity-80">
        Copyright 2022. All Rights Reserved. Made by Newton Yuan.
      </div>
    </div>
  );
}

export default App;
