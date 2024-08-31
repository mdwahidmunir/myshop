import { Card, Col, ListGroup, Row, Placeholder } from "react-bootstrap";

const OrderDetailsPlaceholder = () => {
  return (
    <div>
      <Placeholder as="h1" animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Placeholder as="h2" animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
              <p>
                <strong>Name: </strong> <Placeholder xs={3} />
              </p>
              <p>
                <strong>Email: </strong> <Placeholder xs={4} />
              </p>
              <p>
                <strong>Shipping: </strong> <Placeholder xs={6} />
              </p>
              <p>
                <strong>Status: </strong> <Placeholder xs={6} />
              </p>
              <Placeholder as="h2" animation="glow">
                <Placeholder xs={5} />
              </Placeholder>
            </ListGroup.Item>

            <ListGroup.Item>
              <Placeholder as="h2" animation="glow">
                <Placeholder xs={5} />
              </Placeholder>
              <p>
                <strong>Method: </strong> <Placeholder xs={4} />
              </p>
              <Placeholder as="h2" animation="glow">
                <Placeholder xs={5} />
              </Placeholder>
            </ListGroup.Item>

            <ListGroup.Item>
              <Placeholder as="h2" animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Placeholder as="h2" animation="glow">
                  <Placeholder xs={5} />
                </Placeholder>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={5} />
                    </Placeholder>
                  </Col>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={3} />
                    </Placeholder>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={5} />
                    </Placeholder>
                  </Col>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={3} />
                    </Placeholder>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={5} />
                    </Placeholder>
                  </Col>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={3} />
                    </Placeholder>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={5} />
                    </Placeholder>
                  </Col>
                  <Col>
                    <Placeholder as="p" animation="glow">
                      <Placeholder xs={3} />
                    </Placeholder>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailsPlaceholder;
