import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import siteLogo from "../../images/logo.png";
import hero3img from "../../images/hero3.png";
import googlelogo from "../../images/google logo.png";
import hero1img from "../../images/hero1img.png";
import hero2img from "../../images/hero 2 img.png";

import { useState, useEffect } from "react";

import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";

export const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to toggle visibility of the button based on scroll position
  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    // console.log(results);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <body>
      <div className="container">
        {/* navbar */}
        <nav className="navbar-content">
          <div className="site-logo">
            <img src={siteLogo} alt="site-logo" draggable="false" />
          </div>
          <div className="nav-links">
            <ul>
              {!isLoggedIn ? (
                <li className="sign-in-btn">
                  <Link
                    to="#"
                    onClick={signInWithGoogle}
                    className="btn-signin"
                  >
                    <img
                      src={googlelogo}
                      alt="google-logo"
                      className="google-logo"
                      draggable="false"
                    />
                    Sign in
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="#">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="#">Profile</Link>
                  </li>
                  <li>
                    <Link to="#"></Link>
                  </li>
                  <li>
                    <Link to="#" onClick={handleLogout}>
                      Signout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {/* hero-content-1 */}
        <section className="hero-content-1">
          <div className="left">
            <hr className="hr-line" />
            <h2>
              Unlock Your Financial Clarity with{" "}
              <span className="highlight-text">agf xpense xplorer</span>
            </h2>
            <p>
              Begin your expedition towards financial empowerment with our
              cutting-edge income and expense tracking solution. Illuminate your
              path to prosperity as you effortlessly monitor every dollar earned
              and spent. Let our intuitive platform be your guiding star,
              providing clarity and insight into your financial universe. Say
              goodbye to financial uncertainty and embrace a future filled with
              fiscal abundance. Start tracking your income and expenses today,
              and pave the way to a brighter financial tomorrow.
            </p>
          </div>
          <div className="right">
            <img src={hero1img} alt="hero1img" draggable="false" />
          </div>
        </section>
        {/* hero-content-2 */}
        <section className="hero-content-2">
          <div className="left">
            <img src={hero2img} alt="hero2img" draggable="false" />
          </div>
          <div className="right">
            <hr className="hr-line" />
            <h2>
              Transform Your Financial Future with Our{" "}
              <span className="highlight-text">agf xpense xplorer</span>
            </h2>
            <p>
              Transform the way you manage your money with our comprehensive
              income expense tracker. Easily note your income and expenses, then
              watch as our intuitive platform calculates your balance, income so
              far, and expense so far in real-time. Say goodbye to financial
              guesswork and hello to clarity and control. Start tracking your
              finances today and pave the way to a brighter financial future.
            </p>
          </div>
        </section>
        <section className="split-up-img">
          <img src={hero3img} alt="" draggable='false' />
        </section>
        {/* hero-content-3 */}
        <section className="hero-content-3">
          <h2>
            Turning cents into sense. Smart tracking. That's financial
            mastery...
          </h2>
          <p>
            Unlock the secrets to financial success. Start your journey towards
            financial freedom today with our intuitive platform.
          </p>
          <div className="hero3-btn">
            <button>Balance</button>
            <button>Income</button>
            <button>Expenses</button>
            {/* <button>Profit</button>
            <button>Loss</button> */}
          </div>
        </section>
        {/* hero-content-4 */}
        <section className="hero-content-4">
          <div className="content-1">
            <h2>Are you ready?</h2>
            <h4>
              KICKSTART OUR XPENSE XPLORER TO STRONG YOUR FINANCIAL CIRCUITS...
            </h4>
            <div className="signin-btn" onClick={signInWithGoogle}>
              <Link to="#" onClick={handleLogin} className="btn-signin">
                <img
                  src={googlelogo}
                  alt="google-logo"
                  className="google-logo"
                  draggable="false"
                />
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* goto-top-button */}
      <div className="goto-top">
        <button
          className={`go-to-top-button ${isVisible ? "visible" : ""}`}
          onClick={scrollToTop}
        >
{/*           <FontAwesomeIcon icon={ faArrowUp } className="goto-top-icon" /> */}
          GoTo Top
        </button>
      </div>
      {/* footer content */}
      <footer>
        <p>© 2024 agf xpense xplorer Inc. All Rights Reserved</p>
      </footer>
    </body>
  );
};
