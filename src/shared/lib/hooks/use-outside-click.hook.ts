import { RefObject, useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>({
  func,
  excludedComponentsRefs,
  ignoreIf,
}: {
  func: () => void;
  ignoreIf?: boolean;
  excludedComponentsRefs?: RefObject<HTMLElement | undefined>[];
}) => {
  const wrapperRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (excludedComponentsRefs) {
        for (const componentRef of excludedComponentsRefs) {
          if (componentRef.current?.contains(e.target as Element)) {
            return;
          }
        }
      }

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        !ignoreIf
      ) {
        func();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return wrapperRef;
};
