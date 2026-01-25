import { useAsideContext } from '@/shared/lib/hook/useAsideContext';

type Props = {
  text: string;
};

export function AsideSpanFramer({ text }: Props) {
  const { hovered, isMobile } = useAsideContext();

  if (isMobile) return <span className='w-max whitespace-nowrap'>{text}</span>;

  return (
    hovered && (
      <span key='desktop' className='overflow-x-hidden w-max '>
        {text}
      </span>
    )
  );
}
