'use client'

import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const SectionCard = ({ children, className = '' }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeInUp}
    className={`surface-card p-8 text-[#101828] ${className}`}
  >
    {children}
  </motion.section>
)

export default SectionCard
