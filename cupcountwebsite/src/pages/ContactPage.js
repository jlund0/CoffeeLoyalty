import NavBar from "../NavBar";
import BottomNav from "../bottomNav";

const ContactPage = () => {
  return (
    <>
      <NavBar />
      <section>
        <div>
          <h1>Contact Us</h1>
        </div>
        <form>
          <h2>Send us an Email</h2>
          <input type="text" title="subject" />
          <input type="text" title="email" />
          <button />
        </form>
      </section>
      <BottomNav />
    </>
  );
};
export default ContactPage;
