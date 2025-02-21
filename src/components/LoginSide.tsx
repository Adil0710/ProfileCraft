import React, { useRef } from "react";
import Logo from "./Logo";
import { Music } from "lucide-react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { motion } from "framer-motion";

function LoginSide() {
  const containerRef = useRef(null); // Reference for the parent container

  return (
    <div
      className=" w-full inset-0 flex items-center z-30 justify-center h-full overflow-hidden"
      ref={containerRef}
    >
      {/* Floating Boxes Container */}
      <div className="relative w-80 h-80">
        <motion.div
          drag
          dragConstraints={containerRef} // Restrict movement to the parent div
          className="absolute cursor-grab "
          style={{ top: "-10%", left: "10%" }}
        >
          <div className="floating-box icon-shadow w-24 h-36 bg-gradient-to-br dark:from-sky-300 dark:to-blue-600 from-sky-200 to-blue-500 flex items-center justify-center rounded-2xl animate-float-1">
            <Logo name="linkedin" size={50} />
          </div>
        </motion.div>
        <motion.div
          drag
          dragConstraints={containerRef} // Restrict movement to the parent div
          className="absolute cursor-grab"
          style={{ top: "-5%", right: "15%" }}
        >
          <div className="floating-box  flex items-center justify-center rounded-2xl animate-float-2">
            <Logo name="github" size={80} />
          </div>
        </motion.div>
        <motion.div
          drag
          dragConstraints={containerRef} // Restrict movement to the parent div
          className="absolute cursor-grab"
          style={{ bottom: "22%", right: "10%" }}
        >
          <div
            className="floating-box icon-shadow w-56 h-32 bg-gradient-to-br dark:from-green-200 dark:to-emerald-500 from-green-100 to-emerald-400 flex items-center justify-between gap-4 px-5 flex-row rounded-2xl  animate-float-4"
            
          >
            <div className="logo-container">
              <Logo name="spotify" size={40} />
              <div className="ripple"></div>

              {/* Music Chords */}
              <Music className="music-chord chord1" size={20} strokeWidth={3} />
              <Music className="music-chord chord2" size={20} strokeWidth={3} />
              <Music className="music-chord chord3" size={20} strokeWidth={3} />
            </div>
            <div className=" flex flex-row items-center sm:text-3xl text-xl justify-evenly w-full text-neutral-800">
              <IoPlaySkipBack className=" text-xl" />{" "}
              <IoPlay className=" text-3xl" />{" "}
              <IoPlaySkipForward className=" text-xl" />
            </div>
          </div>
        </motion.div>
        <motion.div
          drag
          dragConstraints={containerRef} // Restrict movement to the parent div
          className="absolute cursor-grab"
          style={{ bottom: "-15%", right: "10%" }}
        >
          <div
            className="floating-box icon-shadow w-24 h-24 bg-gradient-to-br from-pink-300 to-indigo-400 dark:from-pink-300 dark:to-indigo-500 flex items-center justify-center rounded-2xl animate-float-3"
           
          >
            <Logo name="instagram" size={40} />
          </div>
        </motion.div>
        <motion.div
          drag
          dragConstraints={containerRef} // Restrict movement to the parent div
          className="absolute cursor-grab"
          style={{ bottom: "-15%", right: "55%" }}
        >
          <div
            className="floating-box flex items-center justify-center rounded-2xl animate-float-5"
           
          >
            <Logo name="youtube" size={80} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginSide;
