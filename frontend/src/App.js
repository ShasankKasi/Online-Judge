import React from "react";
import Signup from "./components/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Forgot from "./components/Forgot";
// import otp from './components/otp';
import Verify from "./components/Verify";
import Admin from "./components/Admin";
import Question from "./components/Question";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import forgot from './Forgot';

const queryClient=new QueryClient(
  {
    defaultOptions:{
      queries:{
        staleTime:0,
      }
    }
  }
)
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
   <ReactQueryDevtools initialIsOpen={false}/>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/Question/:id" element={<Question />} />
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}
