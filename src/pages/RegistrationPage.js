"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Building2, User } from "lucide-react";

export default function RegistrationPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //   const router = useRouter()

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleMetaMaskLogin = async () => {
    if (!selectedRole) {
      setError("Please select a role before proceeding.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          // Here you would typically send the account address and selected role to your backend
          console.log(
            `Logged in with address: ${accounts[0]} as ${selectedRole}`
          );

          // Redirect to the appropriate dashboard
          //   router.push(selectedRole === 'company' ? '/company-dashboard' : '/voter-dashboard')
        } else {
          setError(
            "No accounts found. Please make sure you are connected to MetaMask."
          );
        }
      } else {
        setError("MetaMask is not installed. Please install it to continue.");
      }
    } catch (err) {
      setError(
        "An error occurred while connecting to MetaMask. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Join Crowdsourced</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card
          className={`bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer ${
            selectedRole === "company" ? "ring-2 ring-purple-500" : ""
          }`}
          onClick={() => handleRoleSelection("company")}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <Building2 className="w-16 h-16 mb-4 text-purple-400" />
            <h2 className="text-xl font-semibold mb-2">I'm a Company</h2>
            <p className="text-center text-gray-400">
              Post surveys, get insights, and contribute to the reward vault
            </p>
          </CardContent>
        </Card>

        <Card
          className={`bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer ${
            selectedRole === "voter" ? "ring-2 ring-purple-500" : ""
          }`}
          onClick={() => handleRoleSelection("voter")}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <User className="w-16 h-16 mb-4 text-purple-400" />
            <h2 className="text-xl font-semibold mb-2">I'm a Voter</h2>
            <p className="text-center text-gray-400">
              Answer surveys, earn rewards, and make your voice heard
            </p>
          </CardContent>
        </Card>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Button
        className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4"
        onClick={handleMetaMaskLogin}
        disabled={isLoading || !selectedRole}
      >
        {isLoading ? "Connecting..." : "Connect with MetaMask"}
      </Button>

      <p className="mt-8 text-gray-400 text-center">
        By connecting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
