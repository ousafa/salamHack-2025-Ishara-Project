import { Button, Card, Form } from "react-bootstrap";
function ChatInput () {
    return (
      <div className="">
        <Card className="border rounded p-2">
          <Form className="d-flex justify-content-between align-items-center">
            <Form.Control
              type="text"
              placeholder="Describe your symptoms in details ...."
              className="border-0"
            />
            <div className="d-flex">
              <Button variant="light" className="mx-1">
                Upload image
              </Button>
              <Button variant="info">
                Send
              </Button>
            </div>
          </Form>
        </Card>
        <div>
        <small className="text-muted">
          This plateform helps interpret symptoms but is not a substitute for professional medical advice.
        </small>
      </div>
      </div>
    );
  };

  export default ChatInput;