import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div>
        <Link to="/">Strona główna</Link>
      </div>
      <div>
        <Link to="/movies">Lista filmów</Link>
      </div>
      <div>
        <Link to="/movies/add">Dodaj film</Link>
      </div>
    </div>
  );
}

export default Navbar;