const ChatAdmin = () => {
  return (
    <div className="container flex p-2 border border-gray-200">
      <div className="w-1/4 bg-white ">
        <header className="flex items-center justify-between p-4 text-white bg-indigo-600 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <div className="relative">
            <button id="menuButton" className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            {/* Menu Dropdown */}
            <div
              id="menuDropdown"
              className="absolute right-0 hidden w-48 mt-2 bg-white rounded-md shadow-lg"
            >
              <ul className="px-3 py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                  >
                    Option 2
                  </a>
                </li>
                {/* Add more menu options here */}
              </ul>
            </div>
          </div>
        </header>
        <div className="h-screen p-3 pb-20 overflow-y-auto mb-9">
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Alice</h2>
              <p className="text-gray-600">Hoorayy!!</p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Martin</h2>
              <p className="text-gray-600">
                That pizza place was amazing! We should go again sometime. 🍕
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Charlie</h2>
              <p className="text-gray-600">
                Hey, do you have any recommendations for a good movie to watch?
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">David</h2>
              <p className="text-gray-600">
                I just finished reading a great book! It was so captivating.
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Ella</h2>
              <p className="text-gray-600">
                What the plan for this weekend? Anything fun?
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Fiona</h2>
              <p className="text-gray-600">
                I heard there a new exhibit at the art museum. Interested?
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">George</h2>
              <p className="text-gray-600">
                I tried that new cafe downtown. The coffee was fantastic!
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Hannah</h2>
              <p className="text-gray-600">
                Im planning a hiking trip next month. Want to join?
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Ian</h2>
              <p className="text-gray-600">
                Let s catch up soon. It s been too long!
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
            <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
              <img
                src="https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Jack</h2>
              <p className="text-gray-600">
                Remember that hilarious joke you told me? I can t stop laughing!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="p-4 text-gray-700 bg-white">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>
        <div className="h-screen p-4 overflow-y-auto pb-36">
          <div className="flex mb-4 cursor-pointer">
            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
              <p className="text-gray-700">Hey Bob, how s it going?</p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
              <p>
                Hi Alice! I m good, just finished a great book. How about you?
              </p>
            </div>
            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
              <p className="text-gray-700">
                That book sounds interesting! What s it about?
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
              <p>
                It s about an astronaut stranded on Mars, trying to survive.
                Gripping stuff!
              </p>
            </div>
            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
              <p className="text-gray-700">
                I m intrigued! Maybe I ll borrow it from you when you re done?
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
              <p>Of course! I ll drop it off at your place tomorrow.</p>
            </div>
            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
              <p className="text-gray-700">Thanks, you re the best!</p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
              <p>Anytime! Let me know how you like it. 😊</p>
            </div>
            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
              <p className="text-gray-700">So, pizza next week, right?</p>
            </div>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex gap-3 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
              <p>Absolutely! Can t wait for our pizza date. 🍕</p>
            </div>
            <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="My Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex mb-4 cursor-pointer">
            <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
              <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div className="flex gap-3 p-3 bg-white rounded-lg max-w-96">
              <p className="text-gray-700">Hoorayy!!</p>
            </div>
          </div>
        </div>
        <footer className="absolute bottom-0 w-3/4 p-4 bg-white border-t border-gray-300">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded-md">
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatAdmin;
