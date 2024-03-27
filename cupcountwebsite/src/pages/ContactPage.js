import NavBar from "../NavBar";
import BottomNav from "../bottomNav";
import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    return null;
  };

  return (
    <body className="h-screen">
      <NavBar />
      <section className="w-screen h-full backgroundImage1 flex-col justify-between relative">
        <div className="flex-col justify-center h-full content-center w-6/12">
          <h1>Contact Us</h1>

          <form id="contact-form" onSubmit={() => handleSubmit} method="POST">
            <div className="form-group w-full">
              <label htmlFor="name" className="w-full">
                Name
              </label>
              <br />
              <input
                type="text"
                className="form-control w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group w-full">
              <label
                htmlFor="exampleInputEmail1"
                onChange={(e) => setEmail(e.target.value)}
              >
                Email address
              </label>{" "}
              <br />
              <input
                type="email"
                className="form-control w-full"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label> <br />
              <textarea
                className="form-control w-full"
                rows="5"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </section>
      <BottomNav bgColor="#A87046" />
    </body>
  );
};
export default ContactPage;
