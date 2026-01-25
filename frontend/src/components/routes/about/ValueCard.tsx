import { motion } from 'framer-motion';

export default function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='rounded-2xl dark:bg-white/5 p-6 shadow-2xl'
    >
      <div className='mb-4 text-primary'>{icon}</div>
      <h3 className='font-semibold text-lg mb-2'>{title}</h3>
      <p className='text-muted-foreground text-sm'>{text}</p>
    </motion.div>
  );
}
