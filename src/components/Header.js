import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { useState } from "react";
import { checkLogin } from "./base_url";

let Header = () => {
  const navigate = useNavigate();

  let [isLogin, setIsLogin] = useState(checkLogin());

  let success = (credentialResponse) => {
    try {
      let token = credentialResponse.credential;
      // save token
      localStorage.setItem("auth_token", token);
      window.location.assign("/");
    } catch (error) {
      alert("wrong token");
    }
    // console.log(credentialResponse.credential);// credential JWT Token
    // JSON WEB TOKEN
    // Header + Payload(data) + Signature
    // jwt-decode
  };

  let error = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    localStorage.removeItem("auth_token");
    window.location.assign("/");
  };
  return (
    <>
      <GoogleOAuthProvider clientId="517094070929-ogquq3pen8603akmukr3ibui3aofb74f.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="loginModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Login
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={success} onError={error} />
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
      <div className="col-10 d-flex justify-content-between py-2">
        <p className="m-0 brand" onClick={() => navigate("/")}>
          e!
        </p>
        <div>
          {isLogin ? (
            <>
              <span className="mx-3 text-white">
                Welcome {isLogin.given_name}
              </span>
              <button className="btn btn-sm btn-danger" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn text-white"
                data-bs-target="#loginModal"
                data-bs-toggle="modal"
              >
                Login
              </button>
              <button className="btn btn-outline-light">
                <i className="fa fa-search" aria-hidden="true"></i>Create a
                Account
              </button>
            </>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default Header;
