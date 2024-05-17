import * as React from 'react';

const useMediaQuery = () => {
  const [isSmallMobile, setIsSmallMobile] = React.useState(false);
  const [isLargeMobile, setIsLargeMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isLaptop, setIsLaptop] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setIsSmallMobile(
        event.matches &&
          event.media === '(min-width: 96px) and (max-width: 480px)'
      );
      setIsLargeMobile(
        event.matches &&
          event.media === '(min-width: 481px) and (max-width: 768px)'
      );
      setIsTablet(
        event.matches &&
          event.media === '(min-width: 769px) and (max-width: 1024px)'
      );
      setIsLaptop(
        event.matches &&
          event.media === '(min-width: 1025px) and (max-width: 1440px)'
      );
      setIsDesktop(event.matches && event.media === '(min-width: 1441px)');
    }

    const smallMobileQuery = matchMedia(
      '(min-width: 96px) and (max-width: 480px)'
    );
    const largeMobileQuery = matchMedia(
      '(min-width: 481px) and (max-width: 768px)'
    );
    const tabletQuery = matchMedia(
      '(min-width: 769px) and (max-width: 1024px)'
    );
    const laptopQuery = matchMedia(
      '(min-width: 1025px) and (max-width: 1440px)'
    );
    const desktopQuery = matchMedia('(min-width: 1441px)');

    smallMobileQuery.addEventListener('change', onChange);
    largeMobileQuery.addEventListener('change', onChange);
    tabletQuery.addEventListener('change', onChange);
    laptopQuery.addEventListener('change', onChange);
    desktopQuery.addEventListener('change', onChange);

    setIsSmallMobile(smallMobileQuery.matches);
    setIsLargeMobile(largeMobileQuery.matches);
    setIsTablet(tabletQuery.matches);
    setIsLaptop(laptopQuery.matches);
    setIsDesktop(desktopQuery.matches);

    return () => {
      smallMobileQuery.removeEventListener('change', onChange);
      largeMobileQuery.removeEventListener('change', onChange);
      tabletQuery.removeEventListener('change', onChange);
      laptopQuery.removeEventListener('change', onChange);
      desktopQuery.removeEventListener('change', onChange);
    };
  }, []);

  return {
    isSmallMobile,
    isLargeMobile,
    isTablet,
    isLaptop,
    isDesktop,
    xl: isDesktop,
    lg: isDesktop || isLaptop,
    md: isDesktop || isLaptop || isTablet,
    sm: isDesktop || isLaptop || isTablet || isLargeMobile,
    xs: isDesktop || isLaptop || isTablet || isLargeMobile || isSmallMobile,
  };
};

export default useMediaQuery;
