import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post({ auth, username, sendNotif }) {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = new useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("judul", judul);
    data.append("deskripsi", deskripsi);
    data.append("file", file);
    const response = await fetch("http://localhost:8081/api/foto/", {
      credentials: "include",
      method: "POST",
      body: data,
      mode: "cors",
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.err);
    }
    if (response.ok) {
      setError(null);
      sendNotif("Post foto berhasil", "success");
    }
  };

  if (auth == false) {
    navigate("/login");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full p-2" encType="multipart/form-data">
        {error && <h1>{error}</h1>}
        <label className="form-control w-full">
          <div className="label" htmlFor="judul">
            <span className="label-text">Judul foto</span>
          </div>
          <input
            name="judul"
            id="judul"
            required
            onChange={(e) => {
              setJudul(e.target.value);
            }}
            type="text"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="deskripsi">
            <span className="label-text">Deskripsi foto</span>
          </div>
          <textarea
            name="deskripsi"
            id="deskripsi"
            onChange={(e) => {
              setDeskripsi(e.target.value);
            }}
            rows="6"
            className="textarea textarea-bordered"
          ></textarea>
        </label>
        <label className="form-control w-full">
          <div className="label" htmlFor="file">
            <span className="label-text">Upload foto</span>
          </div>
          <input
            name="file"
            id="file"
            type="file"
            accept=".jpg"
            required
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className="file-input file-input-bordered w-full"
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Post;
