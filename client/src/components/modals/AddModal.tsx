import { FC, useState } from "react";
import { upload } from "@spheron/browser-upload";
import { IModal } from "../Modal";
import { MARKETPLACE_SERVER } from "../../config";
import { signout } from "../../utils/signout";

const AddModal: FC<IModal> = ({ type, setIsModalVisible }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    healthUrl: "",
    bannerUrl: null,
    bannerFileName: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBannerImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploading(true);
    const files = e.target.files || [];
    try {
      const response = await fetch(
        `${MARKETPLACE_SERVER}/user/initiate-upload`
      );
      const responseJson = await response.json();
      const token = responseJson.uploadToken;

      const uploadResult = await upload(files, {
        token,
      });

      setFormData((prevData: any) => ({
        ...prevData,
        bannerUrl: uploadResult.protocolLink,
        bannerFileName: files[0]?.name || "",
      }));
      console.log("Banner upload successful");
    } catch (error: any) {
      console.error("Error: ", error);
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    console.log("Form data submitted:", formData);

    try {
      const session = JSON.parse(localStorage.getItem("session") || "");
      if (session) {
        // signout if session is expired
        if (new Date(session.cookie?.expires) < new Date()) {
          await signout();
        }

        const data = { ...formData, user: session.data._id };
        const response = await fetch(`${MARKETPLACE_SERVER}/bot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session.nonce}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Error:", response.statusText);
          throw new Error("Failed to add bot");
        }
        const addedBot = await response.json();
        console.log("Bot added successfully:", addedBot);
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
              Add Bot to Marketplace
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
            {/* Input for Name */}
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md bg-gray-200 text-gray-800"
              />
            </label>

            {/* Input for Description */}
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md bg-gray-200 text-gray-800"
              />
            </label>

            {/* Input for URL */}
            <label className="block mb-2 text-sm font-medium text-gray-200">
              URL:
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md bg-gray-200 text-gray-800"
              />
            </label>

            {/* Input for Health Check URL */}
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Health Check URL:
              <input
                type="text"
                name="healthUrl"
                value={formData.healthUrl}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md bg-gray-200 text-gray-800"
              />
            </label>

            {/* Input for Banner Image Upload */}
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Banner Image:
              <input
                type="file"
                name="bannerImage"
                onChange={handleBannerImageChange}
                className="w-full mt-1 p-2 border rounded-md bg-gray-200 text-gray-800"
              />
            </label>
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
              className="ms-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => !uploading && handleSubmit()}
            >
              {uploading ? (
                <div className="flex justify-center items-center">
                  <div
                    className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                    role="status"
                  />{" "}
                  Upload in progress...
                </div>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
