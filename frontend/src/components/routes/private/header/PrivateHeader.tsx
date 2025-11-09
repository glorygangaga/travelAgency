'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { HandleLogout } from '../../user/HandleLogout';
import { userService } from '@/services/user.service';

export function PrivateHeader() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-role'],
    queryFn: () => userService.getRole(),
  });

  if (isLoading) {
    return <header className='bg-black/50 mb-2 p-3 text-white text-center'>Loading...</header>;
  }

  if (isError || !data) return null;

  const links = [
    { text: 'Home', link: '/' },
    { text: 'Country', link: '/panel/country' },
    { text: 'Hotel', link: '/panel/hotel' },
    { text: 'Tour', link: '/panel/tour' },
  ];

  if (data === 'admin') {
    links.push({ text: 'User', link: '/admin/user' });
  } else if (data === 'manager') {
    links.push({ text: 'Review', link: '/moderator/review' });
  }

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
