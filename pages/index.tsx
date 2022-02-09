import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      Hey
      <Link href="/search">
        <a>Search</a>
      </Link>
    </div>
  );
};

export default Home;