"use client";

import { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess";


export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess/>
    </Suspense>
  );
}