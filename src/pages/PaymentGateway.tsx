
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentGateway = () => {
  const navigate = useNavigate();

  // Simulate payment processing then redirect to success
  const handlePayNow = () => {
    // Add optional: Show loading, timeout, etc.
    setTimeout(() => {
      navigate("/payment-success");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="shadow-2xl border-0 w-full max-w-xl bg-white/95">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-4xl font-bold flex justify-center items-center gap-3 text-blue-900">
            <span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/PhonePe-Logo.png" alt="PhonePe" className="h-10 inline" />
            </span>
            PhonePe Payment
          </CardTitle>
          <p className="text-gray-700 text-lg mt-2">UPI Payment Gateway (Dummy)</p>
        </CardHeader>
        <CardContent className="p-8 text-center space-y-7">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl text-blue-800">Pay to UPI: <span className="font-bold">dummy@upi</span></p>
            <p className="text-green-600 text-xl font-semibold">₹3,500</p>
            <div className="bg-blue-50 p-4 rounded-lg text-gray-700 my-2">
              <span className="font-medium">Scan QR or click Pay Now to simulate payment.</span>
            </div>
            {/* Dummy QR */}
            <div className="bg-white rounded-lg border border-gray-200 shadow p-4">
              <div className="w-36 h-36 bg-gray-100 flex items-center justify-center text-6xl text-blue-300">📱</div>
            </div>
          </div>
          <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white" onClick={handlePayNow}>
            Pay Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentGateway;
