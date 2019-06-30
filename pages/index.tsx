import React, { useEffect, useState } from "react";
import Spinner from "../src/components/Spinner";
import { Layout, Heading } from "../src/styles/shared";
import { useUserData } from "../src/hooks/useUserData";
import { NextFC } from "next";
import { handleJSONResponse } from "../services/fetch.service";

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
        <Spinner />
      </Layout>
    );
  } else if (userData) {
    return (
      <Layout fadeIn>
        <Heading sub>
          Welcome. {userData.displayName}
        </Heading>
      </Layout>
    );
  } else {
    return (
      <Layout fadeIn>
        <Heading>You can sign in with you Google Account !</Heading>
      </Layout>
    );
  }
};

export default Index;
