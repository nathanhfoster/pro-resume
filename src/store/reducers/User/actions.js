import { Axios, AxiosForm, AxiosOffline } from "../../Actions"
import { UserActionTypes } from "../User/types"
import { AppActionTypes } from "../App/types"
import { ResetRedux } from "../App/actions"
import { SetAlert } from "../Alerts/actions"
import qs from "qs"
import ReactGA from "react-ga"

const SetUser = (payload) => ({
  type: UserActionTypes.USER_SET,
  payload,
})

const ChangeUser = (payload) => ({ type: UserActionTypes.USER_SET, payload })

const UserLogin = (payload, rememberMe) => async (dispatch) =>
  await AxiosOffline()
    .post("login/", qs.stringify(payload))
    .then(async ({ data }) => {
      const { id, token } = data
      await dispatch(RefreshPatchUser(id))
      await dispatch(SetUser(data))
      ReactGA.event({
        category: "Login",
        action: "User logged in!",
      })
      return data
    })
    .catch((e) => console.log("UserLogin: ", e))

const RefreshPatchUser = (id) => (dispatch) =>
  AxiosOffline()
    .get(`users/${id}/refresh/`)
    .then(({ data }) => {
      dispatch({
        type: UserActionTypes.USER_SET,
        payload: data,
      })
      ReactGA.event({
        category: "Refresh Patch User",
        action: "User refreshed their login",
      })
      return data
    })
    .catch((e) =>
      e.response && e.response.status == 401
        ? dispatch({
            type: AppActionTypes.REDUX_RESET,
            payload: null,
          })
        : console.log(e)
    )

const UserLogout = () => (dispatch) => dispatch(ResetRedux())

const CreateUser = (payload, rememberMe) => (dispatch) =>
  AxiosOffline()
    .post("users/", qs.stringify(payload))
    .then((res) => {
      dispatch(UserLogin(payload, rememberMe))
      ReactGA.event({
        category: "Sign Up",
        action: "User signed up!",
      })
    })
    .catch((e) => console.log("CreateUser: ", e.response))

const UpdateUser = (payload) => (dispatch, getState) => {
  const { id } = getState().User
  return Axios()
    .patch(`users/${id}/`, qs.stringify(payload))
    .then(({ data }) => {
      dispatch({ type: UserActionTypes.USER_SET, payload: data })
      dispatch(SetAlert({ title: "Updated", message: "Profile" }))
      ReactGA.event({
        category: "Update User",
        action: "User updated their account",
      })
      return data
    })
    .catch((e) => console.log("UpdateUser ERROR: ", e))
}

const UpdateProfile = (payload) => (dispatch, getState) => {
  const { id } = getState().User
  // await dispatch({ type: USER_UPDATE_LOADING })
  return AxiosForm(payload)
    .patch(`users/${id}/`, payload)
    .then(({ data }) => {
      dispatch({
        type: UserActionTypes.USER_SET,
        payload: data,
      })
      ReactGA.event({
        category: "Update Profile",
        action: "User updated their profile",
      })
      return data
    })
    .catch((e) => console.log("UpdateProfile: ", e.response))
}

const SetUserLocation = (position) => (dispatch) => {
  if (!position) {
    return dispatch({ type: UserActionTypes.USER_RESET_LOCATION })
  }
  const {
    coords: {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      latitude,
      longitude,
      speed,
    },
    timestamp,
  } = position

  dispatch({
    type: UserActionTypes.USER_SET_LOCATION,
    payload: {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      latitude,
      longitude,
      speed,
      timestamp,
    },
  })
}

const GetUserLocation = () => (dispatch) => {
  const { geolocation } = navigator
  return geolocation.getCurrentPosition(
    (position) => {
      //console.log("GetUserLocation:", position)
      dispatch(SetUserLocation(position))
      ReactGA.event({
        category: "Get User Location",
        action: "User is using the getCurrentPosition API!",
      })
    },
    (error) => console.log("GetUserLocation ERROR: ", error),
    { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 }
  )
}

const WatchUserLocation = (watchId) => (dispatch) => {
  const { geolocation } = navigator
  if (watchId) {
    dispatch(SetUserLocation(null))
    return geolocation.clearWatch(watchId)
  }

  return geolocation.watchPosition(
    (position) => {
      // console.log("WatchUserLocation:", position)
      dispatch(SetUserLocation(position))
      ReactGA.event({
        category: "Watch User Location",
        action: "User is using the watchPosition API!",
      })
    },
    (error) => console.log("WatchUserLocation ERROR: ", error),
    { enableHighAccuracy: true, timeout: 3000, maximumAge: 10000 }
  )
}

const PasswordReset = (payload) => (dispatch) =>
  AxiosOffline()
    .post("rest-auth/password/reset/", qs.stringify(payload))
    .then(({ data: { detail } }) => {
      dispatch(
        SetAlert({
          title: "Password Reset",
          message: detail,
        })
      )
      ReactGA.event({
        category: "Password Reset",
        action: "User requested a password reset!",
      })
    })
    .catch((e) => {
      console.log(JSON.parse(JSON.stringify(e)))
      dispatch(SetAlert({ title: "Password Reset Error", message: "ERROR" }))
    })

const PostSettings = (payload) => (dispatch) => {
  dispatch({
    type: UserActionTypes.USER_SET_SETTINGS,
    payload,
  })
  return AxiosOffline()
    .post(`user/settings/`, qs.stringify(payload))
    .then(({ data }) => {
      dispatch({
        type: UserActionTypes.USER_SET_SETTINGS,
        payload: data,
      })
      ReactGA.event({
        category: "Post Settings",
        action: "User posted a new setting!",
      })
      return data
    })
    .catch((e) => console.log("PostSettings: ", e.response))
}
const UpdateSettings = (payload) => (dispatch, getState) => {
  const { id } = getState().User.Settings
  dispatch({
    type: UserActionTypes.USER_SET_SETTINGS,
    payload,
  })

  return AxiosOffline()
    .patch(`user/settings/${id}/`, qs.stringify(payload))
    .then(({ data }) => {
      dispatch(SetAlert({ title: "Updated", message: "Setting" }))
      dispatch({
        type: UserActionTypes.USER_SET_SETTINGS,
        payload: data,
      })
      ReactGA.event({
        category: "Update Settings",
        action: "User updated a setting!",
      })
      return data
    })
    .catch((e) => console.log("UpdateSettings: ", e.response))
}

const DeleteAccount = () => (dispatch, getState) => {
  const { id } = getState().User
  return AxiosOffline()
    .delete(`users/${id}/`)
    .then((res) => {
      dispatch(SetAlert({ title: "Deleted", message: "Account" }))
      dispatch(UserLogout())
      ReactGA.event({
        category: "Delete Account",
        action: "User deleted their account!",
      })
    })
    .catch((e) => console.log("DeleteAccount: ", e.response))
}

const SearchForUsers = (search) =>
  Axios.get(`/users?search=${search}/`)
    .then(({ data }) => {})
    .catch((e) => console.log("SearchForUsers: ", e.response))

export {
  SetUser,
  ChangeUser,
  UserLogin,
  RefreshPatchUser,
  UserLogout,
  CreateUser,
  UpdateUser,
  UpdateProfile,
  SetUserLocation,
  GetUserLocation,
  WatchUserLocation,
  PasswordReset,
  PostSettings,
  UpdateSettings,
  DeleteAccount,
  SearchForUsers,
}
