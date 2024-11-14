import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password)
      return toast.error("Please fill all fields");

    try {
      await login({
        variables: {
          input: loginData,
        },
      });
      toast.success("Login successful");
    } catch (error) {
      console.error("Error: ", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex rounded-lg overflow-hidden z-50 bg-white shadow-lg">
        <div className="w-full min-w-[400px] sm:min-w-[500px] flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-4 text-black text-center">
              Login
            </h1>
            <h2 className="text-sm font-semibold mb-6 text-gray-600 text-center">
              Welcome back! Log in to your account
            </h2>
            <form className="space-y-9" onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-md hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {"Don't"} have an account?{" "}
                <Link
                  to="/signup"
                  className="text-black font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
