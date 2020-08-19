import React from "react"
import PropTypes from "prop-types"
import { connect } from "../../store/provider"
import "./styles.css"

const mapStateToProps = ({}) => ({})

const PageNotFound = ({}) => <h1>PAGE NOT FOUND</h1>

PageNotFound.propTypes = {
  title: PropTypes.string,
  history: PropTypes.object,
}

PageNotFound.defaultProps = {}

export default connect(mapStateToProps)(PageNotFound)
