import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1 class="logo lobster-regular nav-left">CupCount</h1>
        </li>
        <li>
          <Link to="/">What is CupCount</Link>
        </li>
        <li>
          <Link to="/pricing">Store Owners</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li class="nav-right">
          <Link to="/console">To Admin Console</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
