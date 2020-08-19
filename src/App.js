import React, { useEffect, lazy, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { UserProps } from "./store/reducers/User/propTypes";
import { connect } from "./store/provider";
import { Route, Switch, Redirect } from "react-router-dom";
import { SetLocalStorageUsage } from "./store/reducers/App/actions";
import { SetWindow } from "./store/reducers/Window/actions";
import { RouteMap, RouterGoBack } from "./store/reducers/router/actions";
import { About, Home, PrivacyPolicy } from "./views";
import { NavBar } from "./components";
import { RouterLinkPush } from "./store/reducers/router/actions";
import memoizeProps from "./utils/memoizeProps";
import { useAddToHomescreenPrompt } from "./components/AddToHomeScreen/prompt";

const Support = lazy(() => import("./views/Support"));
const PageNotFound = lazy(() => import("./views/PageNotFound"));

const {
  ABOUT,
  HOME,
  ROOT,
  SUPPORT,

  PRIVACY_POLICY,
} = RouteMap;

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = {
  SetWindow,
  SetLocalStorageUsage,
};

const App = ({ userToken, SetWindow, SetLocalStorageUsage }) => {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const handleResize = () => SetWindow();
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    SetLocalStorageUsage();

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <Fragment>
      <NavBar prompt={prompt} promptToInstall={promptToInstall} />
      <main className="App RouteOverlay">
        <Switch>
          <Route
            exact={true}
            strict={false}
            path={[ABOUT]}
            render={() => (
              <About prompt={prompt} promptToInstall={promptToInstall} />
            )}
          />
          <Route
            exact={true}
            strict={false}
            path={[ROOT, HOME]}
            render={() => (
              <Home prompt={prompt} promptToInstall={promptToInstall} />
            )}
          />
          <Route exact path={[SUPPORT]} render={() => <Support />} />
          <Route
            exact
            path={[PRIVACY_POLICY]}
            render={() => <PrivacyPolicy />}
          />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </main>
    </Fragment>
  );
};

App.propTypes = {
  User: UserProps,
  SetWindow: PropTypes.func.isRequired,
  SetLocalStorageUsage: PropTypes.func.isRequired,
};

const isEqual = (prevProps, nextProps) =>
  memoizeProps(prevProps, nextProps, ["userId", "userToken"]);

export default connect(mapStateToProps, mapDispatchToProps)(memo(App, isEqual));
