import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import star from "../assets/images/Star.svg";
import favStar from "../assets/images/favStar.svg";
import Lists from "../components/Lists";
import {
  Avatar,
  AvatarGroup,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { openDrawer } from "../store/slices/drawerSlice";
import { fetchBoards, fetchBoardTheme } from "../store/slices/boardSlice";
import clsx from "clsx";
import { useEffect } from "react";
import avatar1 from "../assets/images/avatar.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.png";
import avatar4 from "../assets/images/avatar4.svg";
import avatar5 from "../assets/images/girlSitting.png";

export default function Board() {
  const { id } = useParams();
  const { items } = useSelector((state) => state.boards);
  const board = items.find((b) => b._id === id);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.boards.theme);

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchBoardTheme());
  }, [dispatch, id]);

  return (
    <section
      className={clsx(
        "h-screen w-full px-2 md:px-5 pb-5  pt-[80px] -mt-[60px]",
        currentTheme === "defaultTheme"
          ? "bg-gradient-to-r from-[#f9f9f9] via-[#fcb9f3] to-[#845AB1]"
          : currentTheme
      )}
    >
      <div className="bg-[rgba(255,255,255,0.75)] z-1 rounded-4xl h-full shadow-2xl overflow-hidden">
        <div className="flex justify-between py-2 px-5 md:px-10">
          <div className="flex items-center gap-4 ">
            <img
              src={board?.favourite ? favStar : star || star}
              alt="favourite icon"
            />
            <h2 className="font-bold text-[20px] md:text-[28px] text-purple">
              {board?.name || "Not Found!!"}
            </h2>
            <p className="text-[20px] font-regular text-textGrey max-w-[500px]">
              {board?.description}
            </p>
            <IconButton
              aria-label="Example"
              onClick={() =>
                dispatch(
                  openDrawer({ type: "editBoard", props: { project: board } })
                )
              }
            >
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </div>
          <div className="relative hidden md:block">
            <AvatarGroup max={4} className="opacity-80">
              <Avatar alt="Remy Sharp" src={avatar1} />
              <Avatar alt="Travis Howard" src={avatar2} />
              <Avatar alt="Cindy Baker" src={avatar3} />
              <Avatar alt="Agnes Walker" src={avatar4} />
              <Avatar alt="Trevor Henderson" src={avatar5} />
            </AvatarGroup>
            <p className="absolute top-2 -left-35 w-full h-full font-regular text-lg opacity-50">
              Comming Soon...
            </p>
          </div>
        </div>
        {board ? (
          <Lists boardId={board?._id} />
        ) : (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </section>
  );
}
