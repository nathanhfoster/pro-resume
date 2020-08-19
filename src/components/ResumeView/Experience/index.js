import React, { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import ExperienceBulletPoint from "./ExperienceBulletPoint";
import ExperienceMedia from "./ExperienceMedia";
import "./styles.css";

const Experience = ({ title, company, location, start_date, end_date, description, bullet_points, media }) => {

  const renderExperienceBulletPoint =
    bullet_points.map((e, i) => <ExperienceBulletPoint key={i} {...e} />);

  const renderExperienceMedia = media.map((e, i) => <ExperienceMedia key={i} {...e} />);

  const start_end_date = `${start_date} - ${end_date} `;
  return (
    <Row className="Experience">
      <Col xs={8}>
        <span>{start_end_date}</span>
        <span>{company.toUpperCase()}</span>
      </Col>
      <Col xs={4}>
        <span className="float-right">{location}</span>
      </Col>
      <Col md={{ span: 12, offset: 1 }} xs={12}>
        {title}
      </Col>
      <Col md={{ span: 12, offset: 1 }} xs={12}>
        {description}
      </Col>
      <Col md={{ span: 12, offset: 1 }} xs={12}>
        <ul>{renderExperienceBulletPoint}</ul>
      </Col>
    </Row>
  );

};

Experience.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bullet_points: PropTypes.array.isRequired,
  media: PropTypes.array.isRequired
};

export default (memo(Experience));
