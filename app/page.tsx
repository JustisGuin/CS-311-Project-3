'use client'; // Ensure this component is treated as a client component

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const Home = () => {
  // Create refs for the elements we want to animate
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  // State to force re-render
  const [key, setKey] = useState(0);

  // Function to add refs to the paragraph elements
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !paragraphRefs.current.includes(el)) {
      paragraphRefs.current.push(el);
    }
  };

  // Function to add refs to the list items
  const addListToRefs = (el: HTMLLIElement | null) => {
    if (el && !listRefs.current.includes(el)) {
      listRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP animations
    gsap.from(titleRef.current, { opacity: 0, y: -50, duration: 1 });
    paragraphRefs.current.forEach((el, index) => {
      gsap.from(el, { opacity: 0, y: 30, duration: 0.5, delay: index * 0.2 });
    });
    listRefs.current.forEach((el, index) => {
      gsap.from(el, { opacity: 0, x: -50, duration: 0.5, delay: index * 0.2 });
    });
  }, [key]); // Add key to the dependency array

  // Update key when the component mounts
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <div key={key} className="flex flex-col items-center p-4 bg-black min-h-screen transition duration-300 hover:bg-gray-800">
      <h1 ref={titleRef} className="text-3xl font-bold text-white text-center mb-4">
        Welcome to the Recipe App!
      </h1>
      <p ref={addToRefs} className="text-lg text-white text-center mb-6 px-4">
        This application allows you to create, manage, and explore a variety of recipes...
      </p>

      <h2 className="text-2xl font-semibold text-white mb-2">Features:</h2>
      <ul className="list-disc list-inside mb-6 px-4 text-white">
        <li ref={addListToRefs}>Add and manage ingredients with associated tags.</li>
        <li ref={addListToRefs}>Define cooking methods and steps to create delicious recipes.</li>
        <li ref={addListToRefs}>Generate recipes based on selected tags and desired steps.</li>
        <li ref={addListToRefs}>Search for recipes by name or tags to find inspiration.</li>
        <li ref={addListToRefs}>View individual recipes with detailed information and a "like" feature.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-2">How It Works:</h2>
      <p ref={addToRefs} className="text-white text-center mb-6 px-4">
        To get started, you can add new ingredients and cooking methods using the provided forms...
      </p>

      <h2 className="text-2xl font-semibold text-white mb-2">Get Started:</h2>
      <p ref={addToRefs} className="text-white text-center mb-4 px-4">
        Click the button below to begin exploring the Recipe App!
      </p>
      <Link href="/generateRecipe" className="bg-blue-500 text-white p-4 rounded-full w-full max-w-xs text-center transition duration-200 hover:bg-blue-600 hover:scale-105">
        Generate Your First Recipe
      </Link>
    </div>
  );
};

export default Home;