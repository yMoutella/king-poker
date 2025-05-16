"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to Poker App</h1>
          <p className="text-lg text-gray-600 mb-6">
            The ultimate platform to play and enjoy poker with friends.
          </p>
          <Button className="px-6 py-3 text-lg" onClick={() => redirect('/login')}>Get Started</Button>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
              <p className="text-gray-600">
                Enjoy seamless gameplay with our intuitive interface.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
              <p className="text-gray-600">
                Play with friends or join global tournaments.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Feature 3</h2>
              <p className="text-gray-600">
                Track your progress and improve your skills.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}



