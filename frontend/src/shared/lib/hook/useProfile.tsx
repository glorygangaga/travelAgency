import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { userService } from '@/services/user.service';
import { useUserStore } from '@/store/userStore';
import { EnumTokens } from '@/services/auth-token.service';
import { User } from '@/shared/types/user.types';

export function useProfile() {
  const token = typeof window !== 'undefined' ? Cookies.get(EnumTokens.ACCESS_TOKEN) : null;

  const { setUserData, getFavorites } = useUserStore();

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await userService.getProfile(),
    enabled: !!token,
  });

  useEffect(() => {
    if (!data) return;
    const newData: User = {
      username: data.username,
      user_id: data.user_id,
      email: data.email,
      role_id: data.role_id,
      date: data.date,
      fullname: data.fullname,
      passport_number: data.passport_number,
      phone: data.phone,
      token: null,
    };

    setUserData(newData);
    getFavorites();
  }, [data]);

  return null;
}
