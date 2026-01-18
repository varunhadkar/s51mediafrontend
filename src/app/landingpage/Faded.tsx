'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import girl from "../../../public/stereo.webp"

export default function HeroOverlap() {
  const [showImage, setShowImage] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowImage(true);
          } else {
            // Reset animation when component leaves viewport
            setShowImage(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '0px 0px -100px 0px' // Trigger a bit before reaching the component
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-[#fdfdf1] flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Combined text container to control spacing */}
      <div className="relative z-40 flex flex-col items-center justify-center mb-8 md:mb-12">
        {/* START WITH - animates upward and scales in */}
        <motion.h1
          initial={{ y: 0, scale: 0.7, opacity: 1 }}
          animate={{ 
            y: showImage ? -120 : 0, 
            scale: showImage ? 1 : 0.7,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="text-[40px] md:text-[60px] lg:text-[100px] xl:text-[140px] font-black leading-none text-black tracking-tight"
        >
          START WITH
        </motion.h1>

        {/* IMPOSSIBLE - animates downward and scales in */}
        <motion.h1
          initial={{ y: 0, scale: 0.7, opacity: 1 }}
          animate={{ 
            y: showImage ? 120 : 0, 
            scale: showImage ? 1 : 0.7,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="text-[40px] md:text-[60px] lg:text-[100px] xl:text-[140px] font-black leading-none text-black tracking-tight -mt-6 md:-mt-10 lg:-mt-16"
        >
          IMPOSSIBLE
        </motion.h1>
      </div>

      {/* Animated Image - scales from center and moves behind text */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showImage ? 1 : 0,
          opacity: showImage ? 1 : 0,
          y: showImage ? -50 : 0
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute w-[90%] h-[300px] md:h-[400px] lg:h-[500px] z-0"
      >
        <Image
          src={girl}
          alt="Creative visual"
          fill
          priority
          className="object-cover rounded-xl shadow-2xl"
          unoptimized // For external images without config
        />
        
        {/* Play Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: showImage ? 1 : 0,
            opacity: showImage ? 1 : 0,
          }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FF5A5F] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF4A4F] transition-colors shadow-lg hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-8 h-8 md:w-10 md:h-10 ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showImage ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 text-gray-600 text-sm"
      >
        Scroll to explore
      </motion.div>
      
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: showImage ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 w-8 h-8 border-r-2 border-b-2 border-gray-600 rotate-45"
      />
    </div>
  );
}