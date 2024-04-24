import { useParams, Link, useNavigate } from "react-router-dom";
import rapil from "/rapil.png";
import damnclean from "/damn clean.png";
import ltpaisdad2 from "/ltpaisdad2.jpg";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function Foto({ auth, username, sendNotif }) {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id;
  const [error, setError] = useState("");
  const [commentLimit, setCommentLimit] = useState(10);
  const [photo, setPhoto] = useState(null);
  const [yourLike, setYourLike] = useState(null);
  const [comments, setComments] = useState(null);
  const [yourComments, setYourComments] = useState(null);
  const [totalComment, setTotalComment] = useState(null);
  const [newComment, setNewComment] = useState("");

  //   refresh
  const [refresh, setRefresh] = useState(0);

  // edit comment
  const [editComment, setEditComment] = useState({
    isi: null,
    id: null,
  });

  // edit foto
  const [editJudul, setEditJudul] = useState(null);
  const [editDeskripsi, setEditDeskripsi] = useState(null);
  const [gantiGambar, setGantiGambar] = useState(false);
  const [editFile, setEditFile] = useState(null);
  const [oldFile, setOldFile] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const foto = { id, username, commentLimit };
      const response = await fetch("http://localhost:8081/api/main/foto", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(foto),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.err);
        console.log(json.err);
      }
      if (response.ok) {
        setPhoto(json.data);
        setYourLike(json.data2);
        setComments(json.data3);
        setYourComments(json.data4);
        setTotalComment(json.data5[0].comments);
        setEditJudul(json.data[0].judul_foto);
        setEditDeskripsi(json.data[0].deskripsi_foto);
        setOldFile(json.data[0].lokasi_file);
        setError("");
      }
    };
    fetchPhoto();
  }, [auth, username, id, commentLimit, refresh]);

  const likeAdd = async (fotoId) => {
    const idz = { id: fotoId };
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
      setRefresh(refresh + 1);
    }
  };

  const likeDelete = async (likeId) => {
    const idz = { id: likeId };
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
      setRefresh(refresh - 1);
    }
  };

  const commentAdd = async (e) => {
    e.preventDefault();
    const komentar = { id: id, isi: newComment };
    const response = await fetch("http://localhost:8081/api/komentar/", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(komentar),
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
      setRefresh(refresh + 1);
    }
  };

  const commentDelete = async (komenId) => {
    const idz = { id: komenId };
    const response = await fetch("http://localhost:8081/api/komentar/", {
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
      setRefresh(refresh - 1);
    }
  };

  const commentUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8081/api/komentar/", {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(editComment),
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
      setRefresh(refresh + 1);
    }
  };

  const enableFile = (e) => {
    if (e.target.checked == true) {
      document.getElementById("file").disabled = false;
      document.querySelector("#file").classList.remove("file-input-disabled");
      document.getElementById("file").required = true;
      setGantiGambar(true);
    } else {
      document.getElementById("file").disabled = true;
      document.querySelector("#file").classList.add("file-input-disabled");
      document.getElementById("file").required = false;
      setGantiGambar(false);
    }
  };

  const photoDelete = async (id, filename) => {
    const foto = { id, filename };
    const response = await fetch("http://localhost:8081/api/foto/", {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify(foto),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    // const json = await response.json();
    if (!response.ok) {
      sendNotif("Error", "error");
    }
    if (response.ok) {
      sendNotif("Hapus foto berhasil", "success");
      navigate("/profile/" + username);
      setPhoto(null);
    }
  };

  const photoUpdate = async (e, fotoId) => {
    e.preventDefault();
    if (gantiGambar == false) {
      const fotoEdit = {
        id: fotoId,
        judul: editJudul,
        deskripsi: editDeskripsi,
      };
      const response = await fetch("http://localhost:8081/api/foto/", {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(fotoEdit),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json.err);
        sendNotif("Anda belum login", "error");
      }
      if (response.ok) {
        sendNotif("Edit foto berhasil", "success");
        setRefresh(refresh - 1);
      }
    } else {
      const fotoEdit = new FormData();
      fotoEdit.append("id", fotoId);
      fotoEdit.append("judul", editJudul);
      fotoEdit.append("deskripsi", editDeskripsi);
      fotoEdit.append("file", editFile);
      fotoEdit.append("oldFile", oldFile);
      const response = await fetch("http://localhost:8081/api/foto/file/", {
        credentials: "include",
        method: "PATCH",
        body: fotoEdit,
        mode: "cors",
      });
      // const json = await response.json();
      if (!response.ok) {
        // setError(json.err);
        sendNotif("Anda belum login", "error");
      }
      if (response.ok) {
        // setError(null);
        sendNotif("Post foto berhasil", "success");
        setRefresh(refresh + 1);
      }
    }
  };

  if (auth == false) {
    const likeButtons = document.querySelectorAll("#likeButton");
    for (const likeButton of likeButtons) {
      likeButton.classList.add("btn-disabled");
      likeButton.disabled = true;
    }
    const commentButton = document.querySelectorAll("#commentButton");
    for (const commentBtn of commentButton) {
      commentBtn.disabled = true;
      commentBtn.classList.add("btn-disabled");
    }
  } else {
    const likeButtons = document.querySelectorAll("#likeButton");
    for (const likeButton of likeButtons) {
      likeButton.classList.remove("btn-disabled");
    }
    const commentButton = document.querySelectorAll("#commentButton");
    for (const commentBtn of commentButton) {
      commentBtn.disabled = false;
      commentBtn.classList.remove("btn-disabled");
    }
  }

  return (
    <div className="w-full p-2">
      {error && <h1 className="text-error">{error}</h1>}
      {photo &&
        !error &&
        photo.map((photo, i) => {
          var likeButton = null;
          const likeIds = [];
          yourLike &&
            yourLike.map((likezz) => {
              likeIds.push(likezz.foto_id);
            });
          if (likeIds.includes(photo.id)) {
            yourLike.map((likezzz, i) => {
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
          if (photo.username == username) {
            return (
              <>
                <Helmet>
                  <title>Galeri | Foto</title>
                </Helmet>
                <div
                  key={i}
                  className="border-2 p-2 border-primary justify-between rounded-lg w-full items-center h-full xl:min-w-fit gap-2 flex flex-col xl:flex-row"
                >
                  <div className="items-center flex justify-center flex-1">
                    <img
                      src={"http://localhost:8081/Foto/" + photo.lokasi_file}
                      alt=""
                      className="md:max-w-[36rem] lg:max-w-[40rem] max-h-[36rem] lg:max-h-[40rem]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full gap-2 xl:max-w-[36rem] w-full">
                    <div className="flex-1 flex max-h-[50rem] xl:max-h-[34rem] overflow-auto flex-col">
                      <div className="text-base-100 text-sm p-2 bg-accent rounded-lg">{photo.tanggal_unggah.slice(0, 10)}</div>
                      <div className="flex-1 bg-base-200 rounded-t-lg p-2 text-lg font-bold border-b-2 border-primary">
                        {photo.judul_foto}
                        
                      </div>
                      
                      <div className="flex flex-col gap-2 flex-1 bg-base-200 border-b-2 border-primary p-2">
                        <h1 className="font-bold text-xl">Deskripsi</h1>
                        <p className="overflow-auto h-full">
                          {photo.deskripsi_foto}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 flex-1 bg-base-200 rounded-b-lg p-2">
                        <h1 className="font-bold text-xl">
                          Komentar ({totalComment})
                        </h1>
                        <div className="flex flex-col gap-2 overflow-auto">
                          {yourComments &&
                            yourComments.map((comment, i) => {
                              return (
                                <div
                                  key={i}
                                  className="bg-base-300 p-2 rounded-lg shadow-sm flex flex-col gap-2"
                                >
                                  <div className="flex justify-between">
                                    <Link
                                      to={"/profile/" + comment.username}
                                      className="btn btn-xs btn-primary italic"
                                    >
                                      {comment.username}
                                    </Link>
                                    <button
                                      className="btn btn-error btn-xs"
                                      onClick={() => {
                                        commentDelete(comment.id);
                                      }}
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <form
                                    className="join w-full"
                                    onSubmit={commentUpdate}
                                  >
                                    <div className="w-full">
                                      <input
                                        defaultValue={comment.isi_komentar}
                                        onChange={(e) => {
                                          setEditComment((editComment) => ({
                                            ...editComment,
                                            isi: e.target.value,
                                            id: comment.id,
                                          }));
                                        }}
                                        className="input input-bordered join-item input-sm w-full"
                                        placeholder="Komentari..."
                                      />
                                    </div>
                                    <div className="indicator">
                                      <button
                                        type="submit"
                                        className="btn join-item btn-accent btn-sm"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              );
                            })}
                          {comments &&
                            comments.map((comment, i) => {
                              return (
                                <div
                                  key={i}
                                  className="bg-base-300 p-2 rounded-lg shadow-sm flex flex-col gap-2"
                                >
                                  <div className="flex justify-between">
                                    <Link
                                      to={"/profile/" + comment.username}
                                      className="btn btn-xs btn-primary italic"
                                    >
                                      {comment.username}
                                    </Link>
                                    <button
                                      className="btn btn-error btn-xs"
                                      onClick={() => {
                                        commentDelete(comment.id);
                                      }}
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>

                                  <p className="">{comment.isi_komentar}</p>
                                </div>
                              );
                            })}
                          {yourComments &&
                            comments &&
                            yourComments.length + comments.length <
                              totalComment && (
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  setCommentLimit(commentLimit + 10)
                                }
                              >
                                Show More
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <div className="w-full">
                        <form className="join w-full" onSubmit={commentAdd}>
                          <div className="w-full">
                            <input
                              onChange={(e) => {
                                setNewComment(e.target.value);
                              }}
                              className="input input-bordered join-item input-sm w-full"
                              placeholder="Komentari..."
                            />
                          </div>
                          <div className="indicator">
                            <button
                              type="submit"
                              className="btn join-item btn-accent btn-sm"
                              id="commentButton"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </div>
                      <h1 className="text-xs italic">post by</h1>
                      <div className="flex gap-2">
                        <Link
                          to={"/profile/" + photo.username}
                          className="flex-1 btn btn-primary btn-sm"
                        >
                          {photo.username}
                        </Link>
                        {likeButton}
                        <button
                          className="btn btn-sm btn-accent"
                          onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <dialog
                  id="my_modal_1"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box flex flex-col gap-2">
                    <h3 className="font-bold text-xl">Edit Foto</h3>
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={(e) => {
                        photoUpdate(e, photo.id);
                      }}
                    >
                      <label className="form-control w-full">
                        <div className="label" htmlFor="judul">
                          <span className="label-text">Judul foto</span>
                        </div>
                        <input
                          onChange={(e) => {
                            setEditJudul(e.target.value);
                          }}
                          name="judul"
                          id="judul"
                          required
                          type="text"
                          className="input input-bordered w-full"
                          defaultValue={photo.judul_foto}
                        />
                      </label>
                      <label className="form-control w-full">
                        <div className="label" htmlFor="deskripsi">
                          <span className="label-text">Deskripsi foto</span>
                        </div>
                        <input
                          onChange={(e) => {
                            setEditDeskripsi(e.target.value);
                          }}
                          name="deskripsi"
                          id="deskripsi"
                          required
                          type="text"
                          className="input input-bordered w-full"
                          defaultValue={photo.deskripsi_foto}
                        />
                      </label>
                      <div className="form-control">
                        <label
                          className="label cursor-pointer"
                          htmlFor="gantiFoto"
                        >
                          <span className="label-text">Ganti Foto</span>
                          <input
                            type="checkbox"
                            id="gantiFoto"
                            className="toggle"
                            onChange={(e) => {
                              enableFile(e);
                            }}
                          />
                        </label>
                      </div>
                      <label className="form-control w-full">
                        <div className="label" htmlFor="file">
                          <span className="label-text">Upload foto</span>
                        </div>
                        <input
                          onChange={(e) => {
                            setEditFile(e.target.files[0]);
                          }}
                          name="file"
                          id="file"
                          type="file"
                          disabled
                          accept=".jpg"
                          className="file-input file-input-disabled file-input-bordered w-full"
                        />
                      </label>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                    <button
                      className="btn btn-error w-full"
                      onClick={() => {
                        photoDelete(photo.id, photo.lokasi_file);
                      }}
                    >
                      Hapus foto
                    </button>
                    <p className="py-4">
                      Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </>
            );
          } else {
            return (
              <>
                <Helmet>
                  <title>Galeri | Foto</title>
                </Helmet>
                <div
                  key={i}
                  className="border-2 p-2 border-primary justify-between rounded-lg w-full items-center h-full xl:min-w-fit gap-2 flex flex-col xl:flex-row"
                >
                  <div className="items-center flex justify-center flex-1">
                    <img
                      src={"http://localhost:8081/Foto/" + photo.lokasi_file}
                      alt=""
                      className="md:max-w-[36rem] lg:max-w-[40rem] max-h-[36rem] lg:max-h-[40rem]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full gap-2 xl:max-w-[36rem] w-full">
                    <div className="flex-1 flex max-h-[50rem] xl:max-h-[34rem] overflow-auto flex-col">
                    <div className="text-base-100 text-sm p-2 bg-accent rounded-lg">{photo.tanggal_unggah.slice(0, 10)}</div>
                      <div className="flex-1 bg-base-200 rounded-t-lg p-2 text-lg font-bold border-b-2 border-primary">
                        {photo.judul_foto}
                      </div>
                      <div className="flex flex-col gap-2 flex-1 bg-base-200 border-b-2 border-primary p-2">
                        <h1 className="font-bold text-xl">Deskripsi</h1>
                        <p className="overflow-auto h-full">
                          {photo.deskripsi_foto}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 flex-1 bg-base-200 rounded-b-lg p-2">
                        <h1 className="font-bold text-xl">
                          Komentar ({totalComment})
                        </h1>
                        <div className="flex flex-col gap-2 overflow-auto">
                          {yourComments &&
                            yourComments.map((comment, i) => {
                              return (
                                <div
                                  key={i}
                                  className="bg-base-300 p-2 rounded-lg shadow-sm flex flex-col gap-2"
                                >
                                  <div className="flex justify-between">
                                    <Link
                                      to={"/profile/" + comment.username}
                                      className="btn btn-xs btn-primary italic"
                                    >
                                      {comment.username}
                                    </Link>
                                    <button
                                      className="btn btn-error btn-xs"
                                      onClick={() => {
                                        commentDelete(comment.id);
                                      }}
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <form
                                    className="join w-full"
                                    onSubmit={commentUpdate}
                                  >
                                    <div className="w-full">
                                      <input
                                        defaultValue={comment.isi_komentar}
                                        onChange={(e) => {
                                          setEditComment((editComment) => ({
                                            ...editComment,
                                            isi: e.target.value,
                                            id: comment.id,
                                          }));
                                        }}
                                        className="input input-bordered join-item input-sm w-full"
                                        placeholder="Komentari..."
                                      />
                                    </div>
                                    <div className="indicator">
                                      <button
                                        type="submit"
                                        className="btn join-item btn-accent btn-sm"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              );
                            })}
                          {comments &&
                            comments.map((comment, i) => {
                              return (
                                <div
                                  key={i}
                                  className="bg-base-300 p-2 rounded-lg shadow-sm flex flex-col gap-2"
                                >
                                  <div className="flex justify-between">
                                    <Link
                                      to={"/profile/" + comment.username}
                                      className="btn btn-xs btn-primary italic"
                                    >
                                      {comment.username}
                                    </Link>
                                  </div>

                                  <p className="">{comment.isi_komentar}</p>
                                </div>
                              );
                            })}
                          {yourComments &&
                            comments &&
                            yourComments.length + comments.length <
                              totalComment && (
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  setCommentLimit(commentLimit + 10)
                                }
                              >
                                Show More
                              </button>
                            )}
                          {!yourComments &&
                            comments &&
                            comments.length < totalComment && (
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  setCommentLimit(commentLimit + 10)
                                }
                              >
                                Show More
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <div className="w-full">
                        <form className="join w-full" onSubmit={commentAdd}>
                          <div className="w-full">
                            <input
                              onChange={(e) => {
                                setNewComment(e.target.value);
                              }}
                              className="input input-bordered join-item input-sm w-full"
                              placeholder="Komentari..."
                            />
                          </div>
                          <div className="indicator">
                            <button
                              type="submit"
                              className="btn join-item btn-accent btn-sm"
                              id="commentButton"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </div>
                      <h1 className="text-xs italic">post by</h1>
                      <div className="flex gap-2">
                        <Link
                          to={"/profile/" + photo.username}
                          className="flex-1 btn btn-primary btn-sm"
                        >
                          {photo.username}
                        </Link>
                        {likeButton}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
    </div>
  );
}

export default Foto;
