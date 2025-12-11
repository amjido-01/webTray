"use client"
import React from "react";
import ReadyToSection from "./Ready-to-transform";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="">
      <div className="">
        <div className="pt-24 pb-16 px-4 sm:px-2 lg:px-0 bg-[#F9FAFE]">
          {/* Header Section */}
          <div className="sm:px-6 lg:px-8 text-center mb-16 ">
            <h1 className="mb-4 bg-[#D8DFFB] rounded-full text-[#365BEB] inline-block px-4 py-1 text-sm font-medium">
              All-in-One Business Platform
            </h1>
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 py-2">
              Get in Touch with{" "}
              <span className="bg-gradient-to-b from-[#365BEB] to-[#9233EA] bg-clip-text text-transparent">
                WebTray
              </span>
            </h1>
            <h1 className="px-10 text-gray-600">
              Have questions? We'd love to hear from you. Our team is here to
              help you grow your business.
            </h1>
          </div>
        </div>
        {/* Contact Section */}
        <div className=" mx-auto  px-4 sm:p lg:px-8 ">
          <div className="flex flex-col md:flex-row gap-4 p-6">
            {/* Contact Information */}
            <div className="space-y-4 md:w-[40%]">
              <div className="space-y-4 rounded-md shadow-sm p-4 ">
                <div className="flex items-center justify-start gap-2 space-y-2">
                  <Image
                    src="/contact/contact.png"
                    alt="contact"
                    width={50}
                    height={50}
                    className="w-8 h-8 "
                  />
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A] ">
                      Contact Information
                    </h2>
                    <p className="text-gray-600 ">
                      Reach out to us through any of these channels
                    </p>
                  </div>
                </div>

                {/* Email Address */}

                <div className="flex items-center justify-start gap-2 space-y-2 ">
                  <Image
                    src="/contact/mail-01.png"
                    alt="mail"
                    width={50}
                    height={50}
                    className="w-8 h-8 bg-[#D8DFFB] p-2 mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A] ">
                      Email Address
                    </h2>
                    <p className="text-[#0EA5E9] ">support@webtray.com</p>
                    <p className="text-[#4D4D4D]">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center justify-start gap-2 space-y-2 ">
                  <Image
                    src="/contact/call-02.png"
                    alt="mail"
                    width={50}
                    height={50}
                    className="w-8 h-8 bg-[#CDFBEC] p-2 mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A] ">
                      Phone Number
                    </h2>
                    <p className="text-[#10B981] ">+2348034657273</p>
                    <p className="text-[#4D4D4D]">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
              {/* Follow Us */}
              <div className="space-y-4 shadow-sm rounded-md p-4">
                <div className="flex items-center justify-start gap-2 space-y-2">
                  <Image
                    src="/contact/internet-blue.png"
                    alt="network"
                    width={50}
                    height={50}
                    className="w-8 h-8 "
                  />
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A] ">
                      Follow Us
                    </h2>
                    <p className="text-gray-600 ">
                      Stay connected on social media
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className=" flex bg-white shadow-sm items-center justify-center rounded-sm">
                    <Image
                      src="/contact/uit_facebook-f.png"
                      alt="facebook"
                      width={50}
                      height={50}
                      className="w-8 h-8 p-1"
                    />
                  </div>

                  <div className=" flex bg-white shadow-sm items-center justify-center rounded-sm">
                    <Image
                      src="/contact/streamline_linkedin.png"
                      alt="linkedin"
                      width={50}
                      height={50}
                      className="w-8 h-8 p-1 "
                    />
                  </div>

                  <div className=" flex bg-white shadow-sm items-center justify-center rounded-sm">
                    <Image
                      src="/contact/simple-icons_instagram.png"
                      alt="instagram"
                      width={50}
                      height={50}
                      className="w-8 h-8 p-1 "
                    />
                  </div>

                  <div className=" flex bg-white shadow-sm items-center justify-center rounded-sm">
                    <Image
                      src="/contact/prime_twitter.png"
                      alt="x"
                      width={50}
                      height={50}
                      className="w-8 h-8 p-1 "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl md:w-[60%] shadow-sm p-8">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible
              </p>

              <form className="space-y-6">
                {/* Full Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365BEB] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365BEB] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div></div>

                {/* Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365BEB] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your company name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365BEB] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us how we can help you"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365BEB] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#111827] text-white px-4 py-3 rounded-full transition-all font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="mt-16 ">
            <h2 className="lg:text-3xl text-xl font-bold text-center text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-center mb-2">
              Everything you need to know about our pricing
            </p>
            <div className="flex justify-center mt-8">
              <Image
                alt="icon"
                height={400}
                width={600}
                src="/Frame 34005.png"
                className=""
              />
            </div>
          </div>
        </div>

        <ReadyToSection />
      </div>
    </div>
  );
};

export default ContactUs;
