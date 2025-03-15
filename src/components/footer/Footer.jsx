import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {

  return (
    <footer className={`d-flex justify-content-between align-items-center p-3`}>
      <div>
        <span className="fw-bold">Ishara</span>
      </div>
      <div className="d-flex align-items-center">
        <div className="ms-3">
          <Button variant="white" size="sm" className="rounded-circle mx-1">
            <i className="bi bi-facebook"></i>
          </Button>
          <Button variant="white" size="sm" className="rounded-circle mx-1">
            <i className="bi bi-github"></i>
          </Button>
          <Button variant="white" size="sm" className="rounded-circle mx-1">
            <i className="bi bi-twitter-x"></i>
          </Button>
        </div>
        <span className="text-muted ms-3">© 2025 Ishara. All rights reserved.</span>
        <div className="ms-3 d-flex align-items-center">
          <Button variant="white" size="sm" className="rounded-circle mx-1" >
            <i className="bi bi-sun"></i>
          </Button>
          <Button variant="white" size="sm" className="rounded-circle mx-1">
            <i className="bi bi-moon"></i>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
