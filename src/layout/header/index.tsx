import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex p-4 text-4xl font-extrabold bg-rose-800">
      <Link to="/" className="text-white">
        Boutique en ligne
      </Link>
    </div>
  );
};

export default Header;