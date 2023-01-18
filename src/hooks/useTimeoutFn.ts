import { useCallback, useEffect, useRef } from 'react';

interface Props {
  fn: () => void;
  ms: number;
}

const useTimeoutFn = ({ fn, ms }: Props) => {
  const timeoutId = useRef(0);
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, [timeoutId]);

  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
