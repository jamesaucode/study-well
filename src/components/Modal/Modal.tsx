import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Heading } from "../../styles/shared";
import Link from 'next/link';
import Login from '../../../pages/login';

const ModalStyle =
  "background: rgba(0,0,0,0.5);height: 100vh;width:100vw;position:fixed; top: 0; zIndex: 10;";

const ModalWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-height: 70vh;
  max-width: 888px;
  position: sticky;
  background: white;
  top: 25%;
  z-index: 100;
`;
const Modal = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const removeDiv = () => {
    if (divRef.current) {
      document.body.removeChild(divRef.current);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    const divEl = document.createElement("div");
    divEl.style.cssText = ModalStyle;
    console.log("Modal Mounted");
    document.body.appendChild(divEl);
    divRef.current = divEl;
    divRef.current.addEventListener("click", removeDiv);
    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("click", removeDiv);
        setIsOpen(false);
        // document.body.removeChild(divRef.current);
      }
      console.log('Unmounting');
    };
  }, []);
  return isOpen ? (
    <ModalWrapper>
        <Heading sub>Modal</Heading>
        <Login />
      {/* <Heading>Lmao</Heading> */}
      {/* <button onClick={removeDiv}>Close</button>
      <Link href="/">
          <a>Lmao</a>
      </Link> */}
    </ModalWrapper>
  ) : null;
};

export default Modal;
