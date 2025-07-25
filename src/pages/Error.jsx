import MainNavigation from "../components/MainNavigation";

export default function Error() {
  return (
    <>
      <MainNavigation />
      <main className="container mx-auto flex justify-center items-center h-screen -mt-[120px]">
        <div className="p-5 rounded-2xl text-center  shadow-lg text-white">
          <h1 className="font-extrabold text-9xl">404!</h1>
          <p className="font-semibold text-3xl mt-2">
            Could not find this page.
          </p>
        </div>
      </main>
    </>
  );
}
