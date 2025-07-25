import { useDispatch, useSelector } from "react-redux";
import star from "../assets/images/Star.svg";
import favStar from "../assets/images/favStar.svg";
import { useEffect } from "react";
import { fetchBoards } from "../store/slices/boardSlice";
import { Link } from "react-router-dom";

export default function Projects({ type }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.boards.items);
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  const userProjects = items.filter((project) =>
    project.admin.includes(user.id)
  );
  const favouriteProjects = userProjects.filter(
    (project) => project.favourite === true
  );

  return (
    <>
      {type === "favourite"
        ? favouriteProjects.map((project) => (
            <div
              key={project._id}
              className="min-w-[200px] w-[200px] h-[150px] p-1 rounded-2xl shadow-xl  relative flex flex-col justify-center items-center text-textGrey font-semibold bg-white group"
            >
              <Link
                to={`/board/${project._id}`}
                key={project.id}
                className="w-full h-full flex md:hidden absolute left-1/2 top-1/2  -translate-1/2 bg-white z-[2] opacity-0 md:opacity-80 rounded-2xl  justify-center items-center group-hover:flex"
              >
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
                src={project.favourite ? favStar : star}
                alt="favourite"
                className="absolute top-1 left-1 cursor-pointer "
              />
              <h4 className="text-[26px] font-bold">{project.name}</h4>
              <p className="text-[12px] font-regular">{project.description}</p>
            </div>
          ))
        : userProjects.map((project) => (
            <div
              key={project._id}
              className="min-w-[200px]  w-[200px] h-[150px] p-1 rounded-2xl shadow-xl  relative flex flex-col justify-center items-center text-textGrey font-semibold bg-white group"
            >
              <Link
                to={`/board/${project._id}`}
                key={project.id}
                className="w-full h-full flex md:hidden absolute left-1/2 top-1/2  -translate-1/2 bg-white z-[2] opacity-0 md:opacity-80 rounded-2xl  justify-center items-center group-hover:flex"
              >
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
                src={project.favourite ? favStar : star}
                alt="favourite"
                className="absolute top-1 left-1 cursor-pointer "
              />
              <h4 className="text-[26px]">{project.name}</h4>
              <p className="text-[12px]">{project.description}</p>
            </div>
          ))}
    </>
  );
}
