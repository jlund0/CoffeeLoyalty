import { Link } from "react-router-dom";

function DetailsPage() {
  return (
    <div>
      <Link to=".." relative="path">
        {"<"}
      </Link>
      <div>
        <h1>Your Details</h1>
        <h1>
          Name<span></span>
        </h1>
        <h1>
          Email<span></span>
        </h1>
        <h1>
          Number<span></span>
        </h1>
      </div>
      <div>
        <h1>
          Card<span></span>
        </h1>
      </div>
    </div>
  );
}

export default DetailsPage;
