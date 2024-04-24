import { useState } from "react";
import SearchFoto from "./search/SearchFoto";
import { Routes, Route, Outlet, useNavigate, Link } from "react-router-dom";
import SearchUser from "./search/SearchUser";

function Search({auth, username}) {
  const [mode, setMode] = useState("foto")
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search/" + mode + "/" + query);
  };
  const sendMode = (mode) => {
    setMode(mode);
  }

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <form className="join w-full" onSubmit={handleSubmit}>
        <div className="w-full">
          <input
            className="input w-full input-bordered join-item"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <div className="indicator">
          <button className="btn join-item" type="submit">
            Search
          </button>
        </div>
      </form>
      <div role="tablist" className="tabs tabs-bordered">
        <Link to={"/search/foto/" + query} role="tab" className="tab">
          Foto
        </Link>
        <Link to={"/search/user/" + query} role="tab" className="tab">
          User
        </Link>
      </div>
      <Routes>
      <Route
          path="/foto/"
          element={<SearchFoto sendMode={sendMode} auth={auth}
          username={username}/>}
          
        ></Route>
        <Route
          path="/foto/:query"
          element={<SearchFoto sendMode={sendMode} auth={auth}
          username={username}/>}
          
        ></Route>
        <Route
          path="/user/"
          element={<SearchUser sendMode={sendMode} auth={auth}
          username={username}/>}
          
        ></Route>
        <Route
          path="/user/:query"
          element={<SearchUser sendMode={sendMode} auth={auth}
          username={username}/>}
          
        ></Route>
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}

export default Search;
