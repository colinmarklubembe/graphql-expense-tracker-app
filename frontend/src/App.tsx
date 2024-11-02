import { Navigate, Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignUpPage,
  NotFoundPage,
  TransactionPage,
} from "@/pages";
import Header from "@/components/ui/header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            !data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
