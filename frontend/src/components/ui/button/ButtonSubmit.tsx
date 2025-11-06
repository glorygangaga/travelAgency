import { Loading } from '../loading/Loading';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isPending: boolean;
  text: string;
};

export function ButtonSubmit({ isPending, text, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} dark:bg-white dark:text-black bg-black text-white p-2 rounded-lg flex justify-center`}
      type='submit'
      disabled={isPending}
    >
      {isPending ? <Loading /> : text}
    </button>
  );
}
