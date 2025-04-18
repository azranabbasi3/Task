"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import Link from "next/link";
import { apiEndPoint } from "@/app/utils/apiEndPoint";
import { notify } from "@/app/utils/Notify";
import { LoginSchema } from "@/app/schemas/schema";

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${apiEndPoint}/login`, values);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", values.email);
        formik.resetForm();
        router.push("/pages/profile");
        notify("success", "login succesful");
      } catch (error) {
        notify("error", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white cursor-pointer font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/pages/auth/signup"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
