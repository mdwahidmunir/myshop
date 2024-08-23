import { Row, Col, Card, ListGroup } from "react-bootstrap";
import Placeholder from "react-bootstrap/Placeholder";

function ProductDetailPlaceholder() {
  return (
    <>
      <div>
        <Row>
          <Col md={6}>
            {/* Placeholder for the image */}
            <div
              className="placeholder-image"
              style={{ height: "300px", backgroundColor: "#e0e0e0" }}
            ></div>
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* Placeholder for the product name */}
                <Placeholder as="h3" animation="glow">
                  <Placeholder xs={7} />
                </Placeholder>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Placeholder for the rating */}
                <Placeholder animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Placeholder for the price */}
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Placeholder for the description */}
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={8} />
                  <Placeholder xs={6} />
                  <Placeholder xs={4} />
                </Placeholder>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Placeholder animation="glow">
                        <Placeholder xs={5} />
                      </Placeholder>
                    </Col>
                    <Col>
                      <Placeholder animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Placeholder animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                    </Col>
                    <Col>
                      <Placeholder animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* Placeholder for quantity and add to cart button */}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Placeholder as="span" animation="glow">
                        <Placeholder xs={3} />
                      </Placeholder>
                    </Col>
                    <Col xs="auto">
                      <Placeholder.Button variant="secondary" xs={12} />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Placeholder.Button
                    className="btn-block w-100"
                    variant="primary"
                    disabled
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductDetailPlaceholder;
