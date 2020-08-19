import "./css/index.css"
import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { Router } from "react-router-dom"

import { history } from "./store/reducers/router/reducer"
import { deepParseJson, getRandomInt } from "./utils"
import { LoadingScreen } from "./components"
import * as serviceWorker from "./serviceWorker"
import ReactGA from "react-ga"

import { ContextProvider } from "./store/provider/provider"
import rootReducer from "./store/reducers"

const AlertNotifications = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, getRandomInt(0, 50))).then(() =>
    import("./components/AlertNotifications")
  )
)

// Initialize google analytics page view tracking
history.listen((location) => {
  const page = location.pathname

  // ReactGA.set({ dimension1: "test" })
  // ReactGA.pageview(page, { dimension1: "test" }) // Record a pageview for the given page

  ReactGA.set({ page }) // Update the user's current page
  ReactGA.pageview(page) // Record a pageview for the given page
})

// ReactGA.ga((tracker) => {

//   ReactGA.set({ dimension1: profileId });

//   ReactGA.pageview(pageName, { dimension1: profileId });
// })

// const initialState = getReduxState()
// const ReduxStore = storeFactory(initialState)

ReactDOM.render(
  // <React.StrictMode>

  <ContextProvider rootReducer={rootReducer}>
    <Suspense fallback={<LoadingScreen />}>
      <AlertNotifications />
      <Router history={history}>
        <App />
      </Router>
    </Suspense>
  </ContextProvider>,

  // </React.StrictMode>,
  document.getElementById("root")
)

serviceWorker.register(serviceWorker.serviceWorkerConfig())
