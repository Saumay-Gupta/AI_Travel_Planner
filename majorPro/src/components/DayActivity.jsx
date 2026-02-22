import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1.4
    },
  },
};

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letter = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 5, transition: { duration: 0.9 } },
};

function DayActivity({ day, activities }) {
  return (
    <div className='w-200 ml-10 mt-10 backdrop-blur-xs bg-white/10 text-white rounded p-4'>
      <motion.h1
        className='text-white font-medium ml-2 mb-4 text-xl'
        variants={letter}
        initial="hidden"
        animate="visible"
      >
        {day}
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {activities.map((activity, index) => (
          <motion.div 
            key={index} 
            className="mb-3 ml-2 text-white flex flex-row items-start"
            variants={sentence}
          >
            {/* Time Section (Bold) */}
            <div className="font-bold min-w-[85px] mr-2 text-yellow-300">
              {activity.time.split("").map((char, charIndex) => (
                <motion.span key={`time-${charIndex}`} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Separator */}
            <motion.span variants={letter} className="mr-2">-</motion.span>

            {/* Text Section */}
            <div className="flex-1">
              {activity.text.split("").map((char, charIndex) => (
                <motion.span key={`text-${charIndex}`} variants={letter}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default DayActivity;