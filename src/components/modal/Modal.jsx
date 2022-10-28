import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useState } from "react";
import "./index.css";
import userAPI from "../../api/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Modal = () => {
  const [form] = Form.useForm();
  const [formType, setFormType] = useState("login");
  const navigate = useNavigate();
  const changeFormStyle = (value) => {
    setFormType(value);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onFinish = async () => {
    console.log(formData);
    if (formType === "login") {
      const res = await userAPI.login(formData);
      if (res.errorCode) {
        toast.error(res.data, { position: "top-right" });
      } else {
        toast.success("Login successfully", { position: "top-right" });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } else if (formType === "register") {
      const res = await userAPI.register(formData);
      if (res.errorCode) {
        toast.error(res.data, { position: "top-right" });
      } else {
        toast.success("Login successfully", { position: "top-right" });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    }
  };
  const setValueForm = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <div className="form">
        <h2>{formType === "login" ? "Sign In" : "Sign Up"}</h2>
        <div>
          <div name="email" className="inputBox">
            <Input
              className="input"
              required
              onChange={(e) => setValueForm(e.target.value, "email")}
              autoComplete="off"
            />
            <span className="label">Email:</span>
            <i></i>
          </div>
          <div name="password" className="inputBox" type="password">
            <Input
              type="password"
              className="input"
              required
              onChange={(e) => setValueForm(e.target.value, "password")}
              autoComplete="off"
            />
            <span className="label">Password:</span>
            <i></i>
          </div>
          {formType === "register" ? (
            <div name="confirmPassword" className="inputBox">
              <Input
                type="password"
                className="input"
                required
                onChange={(e) =>
                  setValueForm(e.target.value, "confirmPassword")
                }
                autoComplete="off"
              />
              <span className="label">Confirm Password:</span>
              <i></i>
            </div>
          ) : (
            <></>
          )}

          <div className="links">
            <p
              onClick={() => {
                changeFormStyle("forgot");
              }}
            >
              Forgot Password
            </p>
            <p
              onClick={() => {
                if (formType === "login") {
                  changeFormStyle("register");
                } else {
                  changeFormStyle("login");
                }
              }}
            >
              {formType === "login" ? "Sign Up" : "Sign In"}
            </p>
          </div>
          <Button htmlType="submit" onClick={onFinish}>
            {formType === "login" ? "Login" : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
