import "./Style.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div class="header">
      <Link to="/"><h2 id="home-link">Home</h2></Link>
      <Link to="/"><h2 id="home-link">QuickMaths</h2></Link>
      <Link to="/"><h2 id="home-link">Settings</h2></Link>
    </div>
  );
}
