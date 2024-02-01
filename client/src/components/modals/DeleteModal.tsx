import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IModal } from "../Modal";
import { MARKETPLACE_SERVER } from "../../config";
import { signout } from "../../utils/signout";

const DeleteModal: FC<IModal> = ({ type, setIsModalVisible, botId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const session = JSON.parse(localStorage.getItem("session") || "");
      if (session) {
        // signout if session is expired
        if (new Date(session.cookie?.expires) < new Date()) {
          await signout();
        }

        const response = await fetch(`${MARKETPLACE_SERVER}/bot/${botId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.session.nonce}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Error:", response.statusText);
          throw new Error("Failed to delete bot");
        }
        console.log("Bot deleted successfully:");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }

    setIsModalVisible(false);
  };

  return (
    <div
      id={type}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-50 bg-gray-300"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-gray-700 rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              Delete Bot from Marketplace
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide={type}
              onClick={() => setIsModalVisible(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this bot?
            </p>
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-600 rounded-b">
            <button
              data-modal-hide={type}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </button>
            <button
              data-modal-hide={type}
              type="button"
              className="ms-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:red-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
