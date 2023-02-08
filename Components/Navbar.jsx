import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <div className="flex justify-around bg-teal-600 bg-opacity-20 py-3 text-white items-center">
      <div className="font-bold text-xl">
        Movie<span className="text-teal-500 skew-x-12">Ku</span>DB
      </div>
      <div className="flex items-center">
        <input
          type="search"
          className="bg-transparent border-b-2 border-red-400 w-44 text-white outline-none p-2"
        />
        <span>
          <Icon
            icon="material-symbols:search-rounded"
            hFlip={true}
            className="text-2xl"
          />
        </span>
      </div>
      <div>Account</div>
    </div>
  );
};

export default Navbar;
