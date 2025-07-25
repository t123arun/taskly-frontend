import { jwtDecode } from "jwt-decode";

export const protectedLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { location: "/login" },
    });
  }
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      throw new Response("Unauthorized", {
        status: 302,
        headers: { location: "/login" },
      });
    }
  } catch (err) {
    throw new Response(
      "",
      { status: 302, headers: { Location: "/login" } },
      err
    );
  }

  return null;
};
