import React, { memo } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import "./styles.css";

const ExperienceMedia = ({ media }) => {

  return (
    <Container className="ExperienceMedia Container">
      <Row>
        <Col xs={12}>ExperienceMedia</Col>
      </Row>
    </Container>
  );

};

ExperienceMedia.propTypes = {
  media: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string
};
export default memo(ExperienceMedia);
