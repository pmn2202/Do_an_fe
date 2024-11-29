/* eslint-disable react/prop-types */
const ChatUser = ({ setShowChat }) => {
  return (
    <div id="chat-container" className="w-96">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 text-white bg-blue-500 border-b rounded-t-lg">
          <p className="text-lg font-semibold">Admin Bot</p>
          <button
            onClick={() => setShowChat(false)}
            id="close-chat"
            className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div id="chatbox" className="p-4 overflow-y-auto h-80">
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              hello
            </p>
          </div>
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              hello
            </p>
          </div>
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              hello
            </p>
          </div>
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              hello
            </p>
          </div>
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              hello
            </p>
          </div>
          <div className="mb-2">
            <p className="inline-block px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
              This is a response from the chatbot.
            </p>
          </div>
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              this example of chat
            </p>
          </div>
          <div className="mb-2">
            <p className="inline-block px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
              This is a response from the chatbot.
            </p>
          </div>
          <div className="mb-2 text-right">
            <p className="inline-block px-4 py-2 text-white bg-blue-500 rounded-lg">
              design with tailwind
            </p>
          </div>
          <div className="mb-2">
            <p className="inline-block px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
              This is a response from the chatbot.
            </p>
          </div>
        </div>
        <div className="flex p-4 border-t">
          <input
            id="user-input"
            type="text"
            placeholder="Type a message"
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="send-button"
            className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
