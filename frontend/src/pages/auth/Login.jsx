// import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Login({ auth, username, sendNotif, sendAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = { email, password };
    const response = await fetch("http://localhost:8081/api/auth/login", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.err);
    }
    if (response.ok) {
      setError(null);
      sendAuth();
      sendNotif("Login berhasil", "success");
      navigate("/");
    }
  };

  if (auth == true) {
    navigate("/")
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3 p-5 lg:p-5 bg-base-200 items-center w-full lg:max-w-lg lg:place-self-center shadow-lg">
        <h1 className="text-3xl font-bold">Login</h1>
        <h1 className="text-red-500">{error}</h1>
        <label className="form-control w-full">
          <div className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </div>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required placeholder="john@doe.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </>
  );
}

Login.propTypes = {
  sendNotif: PropTypes.func,
  sendAuth: PropTypes.func,
};

export default Login;
