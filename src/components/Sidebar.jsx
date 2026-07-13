import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>CryptoDash</h2>

      <nav>
        <Link to="/">Dashboard</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;