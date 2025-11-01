import { Loading } from '../loading/Loading';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isPending: boolean;
  text: string;
};

export function ButtonSubmit({ isPending, text, ...props }: ButtonProps) {
  return (
    <button
      className='bg-white text-black p-2 rounded-lg flex justify-center'
      {...props}
      type='submit'
      disabled={isPending}
    >
      {isPending ? <Loading /> : text}
    </button>
  );
}
