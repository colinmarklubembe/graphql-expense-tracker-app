import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mb-10">
      <h1 className="md:text-6xl text-4xl lg:text-8xl font-bold text-center  relative z-50 text-white pt-10">
        Expense Tracker <Link to="/">GQL</Link>
      </h1>
      <div className="relative mb-10 w-full mx-auto hidden md:block">
        {/* Gradients */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-full blur-sm" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-full" />
      </div>
    </div>
  );
};
export default Header;
