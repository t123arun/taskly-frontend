import bannerImage from "../assets/images/banner-image.png";
import rightBanner from "../assets/images/bannerRight.svg";
import "slick-carousel/slick/slick-theme.css";
import polygonUnderline from "../assets/images/polygonUnderline.svg";
import girlSitting from "../assets/images/girlSitting.png";
import colorLine from "../assets/images/colorLine.svg";
import girlTeaching from "../assets/images/girlTeaching.png";
import girlWorking from "../assets/images/girlWorkingonTable.png";
import boardFeatures from "../assets/images/boardFeaturesSvg.svg";
import polygonWhiteLine from "../assets/images/polygonUnderlineWhite.svg";
import cardFeatures from "../assets/images/cardFeatures.svg";
import suggestionIcon from "../assets/images/chatIcon.png";
import { Link } from "react-router-dom";
import logo from "../assets/images/tasklyLogoBg.svg";
import CopyrightIcon from "@mui/icons-material/Copyright";
import youtubeIcon from "../assets/images/youtubeIcon.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useSelector } from "react-redux";
import person1 from "../assets/images/person1.svg";
import person2 from "../assets/images/avatar2.png";
import person3 from "../assets/images/avatar3.png";
import person4 from "../assets/images/avatar4.svg";

export default function Home() {
  const admin = useSelector((state) => state.auth.user);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: "linear",
  };

  const testimonialDetails = [
    {
      imgUrl: { person1 },
      comment: "Very simple to use, keeps me on track with all need to do.",
      author: "kerry_parker",
    },
    {
      imgUrl: { person2 },
      comment: "Loving the new drag-and-drop – super smooth experience!",
      author: "emma_designs",
    },
    {
      imgUrl: { person3 },
      comment: "Please add color tags to cards for better visual sorting.",
      author: "peter_tasks",
    },
    {
      imgUrl: { person4 },
      comment: "Export board to CSV or JSON option is missing.",
      author: "nina_js",
    },
  ];

  return (
    <>
      <main>
        <section className="container mx-auto flex justify-between items-center gap-[50px] py-8 md:py-14 flex-wrap px-5">
          <div className="w-full md:w-1/2">
            <img
              src={bannerImage}
              alt="bannerImage"
              className="object-contain w-full h-auto"
            />
          </div>
          <div className="relative w-full md:w-2/5 bg-gradient-to-r from-[#bee3f6] to-[#edbde2]  flex justify-center items-center text-blue text-xl md:text-2xl font-regular rounded-[16px] text-center p-[15px] min-h-[200px] md:min-h-[300px] shadow-xl shadow-[#ff50c5] ">
            <img
              src={rightBanner}
              alt="right banner image"
              className="absolute -top-14  lg:-top-24 left-0 w-full"
            />
            <h1>
              Taskly helps teams move
              <span className="p-1 block mt-[15px] md:mt-[30px] text-white font-extrabold  text-xl lg:text-5xl bg-linear-to-r from-[#FF50C5] to-[#9C1ED0]">
                WORK FORWARD.
              </span>
            </h1>
          </div>
        </section>
        <section className="px-5 md:px-12 py-8 md:py-14 bg-[rgba(255,255,255,.20)]">
          <h2 className="container relative font-bold text-xl md:text-2xl text-[#6561A3] md:mb-14 text-center w-max mx-auto">
            Taskly the best app for your team{" "}
            <img
              src={polygonUnderline}
              alt="polygon underline"
              className="absolute w-full top-4/5 -left-1/2 translate-1/2"
            />
          </h2>
          <div className="container flex gap-5 md:gap-12 flex-wrap pt-14 justify-center mx-auto">
            <div className="w-full md:flex-1/3  md:max-w-[350px]  rounded-2xl shadow-2xl bg-[rgba(255,255,255,.25)] p-5 ">
              <img
                src={girlSitting}
                alt="girl sitting with laptop"
                className="object-contain mb-2 h-[150px] md:h-[250px] mx-auto"
              />
              <h4 className="relative font-semibold text-sm md:text-[26px] text-purple w-max mx-auto ">
                What is Taskly?{" "}
                <img
                  src={colorLine}
                  alt="color line"
                  className="absolute w-full -left-1/2 top-full translate-1/2"
                />
              </h4>
            </div>
            <div className="w-full md:flex-1/3  md:max-w-[350px]  rounded-2xl shadow-2xl bg-[rgba(255,255,255,.25)] p-5 ">
              <img
                src={girlTeaching}
                alt="girl teaching on board"
                className="object-contain mb-2 h-[150px] md:h-[250px] mx-auto"
              />
              <h4 className="relative font-semibold text-sm md:text-[26px] text-purple w-max mx-auto ">
                Work on Board{" "}
                <img
                  src={colorLine}
                  alt="color line"
                  className="absolute w-full -left-1/2 top-full translate-1/2"
                />
              </h4>
            </div>
            <div className="w-full md:flex-1/3  md:max-w-[350px]  rounded-2xl shadow-2xl bg-[rgba(255,255,255,.25)] p-5 ">
              <img
                src={girlWorking}
                alt="girl sitting with laptop"
                className="object-contain mb-2 h-[150px] md:h-[250px] mx-auto"
              />
              <h4 className="relative font-semibold text-sm md:text-[26px] text-purple w-max mx-auto ">
                Organize Card{" "}
                <img
                  src={colorLine}
                  alt="color line"
                  className="absolute w-full -left-1/2 top-full translate-1/2"
                />
              </h4>
            </div>
          </div>
        </section>
        <section className=" py-8 md:py-14  px-5 md:px-12 bg-purple">
          <div className="mx-auto flex  gap-[50px] flex-wrap container">
            <div className=" flex-2/5">
              <h4 className="font-bold text-xl md:text-2xl text-white relative w-max">
                The board is just the beginning{" "}
                <img
                  src={polygonWhiteLine}
                  alt="white underline"
                  className="absolute w-full -left-1/2 top-full translate-1/2"
                />
              </h4>
              <div className="p-8 bg-[rgba(255,255,255,0.25)] mt-9 md:mt-20 rounded-2xl">
                <p className="font-regular text-lg md:text-[24px] text-white mb-8">
                  List and cards are the building blocks of organizing work on
                  Taskly Board.
                </p>
                <p className="font-regular text-lg md:text-[24px] text-white">
                  {" "}
                  Grow from there with task assignments, timelines ,
                  productivity metrics, calendars and more.
                </p>
              </div>
            </div>
            <div className="flex-2/5 bg-white rounded-2xl p-4">
              <img
                src={boardFeatures}
                alt="board features"
                className="object-contain mx-auto"
              />
            </div>
          </div>
        </section>
        <section className=" py-8 md:py-14  px-5 md:px-12 bg-[rgba(255,255,255,.20)]">
          <div className="mx-auto flex  gap-[50px] flex-wrap container">
            <div className="flex-2/5 bg-[rgba(255,255,255,0.60)] rounded-2xl p-4 order-2 ">
              <img
                src={cardFeatures}
                alt="board features"
                className="object-contain mx-auto"
              />
            </div>
            <div className=" flex-2/5 md:order-2">
              <h4 className="font-bold text-xl md:text-2xl text-purple relative w-max">
                Card contains everything you need{" "}
                <img
                  src={polygonWhiteLine}
                  alt="white underline"
                  className="absolute w-full -left-1/2 top-full translate-1/2"
                />
              </h4>
              <div className="p-8 bg-[rgba(255,255,255,0.25)] mt-9 md:mt-20 rounded-2xl">
                <p className="font-regular text-lg md:text-[24px] text-white mb-8">
                  Taskly cards are your portal to more organized work where
                  every single part of your task can be managed.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8 md:py-14 px-5 md:px-12  mx-auto">
          <Slider {...settings} className=" md:w-4/5 mx-auto">
            {testimonialDetails.map((item) => (
              <div className="flex items-center gap-5  text-center p-5 bg-[rgba(255,255,255,0.50)] justify-between max-auto rounded-2xl md:rounded-4xl">
                <div className="flex gap-5 flex-wrap">
                  <div className="bg-white rounded-full w-[260px] h-[260px] mx-auto flex justify-center items-center">
                    <img
                      src={item.imgUrl}
                      alt="user"
                      className="rounded-full w-[205px] h-[205px] object-contain border-white bg-[#F1B1E7]"
                    />
                  </div>
                  <p className="flex-1/3 font-regular text-lg md:text-[24px] text-purple bg-white p-3 rounded-2xl lg:rounded-full  align-middle flex flex-col justify-center items-center  ">
                    {item.comment}
                    <span className="block mt-2 font-bold italic">
                      {`@` + item.author}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        {!admin && (
          <div className="sticky left-full bottom-0 w-max h-[150px] z-5">
            <Link to="/login">
              <img
                src={suggestionIcon}
                alt="signup suggestion"
                className="w-[150px]"
              />
            </Link>
          </div>
        )}
      </main>
      <footer className="bg-purple  pt-12 pb-4 px-12">
        <div className="flex container mx-auto gap-5 flex-wrap justify-center pb-5">
          <div className="flex-1/5">
            <img src={logo} alt="taskly logo" />
          </div>
          <div className="flex justify-end bg-[rgba(255,255,255,0.25)] rounded-2xl p-4">
            <Link className="font-semibold text-[24px] text-white flex justify-center items-center gap-2">
              <img src={youtubeIcon} alt="youtube link" className="w-14" />
              tasklyYoutube
            </Link>
          </div>
        </div>
        <p className="text-white font-regular text-[20px] text-center">
          <CopyrightIcon /> 2025
        </p>
      </footer>
    </>
  );
}
