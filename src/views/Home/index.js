import React, { memo } from "react";
import { connect } from "../../store/provider";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { ResumeView } from "../../components";
import "./styles.css";

const Home = ({ prompt, promptToInstall }) => {
  return (
    <Container className="Home mt-2" >
      <Row>
        <Col xs={12} className="ResumeContainer">
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
