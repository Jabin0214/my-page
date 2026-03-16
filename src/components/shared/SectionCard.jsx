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
    className={`rounded-3xl border border-white/10 bg-white/8 p-8 text-white shadow-2xl backdrop-blur-xl ${className}`}
  >
    {children}
  </motion.section>
)

export default SectionCard
