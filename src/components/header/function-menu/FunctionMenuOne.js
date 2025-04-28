import React from "react";

import Container from "../../other/Container";
import { Row, Col } from "antd";

function FunctionMenuOne({ activeHeaderCollapse }) {
  return (
    <div className="header-function-menu-one">
      <Container>
        <div className="function-menu-wrapper">
          <Row gutter={30}>
            <Col
              xs={{ span: 24, order: 1 }}
              md={{ span: 16, order: 1 }}
              lg={18}
            >
              {/* <SearchForm /> */}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default React.memo(FunctionMenuOne);
