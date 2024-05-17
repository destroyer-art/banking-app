import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { transfer } from "../../api/transfer";
import { AlertStatus, TransferInput } from "../../types/types";
import { transferSchema } from "../../schemas/transfer.schema";
import { Notification } from "../notification/notification";

const Transfer: React.FC = () => {
  const [notification, setNotification] = useState({
    status: AlertStatus.SUCCESS,
    message: "",
  });

  const initialValues: TransferInput = {
    amount: 0,
    targetGSMNumber: "",
  };

  const handleSubmit = async (values: TransferInput, actions: any) => {
    await transfer(values, setNotification);
    actions.setSubmitting(false);
  };

  return (
    <div className="justify-center items-center bg-red-600 h-4/5 w-9/12">
      <div className="bg-white px-8 py-2 rounded shadow-md h-full w-full">
        <h2 className="text-2xl text-center">Transfer</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={transferSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="my-6">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <Field
                  name="amount"
                  type="number"
                  id="amount"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-6">
                <label
                  htmlFor="targetGSMNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gsm Number (phone number)
                </label>
                <Field
                  name="targetGSMNumber"
                  type="text"
                  id="targetGSMNumber"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="targetGSMNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Transfer
              </button>

              {notification.message && (
                <div className="my-6">
                  <Notification
                    message={notification.message}
                    status={notification.status}
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Transfer;
