import { Card, Placeholder } from "react-bootstrap";

function ProductPlaceholder() {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Card.Img variant="top" src="/images/loading3.jpg" />
        {/* <div style={{ width: "260px", height: "200px", margin: "auto" }}>
          <Placeholder
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#C3C3C3",
            }}
          />
        </div> */}
        <Placeholder as={Card.Img} animation="wave" className="card-img-top" />

        <Card.Body>
          <Card.Title as="div">
            <Placeholder animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Title>

          <Card.Text as="div">
            <div className="my-3">
              <Placeholder animation="wave">
                <Placeholder xs={4} /> <Placeholder xs={4} />
              </Placeholder>
            </div>
          </Card.Text>

          <Card.Text as="h3">
            <Placeholder animation="wave">
              <Placeholder xs={4} />
            </Placeholder>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductPlaceholder;
