import { Link } from "react-router-dom";

function DetailsPage() {
  return (
    <div>
      <Link to=".." relative="path">
        {"<"}
      </Link>
      <h1>Details</h1>
    </div>
  );
}

export default DetailsPage;
