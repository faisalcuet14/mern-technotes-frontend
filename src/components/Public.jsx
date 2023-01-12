import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eius
          dignissimos eligendi aperiam quasi vero, consequuntur illo totam est!
          Perspiciatis.
        </p>
        <address className="public__addr">
          Dan D. Repairs
          <br />
          Somewhere in the country
          <br />
          Bangladesh
          <br />
          <a href="tel:+01234567890">(+880) 1234-567890</a>
        </address>
        <br />
        <p>Owner: Tottenham somorthok gosthi</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
