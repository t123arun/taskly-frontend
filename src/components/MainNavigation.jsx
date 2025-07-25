import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import menuSettingIcon from "../assets/images/threeDots.svg";
import { Backdrop, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { openDrawer } from "../store/slices/drawerSlice";
import { fetchBoardTheme, resetBoardState } from "../store/slices/boardSlice";
import logoWhiteBg from "../assets/images/tasklyLogoBg.svg";
import logo from "../assets/images/tasklyLogo.svg";
import { fetchUserDetails } from "../store/slices/userSlice";

export default function MainNavigation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const imageUrl = import.meta.env.VITE_BACKEND_URL;
  const admin = useSelector((state) => state.auth.user);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [newAvatar, setNewAvatar] = useState("/circleAdd.svg");
  const [display, setDisplay] = useState("hidden");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    if (admin) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, admin]);

  useEffect(() => {
    if (user?.avatar) {
      setNewAvatar(`${imageUrl}/uploads/${user.avatar}`);
    } else {
      setNewAvatar("/circleAdd.svg"); // fallback
    }
  }, [user]);


  const boardTheme = useSelector((state) => state.boards.theme);

  const currentTheme = location.pathname === "/" ? "defaultTheme" : boardTheme;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetBoardState());
    navigate("/login");
  };

  const handleSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setDisplay("hidden");
  };
  const handleMobileMenu = () => {
    setOpenBackdrop((i) => !i);
    setDisplay((value) => (value === "hidden" ? "flex" : "hidden"));
  };
  return (
    <header
      className={`${
        currentTheme + "-h"
      }  h-[60px] flex justify-between items-center px-[50px] sticky top-0 left-0 z-10 py-2`}
    >
      <Link to="/">
        <img
          src={
            currentTheme === "defaultTheme"
              ? logo
              : currentTheme === "blueTheme"
              ? logoWhiteBg
              : currentTheme === "greenTheme"
              ? logoWhiteBg
              : currentTheme === "brownTheme"
              ? logoWhiteBg
              : logo
          }
          alt="logo"
          className="h-[40px]"
        />
      </Link>
      <nav className="flex">
        <div className="flex md:hidden z-40" onClick={handleMobileMenu}>
          {display === "hidden" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 stroke-white stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 stroke-white stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
                strokeWidth="1.5"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          )}
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-between items-center gap-3 text-white text-[24px] font-regular transition-all ease-out duration-300">
          {admin ? (
            <>
              {location.pathname.startsWith("/workspace") ? (
                <></>
              ) : (
                (location.pathname.startsWith("/board") ||
                  location.pathname.startsWith("/")) && (
                  <li>
                    <NavLink
                      to="/workspace"
                      className="py-2 px-5 hover:bg-purple rounded-xl"
                    >
                      Workspace
                    </NavLink>
                  </li>
                )
              )}
              <>
                <li>{user?.name}</li>
                <li>
                  <img
                    src={newAvatar}
                    alt="avatar"
                    className="h-[50px] border-2 border-white rounded-full"
                  />
                </li>
                <li>
                  <img
                    src={menuSettingIcon}
                    alt="settingIcon"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleSettings}
                    className="cursor-pointer"
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        dispatch(fetchUserDetails());
                        dispatch(
                          openDrawer({
                            type: "userDetails",
                          })
                        );
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(fetchBoardTheme());
                        dispatch(
                          openDrawer({
                            type: "boardSettings",
                          })
                        );
                      }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </li>
              </>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    clsx(
                      "py-2 px-5 hover:bg-purple rounded-xl",
                      isActive && "bg-purple"
                    )
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    clsx(
                      "py-2 px-5 hover:bg-purple rounded-xl",
                      isActive && "bg-purple"
                    )
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {/* Mobile Menu */}
        <ul
          className={`${display}  md:hidden z-10  items-center gap-3 text-white text-[24px] font-regular absolute w-1/2 right-0 top-0  h-screen pt-[60px] flex-col bg-purple`}
        >
          {!admin ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    clsx(
                      "py-2 px-5 border-b-1 border-dotted rounded-xl",
                      isActive && "bg-purple"
                    )
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    clsx(
                      "py-2 px-5 border-b-1 border-dotted rounded-xl",
                      isActive && "bg-purple"
                    )
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <>
                <li className="border-4 rounded-full overflow-hidden">
                  <img src={newAvatar} alt="avatar" className="h-[150px]" />
                </li>
                <li className="border-b-2 pb-2">{user?.name}</li>
                <li
                  className="border-b-1 border-dotted"
                  onClick={() => {
                    dispatch(fetchUserDetails());
                    dispatch(
                      openDrawer({
                        type: "userDetails",
                      })
                    );
                  }}
                >
                  Profile
                </li>
                <li
                  className="border-b-1 border-dotted"
                  onClick={() => {
                    dispatch(fetchBoardTheme());
                    dispatch(
                      openDrawer({
                        type: "boardSettings",
                      })
                    );
                  }}
                >
                  Settings
                </li>
                <li className="border-b-1 border-dotted" onClick={handleLogout}>
                  Logout
                </li>
              </>
              {location.pathname.startsWith("/workspace") ? (
                <></>
              ) : (
                (location.pathname.startsWith("/board") ||
                  location.pathname.startsWith("/")) && (
                  <li className="mt-5 shadow-2xl shadow-white">
                    <NavLink to="/workspace" className="py-2 px-5 ">
                      Workspace
                    </NavLink>
                  </li>
                )
              )}
            </>
          )}
        </ul>
        <Backdrop
          sx={() => ({ color: "#fff", zIndex: 2 })}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        ></Backdrop>
      </nav>
    </header>
  );
}
