"use client";

import { motion } from "framer-motion";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return (
    <motion.h1
      className="text-2xl font-semibold text-gray-700"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {name}
    </motion.h1>
  );
};

export default Header;
