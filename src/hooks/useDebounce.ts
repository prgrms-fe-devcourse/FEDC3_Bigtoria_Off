import { useEffect } from 'react';

import useTimeoutFn from './useTimeoutFn';

interface Props {
  fn: () => void;
  ms: number;
  deps: string[];
}

const useDebounce = ({ fn, ms, deps }: Props) => {
  const [run, clear] = useTimeoutFn({ fn, ms });

  useEffect(run, deps);

  return clear;
};

export default useDebounce;
