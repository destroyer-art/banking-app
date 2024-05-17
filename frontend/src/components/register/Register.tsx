import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { register } from "../../api/register";
import { AlertStatus, RegisterInput } from "../../types/types";
import { registerSchema } from "../../schemas/register.schema";
import { Notification } from "../notification/notification";

const Register: React.FC = () => {
  const [notification, setNotification] = useState({
    status: AlertStatus.SUCCESS,
    message: "",
  });

  const initialValues: RegisterInput = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gsmNumber: "",
    dateOfBirth: new Date(),
  };

  const handleSubmit = async (values: RegisterInput, actions: any) => {
    await register(values, setNotification);
    actions.setSubmitting(false);
  };

  return (
    <div className="justify-center items-center bg-red-600 h-4/5 w-9/12">
      <div className="bg-white px-8 py-2 rounded shadow-md h-full w-full">
        <h2 className="text-2xl text-center">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="my-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="last"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="my-2">
                <label
                  htmlFor="gsmNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  GSM Number (phone number)
                </label>
                <Field
                  type="tel"
                  id="gsmNumber"
                  name="gsmNumber"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="gsmNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Register
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

export default Register;
