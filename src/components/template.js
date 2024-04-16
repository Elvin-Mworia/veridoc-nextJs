"use client"
import { motion } from 'framer-motion';

const Template= ({ children }) => {
  const variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, duration: 0.1, ease: 'easeInOut' },
    exit: { opacity: 0, duration: 0.3, ease: 'easeInOut' },
  };
  return (
      <motion.div
        initial={{y:20,opacity:0}}
        animate={{y:0,opacity:1}} 
        transition={{ease:"easeInOut",duration:0.2}}>
        {children}
      </motion.div>
  );
};

export default Template;
