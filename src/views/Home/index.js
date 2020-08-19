import React, { memo } from "react";
import { connect } from "../../store/provider";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { ResumeView } from "../../components";
import "./styles.css";

const Home = ({ prompt, promptToInstall }) => {
  return (
    <Container fluid className="Home" >
      <Row>
        <Col xs={12} className="Center" tag="h2">
          NATHAN H. FOSTER
          </Col>
        <Col className="TitleBreak mb-2" />
      </Row>
      <Row>
        <Col xs={12}>
          <ResumeView />
        </Col>
      </Row>
    </Container>
  );

};

Home.propTypes = {
  User: PropTypes.object
};

Home.defaultProps = {
  LinkedInUrl: "https://www.linkedin.com/in/nathanhfoster/"
};

const mapStateToProps = ({ User }) => ({ User });


export default connect(mapStateToProps)(memo(Home));
