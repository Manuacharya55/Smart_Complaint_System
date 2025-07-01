import React from "react";
import { MdList } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";

const AuthorityLayout = () => {
    const links = [
        {
          link: "/get-complaint",
          icon: <MdList />,
        },
        {
          link: "/all-reviews",
          icon: <GoCodeReview />

        },
      ];
  return (
    <div id="container">
      <NavBar links={links} />
      <Outlet />
    </div>
  );
};

export default AuthorityLayout;
