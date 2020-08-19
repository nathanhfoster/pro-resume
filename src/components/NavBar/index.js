import React, { useState } from "react"
import { connect } from "../../store/provider"
import { RouteMap } from "../../store/reducers/router/actions"
import PropTypes from "prop-types"

import { useSwipeable } from "react-swipeable"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavItem,
} from "reactstrap"
import { AddToHomeScreen } from "../"
import { UserLogout } from "../../store/reducers/User/actions"
import Hamburger from "./Hamburger"
import NavItemLink from "./NavItemLink"
import Support from "../../views/Support"
import "./styles.css"

const {
  ABOUT,
  HOME,
  SETTINGS_ENTRIES,
  SETTINGS_PREFERENCES,
  SETTINGS_PROFILE,
  SETTINGS_PUSH_NOTIFICATIONS,
  SETTINGS_STORAGE,
  SUPPORT,
  PRIVACY_POLICY,
} = RouteMap

const mapStateToProps = ({ User: { id }, Window: { isMobile } }) => ({
  UserId: id,
  isMobile,
})

const mapDispatchToProps = {
  UserLogout,
}

const NavBar = ({ UserId, isMobile, UserLogout, prompt, promptToInstall }) => {
  const [collapsed, setCollapse] = useState(true)

  const navLinks = [
    {
      route: HOME,
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-home NavBarImage" />
          HOME
        </span>
      ),
    },

    {
      icon: (
        <span className="NavBarLink">
          <i className="fas fa-ellipsis-v NavBarImage" />
        </span>
      ),
      links: [
        {
          dropdownItem: true,
          route: SUPPORT,
          title: "SUPPORT",
          icon: <i className="fas fa-satellite NavBarImage" />,
        },
        {
          dropdownItem: true,
          route: PRIVACY_POLICY,
          title: "PRIVACY POLICY",
          icon: <i className="fas fa-user-secret NavBarImage" />,
        },
        {
          dropdownItem: true,
          route: ABOUT,
          title: "ABOUT",
          icon: <i className="fas fa-info-circle NavBarImage" />,
        },
        {
          render: (
            <NavItem key="AddToHomeScreen" className="Center px-2 m-0">
              <AddToHomeScreen
                width="100%"
                prompt={prompt}
                promptToInstall={promptToInstall}
              />
            </NavItem>
          ),
        },
      ],
    },
  ]

  const toggleHamburgerMenu = () => setCollapse(!collapsed)

  const closeHamburgerMenu = () => setCollapse(true)

  const renderDropDownMenu = (key, icon, links) => (
    <UncontrolledDropdown key={key} nav inNavbar tag="div">
      <DropdownToggle nav caret>
        {icon}
      </DropdownToggle>
      <DropdownMenu right>{renderNavLinks(links)}</DropdownMenu>
    </UncontrolledDropdown>
  )

  const renderNavLinks = (navLinks) =>
    navLinks.map((link, i) =>
      link.links ? (
        renderDropDownMenu(`Dropdown-${i}`, link.icon, link.links)
      ) : (
        <NavItemLink key={i} {...link} onClickCallback={closeHamburgerMenu} />
      )
    )

  const handlers = useSwipeable({
    onSwipedUp: () => setCollapse(true),
    onSwipedDown: () => setCollapse(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <div {...handlers}>
      <Navbar className="NavBar" fixed="top" expand="md">
        {isMobile && (
          <NavbarToggler
            tag={Hamburger}
            onClick={toggleHamburgerMenu}
            collapsed={collapsed}
          />
        )}

        <Collapse isOpen={!collapsed} navbar>
          <Nav className="ml-auto" navbar>
            {renderNavLinks(navLinks)}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

Navbar.propTypes = {
  UserId: PropTypes.number,
  UserLogout: PropTypes.func,
  GetAllEntries: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
