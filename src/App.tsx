import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import stars from "./assets/stars.jpg";
import ground from "./assets/ground.jpg";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function App() {
  const handleOnMouseMove = (e: any) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  for (const card of document.querySelectorAll(
    ".card"
  ) as NodeListOf<HTMLElement>) {
    card.onmousemove = (e: MouseEvent) => handleOnMouseMove(e);
  }

  return (
    <div>
      <Parallax pages={4}>
        <div className="text-white px-[20%] flex flex-col">
          <nav className="z-50">
            <div className="max-w-6xl mx-auto py-12 text-[18px] font-bold justify-between flex">
              <div>
                <span>Home</span>
                <span className="ml-12">Skills</span>
                <span className="ml-12">Projects</span>
                <span className="ml-12">Contact</span>
              </div>
              <div>
                <span className="ml-8 border py-4 px-8">Download CV</span>
              </div>
            </div>
          </nav>
          <ParallaxLayer
            offset={0}
            speed={1}
            factor={2}
            style={{
              backgroundImage: `url(${stars})`,
              backgroundSize: "cover",
            }}>
              <div className="gradient-bg"></div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={1}
            factor={3}
            style={{
              backgroundImage: `url(${ground})`,
              backgroundSize: "cover",
            }}
          >
          <div className="gradient-bg-2"></div></ParallaxLayer>
          <ParallaxLayer offset={0.2} speed={0.05}>
            <div className="flex flex-row px-[20%]">
              <div className="flex flex-col">
                <span className="text-[56px] font-bold mt-[14rem]">
                  Newton Yuan
                </span>
                <span className="text-[24px] max-w-[48rem] mt-[18px]">
                  Full-stack web developer with experience in multiple aspects
                  of software including; designing & building web apps, cloud
                  hosting & databases, full development lifecycle which involves
                  prototyping, trialling, releasing, marketing and showcasing.
                </span>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.2} speed={0.2}>
            <div className="px-[20%]">
              <span className="text-[56px] font-bold mt-[32rem]">Skills</span>
              <div className="h-[1000px]">
                <Canvas>
                  <OrbitControls />
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 15, 10]} angle={0.3} />
                  <Box />
                </Canvas>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={2.2} speed={0.5}>
            <div className="px-[20%]">
              <span className="text-[56px] font-bold mt-[32rem]">Projects</span>
              <div className="flex flex-row mt-8">
                <div className="card rounded-[12px] w-1/3">
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
                  </div>
                </div>
                <div className="card rounded-[12px] w-1/3 ml-4">
                  <div className="card-border"></div>
                  <div className="card-content py-8 px-10 flex flex-col">
                    <span className="text-[28px] font-bold">Python Car AI</span>
                    <span className="mt-4">
                      Created a self-driving car that utilises Python’s OpenAI
                      Gym and Q-Learning to help itself around any track.
                    </span>
                  </div>
                </div>
                <div className="card rounded-[12px] w-1/3 ml-4">
                  <div className="card-border"></div>
                  <div className="card-content py-8 px-10  flex flex-col">
                    <span className="text-[28px] font-bold">
                      React TS Website
                    </span>
                    <span className="mt-4">
                      Designed and built a personal portfolio website
                      implementing features such as three.js, smooth-scrolling,
                      animations, etc.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={3.2} speed={2}>
            <div className="px-[20%]">
              <span className="text-[56px] font-bold mt-[24rem]">Contact</span>
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
          </ParallaxLayer>
        </div>
      </Parallax>
      <div className="text-center mb-10 z-50">
        Copyright 2022. All Rights Reserved
      </div>
    </div>
  );
}

export default App;
