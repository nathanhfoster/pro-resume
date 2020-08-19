import React, { memo } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const ExperienceBulletPoint = ({ title }) => {

  return <li className="ExperienceBulletPoint">{title}</li>;

};

ExperienceBulletPoint.propTypes = {
  bullet_points: PropTypes.array.isRequired,
  title: PropTypes.string
};
export default memo(ExperienceBulletPoint);
