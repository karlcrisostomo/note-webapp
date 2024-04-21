import { motion } from "framer-motion";
import Image from "next/image";
import { logo } from "../../public/assets";

const LoadingSkeleton = () => {
  return (
    <div className="bg-black absolute w-full top-0 left-0 right-0 bottom-0 h-screen z-50 overflow-y-hidden transition-transform duration-500">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 1 }}
        className="flex flex-col justify-center items-center h-full "
      >
        <Image src={logo} sizes="300px" alt="logo" />
      </motion.div>
    </div>
  );
};

export default LoadingSkeleton;
