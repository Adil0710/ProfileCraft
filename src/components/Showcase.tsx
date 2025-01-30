import React from "react";
import { Button } from "./ui/button";
import BlurryBlob from "./ui/blurry-blob";

function Showcase() {
  return (
    <div
      id="showcase"
      className="relative  w-full h-full bg-gray-50 dark:bg-neutral-900 flex flex-col justify-center items-center min-h-screen"
    >
      
      <div className="max-w-6xl mx-auto px-8 pb-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="sm:text-4xl text-xl font-bold dark:text-white text-black mb-4">
            Profile Showcase
          </h2>
          <p className="dark:text-neutral-300 text-neutral-700 sm:text-lg text-base">
            See how others are using ProfileCraft to present their digital
            identity
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-200 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">@adil</h3>
                <p className="text-gray-500 dark:text-gray-400">Fullstack Developer</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">Twitter</span>
              </div>
              <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.882 18.275c-.235.527-.469.997-.704 1.41-.23.405-.478.768-.753 1.084a3.39 3.39 0 0 1-.493.458c-.825.622-1.674.925-2.554.925-.912 0-1.693-.243-2.34-.73-.647-.488-1.166-1.285-1.557-2.391-.39-1.107-.59-2.514-.59-4.222 0-2.402.357-4.307 1.072-5.71.713-1.404 1.665-2.106 2.854-2.106.295 0 .596.063.902.19.306.127.636.354.992.682.355.328.748.77 1.177 1.325.43.555.885 1.215 1.367 1.982l.41-.631c.34-.526.715-1.013 1.124-1.462.41-.45.853-.83 1.328-1.141a2.88 2.88 0 0 1 1.557-.47c.89 0 1.688.244 2.395.731.707.488 1.262 1.285 1.665 2.391.403 1.106.605 2.513.605 4.222 0 2.402-.366 4.307-1.097 5.71-.732 1.404-1.692 2.106-2.881 2.106-.296 0-.597-.063-.902-.19a3.803 3.803 0 0 1-.992-.682c-.356-.328-.748-.77-1.177-1.325-.43-.555-.885-1.215-1.368-1.982l-.41.631z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">GitHub</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Full-stack developer passionate about creating beautiful web experiences.</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">View Profile</button>
          </div>
        </div>


        <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp" >
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-200 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">@digital_artist</h3>
                <p className="text-gray-500 dark:text-gray-400">Digital Artist</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">Instagram</span>
              </div>
              <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Creating digital art and illustrations for brands worldwide.</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">View Profile</button>
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp" >
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-200 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">@content_creator</h3>
                <p className="text-gray-500 dark:text-gray-400">Content Creator</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">YouTube</span>
              </div>
              <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">TikTok</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Lifestyle vlogger sharing daily adventures and tips.</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">View Profile</button>
          </div>
        </div>
      </div>
      </div>
      <Button className=" mt-20 bg-indigo-600 hover:bg-indigo-500 text-white">
        Join These Creators
      </Button>
    </div>
  );
}

export default Showcase;
