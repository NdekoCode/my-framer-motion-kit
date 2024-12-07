/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';;
import { motion } from 'motion/react';
import { FC } from 'react';

import { useToggle } from '@/lib/hooks/useToggle';

const Home: FC = () => {
    const [open, onToggle] = useToggle();
    return (
        <div className="container px-5 flex flex-col gap-10 mx-auto mt-10 lg:px-0">
            <h1 className="text-3xl font-bold my-0.5">Hello framer motion Kit</h1>
                <div className="flex flex-col gap-2 my-20">
                <button className='px-4 w-fit py-2.5 rounded-md bg-blue-500 text-white' onClick={onToggle}>Click me !</button>
                    <motion.div
                        className="mb-3 size-64 bg-gray-900 text-center flex justify-center items-center flex-col text-white"
                        initial={{opacity: 0}}
                        animate={{opacity: open ? 1 : 0, x: open ? 100 : 0, rotate: open ? 0 : 45}}
                        transition={{duration:0.5,ease:"easeInOut"}}
                        whileTap={{scale: 1.05}}
                    >
                        <span className="text-4xl text-white font-bold">1</span>
                    </motion.div>
                </div>
        </div>
    );
}

export default Home;
