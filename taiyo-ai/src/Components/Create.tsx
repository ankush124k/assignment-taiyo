import React, { useState, Fragment, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  getDataError,
  getDataRequest,
  getDataSuccess,
} from "../Redux/ContactReducer/action";
import Alert from "./Alert";

// Define the contact type
export interface ContactType {
  first: string;
  last: string;
  status: string;
  id: string;
}

// Create component
const CreateContact = () => {
  // Define state variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState<ContactType>({
    first: "",
    last: "",
    status: "",
    id: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((store: any) => store.ContactReducer.data);

  // Open modal function
  const openModal = () => setIsModalOpen(true);

  // Close modal function
  const closeModal = () => setIsModalOpen(false);

  // Handle input change
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { first, last, status } = contact;
    const id = `${first}${Math.random()}${last}`;
    try {
      dispatch(getDataRequest());
      if (!first || !last || !status) {
        closeModal();
        setShowAlert(true);
      } else {
        dispatch(getDataSuccess({ ...contact, id }));
        setShowAlert(false);
        setContact({
          first: "",
          last: "",
          status: "",
          id: "",
        });
        closeModal();
      }
    } catch (err) {
      console.error(err);
      dispatch(getDataError());
    }
  };

  return (
    <>
      {showAlert && <Alert />}
      <button
        onClick={openModal}
        className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Contact
      </button>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create Contact Screen
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Enter Data in Respective Fields
                  </p>
                  <form onSubmit={handleSubmit}>
                    <input
                      className="border mt-2 px-2 py-2"
                      placeholder="Enter First Name"
                      name="first"
                      onChange={handleInputChange}
                    />
                    <input
                      className="border mt-2 px-2 py-2"
                      placeholder="Enter Last Name"
                      name="last"
                      onChange={handleInputChange}
                    />
                    <div className="mt-4 mb-2">
                      <label className="mx-2">Status:</label>
                      <input
                        className="mx-2"
                        type="radio"
                        name="status"
                        value="Active"
                        onChange={handleInputChange}
                      />
                      Active
                      <input
                        className="mx-2"
                        type="radio"
                        name="status"
                        value="Inactive"
                        onChange={handleInputChange}
                      />
                      Inactive
                    </div>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-grey-600 border bg-slate-600 rounded"
                    >
                      Save Contact
                    </button>
                  </form>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-grey-600 border bg-slate-600 border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateContact;
