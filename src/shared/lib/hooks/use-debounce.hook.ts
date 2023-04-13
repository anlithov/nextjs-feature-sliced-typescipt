import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(
  delay: number,
  value: T | null = null,
  callback?: () => void,
): { debouncedValue: T; isDebouncing: boolean } => {
  const valueToString = JSON.stringify(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [debouncedValue, setDebouncedValue] = useState<string>(valueToString);
  // Save old value
  const oldValueRef = useRef(valueToString);

  useEffect(() => {
    // Change state only if there is difference in data

    if (oldValueRef.current !== valueToString) {
      setIsDebouncing(true);

      const handler = setTimeout(() => {
        setDebouncedValue(valueToString);
        if (callback) {
          callback();
        }

        oldValueRef.current = valueToString;

        setIsDebouncing(false);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setDebouncedValue(valueToString);
      setIsDebouncing(false);
    }
  }, [valueToString]);

  const returnValue =
    oldValueRef.current === valueToString ? JSON.parse(oldValueRef.current) : JSON.parse(debouncedValue);
  return { debouncedValue: returnValue, isDebouncing };
};
