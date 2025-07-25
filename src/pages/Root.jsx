import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import GlobalDrawer from "../components/GlobalDrawer";
import Toast from "../components/Toast";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Toast />
      <GlobalDrawer />
    </>
  );
}
