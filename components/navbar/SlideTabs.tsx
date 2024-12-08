"use client";

import { motion } from 'motion/react';
import { Dispatch, FC, PropsWithChildren, SetStateAction, useRef, useState } from 'react';

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <ul className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    onMouseLeave={()=>{

      setPosition(p=>({...p,opacity:0}));
    }}>
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Pricing</Tab>
      <Tab setPosition={setPosition}>Features</Tab>
      <Tab setPosition={setPosition}>Docs</Tab>
      <Tab setPosition={setPosition}>Blog</Tab>
      <Cursor position={position} />
    </ul>
  );
};
const Cursor: FC<{
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}> = ({ position }) => {
  return (
    <motion.li
      className="absolute z-0 h-7 rounded-full md:h-12 bg-black w-16"
      initial={false}
      animate={position}
    />
  );
};
export const SlideTabsExample = () => {
  return (
    <div className="grid h-screen place-content-center bg-neutral-100">
      <SlideTabs />
    </div>
  );
};
export const Tab: FC<PropsWithChildren<{setPosition: Dispatch<SetStateAction<{
  left: number;
  width: number;
  opacity: number;
}>>}>> = ({ children,setPosition }) => {
  const ref = useRef<HTMLLIElement | null>(null);
  return (
    <li ref={ref} onMouseEnter={()=>{
      if(!ref.current) return;
      const {width} = ref.current.getBoundingClientRect();

      setPosition(p => ({...p, width, opacity: 1, left: ref.current?.offsetLeft ?? 0}));
    }} className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base">
      {children}
    </li>
  );
};
export default SlideTabs;
