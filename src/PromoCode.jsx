import React, { useState } from "react";
import { Button, Form, InputGroup, Row, Col, Card } from "react-bootstrap";

const PromoCode = () => {
  const [promoCodes] = useState(["SAVE10", "WELCOME50", "FLYHIGH"]);
  const [appliedCode, setAppliedCode] = useState("");

  const applyCode = (code) => {
    setAppliedCode(code);
  };

  const removeCode = () => {
    setAppliedCode("");
  };

  return (
    <Card className="p-3 my-4">
      <h5>Apply Promo Code</h5>

      {/* Promo Input */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter promo code"
          value={appliedCode}
          readOnly
        />
        {appliedCode ? (
          <Button variant="danger" onClick={removeCode}>
            Remove
          </Button>
        ) : null}
      </InputGroup>

      {/* Available Promo Codes */}
      <Row>
        {promoCodes.map((code) => (
          <Col key={code} xs={12} sm={6} md={4} className="mb-2">
            <div className="d-flex justify-content-between align-items-center border p-2 rounded">
              <span>{code}</span>
              <Button
                variant="success"
                size="sm"
                disabled={appliedCode === code}
                onClick={() => applyCode(code)}
              >
                {appliedCode === code ? "Applied" : "Apply"}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PromoCode;
