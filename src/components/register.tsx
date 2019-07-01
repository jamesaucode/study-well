import React, { useState } from "react";
import { handleResponse } from "../../services/fetch.service";
import { FormBottom } from "../styles/shared";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const maxFormWidth = "400px";

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const FormInput = styled.input`
  border: 1px solid #aaaaaa;
  border-radius: 2px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border: 1px solid #8610f9;
  }
`;
const FormWrapper = styled.div`
  width: ${maxFormWidth};
  height: fit-content;
  text-align: center;
`;
const FormSubmit = styled.button`
  color: white;
  font-size: 1em;
  font-weight: 600;
  width: 100%;
  border: none;
  border-radius: 3px;
  padding: 0.65rem;
  background: #8610f9;
  &:hover {
    cursor: pointer;
  }
`;

const Register = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch("/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
      .then(handleResponse)
      .then(json => {
        props.pushNotification(json.message, true);
      })
      .catch(error => {
        props.pushNotification(error.message, false);
      });
    console.log("Submitted");
  };

  return (
    <FormWrapper>
      <FormInput
        onChange={changeHandler}
        value={email}
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <FormInput
        onChange={changeHandler}
        value={password}
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <FormInput
        onChange={changeHandler}
        value={firstName}
        type="text"
        name="firstName"
        placeholder="First Name"
        required
      />
      <FormInput
        onChange={changeHandler}
        value={lastName}
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
      />
      <FormSubmit onClick={handleSubmit}>Sign Up!</FormSubmit>
      <FormBottom>
        New user ? <StyledLink onClick={props.toggleForm}>Login </StyledLink>
        here!
      </FormBottom>
    </FormWrapper>
  );
};

export default Register;