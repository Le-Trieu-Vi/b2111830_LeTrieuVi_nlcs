import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import baseUrl from "../Api";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Yêu cầu nhập tên người dùng"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Yêu cầu nhập mật khẩu"),
});

function LoginForm() {
  const handleSubmit = (values, { setSubmitting }) => {
    axios.post(`${baseUrl}/auth/login`, values)
      .then((res) => {
        const token = res.data.data.accessToken;
        localStorage.setItem("token", token);
        window.location.href = "/table";
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Tên người dùng
          </label>
          <ErrorMessage name="username" component="span" className="block text-red-600 mt-1 italic"/>
          <Field
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tên người dùng"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Mật khẩu
          </label>
          <ErrorMessage name="password" component="span" className="block text-red-600 mt-1 italic"/>
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Field
                type="checkbox"
                name="remember"
                id="remember"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Quên mật khẩu?
          </a>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Đăng nhập
        </button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
