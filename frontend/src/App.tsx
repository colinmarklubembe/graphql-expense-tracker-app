import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignUpPage,
  NotFoundPage,
  TransactionPage,
} from "@/pages";
import Header from "@/components/ui/header";

function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
