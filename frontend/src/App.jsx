// import { useState } from 'react'
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Foto from "./pages/Foto";
import Search from "./pages/Search";

function App() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    const fetchAuth = async () => {
      const response = await fetch("http://localhost:8081/", {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const json = await response.json();
      if (!response.ok) {
        setAuth(false);
        setUsername("");
        setMenus([
          {
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            ),
            title: "Home",
            link: "/",
          },
          {
            svg: (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Search",
            link: "/search/foto/",
          },
          {
            svg: (
              <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 16 16"
                id="register-16px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Path_184"
                  data-name="Path 184"
                  d="M57.5,41a.5.5,0,0,0-.5.5V43H47V31h2v.5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5V31h2v.5a.5.5,0,0,0,1,0v-1a.5.5,0,0,0-.5-.5H55v-.5A1.5,1.5,0,0,0,53.5,28h-3A1.5,1.5,0,0,0,49,29.5V30H46.5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-2A.5.5,0,0,0,57.5,41ZM50,29.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V31H50Zm11.854,4.646-2-2a.5.5,0,0,0-.708,0l-6,6A.5.5,0,0,0,53,38.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.354-.146l6-6A.5.5,0,0,0,61.854,34.146ZM54,40V38.707l5.5-5.5L60.793,34.5l-5.5,5.5Zm-2,.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,40.5Zm0-3a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,37.5ZM54.5,35h-5a.5.5,0,0,1,0-1h5a.5.5,0,0,1,0,1Z"
                  transform="translate(-46 -28)"
                />
              </svg>
            ),
            title: "Register",
            link: "/register",
          },
          {
            svg: (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12C20 7.58172 16.4183 4 12 4M12 20C14.5264 20 16.7792 18.8289 18.2454 17"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H14M14 12L11 9M14 12L11 15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Login",
            link: "/login",
          },
        ]);
      }
      if (response.ok) {
        setAuth(true);
        setUsername(json.username);
        setMenus([
          {
            svg: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            ),
            title: "Home",
            link: "/",
          },
          {
            svg: (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Search",
            link: "/search/foto/",
          },
          {
            svg: (
              <svg
                fill="currentColor"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L9.0005,2 C9.55250861,2 10,2.44749139 10,2.9995 C10,3.55154094 9.55254095,3.99908949 9.00050002,3.9991999 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.278 L8.18626653,12.4187618 C8.50017051,11.9792962 9.09949173,11.8737129 9.54124102,12.158983 L9.6401844,12.2317787 L14.785,16.518 L16.1679497,14.4452998 C16.4946552,13.9552416 17.1635825,13.8584909 17.6141119,14.2105599 L17.7071068,14.2928932 L20,16.585 L20,15 C20,14.4477153 20.4477153,14 21,14 C21.5522847,14 22,14.4477153 22,15 L22,19 Z M9.187,14.458 L5.228,20 L19,20 C19.4289102,20 19.794752,19.7299721 19.9367986,19.3506434 L17.155,16.57 L15.8320503,18.5547002 C15.5242948,19.0163334 14.9063415,19.1337563 14.4540306,18.8379569 L14.3598156,18.7682213 L9.187,14.458 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,6 L21,6 C21.5522847,6 22,6.44771525 22,7 C22,7.55228475 21.5522847,8 21,8 L18,8 L18,11 C18,11.5522847 17.5522847,12 17,12 C16.4477153,12 16,11.5522847 16,11 L16,8 L13,8 C12.4477153,8 12,7.55228475 12,7 C12,6.44771525 12.4477153,6 13,6 L16,6 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z"
                />
              </svg>
            ),
            title: "Post",
            link: "/post",
          },
          {
            svg: (
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                stroke="currentColor"
              >
                <title>profile_round [#1342]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-140.000000, -2159.000000)"
                    fill="currentColor"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
                        id="profile_round-[#1342]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            ),
            title: "Profile",
            link: "/profile/" + username,
          },
        ]);
      }
    };
    fetchAuth();
    console.log(username);
  }, [auth, username]);
  // const [count, setCount] = useState(0)
  const [notification, setNotification] = useState(null);
  const sendNotif = (message, status) => {
    setNotification({ message: message, status: status });
    const alertBox = document.getElementById("notification");
    alertBox.classList.remove("hidden");
  };
  const sendAuth = () => {
    setAuth(true);
  };
  const deleteAuth = () => {
    setAuth(false);
    setUsername("");
  };

  // var menus = [];
  // if (auth) {
  //   menus = [
  //     {
  //       svg: (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-5 w-5"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  //           />
  //         </svg>
  //       ),
  //       title: "Home",
  //       link: "/",
  //     },
  //     {
  //       svg: (
  //         <svg
  //           className="h-5 w-5"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //           stroke="currentColor"
  //         >
  //           <path
  //             d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //       ),
  //       title: "Search",
  //       link: "/search",
  //     },
  //     {
  //       svg: (
  //         <svg
  //           fill="currentColor"
  //           className="h-5 w-5"
  //           viewBox="0 0 24 24"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             d="M22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L9.0005,2 C9.55250861,2 10,2.44749139 10,2.9995 C10,3.55154094 9.55254095,3.99908949 9.00050002,3.9991999 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.278 L8.18626653,12.4187618 C8.50017051,11.9792962 9.09949173,11.8737129 9.54124102,12.158983 L9.6401844,12.2317787 L14.785,16.518 L16.1679497,14.4452998 C16.4946552,13.9552416 17.1635825,13.8584909 17.6141119,14.2105599 L17.7071068,14.2928932 L20,16.585 L20,15 C20,14.4477153 20.4477153,14 21,14 C21.5522847,14 22,14.4477153 22,15 L22,19 Z M9.187,14.458 L5.228,20 L19,20 C19.4289102,20 19.794752,19.7299721 19.9367986,19.3506434 L17.155,16.57 L15.8320503,18.5547002 C15.5242948,19.0163334 14.9063415,19.1337563 14.4540306,18.8379569 L14.3598156,18.7682213 L9.187,14.458 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,6 L21,6 C21.5522847,6 22,6.44771525 22,7 C22,7.55228475 21.5522847,8 21,8 L18,8 L18,11 C18,11.5522847 17.5522847,12 17,12 C16.4477153,12 16,11.5522847 16,11 L16,8 L13,8 C12.4477153,8 12,7.55228475 12,7 C12,6.44771525 12.4477153,6 13,6 L16,6 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z"
  //           />
  //         </svg>
  //       ),
  //       title: "Post",
  //       link: "/post",
  //     },
  //     {
  //       svg: (
  //         <svg
  //           className="h-5 w-5"
  //           viewBox="0 0 20 20"
  //           version="1.1"
  //           xmlns="http://www.w3.org/2000/svg"
  //           xmlnsXlink="http://www.w3.org/1999/xlink"
  //           stroke="currentColor"
  //         >
  //           <title>profile_round [#1342]</title>
  //           <desc>Created with Sketch.</desc>
  //           <defs></defs>
  //           <g
  //             id="Page-1"
  //             stroke="none"
  //             strokeWidth="1"
  //             fill="none"
  //             fillRule="evenodd"
  //           >
  //             <g
  //               id="Dribbble-Light-Preview"
  //               transform="translate(-140.000000, -2159.000000)"
  //               fill="currentColor"
  //             >
  //               <g id="icons" transform="translate(56.000000, 160.000000)">
  //                 <path
  //                   d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
  //                   id="profile_round-[#1342]"
  //                 ></path>
  //               </g>
  //             </g>
  //           </g>
  //         </svg>
  //       ),
  //       title: "Profile",
  //       link: "/profile/" + username,
  //     },
  //   ];
  // } else {
  //   menus = [
  //     {
  //       svg: (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-5 w-5"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  //           />
  //         </svg>
  //       ),
  //       title: "Home",
  //       link: "/",
  //     },
  //     {
  //       svg: (
  //         <svg
  //           className="h-5 w-5"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //           stroke="currentColor"
  //         >
  //           <path
  //             d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //       ),
  //       title: "Search",
  //       link: "/search",
  //     },
  //     {
  //       svg: (
  //         <svg
  //           fill="currentColor"
  //           className="w-5 h-5"
  //           viewBox="0 0 16 16"
  //           id="register-16px"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             id="Path_184"
  //             data-name="Path 184"
  //             d="M57.5,41a.5.5,0,0,0-.5.5V43H47V31h2v.5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5V31h2v.5a.5.5,0,0,0,1,0v-1a.5.5,0,0,0-.5-.5H55v-.5A1.5,1.5,0,0,0,53.5,28h-3A1.5,1.5,0,0,0,49,29.5V30H46.5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-2A.5.5,0,0,0,57.5,41ZM50,29.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V31H50Zm11.854,4.646-2-2a.5.5,0,0,0-.708,0l-6,6A.5.5,0,0,0,53,38.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.354-.146l6-6A.5.5,0,0,0,61.854,34.146ZM54,40V38.707l5.5-5.5L60.793,34.5l-5.5,5.5Zm-2,.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,40.5Zm0-3a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,37.5ZM54.5,35h-5a.5.5,0,0,1,0-1h5a.5.5,0,0,1,0,1Z"
  //             transform="translate(-46 -28)"
  //           />
  //         </svg>
  //       ),
  //       title: "Register",
  //       link: "/register",
  //     },
  //     {
  //       svg: (
  //         <svg
  //           className="w-5 h-5"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           stroke="currentColor"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M20 12C20 7.58172 16.4183 4 12 4M12 20C14.5264 20 16.7792 18.8289 18.2454 17"
  //             strokeWidth="1.5"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M4 12H14M14 12L11 9M14 12L11 15"
  //             strokeWidth="1.5"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //       ),
  //       title: "Login",
  //       link: "/login",
  //     },
  //   ];
  // }

  const closeNotif = () => {
    const alertBox = document.getElementById("notification");
    alertBox.classList.add("hidden");
  };

  return (
    <BrowserRouter>
      <>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content min-h-screen flex flex-col justify-center">
            {/* Page content here */}
            <div
              className="flex flex-1 p-0 lg:p-2 h-auto lg:h-screen overflow-x-auto justify-center"
              id="pages"
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      auth={auth}
                      username={username}
                      sendNotif={sendNotif}
                    />
                  }
                ></Route>
                <Route
                  path="/search/*"
                  element={<Search auth={auth} username={username} />}
                ></Route>
                <Route
                  path="/profile/:usernamez"
                  element={
                    <Profile
                      auth={auth}
                      username={username}
                      deleteAuth={deleteAuth}
                      sendNotif={sendNotif}
                    />
                  }
                ></Route>
                <Route
                  path="/foto/:id"
                  element={
                    <Foto
                      auth={auth}
                      username={username}
                      sendNotif={sendNotif}
                    />
                  }
                ></Route>
                <Route
                  path="/post"
                  element={
                    <Post
                      auth={auth}
                      username={username}
                      sendNotif={sendNotif}
                    />
                  }
                ></Route>
                <Route
                  path="/login"
                  element={
                    <Login
                      auth={auth}
                      username={username}
                      sendNotif={sendNotif}
                      sendAuth={sendAuth}
                    />
                  }
                ></Route>
                <Route
                  path="/register"
                  element={
                    <Register
                      auth={auth}
                      username={username}
                      sendNotif={sendNotif}
                    />
                  }
                ></Route>
              </Routes>
            </div>

            {notification && (
              <div
                className="flex flex-col p-2 sticky bottom-[3.75rem] lg:bottom-0"
                id="notification"
              >
                <div
                  role="alert"
                  className={"alert alert-" + notification.status}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{notification.message}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={closeNotif}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="btm-nav lg:hidden sticky bg-base-200 bottom-0">
              {menus &&
                menus.map((menu, i) => (
                  <Link key={i} to={menu.link}>
                    {menu.svg}
                    <span className="btm-nav-label text-xs">{menu.title}</span>
                  </Link>
                ))}
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
              {auth ? (
                <>You are logged in, {username}</>
              ) : (
                <>You are not logged in</>
              )}
              {/* Sidebar content here */}
              {menus &&
                menus.map((menu, i) => (
                  <li key={i}>
                    <Link to={menu.link}>
                      {menu.svg}
                      {menu.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
