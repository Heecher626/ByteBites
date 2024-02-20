import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ProfileButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const [togglePref, setTogglePref] = useState(false)
  const [togglePref2, setTogglePref2] = useState(false)
  const { closeModal, closeable } = useModal()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    // setShowMenu(!showMenu);
    if (user) {
      setTogglePref(true)

      window.addEventListener('mousedown', handleMouseClick)
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/')
    closeMenu();
  };

  useEffect(() => {
    if(togglePref) closePref()
  }, [window.location.href])

  function closePref() {
    setTogglePref(false)
    setTogglePref2(true)
    setTimeout(() => setTogglePref2(false), 350)
    return window.removeEventListener('mousedown', handleMouseClick)
  }

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>

            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
