import React from 'react'
import { Row,Col,Card } from 'react-bootstrap'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FlightPayDetail = () => {
  return (
    <Row style={{ marginTop: "20px",border:'none' }}>
      <Col md={12} className="resp-mt-20">
        <Card className=" " style={{ marginBottom: "5px" }}>
          <Card.Body style={{ padding: "0px" }}>
            <h2
              className="boxheading walletMainDiv"
              style={{
                background: "#f4f4f4",
                color: "black",
                paddingInline: "15px",
                marginTop:'5px  '
              }}
            > 
              <Skeleton />
            </h2>
            <div className="dashinnerboxs">
              <div
                // className="ewalletMainDiv"
                // style={{ borderBottom: "1px solid #e4e4e4" }}
              >
                <Skeleton />
              </div>
              <div
                
                // style={{ borderBottom: "1px solid #e4e4e4" }}
              >
                <Skeleton />
              </div>
              <div
              
                // style={{ borderBottom: "1px solid #e4e4e4" }}
              >
                <Skeleton />
              </div>
              <div
               
                // style={{ borderBottom: "1px solid #e4e4e4" }}
              >
                <p>
                  <Skeleton />{" "}
                </p>
              </div>
              <div
              // style={{ width: "100%" }}
              >
                {" "}
                <Skeleton />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FlightPayDetail