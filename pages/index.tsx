import React, { useEffect, useState } from "react";
import { Layout, Heading } from "../src/styles/shared";
import { NextFC } from "next";
import SVG from "react-inlinesvg";
// import MainLogo from "../static/icons/mainlogo.svg";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "../src/components/NavBar";

const Wrapper = styled.section`
  font-size: calc(0.35vw + 16px);
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 2em;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;
const IndexHeading = styled(Heading)`
  color: ${({ theme }) => theme.mainfc};
  letter-spacing: 1.1px;
  text-align: left;
`;
const Paragraph = styled.p`
  color: ${({ theme }) => theme.fcFade};
  font-size: 0.8em;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 1rem;
`;
const TextBox = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1.5;
  flex-direction: column;
  margin: 2rem 0;
`;
const Button = styled.button`
  background-color: #3140f1;
  border: none;
  border-radius: 3px;
  padding: 0.75em 1.5em;
  font-size: 0.7em;
  font-weight: 400;
  color: #fff;
  transition: 0.5s ease-out background-color;
  &:hover {
    cursor: pointer;
  }
`;

const Index: NextFC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return <Layout />;
  } else {
    return (
      <>
        <NavBar />
        <Layout fadeIn>
          <Wrapper>
            <TextBox>
              <IndexHeading>The web application for students.</IndexHeading>
              <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem nam quasi suscipit, minus culpa officiis
                deleniti sequi, ullam at molestiae consequuntur! Libero
                minus exercitationem rerum nesciunt doloribus neque commodi
                fugiat.
              </Paragraph>
              <Link href="/login">
                <Button>Start Studying</Button>
              </Link>
            </TextBox>
            <SVG
              className="main-logo"
              src="/static/images/mainlogo.svg"
            />
          </Wrapper>
        </Layout>
      </>
    );
  }
};

export default Index;
