import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  AlertStatus,
  PurchaseInput,
  ShoppingProvider,
} from "../../types/types";
import { purchaseSchema } from "../../schemas/purchase.schema";
import { Notification } from "../notification/notification";
 import { purchase } from "../../api/purchase";

const Purchase: React.FC = () => {
 
 
  const initialValues: PurchaseInput = {
    amount: 0,
    shoppingProvider: ShoppingProvider.ADIDAS,
  };

  const [notification, setNotification] = useState({
    status: AlertStatus.SUCCESS,
    message: "",
  });

  const handleSubmit = async (values: PurchaseInput, actions: any) => {
    await purchase(values, setNotification);
    actions.setSubmitting(false);
  };

  return (
    <div className="justify-center items-center bg-red-600 h-4/5 w-9/12">
      <div className="bg-white px-8 py-2 rounded shadow-md h-full w-full">
        <h2 className="text-2xl text-center">Purchase</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={purchaseSchema}
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
                  type="number"
                  id="amount"
                  name="amount"
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
                  htmlFor="shoppingProvider"
                  className="block text-sm font-medium text-gray-700 py-2"
                >
                  Shopping Provider
                </label>
                <Field
                  as="select"
                  id="shoppingProvider"
                  name="shoppingProvider"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  {Object.values(ShoppingProvider).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="shoppingProvider"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Purchase
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

export default Purchase;
