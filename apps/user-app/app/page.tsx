"use client";

import { useRouter } from "next/navigation";

import { Home } from "../components/Home";

import AppbarClient from "../components/AppbarClient";
import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  const router = useRouter();

  if (!session.data) {
    return (
      <>
        {<AppbarClient />}
        <Home />
      </>
    );
  } else {
    router.push("/transfer");
  }
}
