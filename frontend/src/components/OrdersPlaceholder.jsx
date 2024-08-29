import { Card, Row, Col, Placeholder, ListGroup } from "react-bootstrap";

const OrdersPlaceholderSingle = () => {
  return (
    <div>
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-dark text-white py-3">
          <Placeholder as={Row} animation="glow">
            <Placeholder xs={6} />
            <Placeholder xs={6} className="text-right" />
          </Placeholder>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={4}>
              <Placeholder as="h6" animation="glow" className="text-muted">
                Customer Information
              </Placeholder>
              <Placeholder as="p" animation="glow" className="mb-2">
                <Placeholder xs={7} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={5} />
              </Placeholder>
            </Col>
            <Col md={4}>
              <Placeholder as="h6" animation="glow" className="text-muted">
                Shipping Address
              </Placeholder>
              <Placeholder as="p" animation="glow" className="mb-2">
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="mb-2">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
            </Col>
            <Col md={4}>
              <Placeholder as="h6" animation="glow" className="text-muted">
                Payment Details
              </Placeholder>
              <Placeholder as="p" animation="glow" className="mb-2">
                <Placeholder xs={7} />
              </Placeholder>
              <Placeholder as="p" animation="glow" className="mb-2">
                <Placeholder xs={5} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
            </Col>
          </Row>
          <Placeholder as="h6" animation="glow" className="text-muted mb-3">
            Order Items
          </Placeholder>
          <ListGroup variant="flush">
            {[...Array(1)].map((_, index) => (
              <ListGroup.Item key={index}>
                <Row className="align-items-center mb-2">
                  <Col md={2} className="mb-2">
                    <div
                      style={{
                        width: "100%",
                        height: "120px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                  <Col md={5} className="mb-2">
                    <Placeholder as="h6" animation="glow">
                      <Placeholder xs={8} />
                    </Placeholder>
                  </Col>
                  <Col md={1} className="mb-2">
                    <Placeholder as="strong" animation="glow">
                      <Placeholder xs={4} />
                    </Placeholder>
                  </Col>
                  <Col md={2} className="mb-2">
                    <Placeholder as="strong" animation="glow">
                      <Placeholder xs={4} />
                    </Placeholder>
                  </Col>
                  <Col md={2} className="mb-2">
                    <Placeholder as="strong" animation="glow">
                      <Placeholder xs={4} />
                    </Placeholder>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

const OrdersPlaceholder = () => {
  return (
    <>
      {[...Array(1).keys()].map((_, index) => (
        <OrdersPlaceholderSingle key={index} />
      ))}
    </>
  );
};

export default OrdersPlaceholder;
