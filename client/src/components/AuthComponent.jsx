import { NavLink } from "react-router-dom";
const AuthComponent = ({ component, name, handleChange }) => {
  const text =
    name == "register"
      ? "already have an account"
      : "already dont have an account";
  const redirect = name == "register" ? "login" : "register";
  return (
    <form>
      <h1>{name} Here</h1>
      {component.map((curEle, index) => (
        <input
          type={curEle.type}
          name={curEle.field}
          value={curEle.value}
          onChange={handleChange}
          placeholder={`enter your ${curEle.field}`}
          key={index}
        />
      ))}

      <p>
        {" "}
        {text} ? <NavLink to={`/${redirect}`}>{redirect} here</NavLink>
      </p>
      <button>{name}</button>
    </form>
  );
};

export default AuthComponent;
