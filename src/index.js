import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Coba from "./Coba";
import About from "./About";
import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Routees() {
  const [bill, setBill] = useState({
    nama: "",
    tujuan: "",
    kelas: "",
    harga: 0,
    jumlah: 0,
    diskonStr: "",
    diskon: 1,
  });
  function Home() {
    return (
      <>
        <Coba props={{ bill: bill, setBill: setBill }} />
      </>
    );
  }

  function Bill() {
    return (
      <>
        <About props={{ bill: bill, setBill: setBill }} />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/bill" Component={Bill} />
    </Routes>
  );
}

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routees />
    </BrowserRouter>
  </ChakraProvider>
);
