import React, { useState, useCallback, Children, useEffect } from "react";
import Link from "next/link";
import { ComicsData } from "../utils/apiUtils";
import { classNames } from "../utils/classNames";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
interface ChildrenProps {
  children: JSX.Element;
  searchActive: boolean;
}

const Navbar: React.FC<ChildrenProps> = ({ children, searchActive }) => {
  const [navigation, setNavigation] = useState([
    { name: "Gallery", to: "/", current: !searchActive },
    { name: "Search", to: "/search", current: searchActive },
  ]);
  // there probably is a better way to handle this...

  const [data, setData] = useState<ComicsData[]>();

  // using callback here to memoize and store the results of data
  const updateComicsData = useCallback((data: ComicsData[]): void => {
    setData(data);
  }, []);

  return (
    <div>
      <nav className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="">
              <div className="flex space-x-4">
                {navigation.map((item, idx) => (
                  <Link
                    key={item.name}
                    href={item.to}
                    // onClick={() => updateFieldChanged(idx)}

                    aria-current={item.current ? "page" : undefined}
                  >
                    <a
                      className={classNames(
                        item.current
                          ? "bg-gray-300 text-black"
                          : "text-gray-400 hover:bg-gray-300 hover:text-black",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <a href="https://github.com/Nathen-Smith/marvel-api-app">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
        </div>
      </nav>
      {children}

      {/* <Routes>
        <Route
          path="*"
          element={<List updateComicsData={updateComicsData} />}
        />
        <Route
          path="/marvel-api-app/search"
          element={<List updateComicsData={updateComicsData} />}
        />
        <Route
          path="/marvel-api-app/gallery"
          element={<Gallery updateComicsData={updateComicsData} />}
        />
        {data &&
          data.map((comic, idx) => {
            const charList = () => {
              if (comic.characters?.returned) {
                let charList = new Array<string>();
                comic.characters.items.map(({ name }) => {
                  if (name) {
                    return charList.push(name);
                  } else {
                    return null;
                  }
                });
                return charList.toString();
              } else {
                return null;
              }
            };
            return (
              <Route
                path={`/marvel-api-app/detail/${comic.id}`}
                key={comic.id}
                element={
                  <div>
                    <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                      {comic.title}
                    </h3>

                    <div className="flex content-center mt-4 mx-auto max-w-7xl">
                      <Link
                        to={`/marvel-api-app/detail/${
                          data[idx > 0 ? idx - 1 : idx]?.id
                        }`}
                        className="min-w-0 flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ml-auto"
                      >
                        <ChevronLeftIcon className="block h-4 w-4" />
                      </Link>
                      <img
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt=""
                        key={comic.id}
                        className="min-w-0 h-96 hover:h-52"
                      />
                      <Link
                        to={`/marvel-api-app/detail/${
                          data[idx < data.length - 1 ? idx + 1 : idx]?.id
                        }`}
                        className="min-w-0 flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r mr-auto"
                      >
                        <ChevronRightIcon className="block h-4 w-4" />
                      </Link>
                    </div>

                    <div className="text-left text-md max-w-7xl mx-auto">
                      {comic.description}
                    </div>
                    <div className="text-lg font-medium text-gray-900 my-2 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                      Character List: {charList()}
                    </div>
                  </div>
                }
              />
            );
          })}
      </Routes> */}
    </div>
  );
};

export default Navbar;
