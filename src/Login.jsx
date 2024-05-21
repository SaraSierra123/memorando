import { React, useState, useEffect, useRef } from "react";
import textCamara from "./assets/camara.jpg";
import logoCamara from "./assets/logoCamara.jpg";
import "./login.css";

const USER_API =
  "https://raw.githubusercontent.com/MesaDavisEnterprises/API_URL/main/USERS_DATA.json";

const Login = () => {
  const [users, setUsers] = useState([]);
  console.log("Login ~ users:", users);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const em = emailRef.current.value;
    const ps = passRef.current.value;

    const vEmail = validateEmail(em);
    let email = "";
    try {
      if (!vEmail) {
        email = null;
        alert("El email no es valido");
      }
    } catch (e) {
      console.log("El formato de email no es valido");
    }

    if (email == null) {
      return;
    }

    try {
      email = vEmail[0];
      let findEmail = users.find((res) => {
        return res.email == email && res.password == ps;
      });
      if (findEmail === undefined) {
        alert("El usuario no ha sidio encontrado");
      } else {
        localStorage.setItem("login", "logueado");
        console.log("aqui lo que sigue");
        window.location = "/";
      }
    } catch (e) {
      console.log(e, "Error al encontrar el usuario usuario");
    }
  };

  const fetchUsers = async () => {
    const res = await fetch(USER_API);
    const data = await res.json();
    const usersT12 = data.filter((r) => {
      const char = "T12 ";
      if (String(r.user_name).search(char) != -1) {
        return r;
      }
    });
    setUsers(usersT12);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          {/*puedes agregar la clase general-error*/}
          <div className="login">
            <div className="logo">
              <img src={logoCamara} alt="" />
              <img src={textCamara} alt="" />
            </div>
            {/*puedes agregar la clase error*/}
            <div className="input">
              <label>Email</label>
              {/*ref={emailRef}*/}
              <input
                type="text"
                name="email"
                placeholder="Escriba su email"
                ref={emailRef}
              />
              <p className="hidden">Error: email no encontrado</p>
            </div>
            {/*puedes agregar la clase error*/}
            <div className="input">
              <label>Password</label>
              {/* ref={passRef} */}
              <input
                type="password"
                name="password"
                placeholder="Escriba su password"
                ref={passRef}
              />
              <p className="hidden">Error: login no encontrado</p>
            </div>

            <button type="submit" className="btn-login">
              Ingresar
            </button>

            <div className="loginFooter">
              <span>Registrarse</span>
              <span>Recuperar Contraseña</span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
