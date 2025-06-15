
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="shadow-2xl border-0 w-full max-w-md bg-white/95">
        <CardContent className="py-16 flex flex-col items-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-base text-gray-700 mb-8 text-center">
            Your payment was received. Your order will be processed shortly.
          </p>
          <Button className="w-full" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
