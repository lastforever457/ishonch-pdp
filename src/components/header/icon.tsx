import { Link } from "react-router-dom";

const Icon = () => {
  return (
    <div className="flex justify-center items-center gap-5">
      <Link to="/">
        <div className="flex items-center">
          <img src="/images/logo.png" className="w-20 md:w-28" alt="Logo" />
        </div>
      </Link>
    </div>
  );
};

export default Icon;
