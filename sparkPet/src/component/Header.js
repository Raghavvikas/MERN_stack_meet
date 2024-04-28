import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { menu } from "../json/menu";
import Button from "./form/button";

export default function Header() {
  const navigate = useNavigate();
  const [fixed, setFixed] = useState(false);
  const [sideMenu, setsideMenu] = useState(false);
  const [active, setActive] = useState(false);
  const name = localStorage.getItem("parent_name");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setFixed(window.pageYOffset > 50)
      );
    }
  }, []);
  const logoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div
      className={`header${sideMenu ? " sideMenu" : ""}${fixed ? " fixed" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <nav>
              <ul className="d-flex flex-wrap p-0 m-0">
                {menu?.map((menulist) => (
                  <li className="d-flex menu-item">
                    <NavLink to={menulist.route}>{menulist.name}</NavLink>
                    {menulist.sebMenu?.length ? (
                      <ul>
                        {menulist.sebMenu?.map((subMenu) => (
                          <li>
                            <Link to={subMenu.route}>{subMenu.name}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-sm-4"></div>
          <div className="col-sm-4 d-flex align-items-center justify-content-end">
            <div className="header-number">
              <a href="tel:+1-800-356-8933">+1-800-356-8933</a>
            </div>
            {!localStorage.getItem("token")?.length ? (
              <>
                <Button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="pet-button pet-button-theme mr-1"
                >
                  Login
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="pet-button pet-button-theme"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <span
                  className={active ? "nav-is-visible" : "inActive"}
                  onClick={handleClick}
                >
                  <ul>
                    <li>
                      <a href="/get-profile"> {name}</a>
                    </li>
                    <li>
                      <a href="/pet-profile">Pet</a>
                    </li>
                    <li>
                      <a href="/feed">Feed</a>
                    </li>
                    <li>
                      <a onClick={logoutClick}>Logout</a>
                    </li>
                  </ul>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
