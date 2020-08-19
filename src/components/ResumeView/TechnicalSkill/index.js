import React, { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import "./styles.css";

const TechnicalSkill = ({ title, skills }) => {

  const renderSkills =
    skills.map((e, i) => (
      <span key={i} className="Skill">
        {e}
      </span>
    ));


  return (
    <Row className="TechnicalSkill" >
      <Col md={{ span: 12, offset: 1 }} xs={12}>
        <ul>
          <li>
            <b>{`${title}: `}</b>
            {renderSkills}
          </li>
        </ul>
      </Col>
    </Row>
  );
};

TechnicalSkill.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired
};

export default memo(TechnicalSkill);
