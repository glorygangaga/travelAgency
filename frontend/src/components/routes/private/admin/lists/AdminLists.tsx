import Link from 'next/link';

const links = [
  { text: 'Tours', link: '/tour' },
  { text: 'Countries', link: '/country' },
  { text: 'Hotels', link: '/hotel' },
  { text: 'Users', link: '/user' },
];

export async function AdminLists() {
  return (
    <section className='mb-5'>
      <ul className='flex gap-3'>
        {links.map((link) => (
          <li key={link.text} className='border rounded-lg min-w-20 flex'>
            <Link
              href={'/admin' + link.link}
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
