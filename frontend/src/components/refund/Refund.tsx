import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AlertStatus, RefundInput } from "../../types/types";
import { refund } from "../../api/refund";
import { refundSchema } from "../../schemas/refund.schema";
import { Notification } from "../notification/notification";

const Refund: React.FC = () => {
  const initialValues: RefundInput = {
    transactionNumber: "",
  };

  const [notification, setNotification] = useState({
    status: AlertStatus.SUCCESS,
    message: "",
  });

  const handleSubmit = async (values: RefundInput, actions: any) => {
    await refund(values, setNotification);
    actions.setSubmitting(false);
  };

  return (
    <div className="justify-center items-center bg-red-600 h-4/5 w-9/12">
      <div className="bg-white px-8 py-2 rounded shadow-md h-full w-full">
        <h2 className="text-2xl text-center">Refund</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={refundSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="my-6">
                <label
                  htmlFor="transactionNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Transaction Number
                </label>
                <Field
                  name="transactionNumber"
                  type="text"
                  id="transactionNumber"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="transactionNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Refund
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

export default Refund;
