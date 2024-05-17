import { ErrorMessage, Field, Form, Formik } from "formik";
import { AlertStatus, PaymentProvider, TopUPInput } from "../../types/types";
import { useState } from "react";
import { topUpBalance } from "../../api/top-up-balance";
import { Notification } from "../notification/notification";
import { topUpSchema } from "../../schemas/top-up.schema";

const TopUp: React.FC = () => {
  const [notification, setNotification] = useState({
    status: AlertStatus.SUCCESS,
    message: "",
  });

  const initialValues: TopUPInput = {
    amount: 0,
    paymentProvider: PaymentProvider.BANK_RESPUBLIKA,
  };

  const handleSubmit = async (values: TopUPInput, actions: any) => {
    console.log(values);
    await topUpBalance(values, setNotification);
    actions.setSubmitting(false);
  };

  return (
    <div className="justify-center items-center bg-red-600 h-4/5 w-9/12">
      <div className="bg-white px-8 py-2 rounded shadow-md h-full w-full">
        <h2 className="text-2xl text-center">Top Up Balance</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={topUpSchema}
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
                  htmlFor="paymentProvider"
                  className="block text-sm font-medium text-gray-700 py-2"
                >
                  Payment Provider
                </label>
                <Field
                  as="select"
                  id="paymentProvider"
                  name="paymentProvider"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  {Object.values(PaymentProvider).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="paymentProvider"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Top Up Balance
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

export default TopUp;
