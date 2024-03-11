import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <h1 className="logo lobster-regular">CupCount</h1>
      <ul>
        <li>
          <Link to="/">What is CupCount</Link>
        </li>
        <li>
          <Link to="/pricing">Store Owners</Link>
        </li>
        <li>
          <Link to="/contact">Support</Link>
        </li>
      </ul>
      <div className="nav-item nav-right">
        <Link to="/signin">To Admin Console</Link>
      </div>
    </nav>
  );
};
export default NavBar;
