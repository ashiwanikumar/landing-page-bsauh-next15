import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 100); // Small delay to ensure clean redirect
  }, []);

  // Return a simple loading state while redirecting
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      },
    },
    "Redirecting..."
  );
}

// Add getStaticProps to ensure static generation
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
