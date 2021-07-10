import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useJwt from '../../auth/jwt/useJwt'
import { isObjEmpty } from '../../utility/Utils'
import CustomAlertDismissable from '../../components/alerts/CustomAlertDismissable'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../../redux/actions/auth'
import { useHistory } from 'react-router-dom'

export const Login = props => {
  const [alertColor, setAlertColor] = useState('primary')
  const [alertBody, setAlertBody] = useState('Chupa chups topping bonbon.')
  const [alertVisible, setAlertVisible] = useState(false)
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  const store = useSelector(state => state.auth)
  const history = useHistory()

  const onSubmit = (values) => {
    console.log(values);
    if (isObjEmpty(errors)) {
      useJwt.login(values).then(res => {
        if (!res) {
          setAlertColor("danger")
          setAlertBody("Something went wrong, please contact the system administrator!")
          setAlertVisible(true)
        } else if (res.message) {
          setAlertColor("danger")
          setAlertBody(res.message)
          setAlertVisible(true)
        } else {
          res = { data: res }
          const data = { ...res.data, accessToken: res.data.token, refreshToken: res.data.refreshToken, tokenExpires: res.data.tokenExpires }
          console.log("login data", data)
          dispatch(handleLogin(data))
        }
      }).catch((err) => console.log(err))
    }
  }
  // console.log(watch("username"), watch("password"))
  useEffect(() => {
    console.log("useEffect for [store.userData]", store.userData);
    if (store.userData && store.userData._id) {
      history.push('/')
    }
  }, [store.userData]);

  return (
    <div className="d-flex justify-content-center h-100">
      <div className="card" style={{ width: "24rem" }}>
        <div className="card-header">
          <h3>Sign In</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email address</label>
              <input
                {...register("username", { required: true })}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
              {errors.username && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
              {errors.password && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="form-group">
                <CustomAlertDismissable
                  color={alertColor}
                  visible={alertVisible}
                  setVisible={setAlertVisible}
                  alertBody={alertBody}
                />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <p className="forgot-password text-right">
              Get registered <a href="/register">signUp?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
