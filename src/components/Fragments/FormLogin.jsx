import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth.service";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      {loginFailed && <p className="text-red-600 mb-5">{loginFailed}</p>}
      <InputForm
        label="Username"
        type="text"
        placeholder="John Doe"
        name="username"
        ref={usernameRef}
      />

      <InputForm
        label="Password"
        type="password"
        placeholder="*******"
        name="password"
      />

      <Button type="submit" classname="bg-blue-600 w-full">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
