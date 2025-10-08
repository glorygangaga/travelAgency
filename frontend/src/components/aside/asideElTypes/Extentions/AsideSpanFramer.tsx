import { useAsideContext } from '@/hook/useAsideContext';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  text: string;
};

export function AsideSpanFramer({ text }: Props) {
  const { hovered } = useAsideContext();
  return (
    hovered && (
      <AnimatePresence mode='popLayout'>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='overflow-x-hidden w-max'
        >
          {text}
        </motion.span>
      </AnimatePresence>
    )
  );
}
