import { Fragment, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from "../../redux/actions/auth"

export const Home = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.auth)
  const history = useHistory()
  
  const logout = () => {
    console.log("logout");
    // dispatch({ type: 'LOGOUT', logout: { message: 'Unauthorized' } })
    dispatch(handleLogout())
  };
  useEffect(() => {
    console.log("useEffect for [store.userData]", store.userData);
    if (store.userData && !store.userData._id) {
      history.push('/login')
    }
  }, [store.userData]);
  return (
    <Fragment>
      <h2 className="mb-3">You have Successfully Logged into ic-dev-app</h2>
      <button className="btn btn-primary" onClick={logout}>Logout</button>
    </Fragment>
  )
}