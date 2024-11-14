import { useState } from "react";
import { Link } from "react-router-dom";
import RadioButton from "@/components/RadioButton";
import InputField from "@/components/InputField";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "@/graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({
        variables: {
          input: signUpData,
        },
      });
      toast.success("Sign Up successful");
    } catch (error) {
      console.error("Error: ", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-100 shadow-lg">
        <div className="w-full min-w-[400px] sm:min-w-[500px] flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-4 text-black text-center">
              Sign Up
            </h1>
            <h2 className="text-sm font-semibold mb-6 text-gray-600 text-center">
              Join to keep track of your expenses
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="name"
                name="name"
                value={signUpData.name}
                onChange={handleChange}
              />
              <InputField
                label="Username"
                id="username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
              />
              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={signUpData.password}
                onChange={handleChange}
              />
              <div className="flex gap-10">
                <RadioButton
                  id="male"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id="female"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-md hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black font-semibold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
