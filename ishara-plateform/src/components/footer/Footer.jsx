import { Button } from "react-bootstrap";

function Footer() {
  return (
    <footer className="d-flex justify-content-between align-items-center">
      <div>
        <span>Ishara</span>
      </div>
      <div className="d-flex align-items-center">
        <div className="ms-3">
          <Button variant="light" size="sm" className="rounded-circle mx-1">
            facebook
          </Button>
          <Button variant="light" size="sm" className="rounded-circle mx-1">
            github
          </Button>
          <Button variant="light" size="sm" className="rounded-circle mx-1">
            x
          </Button>
        </div>
        <span className="text-muted">@2025.16-mars Maroc</span>
      </div>
    </footer>
  );
}

export default Footer;
