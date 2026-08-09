import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const TrendingSkeleton = () => {
    return (
        <>
            <div>
                <Container>
                    <h2 className="custom_heading ft-700 mt-20">
                        <span className="text-b text-center"> </span>
                        <Skeleton width={200} />
                    </h2>
                    <div className="text trending-tour-textbb text-center">
                        <Skeleton width={500} height={30} />
                    </div>

                    <Row className="jckpt_box_prnt" style={{ position: "relative" }}>
                        <Col>
                            <Skeleton width={220} height={200} />
                        </Col>
                        <Col>
                            <Skeleton width={220} height={200} />
                        </Col>
                        <Col>
                            <Skeleton width={220} height={200} />
                        </Col>
                        <Col>
                            <Skeleton width={220} height={200} />
                        </Col>
                        <Col>
                            <Skeleton width={220} height={200} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default TrendingSkeleton;