import { Row, Col, Card, Placeholder, ListGroup } from "react-bootstrap";

const OrdersPlaceholder = () => {
  return (
    <>
      <h2 className="mb-4">Order List</h2>
      {[...Array(2)].map((_, index) => (
        <Card key={index} className="mb-4 shadow-sm rounded">
          <Card.Header className="bg-dark text-white py-3 rounded">
            <Row>
              <Col md={6}>
                <Placeholder as="h5" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </Col>
              <Col
                md={6}
                className="text-md-right"
                style={{ textAlign: "right" }}
              >
                <Placeholder as="h5" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8}>
                <h6 className="text-muted mb-3">
                  <Placeholder as="span" animation="glow">
                    <Placeholder xs={3} />
                  </Placeholder>
                </h6>
                <ListGroup variant="flush">
                  {[...Array(2)].map((_, itemIndex) => (
                    <ListGroup.Item key={itemIndex}>
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
                          <Placeholder as="span" animation="glow">
                            <Placeholder xs={4} />
                          </Placeholder>
                        </Col>
                        <Col md={2} className="mb-2">
                          <Placeholder as="span" animation="glow">
                            <Placeholder xs={6} />
                          </Placeholder>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              <Col
                md={4}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <div className="text-center mb-3">
                  <Placeholder as="h4" animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                </div>
                <div className="text-center">
                  <Placeholder as="h6" animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default OrdersPlaceholder;
