// Splash screen
import storeLogo from "../../assets/storeLogo.png";

export default function Welcome() {
  return (
    <div>
      <div>
        <img src={storeLogo} alt="" />
        <h1>SAYLANI WELFARE</h1>
        <h2>ONLINE DISCOUNT STORE</h2>
      </div>

      <button>Get Started</button>
    </div>
  );
}
