import { FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState("");  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();  

    const urlParams = new URLSearchParams(window.location.search);  
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() =>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <NavLink to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-600">N</span>
            <span className="text-orange-600">estly</span>
          </h1>
        </NavLink>

        <form onSubmit={handleSubmit} className="bg-green-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><FaSearch className="text-orange-400" /></button>
        </form>

        <ul className="flex gap-4">
          <NavLink to="/">
            <li className="hidden sm:inline text-green-700 font-semibold  hover:underline cursor-pointer">Home</li>
          </NavLink>
          <NavLink to="/About">
            <li className="hidden sm:inline text-green-700 font-semibold hover:underline cursor-pointer">About</li>
          </NavLink>
          <NavLink to="/prediction-page">
            <li className="hidden sm:inline text-green-700 font-semibold  hover:underline cursor-pointer">Prediction</li>
          </NavLink>
          <NavLink to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar} 
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <li className="sm:inline text-slate-700 hover:underline cursor-pointer">Sign-In</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
