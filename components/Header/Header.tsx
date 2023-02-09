import Link from 'next/link';
import '../../app/globals.css';

const Header = () => (
  <header>
    <h1 className="text-3xl font-bold underline">Header</h1>
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/news">News</Link>
        </li>
        <li>
          <Link href="/business">Business</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
