import "./Header.css";

function Header({ newChatButton }) {
  return (
    <div className="d-flex align-items-center justify-content-center position-relative w-100 p-3">
      <img
        src="/isharaLogo.png"
        alt="logo"
        className="logo position-absolute start-50 translate-middle-x "
        style={{ width: "110px" }}
      />
      <div className="ms-auto"> {newChatButton}</div>
    </div>
  );
}

export default Header;
