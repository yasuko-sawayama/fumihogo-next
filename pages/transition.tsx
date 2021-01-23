import { Transition } from "@tailwindui/react";
import { useState } from "react";

export default function transition() {
  const [showToc, setShowToc] = useState(true);
  return (
    <>
      <div>ここにコンテンツ？</div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Transition
            show={showToc}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
          </Transition>
          <section
            className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
            aria-labelledby="slide-over-heading"
          >
            <Transition
              show={showToc}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md h-full">
                <Transition
                  show={showToc}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-20 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setShowToc(!showToc)}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </Transition>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll pt-20">
                  <div className="px-4 sm:px-6">
                    <h2
                      id="slide-over-heading"
                      className="text-lg font-medium text-gray-900 mt-5"
                    >
                      Panel title
                    </h2>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div
                        className="h-full border-2 border-dashed border-gray-200"
                        aria-hidden="true"
                      >
                        あいうえお
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </section>
        </div>
      </div>
    </>
  );
}
