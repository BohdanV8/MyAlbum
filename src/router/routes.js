import Album from "../pages/Album";
import Authentication from "../pages/Authentication";
import Registration from "../pages/Registration";

export const routesOfApp = [
  {
    path: "/registration",
    element: Registration,
  },
  {
    path: "/",
    element: Authentication,
  },
  {
    path: "/myAlbum",
    element: Album,
  },
];
