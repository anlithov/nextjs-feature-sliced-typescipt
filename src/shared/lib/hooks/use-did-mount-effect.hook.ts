import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useDidMountEffect = (
  effectCallback: EffectCallback,
  deps?: DependencyList,
  mountTimes = 1,
) => {
  const didMountRef = useRef(0);

  useEffect(() => {
    if (didMountRef.current >= mountTimes) {
      effectCallback();
    } else {
      didMountRef.current++;
    }
  }, deps);
};
