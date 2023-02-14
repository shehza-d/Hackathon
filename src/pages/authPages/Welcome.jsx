// Splash screen
import storeLogo from "../../assets/storeLogo.png";
import { useNavigate, Link } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <img src={storeLogo} alt="" />
        <h1>SAYLANI WELFARE</h1>
        <h2>ONLINE DISCOUNT STORE</h2>
      </div>

      <button onClick={navigate("/login")}>
        <Link to="login">Get Started</Link>
      </button>
    </div>
  );
}
