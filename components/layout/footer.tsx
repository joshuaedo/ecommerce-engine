'use client';

import useDate from '@/hooks/use-date';

interface FooterProps {}

const Footer = () => {
  const { year, wish } = useDate();
  return (
    <footer
      className={`font-semibold border-t flex py-4 items-center justify-between px-5 lg:px-6 text-center text-xs`}
    >
      <p>&#169; {+year + ` Joshua Edo • Admin • All Rights Reserved`}</p>
      <p className='hidden lg:flex'>{wish}</p>
    </footer>
  );
};

export default Footer;
