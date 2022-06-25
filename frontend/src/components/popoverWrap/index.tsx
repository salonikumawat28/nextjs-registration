import React, { FC, useEffect, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import { motion, AnimatePresence } from "framer-motion";

const PopoverWrap: FC<{ text: any; disableAutoHidden?: boolean, activeOnHover?: boolean }> = ({
  text,
  disableAutoHidden, activeOnHover,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const element: any = useRef(null);

  useEffect(() => {
    if (!activeOnHover) {
      if (!isOpen) return;

      const handleClick = (event: any) => {
        if (element?.current && !element.current.contains(event.target)) {
          setIsOpen(false);
        }
      }

      window.addEventListener("click", handleClick);

      return () => window.removeEventListener("click", handleClick);
    }
  }, [activeOnHover, isOpen]);

  const toggleOnClick = () => {
    if (!activeOnHover) {
      setIsOpen(!isOpen);

      if (!disableAutoHidden) {
        setTimeout(() => setIsOpen(false), 2000);
      }
    }
  };

  const toggleOnHover = (value: boolean) => {
    if (activeOnHover) {
      setIsOpen(value);
    }
  };

  return (
    <Popover
      isOpen={true}
      positions={["right", "top", "bottom"]}
      content={
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={element}
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      }
    >
      <div onClick={toggleOnClick} onMouseEnter={() => toggleOnHover(true)}
           onMouseLeave={() => toggleOnHover(false)}>{children}</div>
    </Popover>
  );
};

export default PopoverWrap;
