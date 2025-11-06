import Link from 'next/link';

const links = [{ text: 'Reviews', link: '/review' }];

export function ModeratorLists() {
  return (
    <section className='mb-5'>
      <ul className='flex gap-3'>
        {links.map((link) => (
          <li key={link.text} className='border rounded-lg min-w-20 flex'>
            <Link
              href={'/moderator' + link.link}
              className='w-full flex justify-center items-center p-3'
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
