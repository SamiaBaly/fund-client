export default function PaymentCancelPage() {
  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-red-50
    ">

      <div className="
        rounded-2xl
        bg-white
        p-10
        text-center
        shadow
      ">

        <h1 className="
          text-3xl
          font-bold
          text-red-600
        ">
          Payment Cancelled ❌
        </h1>


        <p className="mt-4 text-slate-600">
          Your payment was cancelled.
        </p>

      </div>

    </div>
  );
}