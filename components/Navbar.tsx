import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
      <div className="container w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <Link
          className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
          href="/"
          aria-label="Framer-motion"
        >
          Framer-motion Kit
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <Link
            className="font-medium text-blue-500 focus:outline-none"
            href="/navbar"
            aria-current="page"
          >
            Navbar
          </Link>
          <Link
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            href="/buttons"
          >
            Buttons
          </Link>
          <Link
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            href="/scroll"
          >
            Scroll
          </Link>
          <Link
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            href="/example"
          >
            Example
          </Link>
          <Link
            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            href="/recipes"
          >
            Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
