import { Error } from './Error';

export const metadata = {
  title: '404 - Страница не найдена',
  description: 'The page you are looking for does not exist.',
};

export default function NotFoundPage() {
  return <Error />;
}
