import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AppContactForm from '@/components/AppContactForm';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

// Assets
import Logo from '@public/img/logo.png';
import Banner from '@public/img/banner-1.png';
import Feature1 from '@public/img/banner-2.png';
import Feature2 from '@public/img/banner-3.png';
import Feature3 from '@public/img/banner-4.png';

const Page = () => {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white py-4 shadow-sm">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Logo" quality={100} width={48} height={48} />
            <span className="ml-4 text-2xl font-bold">AttendEase</span>
          </Link>
          <Button variant="default" className="rounded-lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Banner Section */}
        <section className="container text-center py-16">
          <Image
            src={Banner}
            width={559}
            height={537}
            alt="Event Management Banner"
            className="mx-auto mb-10"
          />
          <h1 className="text-4xl font-bold leading-10 mb-7">
            Seamless Event Check-ins with AttendEase
          </h1>
          <p className="text-md font-medium leading-7 mb-10">
            Welcome to AttendEase, your trusted solution for streamlined event check-ins and
            management. Ensure every aspect of your event runs smoothly and efficiently.
          </p>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <h3 className="text-3xl font-bold mb-10 text-center">
            AttendEase Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[Feature1, Feature2, Feature3].map((feature, index) => (
              <div key={index} className="rounded-lg bg-gray-100 p-6">
                <div className="relative h-40 mb-4">
                  <Image src={feature} alt={`Feature ${index + 1}`} fill objectFit="cover" />
                </div>
                <h5 className="text-sm text-blue-500 mb-2">Feature #{index + 1}</h5> 
                <h4 className="text-lg font-medium mb-4">
                  {["QR Code Attendance", "Attendance Monitoring", "Student Data Insights"][index]}
                </h4>
                <p>
                  {[
                    " Simplify attendance tracking with QR code check-ins. Quickly scan students as they arrive, ensuring an efficient and accurate record of their attendance in real time.",
                    "Monitor students' attendance and other essential data with ease. Parents can stay informed about their children’s presence at school, ensuring they know if their child is attending classes or not.",
                    "  Gain valuable insights into student attendance patterns and other critical data. Help parents monitor their children’s school engagement and ensure accountability for their education."
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="container text-center py-16">
          <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
          <p className="text-md leading-7 mb-16">
            Reach out to us with any questions, feedback, or inquiries. Our team is here to assist
            you and ensure your events are a success.
          </p>
          <AppContactForm />
          <div className="mt-10 border-t pt-6">
            <ul className="space-y-4">
              <li>
                <Link href="mailto:support@attendease.com" className="font-medium text-primary-600">
                  support@attendease.com
                </Link>
              </li>
              <li>
                <span className="font-medium text-gray-600">National Highway, New Pandan, Philippines, AH26, Panabo, 8105 Davao del Norte</span>
              </li>
              <li>
                <ul className="inline-flex space-x-4 text-gray-500">
                  {[Facebook, Twitter, Instagram, MessageCircle].map((Icon, idx) => (
                    <li key={idx} className="inline-block">
                      <Link href="/" target="_blank">
                        <Icon />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center bg-gray-50">
        <div className="flex justify-center items-center">
          <Image src={Logo} alt="Logo" width={32} height={32} />
          <span className="ml-2 text-sm text-gray-500">
            © {new Date().getFullYear()} AttendEase
          </span>
        </div>
      </footer>
    </>
  );
};

export default Page;
