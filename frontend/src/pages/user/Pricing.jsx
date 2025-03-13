import React, { useState } from "react";
import { Check } from "lucide-react";
import { ImCross  } from "react-icons/im";
import { FaCheck  } from "react-icons/fa";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("annual");

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "For your hobby projects",
      features: [
        "Free e-mail alerts",
        "3-minute checks",
        "Automatic data enrichment",
        "10 monitors",
        "Up to 3 seats",
      ],
      buttonText: "Get started for free",
      buttonStyle: "border border-gray-500 text-gray-700",
    },
    {
      name: "Pro",
      price: "15",
      description: "Great for small businesses",
      popular: true,
      features: [
        "Unlimited phone calls",
        "30 second checks",
        "Single-user account",
        "20 monitors",
        "Up to 6 seats",
      ],
      buttonText: "Get started with Pro",
      buttonStyle: "bg-blue-600 text-white",
    },
    {
      name: "Enterprise",
      price: "25",
      description: "For multiple teams",
      features: [
        "Everything in Pro",
        "Up to 5 team members",
        "100 monitors",
        "15 status pages",
        "200+ integrations",
      ],
      buttonText: "Get started with Enterprise",
      buttonStyle: "border border-white text-white bg-black",
    },
  ];

  return (
    <section className="py-16 px-4 mb-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Plans and Pricing</h2>
        <p className="text-gray-600 mb-8">
          Receive unlimited credits when you pay yearly, and save on your plan.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-l-full ${
              billingCycle === "monthly" ? "bg-gray-100 text-gray-900" : "text-gray-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-r-full flex items-center gap-2 ${
              billingCycle === "annual" ? "bg-gray-100 text-gray-900" : "text-gray-500"
            }`}
          >
            Annual
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Save 35%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 border rounded-lg shadow-md ${plan.name === "Enterprise" ? "bg-black text-white" : "bg-white"}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-gray-500 ml-2">Per user/month, billed annually</span>
                )}
              </div>
              <p className="text-gray-500 mt-2">{plan.description}</p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <FaCheck  className="h-4 w-4 text-gray-500" /> 
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-6 w-full py-2 rounded-lg ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
