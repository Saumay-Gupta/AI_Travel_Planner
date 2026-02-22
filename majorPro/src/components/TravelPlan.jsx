import React from 'react'
import { motion } from "framer-motion"
import DayActivity from './DayActivity';

function TravelPlan({planner}) {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: 50,
      transition: { duration: 1, ease: "easeOut"},
    },
  };

  return (
      <div className='flex flex-col gap-8 p-6 text-white'>
        <motion.div
          className="flex flex-wrap text-white"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {planner.map((plan, i) => (
            <motion.div key={i} variants={card}>
              <DayActivity day={plan.day} activities={plan.activities} />
            </motion.div>
          ))}
        </motion.div>
      </div>
  )
}

export default TravelPlan
