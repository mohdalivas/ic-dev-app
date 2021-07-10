import { useState } from 'react';
import { useForm } from "react-hook-form";
import useJwt from '../../auth/jwt/useJwt'
import { isObjEmpty } from '../../utility/Utils'
import CustomAlertDismissable from '../../components/alerts/CustomAlertDismissable'
import { useHistory } from 'react-router-dom'

export const Register = () => {
  const [alertColor, setAlertColor] = useState('primary')
  const [alertBody, setAlertBody] = useState('Chupa chups topping bonbon.')
  const [alertVisible, setAlertVisible] = useState(false)
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const history = useHistory()

  const onSubmit = (values) => {
    console.log(values);
    if (isObjEmpty(errors)) {
      values.email = values.username
      useJwt.register(values).then(res => {
        if (!res) {
          setAlertColor("danger")
          setAlertBody("Something went wrong, please contact the system administrator!")
          setAlertVisible(true)
        } else if (res.message === 'User registered successfully. Please get activated before login.') {
          setAlertColor("success")
          setAlertBody(res.message)
          setAlertVisible(true)
          setTimeout(() => history.push("/login"), 4000);
        } else if (res.message) {
          setAlertColor("danger")
          setAlertBody(res.message)
          setAlertVisible(true)
        } else {
          console.log("register data", res)
          setAlertColor("danger")
          setAlertBody("Something went wrong, please contact the system administrator!")
          setAlertVisible(true)
          setTimeout(() => history.push("/login"), 4000);
        }
        setTimeout(() => setAlertVisible(false), 4000);
    }).catch((err) => console.log(err))
    }
  }

  return (
    <div className="d-flex justify-content-center h-100">
      <div className="card" style={{ width: "24rem" }}>
        <div className="card-header">
          <h3>Sign Up</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Full name</label>
              <input
                {...register("fullname", { required: true })}
                type="text"
                className="form-control"
                placeholder="First name"
              />
              {errors.fullname && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                {...register("username", { required: true })}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
              {errors.username && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
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
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
