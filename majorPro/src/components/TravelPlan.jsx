import React from 'react'
import { motion } from "framer-motion"
import DayActivity from './DayActivity';

function TravelPlan({ planner }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
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
  );
}

export default TravelPlan
