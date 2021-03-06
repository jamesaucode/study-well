import React, { useEffect, useState } from "react";
import Loading from "../src/components/Loading";
import { Layout, HeadingBase } from "../utils/style";
import { useUserData } from "../src/hooks/useUserData";
import { NextFC } from "next";
import NavBar from "../src/components/NavBar";

const Index: NextFC = (props: any) => {
  const [loading, setLoading] = useState(true);
  const userData = useUserData();
  console.log(props);
  useEffect(() => {
    setLoading(false);
  }, [userData]);

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  } else {
    return (
      <>
        <NavBar />
        <Layout fadeIn>
          <HeadingBase sub>
            {userData
              ? `Welcome. ${userData.displayName}`
              : `You can sign in with your Google Account !`}
          </HeadingBase>
        </Layout>
      </>
    );
  }
};

export default Index;
