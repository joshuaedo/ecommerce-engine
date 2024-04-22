'use client';

import { useEffect, useState } from 'react';
import useMounted from './use-mounted';

const useOrigin = () => {
  const [origin, setOrigin] = useState('');
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined' && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, [isMounted]);

  return origin;
};

export default useOrigin;
 