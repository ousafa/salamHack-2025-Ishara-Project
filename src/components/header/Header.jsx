import "./Header.css";

function Header({ newChatButton }) {
  return (
    <div className="d-flex align-items-center justify-content-center position-relative w-100 p-3">
      <h2 className="logo position-absolute start-50 translate-middle-x m-0">
        Ishara
      </h2>
      <div className="ms-auto"> {newChatButton}</div>
    </div>
  );
}
export default Header;
