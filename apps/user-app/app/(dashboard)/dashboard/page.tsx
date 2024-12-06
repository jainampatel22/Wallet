"use client";

import React from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { ArrowRight, BarChart2, Lock, Smartphone } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function WalletDashboard() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white bg-opacity-90 backdrop-blur-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-indigo-600">Wallet</span>
        </div>
        {status === "loading" ? (
          <Button disabled className="bg-gray-300 text-white rounded-full px-6">
            Loading...
          </Button>
        ) : session ? (
          <Button
            onClick={() => signOut()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => signIn()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6"
          >
            Join Us
          </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Smart Money Management
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Empower your financial journey with Wallet. Seamless transactions, insightful analytics, and unparalleled security.
          </p>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg px-8 py-6 rounded-full hover:shadow-lg transition duration-300">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <Smartphone className="h-12 w-12 text-indigo-500" />,
              title: "Mobile First",
              description: "Manage your finances on the go with our intuitive mobile app.",
            },
            {
              icon: <Lock className="h-12 w-12 text-purple-500" />,
              title: "Secure Transactions",
              description: "Bank-level encryption keeps your financial data safe and secure.",
            },
            {
              icon: <BarChart2 className="h-12 w-12 text-pink-500" />,
              title: "Insightful Analytics",
              description: "Gain valuable insights into your spending habits and financial health.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition duration-300"
            >
              <CardContent className="pt-10 pb-8">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-4 inline-block mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Testimonials Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              What Our Users Say
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Small Business Owner",
                quote:
                  "Wallet has revolutionized how I manage my business finances. It's intuitive, powerful, and saves me hours each week.",
                  image:"data:image/jpeg;base64,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"
              },
              {
                name: "Sarah Lee",
                role: "Freelance Designer",
                quote:
                  "As a freelancer, keeping track of expenses and invoices was a nightmare. Wallet made it simple and stress-free.",
                  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9z2IpZagy0I6RWL80m6dFmz60PsauqPR9Bw&s"
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition duration-300"
              >
                <CardContent className="p-8">
                <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full mx-auto mb-6 shadow-md"
          />
                  <p className="text-gray-600 italic mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="text-gray-800 font-semibold">
                    {testimonial.name}, {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
