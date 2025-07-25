import { useDispatch, useSelector } from "react-redux";
import sidePannelImg from "../assets/images/sidePannelImage.png";
import signUpPageBg from "../assets/images/signup-img.png";
import blueThemeBg from "../assets/images/blueTheme.png";
import greenThemeBg from "../assets/images/greenTheme.png";
import { Link } from "react-router-dom";
import { openDrawer } from "../store/slices/drawerSlice";
import Projects from "../components/Projects";
import ConditionalAccordion from "../components/ConditionalAccordion";
import { useEffect, useState } from "react";
import { fetchBoardTheme } from "../store/slices/boardSlice";
import clsx from "clsx";
import { Avatar, AvatarGroup } from "@mui/material";
import star from "../assets/images/Star.svg";
import polygonUnderline from "../assets/images/polygonUnderline.svg";
import colorLine from "../assets/images/colorLine.svg";
import avatar1 from "../assets/images/avatar.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";
import avatar4 from "../assets/images/avatar4.svg";
import avatar5 from "../assets/images/girlSitting.png";

export default function Workspce() {
  const dispatch = useDispatch();
  const [displayAccordion, setDisplayAccordion] = useState(true);
  const currentTheme = useSelector((state) => state.boards.theme);

  useEffect(() => {
    dispatch(fetchBoardTheme());
  }, [dispatch]);

  return (
    <section
      className={clsx(
        "relative h-screen w-full p-2  md:pr-6 pt-[80px] -mt-[60px]",
        currentTheme === "defaultTheme"
          ? "bg-gradient-to-r from-[#f9f9f9] via-[#fcb9f3] to-[#845AB1]"
          : currentTheme
      )}
    >
      <img
        src={
          currentTheme === "defaultTheme"
            ? signUpPageBg
            : currentTheme === "blueTheme"
            ? blueThemeBg
            : currentTheme === "greenTheme"
            ? greenThemeBg
            : signUpPageBg
        }
        alt="signup image"
        className="absolute bottom-0 left-0 "
      />
      <div className="flex gap-4 h-screen mx-auto max-h-[calc(100vh-100px)]">
        <div className="hidden md:block relative sidePannel  flex-[150px] z-1 text-white rounded-r-4xl shadow-2xl p-10">
          <img
            src={sidePannelImg}
            alt="sidepannel image"
            className="absolute bottom-0 left-0 "
          />
          <Link to="/workspace">
            <h1 className="font-bold text-[28px] text-white relative mb-12 pb-2">
              Workspace{" "}
              <img
                src={polygonUnderline}
                alt="underline polygon"
                className="absolute left-1/3 top-full -translate-1/2"
              />
            </h1>
          </Link>
          <Link>
            <h4 className="relative font-semibold text-white text-[26px] pb-2 mb-5 cursor-not-allowed">
              Notifications
              <img
                src={colorLine}
                alt="underline polygon"
                className="absolute left-1/2 top-full -translate-1/2 w-full"
              />
            </h4>
          </Link>
          <h4 className="relative font-semibold text-white text-[26px] pb-2 mb-5 cursor-not-allowed">
            Completed
            <img
              src={colorLine}
              alt="underline polygon"
              className="absolute left-1/2 top-full -translate-1/2 w-full"
            />
          </h4>
          <h4 className="relative font-semibold text-white text-[26px] pb-2 mb-5 cursor-not-allowed">
            Archives
            <img
              src={colorLine}
              alt="underline polygon"
              className="absolute left-1/2 top-full -translate-1/2 w-full"
            />
          </h4>
          <h4 className="relative font-semibold text-white text-[26px] pb-2 mb-5 cursor-not-allowed">
            Settings
            <img
              src={colorLine}
              alt="underline polygon"
              className="absolute left-1/2 top-full -translate-1/2 w-full"
            />
          </h4>
        </div>
        <div className="flex-4/5 bg-[rgba(255,255,255,0.75)] z-1 rounded-4xl shadow-2xl py-2 px-2 md:px-5 overflow-auto">
          <div className="h-[30px] flex justify-end items-center gap-2 py-5 px-10">
            <Link
              onClick={(e) =>
                setDisplayAccordion(e.target.useAccordion === !displayAccordion)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 text-textGrey"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </Link>
            <Link onClick={() => setDisplayAccordion(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 text-textGrey"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
            <Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6  text-textGrey"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </Link>
          </div>
          <div className="mt-[10px] font-bold text-[24px]">
            <ConditionalAccordion
              useAccordion={displayAccordion}
              title="Recent"
              defaultExpanded
            >
              {!displayAccordion && (
                <h3 className="mb-2 text-purple">Recent</h3>
              )}
              <div className="flex py-2 items-center gap-5 overflow-auto">
                <Projects />
                <div className=" min-w-[150px] w-[150px] h-[150px] p-1 rounded-2xl shadow-xl  relative flex flex-col justify-center items-center text-textGrey font-semibold group">
                  <Link
                    onClick={() =>
                      dispatch(openDrawer({ type: "createProject" }))
                    }
                    className="w-full h-full flex md:hidden absolute left-1/2 top-1/2  -translate-1/2 bg-white z-[2] opacity-80 rounded-2xl  justify-center items-center group-hover:flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-3/5 text-purple"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-3/5 text-textGrey opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
            </ConditionalAccordion>
          </div>
          <div className="mt-4 font-bold text-[24px]">
            <ConditionalAccordion
              useAccordion={displayAccordion}
              title="Favourite"
            >
              {!displayAccordion && (
                <h3 className="mb-2 text-purple">Favourite</h3>
              )}
              <div className="flex py-2 items-center gap-5 overflow-auto">
                <Projects type="favourite" />
              </div>
            </ConditionalAccordion>
          </div>
          <div className="mt-4 font-bold text-[24px]">
            <ConditionalAccordion
              useAccordion={displayAccordion}
              title="Shared"
            >
              {!displayAccordion && (
                <h3 className="mb-2 text-purple">Shared</h3>
              )}
              <div className="flex py-2 items-center gap-5">
                <div className="w-[250px] h-[200px] p-1 rounded-2xl shadow-xl  relative flex flex-col justify-center items-center text-textGrey font-semibold bg-white group">
                  <Link className="w-full h-full hidden absolute left-1/2 top-1/2  -translate-1/2 bg-white z-[2] opacity-80 rounded-2xl  justify-center items-center group-hover:flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-12 text-purple"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </Link>
                  <img
                    src={star}
                    alt="favourite"
                    className="absolute top-1 left-1 cursor-pointer "
                  />
                  <h4 className="text-[26px]">Comming Soon</h4>
                  <p className="text-[12px]">Team Task Management</p>
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src={avatar1} />
                    <Avatar alt="Travis Howard" src={avatar2} />
                    <Avatar alt="Cindy Baker" src={avatar3} />
                    <Avatar alt="Agnes Walker" src={avatar4} />
                    <Avatar alt="Trevor Henderson" src={avatar5} />
                  </AvatarGroup>
                </div>
              </div>
            </ConditionalAccordion>
          </div>
        </div>
      </div>
    </section>
  );
}
