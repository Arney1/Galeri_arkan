import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Profile({ auth, username, deleteAuth, sendNotif }) {
  const param = useParams();
  const profileUsername = param.usernamez;
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [limit, setLimit] = useState(10);
  const [newPhotos, setNewPhotos] = useState(null);
  const [like, setLike] = useState(0);
  const [yourLikes, setYourLikes] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [profile, setProfile] = useState(null);
  const [fotoCount, setFotoCount] = useState(null);

  // edit user
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNama_lengkap, setEditNama_lengkap] = useState("");
  const [editAlamat, setEditAlamat] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [gantiPassword, setGantiPassword] = useState("");
  const [editProfileError, setEditProfileError] = useState("");

  const likeAdd = async (id) => {
    const idz = { id };
    const response = await fetch("http://localhost:8081/api/like/", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(idz),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    // const json = await response.json();
    if (!response.ok) {
      sendNotif("Anda belum login", "error");
    }
    if (response.ok) {
      setLike(like + 1);
    }
  };

  const likeDelete = async (id) => {
    const idz = { id };
    const response = await fetch("http://localhost:8081/api/like/", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify(idz),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    // const json = await response.json();
    if (!response.ok) {
      sendNotif("Anda belum login", "error");
    }
    if (response.ok) {
      setLike(like - 1);
    }
  };

  const logout = async () => {
    const response = await fetch("http://localhost:8081/api/auth/logout", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const json = await response.json();
    if (response.ok) {
      deleteAuth();
      sendNotif("Logout berhasil", "success");
      navigate("/login");
    }
    if (!response.ok) {
      console.log(json.err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = { limit, username, profileUsername };
      const response = await fetch("http://localhost:8081/api/main/profile", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(data),
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
        setNewPhotos(json.data);
        setYourLikes(json.data2);
        setCommentCount(json.data3);
        setProfile(json.data4);
        setEditUsername(json.data4[0].username);
        setEditAlamat(json.data4[0].alamat);
        setEditEmail(json.data4[0].email);
        setEditNama_lengkap(json.data4[0].nama_lengkap);
        setFotoCount(json.data5);
        setError("");
      }
    };
    fetchData();
  }, [auth, limit, profileUsername, username, like]);

  const logoutButton = (
    <button
      className="flex-1 btn btn-error btn-sm"
      onClick={() => {
        logout;
      }}
    >
      Logout
    </button>
  );

  const userEdit = async (e, id) => {
    e.preventDefault();
    if (gantiPassword == false) {
      const data = {
        id: id,
        username: editUsername,
        email: editEmail,
        nama_lengkap: editNama_lengkap,
        alamat: editAlamat,
      };
      const response = await fetch("http://localhost:8081/api/auth/", {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const json = await response.json();
      if (response.ok) {
        setLike(like - 1);
        sendNotif("Edit berhasil", "success");
        setEditProfileError("");
        navigate("/profile/" + editUsername);
        deleteAuth();
      }
      if (!response.ok) {
        setEditProfileError(json.err);
      }
    } else {
      const data = {
        id: id,
        username: editUsername,
        email: editEmail,
        nama_lengkap: editNama_lengkap,
        alamat: editAlamat,
        password: editPassword,
      };
      const response = await fetch("http://localhost:8081/api/auth/", {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const json = await response.json();
      if (response.ok) {
        setLike(like - 1);
        sendNotif("Edit berhasil", "success");
        setEditProfileError("");
        navigate("/profile/" + editUsername);
        deleteAuth();
      }
      if (!response.ok) {
        setEditProfileError(json.err);
      }
    }
  };

  const enablePassword = (e) => {
    if (e.target.checked == true) {
      document.getElementById("password").disabled = false;
      document.querySelector("#password").classList.remove("input-disabled");
      document.getElementById("password").required = true;
      setGantiPassword(true);
    } else {
      document.getElementById("password").disabled = true;
      document.querySelector("#password").classList.add("input-disabled");
      document.getElementById("password").required = false;
      setGantiPassword(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 p-2">
      <div className="w-full bg-base-200 shadow-sm flex flex-col p-5 gap-2 rounded-lg border-accent border-2">
        {error && <h1 className="text-error">{error}</h1>}
        {profile &&
          !error &&
          profile.map((profil, i) => {
            var profileMenu;
            if (profileUsername == username) {
              profileMenu = (
                <>
                  <div className="flex gap-2 md:w-fit w-full">
                    <button
                      className="flex-1 btn btn-accent btn-sm"
                      onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 btn btn-error btn-sm"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box flex flex-col gap-2">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h1 className="font-bold text-lg">Edit profil</h1>
                      <form
                        className="flex flex-col gap-2"
                        onSubmit={(e) => userEdit(e, profil.id)}
                      >
                        {editProfileError && (
                          <h1 className="text-red-500">{editProfileError}</h1>
                        )}
                        <label className="form-control w-full">
                          <div className="label" htmlFor="username">
                            <span className="label-text">Username</span>
                          </div>
                          <input
                            name="username"
                            id="username"
                            required
                            onChange={(e) => setEditUsername(e.target.value)}
                            type="text"
                            placeholder="john.doe"
                            className="input input-bordered w-full"
                            defaultValue={profileUsername}
                          />
                        </label>
                        <label className="form-control w-full">
                          <div className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                          </div>
                          <input
                            name="email"
                            id="email"
                            required
                            onChange={(e) => setEditEmail(e.target.value)}
                            defaultValue={profil.email}
                            type="text"
                            placeholder="john@doe.com"
                            className="input input-bordered w-full"
                          />
                        </label>
                        <label className="form-control w-full">
                          <div className="label" htmlFor="namalengkap">
                            <span className="label-text">Nama Lengkap</span>
                          </div>
                          <input
                            name="namalengkap"
                            id="namalengkap"
                            onChange={(e) =>
                              setEditNama_lengkap(e.target.value)
                            }
                            required
                            defaultValue={profil.nama_lengkap}
                            type="text"
                            placeholder="John Doe"
                            className="input input-bordered w-full"
                          />
                        </label>
                        <label className="form-control w-full">
                          <div className="label" htmlFor="alamat">
                            <span className="label-text">Alamat</span>
                          </div>
                          <input
                            name="alamat"
                            id="alamat"
                            required
                            defaultValue={profil.alamat}
                            onChange={(e) => setEditAlamat(e.target.value)}
                            type="text"
                            placeholder="Jakarta, Indonesia"
                            className="input input-bordered w-full"
                          />
                        </label>
                        <div className="form-control">
                          <label
                            className="label cursor-pointer"
                            htmlFor="gantiFoto"
                          >
                            <span className="label-text">Ganti Password</span>
                            <input
                              type="checkbox"
                              id="gantiFoto"
                              className="toggle"
                              onChange={(e) => {
                                enablePassword(e);
                              }}
                            />
                          </label>
                        </div>
                        <label className="form-control w-full">
                          <div className="label" htmlFor="password">
                            <span className="label-text">Password</span>
                          </div>
                          <input
                            name="password"
                            id="password"
                            type="password"
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="Type here"
                            className="input input-bordered w-full input-disabled"
                            disabled
                          />
                        </label>
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                        >
                          Submit
                        </button>
                      </form>
                      <button className="btn btn-error">Hapus akun</button>
                      <p className="py-4">
                        Press ESC key or click the button below to close
                      </p>
                    </div>
                  </dialog>
                </>
              );
            } else {
              profileMenu = <></>;
            }
            return (
              <>
                <div
                  key={i}
                  className="flex flex-col md:flex-row justify-between w-full gap-2"
                >
                  <h1 className="text-2xl font-bold">{profileUsername}</h1>
                  {profileMenu}
                </div>

                <div className="w-full grid grid-cols-2 bg-base-300 p-2 rounded-lg">
                  <h1>Nama Lengkap</h1>
                  <h1>{profil.nama_lengkap}</h1>
                  <h1>Alamat</h1>
                  <h1>{profil.alamat}</h1>
                </div>
              </>
            );
          })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        {newPhotos &&
          !error &&
          newPhotos.map((photo, i) => {
            const likeIds = [];
            var likeButton = null;
            yourLikes &&
              yourLikes.map((likezz) => {
                likeIds.push(likezz.foto_id);
              });
            if (likeIds.includes(photo.id)) {
              yourLikes.map((likezzz, i) => {
                if (likezzz.foto_id == photo.id) {
                  return (likeButton = (
                    <button
                      className="btn btn-primary btn-sm flex gap-2"
                      id="likeButton"
                      key={i}
                      onClick={() => {
                        likeDelete(likezzz.id);
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.2699 16.265L20.9754 12.1852C21.1516 11.1662 20.368 10.2342 19.335 10.2342H14.1539C13.6404 10.2342 13.2494 9.77328 13.3325 9.26598L13.9952 5.22142C14.1028 4.56435 14.0721 3.892 13.9049 3.24752C13.7664 2.71364 13.3545 2.28495 12.8128 2.11093L12.6678 2.06435C12.3404 1.95918 11.9831 1.98365 11.6744 2.13239C11.3347 2.29611 11.0861 2.59473 10.994 2.94989L10.5183 4.78374C10.3669 5.36723 10.1465 5.93045 9.86218 6.46262C9.44683 7.24017 8.80465 7.86246 8.13711 8.43769L6.69838 9.67749C6.29272 10.0271 6.07968 10.5506 6.12584 11.0844L6.93801 20.4771C7.0125 21.3386 7.7328 22 8.59658 22H13.2452C16.7265 22 19.6975 19.5744 20.2699 16.265Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.96767 9.48508C3.36893 9.46777 3.71261 9.76963 3.74721 10.1698L4.71881 21.4063C4.78122 22.1281 4.21268 22.7502 3.48671 22.7502C2.80289 22.7502 2.25 22.1954 2.25 21.5129V10.2344C2.25 9.83275 2.5664 9.5024 2.96767 9.48508Z"
                          fill="currentColor"
                        />
                      </svg>
                      {photo.likes}
                    </button>
                  ));
                }
              });
            } else {
              likeButton = (
                <button
                  className="btn btn-ghost btn-sm flex gap-2"
                  id="likeButton"
                  onClick={() => {
                    likeAdd(photo.id);
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9752 12.1852L20.2361 12.0574L20.9752 12.1852ZM20.2696 16.265L19.5306 16.1371L20.2696 16.265ZM6.93777 20.4771L6.19056 20.5417L6.93777 20.4771ZM6.12561 11.0844L6.87282 11.0198L6.12561 11.0844ZM13.995 5.22142L14.7351 5.34269V5.34269L13.995 5.22142ZM13.3323 9.26598L14.0724 9.38725V9.38725L13.3323 9.26598ZM6.69814 9.67749L6.20855 9.10933H6.20855L6.69814 9.67749ZM8.13688 8.43769L8.62647 9.00585H8.62647L8.13688 8.43769ZM10.5181 4.78374L9.79208 4.59542L10.5181 4.78374ZM10.9938 2.94989L11.7197 3.13821V3.13821L10.9938 2.94989ZM12.6676 2.06435L12.4382 2.77841L12.4382 2.77841L12.6676 2.06435ZM12.8126 2.11093L13.042 1.39687L13.042 1.39687L12.8126 2.11093ZM9.86195 6.46262L10.5235 6.81599V6.81599L9.86195 6.46262ZM13.9047 3.24752L13.1787 3.43584V3.43584L13.9047 3.24752ZM11.6742 2.13239L11.3486 1.45675V1.45675L11.6742 2.13239ZM3.9716 21.4707L3.22439 21.5353L3.9716 21.4707ZM3 10.2342L3.74721 10.1696C3.71261 9.76945 3.36893 9.46758 2.96767 9.4849C2.5664 9.50221 2.25 9.83256 2.25 10.2342H3ZM20.2361 12.0574L19.5306 16.1371L21.0087 16.3928L21.7142 12.313L20.2361 12.0574ZM13.245 21.25H8.59635V22.75H13.245V21.25ZM7.68498 20.4125L6.87282 11.0198L5.3784 11.149L6.19056 20.5417L7.68498 20.4125ZM19.5306 16.1371C19.0238 19.0677 16.3813 21.25 13.245 21.25V22.75C17.0712 22.75 20.3708 20.081 21.0087 16.3928L19.5306 16.1371ZM13.2548 5.10015L12.5921 9.14472L14.0724 9.38725L14.7351 5.34269L13.2548 5.10015ZM7.18773 10.2456L8.62647 9.00585L7.64729 7.86954L6.20855 9.10933L7.18773 10.2456ZM11.244 4.97206L11.7197 3.13821L10.2678 2.76157L9.79208 4.59542L11.244 4.97206ZM12.4382 2.77841L12.5832 2.82498L13.042 1.39687L12.897 1.3503L12.4382 2.77841ZM10.5235 6.81599C10.8354 6.23198 11.0777 5.61339 11.244 4.97206L9.79208 4.59542C9.65573 5.12107 9.45699 5.62893 9.20042 6.10924L10.5235 6.81599ZM12.5832 2.82498C12.8896 2.92342 13.1072 3.16009 13.1787 3.43584L14.6307 3.05921C14.4252 2.26719 13.819 1.64648 13.042 1.39687L12.5832 2.82498ZM11.7197 3.13821C11.7548 3.0032 11.8523 2.87913 11.9998 2.80804L11.3486 1.45675C10.8166 1.71309 10.417 2.18627 10.2678 2.76157L11.7197 3.13821ZM11.9998 2.80804C12.1345 2.74311 12.2931 2.73181 12.4382 2.77841L12.897 1.3503C12.3873 1.18655 11.8312 1.2242 11.3486 1.45675L11.9998 2.80804ZM14.1537 10.9842H19.3348V9.4842H14.1537V10.9842ZM4.71881 21.4061L3.74721 10.1696L2.25279 10.2988L3.22439 21.5353L4.71881 21.4061ZM3.75 21.5127V10.2342H2.25V21.5127H3.75ZM3.22439 21.5353C3.2112 21.3828 3.33146 21.25 3.48671 21.25V22.75C4.21268 22.75 4.78122 22.1279 4.71881 21.4061L3.22439 21.5353ZM14.7351 5.34269C14.8596 4.58256 14.8241 3.80477 14.6307 3.0592L13.1787 3.43584C13.3197 3.97923 13.3456 4.54613 13.2548 5.10016L14.7351 5.34269ZM8.59635 21.25C8.12244 21.25 7.72601 20.887 7.68498 20.4125L6.19056 20.5417C6.29852 21.7902 7.3427 22.75 8.59635 22.75V21.25ZM8.62647 9.00585C9.30632 8.42 10.0392 7.72267 10.5235 6.81599L9.20042 6.10924C8.85404 6.75767 8.3025 7.30493 7.64729 7.86954L8.62647 9.00585ZM21.7142 12.313C21.9695 10.8365 20.8341 9.4842 19.3348 9.4842V10.9842C19.9014 10.9842 20.3332 11.4959 20.2361 12.0574L21.7142 12.313ZM3.48671 21.25C3.63292 21.25 3.75 21.3684 3.75 21.5127H2.25C2.25 22.1953 2.80289 22.75 3.48671 22.75V21.25ZM12.5921 9.14471C12.4344 10.1076 13.1766 10.9842 14.1537 10.9842V9.4842C14.1038 9.4842 14.0639 9.43901 14.0724 9.38725L12.5921 9.14471ZM6.87282 11.0198C6.8474 10.7258 6.96475 10.4378 7.18773 10.2456L6.20855 9.10933C5.62022 9.61631 5.31149 10.3753 5.3784 11.149L6.87282 11.0198Z"
                      fill="currentColor"
                    />
                  </svg>
                  {photo.likes}
                </button>
              );
            }

            return (
              <div
                className="h-auto flex flex-col gap-2 border-primary border-2 rounded-lg p-2 xl:min-w-fit w-full"
                key={i}
              >
                <div className="items-center xl:items-start h-full flex-col flex xl:flex-row gap-2 justify-between">
                  <img
                    src={"http://localhost:8081/Foto/" + photo.lokasi_file}
                    alt={photo.judul_foto}
                    className="md:max-w-[20rem] max-h-[20rem] xl:max-h-[24rem]"
                  />
                  <div className="flex flex-col justify-between h-full xl:max-w-[17rem] gap-2 w-full">
                    <p className="flex-1 max-h-[10rem] xl:max-h-[20rem] overflow-auto bg-base-200 rounded-lg p-2">
                      {photo.judul_foto}
                    </p>
                    <div className="flex flex-col w-full gap-2">
                      <h1 className="text-xs italic">post by</h1>
                      <Link
                        to={"/profile/" + photo.username}
                        className="btn btn-primary btn-sm"
                      >
                        {photo.username}
                      </Link>
                    </div>
                  </div>
                </div>
                <ul className="rounded-lg p-2 menu-horizontal w-full bg-base-200 justify-around">
                  <li>{likeButton}</li>
                  <li>
                    <Link
                      to={"/foto/" + photo.id}
                      className="btn btn-ghost btn-sm"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <title>comment-4</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs></defs>
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Icon-Set"
                            transform="translate(-308.000000, -255.000000)"
                            fill="currentColor"
                          >
                            <path
                              d="M327.494,279.633 L324,284 L320.506,279.633 C314.464,278.355 309.992,273.863 309.992,268.501 C309.992,262.146 316.264,256.994 324,256.994 C331.736,256.994 338.008,262.146 338.008,268.501 C338.008,273.863 333.536,278.355 327.494,279.633 L327.494,279.633 Z M324,255 C315.163,255 308,261.143 308,268.72 C308,274.969 312.877,280.232 319.542,281.889 L324,287.001 L328.459,281.889 C335.123,280.232 340,274.969 340,268.72 C340,261.143 332.837,255 324,255 L324,255 Z"
                              id="comment-4"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      {commentCount &&
                        commentCount.map((count, i) => {
                          if (count.id == photo.id) {
                            return count.comments;
                          }
                        })}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/foto/" + photo.id}
                      className="btn btn-ghost btn-sm"
                    >
                      Full post
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
      {newPhotos && fotoCount && newPhotos.length < fotoCount.fotoCount && (
        <button
          className="btn btn-primary"
          onClick={() => setLimit(limit + 10)}
        >
          Show More
        </button>
      )}
    </div>
  );
}

Profile.propTypes = {
  auth: PropTypes.bool,
  username: PropTypes.string,
  deleteAuth: PropTypes.func,
  sendNotif: PropTypes.func,
};

export default Profile;
