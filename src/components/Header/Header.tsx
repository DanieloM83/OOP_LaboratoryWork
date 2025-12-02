import React, { useEffect } from "react";
import styles from "./Header.module.css";
import Logo from "@/assets/images/logo.svg";
import Profile from "@/assets/images/profile.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { logout, selectUser } from "@/store/user/slice.ts";
import { userService } from "@/services";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(user?.isAuth);
  const username = user?.username ?? "Login";
  const onProfilePage = location.pathname === "/profile";

  useEffect(() => {
    // Optional: could hydrate from service/localStorage on mount later
  }, []);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    await userService.logout();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link className={styles.brand} to="/" aria-label="CapyCode Home">
            <img src={Logo} alt="" className={styles.logo} />
            <span>CapyCode</span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <Link to="/courses" className={styles.navLink}>
              Courses
            </Link>
            <Link to="/problemset" className={styles.navLink}>
              Problemset
            </Link>
          </nav>
        </div>

        {isLoggedIn && onProfilePage ? (
          <button type="button" className={styles.profile} onClick={handleLogout} aria-label="Logout">
            <img src={Profile} alt="" className={styles.profileImage} />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            className={styles.profile}
          >
            <img src={Profile} alt="" className={styles.profileImage} />
            <span>{username}</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
