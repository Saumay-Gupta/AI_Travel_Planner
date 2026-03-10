import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.8 },
  },
};

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function DayActivity({ day, activities }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
      <motion.h2
        className="text-lg font-bold text-primary mb-4"
        variants={letter}
        initial="hidden"
        animate="visible"
      >
        {day}
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3"
            variants={sentence}
          >
            {/* Time */}
            <div className="font-bold min-w-[80px] text-sm text-primary">
              {activity.time.split('').map((char, ci) => (
                <motion.span key={`t-${ci}`} variants={letter}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            <span className="text-slate-300">–</span>

            {/* Text */}
            <div className="flex-1 text-sm text-slate-700">
              {activity.text.split('').map((char, ci) => (
                <motion.span key={`x-${ci}`} variants={letter}>
                  {char === ' ' ? '\u00A0' : char}
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