import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Wraps all public-facing pages with the shared Navbar and Footer.
 */
const PublicLayout = ({ children }) => (
  <div className="public-layout">
    <Navbar />
    <main className="public-main">{children}</main>
    <Footer />
  </div>
);

export default PublicLayout;
