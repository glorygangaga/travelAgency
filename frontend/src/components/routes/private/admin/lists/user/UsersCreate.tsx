import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/select/Select';

const options = [
  { value: 'User', id: '1' },
  { value: 'Manager', id: '2' },
  { value: 'Admin', id: '3' },
];

export function UsersCreate() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  return (
    <form className='grid gap-3 min-w-80'>
      <Input placeholder='User email' id='email' autoComplete='off' />
      <Input
        type='password'
        placeholder='User password'
        id='password'
        autoComplete='off'
        passwordToggle={true}
      />
      <Select
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder='Choose role'
        isFull={true}
      />
      <button type='submit' className='bg-white text-black p-2 rounded-lg'>
        Create user
      </button>
    </form>
  );
}
