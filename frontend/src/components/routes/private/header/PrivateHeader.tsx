import Link from 'next/link';
import { HandleLogout } from '../../user/HandleLogout';

const links = [{ text: 'Home', link: '/' }];

export function PrivateHeader() {
  return (
    <header className='bg-black/50 mb-2'>
      <div className='container mx-auto p-3 py-3'>
        <nav className='flex justify-between items-center'>
          <ul className='flex gap-3'>
            {links.map((link) => (
              <Link
                key={link.text}
                href={link.link}
                className='p-2 border border-white/50 rounded-md'
              >
                {link.text}
              </Link>
            ))}
          </ul>
          <HandleLogout />
        </nav>
      </div>
    </header>
  );
}
