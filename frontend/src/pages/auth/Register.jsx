// import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Register({ auth, sendNotif }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [namalengkap, setNamalengkap] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, namalengkap, alamat, password };
    const response = await fetch("http://localhost:8081/api/auth/register", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(user),
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
      sendNotif("Register berhasil. Silahkan login", "success");
      navigate("/login");
    }
  };

  if (auth == true) {
    navigate("/")
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3 p-5 lg:p-5 bg-base-200 items-center w-full lg:max-w-lg lg:place-self-center shadow-lg">
        <h1 className="text-3xl font-bold">Register</h1>
        <h1 className="text-red-500">{error}</h1>
        <label className="form-control w-full">
          <div className="label" htmlFor="username">
            <span className="label-text">Username</span>
          </div>
          <input name="username" id="username" onChange={(e) => setUsername(e.target.value)} required type="text" placeholder="john.doe" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </div>
          <input name="email" id="email" onChange={(e) => setEmail(e.target.value)} required type="text" placeholder="john@doe.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="namalengkap">
            <span className="label-text">Nama Lengkap</span>
          </div>
          <input
            name="namalengkap"
            id="namalengkap"
            onChange={(e) => setNamalengkap(e.target.value)}
            required
            type="text"
            placeholder="John Doe"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="alamat">
            <span className="label-text">Alamat</span>
          </div>
          <input name="alamat" id="alamat" onChange={(e) => setAlamat(e.target.value)} required type="text" placeholder="Jakarta, Indonesia" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </div>
          <input
            name="password"
            id="password"
            type="password"
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

Register.propTypes = {
  sendNotif: PropTypes.func,
};

export default Register;
