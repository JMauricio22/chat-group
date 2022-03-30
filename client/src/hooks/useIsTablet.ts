import { useMediaQuery } from 'react-responsive';

export function useIsTablet() {
  const isTabletOrDesktop = useMediaQuery({
    minDeviceWidth: 768,
  });

  return isTabletOrDesktop;
}
