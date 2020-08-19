import React, { memo } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { connect } from "../../store/provider";
import Education from "./Education";
import TechnicalSkill from "./TechnicalSkill";
import Experience from "./Experience";
import "./styles.css";

const ResumeView = ({ ExperienceList, EducationList, TechnicalSkillList }) => {

  const renderEducation = EducationList.map((e, i) => <Education key={i} {...e} />);

  const renderTechnicalSkill = TechnicalSkillList.map((e, i) => <TechnicalSkill key={i} {...e} />);

  const renderExperience = ExperienceList.map((e, i) => <Experience key={i} {...e} />);

  return (
    <Container fluid className="ResumeView">
      <Row>
        <Col xs={12}>
          <span className="ExperienceTitle">EDUCATION</span>
        </Col>
      </Row>
      {renderEducation}
      <Row>
        <Col xs={12}>
          <span className="ExperienceTitle">TECHNICAL SKILLS</span>
        </Col>
      </Row>
      {renderTechnicalSkill}
      <Row>
        <Col xs={12}>
          <span className="ExperienceTitle">EXPERIENCE</span>
        </Col>
      </Row>
      {renderExperience}
    </Container>
  );

};

ResumeView.propTypes = {
  ExperienceList: PropTypes.array.isRequired,
  EducationList: PropTypes.array.isRequired,
  TechnicalSkillList: PropTypes.array.isRequired
};

const mapStateToProps = ({ Resume: { Experience, Education, TechnicalSkill } }) => ({
  ExperienceList: Experience,
  EducationList: Education,
  TechnicalSkillList: TechnicalSkill
});

export default connect(mapStateToProps)(memo(ResumeView));
