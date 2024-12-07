/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';;
import { motion } from 'motion/react';
import { FC } from 'react';

import { useToggle } from '@/lib/hooks/useToggle';

const Home: FC = () => {
    const [open, onToggle] = useToggle();
    return (
        <div className="container px-5 mx-auto mt-10 lg:px-0">
            <h1 className="text-3xl font-bold my-0.5">Hello framer motion</h1>
            <div className="my-20">
                <div className="flex gap-2 vstack">
                    <motion.div
                        className="mb-3 box"
                        initial={{opacity: 0}}
                        animate={{opacity: open ? 1 : 0, x: open ? 100 : 0, rotate: open ? 0 : 45}}
                        whileTap={{scale: 1.05}}
                    >
                        1
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Home;
