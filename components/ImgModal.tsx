import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

import type { ComicsData } from "../utils/apiUtils";

interface ChildrenProps {
  comicData: ComicsData;
  h: number;
  w: number;
  hover: boolean;
  openFunc?: boolean;
}

const ImgModal: React.FC<ChildrenProps> = ({
  comicData,
  h,
  w,
  hover,
  openFunc,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof openFunc != "undefined") setOpen(openFunc);
  }, [openFunc]);

  // const cancelButtonRef = useRef(null);
  const src =
    comicData.thumbnail.path.slice(0, 4) +
    "s" +
    comicData.thumbnail.path.slice(4) +
    "." +
    comicData.thumbnail.extension;

  const charList = () => {
    if (comicData.characters?.returned) {
      let charList = new Array<string>();
      comicData.characters.items.map(({ name }) => {
        if (name) {
          return charList.push(" " + name);
        } else {
          return null;
        }
      });
      return charList.toString();
    } else {
      return null;
    }
  };

  interface ComicImgProps {
    height: number;
    width: number;
    hover: boolean;
  }

  const ComicImg: React.FC<ComicImgProps> = ({ height, width, hover }) => (
    <Image
      loader={() => src}
      src={src}
      alt=""
      height={height}
      width={width}
      unoptimized={true}
      onClick={() => {
        if (typeof openFunc == "undefined") setOpen(!open);
      }}
      className={`${
        hover && "sm:hover:shadow-2xl ease-in-out cursor-pointer"
      }   mx-auto`}
    />
  );

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 overflow-y-auto"
          // initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity cursor-pointer" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto justify-center flex flex-col text-center mt-3 sm:mt-0 sm:text-left">
                    {/* </div> */}
                    <h3 className="text-lg text-center font-medium text-gray-900">
                      {comicData.title}
                    </h3>
                    <ComicImg height={610} width={400} hover={false} />
                    {charList() && (
                      <div className="text-lg font-medium text-gray-900">
                        Featuring: {charList()}
                      </div>
                    )}
                    <div className="text-left text-md max-w-7xl mx-auto">
                      {comicData.description}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {hover ? (
        <div className="z-0 hover:z-10 xl:scale-100 xl:hover:scale-110 transition-all xl:hover:absolute">
          <ComicImg height={h} width={w} hover={true} />
        </div>
      ) : (
        <ComicImg height={h} width={w} hover={true} />
      )}
    </div>
  );
};

export default ImgModal;
