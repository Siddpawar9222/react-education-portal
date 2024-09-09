import React, { useEffect, useState } from "react";
import testApiService from "../../api/test/testApiService";
import Layout from "../../layouts/Layout";
import { toast, ToastContainer } from "react-toastify"; // Toast
import "react-toastify/dist/ReactToastify.css"; // Toast CSS
import { ClipLoader } from "react-spinners"; // Spinner

const TestPage = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // For spinner

  const TestApi = async () => {
    try {
      const responseData = await testApiService(); // Assuming testApiService returns a promise
      console.log(responseData);
      if (responseData.status === 200) {
        setData(responseData.data.data); // Store the 'data' part of the response
        toast.success("Collaborators fetched successfully!"); // Success toast
      } else {
        toast.error("Failed to fetch collaborators"); // Error toast
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      toast.error("Error fetching data!"); // Error toast
    } finally {
      setLoading(false); // Stop the spinner after the API call is done
    }
  };

  useEffect(() => {
    TestApi(); // Call the TestApi function when the component mounts
  }, []); // Empty dependency array means it runs only once after the initial render

  return (
    <>
      <Layout>
        <ToastContainer /> {/* Toast container for notifications */}

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            {/* Spinner */}
            <ClipLoader color={"#123abc"} loading={loading} size={50} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-6">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80"
                >
                  <div className="relative h-48 m-2.5 overflow-hidden text-white rounded-md">
                    <img
                      src={collaborator.imageUrl}
                      alt={collaborator.username}
                      className="w-full h-full object-fill" // Ensure image is properly covered
                    />
                  </div>
                  <div className="p-3">
                    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                      {collaborator.username}
                    </h6>
                  </div>
                  <div className="px-4 pb-4 pt-0 mt-1">
                    <a
                      href={collaborator.gitHubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        className="rounded-md bg-slate-800 py-2 px-4 flex items-center justify-center border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        GitHub
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14m0 0l-6 6m6-6l-6-6"
                          />
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No collaborators found</p>
            )}
          </div>
        )}
      </Layout>
    </>
  );
};

export default TestPage;
