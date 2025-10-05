import {headers} from 'next/headers';

export const getDevice = async () => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobileDevice = (userAgent: string) =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  return isMobileDevice(userAgent);
};
