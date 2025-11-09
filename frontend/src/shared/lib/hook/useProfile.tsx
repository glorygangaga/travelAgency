import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { userService } from '@/services/user.service';
import { useUserStore } from '@/store/userStore';
import { EnumTokens } from '@/services/auth-token.service';

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
    setUserData(data);
    getFavorites();
  }, [data]);

  return null;
}
