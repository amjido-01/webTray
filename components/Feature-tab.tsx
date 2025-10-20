"use client"
import { Icon } from 'lucide-react'
import Image from 'next/image'
import { title } from 'process'
import { useState } from 'react'
import ReadyToSection from './Ready-to-transform'

const tabs = [
  {
    name: 'Inventory',
    img: '/icons/cube.png',
     iconbg: "bg-[#F9FAFE]",
    color: 'bg-blue-700',
    border: 'border-blue-700',
    cards: [
      {
        title: 'Real-Time Stock Tracking',
        description: 'Monitor inventory levels across all locations in real-time with automatic updates on every sale and purchase',
        icon: '/icons/blue-cube.png',
        features: ['✓ Live stock level monitoring',
           '✓ Multi-location inventory sync',
           '✓ Barcode scanning support',
           '✓ Batch and serial number tracking',
          ],
      },
      {
        title: 'Smart Reordering System',
        description: 'Never run out of stock with intelligent reorder points and automated purchase order generation..',
          icon: '/features/notebook-02.png',
        features: ['✓ Automatic low stock alerts', 
          '✓ Customizable reorder points',
          '✓ Supplier management system',
          '✓ Purchase order automation',
        ],
      },
      {
        title: 'Inventory Analytics',
        description: 'Get deep insights into inventory performance, turnover rates, and profitability by product.',
        icon: '/features/analysis-text-link-blue.png',
        features: ['✓ Stock turnover analysis', 
          '✓ Product performance metrics',
          '✓ Dead stock identification',
          '✓ Profitability reports',
        
        ],
      },
      {
        title: 'Inventory Auditing',
        description: 'Maintain accurate records with comprehensive audit trails and stock adjustment tracking.',
        icon: '/features/shield-02.png',
        features: ['✓ Complete transaction history', '✓ Stock adjustment tracking', '✓ Cycle counting support', '✓ User action logs'],
      },
    ],
  },
  {
    name: 'E-commerce',
    img: '/icons/flash.png',
    color: 'bg-[#9233EA]',
     iconbg: "bg-purple-200",
    border: 'border-[#9233EA]',
    cards: [
      {
        title: 'Beautiful Storefronts',
        description: 'Create stunning online stores with customizable themes and mobile-responsive designs.',
        icon: '/features/store-01.png',
        features: ['✓ Professional themes library', '✓ Drag-and-drop customization', '✓ Mobile-first design', '✓ Brand customization tools'],
      },
      {
        title: 'Order Management',
        description: 'Manage all your orders in one place.',
        icon: '/features/internet.png',
        features: ['✓ Automatic low stock alerts', '✓ Customizable reorder points', '✓ Supplier management system', '✓ Purchase order automation'],
      },
      {
        title: 'Advanced Shopping Cart',
        description: 'Provide seamless checkout experience with cart persistence and multiple payment options.',
        icon: '/features/shopping-cart-02.png',
        features: ['✓ Persistent shopping cart', '✓ Guest checkout option', '✓ Discount code system', '✓ Shipping calculator'],
      },
      {
        title: 'Social Commerce',
        description: 'Sell directly on social media platforms with integrated product catalogs and checkout.',
        icon: '/features/smart-phone-01.png',
        features: ['✓ WhatsApp catalog integration', '✓ Instagram Shopping support', '✓ Facebook shop sync', '✓ Social media auto-posting'],
      },
    ],
  },
  {
    name: 'Analytics',
    img: '/icons/analysis-text-link.png',
    color: 'bg-[#10B981]',
    iconbg: "bg-[#CDFBEC]",
    border: 'border-[#10B981]',
    cards: [
      {
        title: 'Sales Analytics',
        description: 'Comprehensive sales reports with revenue tracking, order analysis, and performance metrics.',
        icon: '/features/analysis-text-link-green.png',
        features: ['✓ Real-time revenue dashboard', '✓ Sales trend analysis', '✓ Product performance reports', '✓ Channel comparison analytics'],
      },
      {
        title: 'Customer Insights',
        description: 'Understand customer behavior, preferences, and lifetime value with detailed analytics.',
        icon: '/features/user-multiple-green.png',
        features: ['✓ Customer lifetime value', '✓ Purchase behavior analysis', '✓ Customer segmentation', '✓ Retention rate tracking'],
      },

      {
        title: 'Business Intelligence',
        description: 'Make data-driven decisions with advanced forecasting and predictive analytics.',
        icon: '/features/flash-green.png',
        features: ['✓ Sales forecasting', '✓ Demand prediction', '✓ Profit margin analysis', '✓ Custom report builder'],
      },
            {
        title: 'Traffic Analytics',
        description: 'Monitor website traffic, visitor behavior, and conversion rates across all channels.',
        icon: '/features/internet-green.png',
        features: ['✓ Visitor tracking dashboard', '✓ Conversion rate optimization', '✓ Traffic source analysis', '✓ Bounce rate tracking'],
      },
    ],
  },
  {
    name: 'Payments',
    img: '/icons/credit-card-pos.png',
    color: 'bg-[#F59E0B]',
     iconbg: "bg-[#FDF0D9]",
    border: 'border-[#F59E0B]',
    cards: [
      {
        title: 'Multiple Payment Methods',
        description: 'Accept payments through various channels including cards, bank transfers, and mobile money.',
        icon: '/features/card-exchange-02-orange.png',
        features: ['✓ Paystack integration', '✓ Flutterwave support', '✓ Bank transfer confirmation', '✓ Cash on delivery option'],
      },
      {
        title: 'Secure Transactions',
        description: 'Enterprise-grade security with PCI compliance and fraud protection for all transactions.',
        icon: '/features/shield-02-orange.png',
        features: ['✓ PCI DSS compliant', '✓ SSL encryption', '✓ Fraud detection system', '✓ 3D Secure authentication'],
      },
      {
        title: 'Payment Analytics',
        description: 'Track payment success rates, failed transactions, and revenue by payment method.',
        icon: '/features/analysis-text-link-orange.png',
        features: ['✓ Payment success tracking', '✓ Failed payment analysis', '✓ Revenue by payment method', '✓ Settlement reports'],
      },
      {
        title: 'Instant Settlements',
        description: 'Fast payment settlements with automatic reconciliation and detailed transaction reports.',
        icon: '/features/flash-orange.png',
        features: ['✓ T+1 settlement cycle', '✓ Automatic reconciliation', '✓ Transaction history export', '✓ Refund management'],
      },
    ],
  },
  {
    name: 'Integrations',
    img: '/icons/flash.png',
    color: 'bg-[#0EA5E9]',
     iconbg: "bg-[#F7FCFF]",
    border: 'border-[#0EA5E9]',
    cards: [
      {
        title: 'WhatsApp Business',
        description: 'Connect directly with customers through WhatsApp with automated order updates and catalog sync.',
        icon: '/features/message-01-logh.png',
        features: ['✓ WhatsApp catalog sync', 
          '✓ Automated order notifications',
          '✓ Customer support chat',
          '✓ Broadcast messaging',
        ],
      },
      {
        title: 'Delivery Partners',
        description: 'Integrate with major logistics providers for seamless order fulfillment and tracking.',
        icon: '/features/shipping-truck-01-light.png',
        features: ['✓Multiple courier integration', 
          '✓ Real-time tracking',
          '✓ Automated dispatch',
          '✓ Delivery cost calculator',
        ],
      },
      {
        title: 'WhatsApp Business',
        description: 'Connect directly with customers through WhatsApp with automated order updates and catalog sync.',
        icon: '/features/smart-phone-01-light.png',
        features: ['✓ WhatsApp catalog sync', 
          '✓ Automated order notifications',
          '✓ Customer support chat',
          '✓ Broadcast messaging',
        ],
      },
      {
        title: 'API & Webhooks',
        description: 'Connect with third-party tools and build custom integrations with our developer-friendly API.',
        icon: '/features/flash-light.png',
        features: ['✓ RESTful API access', 
          '✓ Webhook notifications',
          '✓ Developer Documentation',
          '✓ Sandbox environment',
        ],
      },
    ],
  },
]
const choose = [
  {title: 'Easy to Use', description: 'Intuitive interface designed for business owners, not technical experts. Get started in minutes.', Icon: '/features/flash-green.png', iconbg: "bg-[#CDFBEC]" },
  {title: 'Secure & Reliable', description: 'Bank-level security with 99.9% uptime guarantee. Your data and customers are protected.', Icon: '/features/shield-02.png', iconbg: "bg-[#D8DFFB]" },
  {title: 'Local Support', description: 'Dedicated Nigerian customer support team ready to help you succeed every step of the way.', Icon: '/features/share-knowledge.png', iconbg: "bg-[#FDF0D9]" },
]
const perfect = [
  {title: 'Retail Stores', description: 'Fashion, electronics, groceries, and more', Icon: '/features/flash-green.png', iconbg: "bg-[#C7EBFC]" },
  {title: 'Restaurants', description: 'Online ordering and menu management', Icon: '/features/shield-02.png', iconbg: "bg-[#D8DFFB]" },
  {title: 'Online Vendors', description: 'Social media sellers going professional', Icon: '/features/shopping-basket-01.png', iconbg: "bg-[#FDF0D9]" },
  {title: 'Service Providers', description: 'Salons, spas, and professional services', Icon: '/features/user-multiple-green.png', iconbg: "bg-[#CDFBEC]" },
]

const FeatureTab = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]) 

  return (
    <div className=''>

    <div className="pt-24 pb-16 px-4 sm:px-2 lg:px-0 bg-[#F9FAFE]">
      {/* Header Section */}
      <div className="sm:px-6 lg:px-8 text-center mb-16 ">
        <h1 className="mb-4 bg-[#D8DFFB] rounded-full text-[#365BEB] inline-block px-4 py-1 text-sm font-medium">
          All-in-One Business Platform
        </h1>
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 py-2">
          Everything Your Business
          <br />
          <span className="bg-gradient-to-b from-[#365BEB] to-[#9233EA] bg-clip-text text-transparent">
            Needs to Thrive
          </span>
        </h1>
        <h1 className="px-10 text-gray-600">
          WebTray combines powerful inventory management, e-commerce, analytics, and more into one seamless platform designed for African SMEs.
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button className="bg-[#111827] text-white px-4 rounded-full text-sm p-3">
            Get Started for Free
          </button>
          <button className="border border-[#111827] text-[#111827] text-sm rounded-full p-3">
            View Pricing
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <h2 className="lg:text-3xl text-xl font-bold text-center text-gray-900 mb-2 mt-8">
        Explore Features by Category
      </h2>
      <p className="text-center mb-8">
        Comprehensive tools for every aspect of your business
      </p>


    </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
        {tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center text-center text-sm cursor-pointer hover:scale-105 transition-transform gap-2 px-4 py-2 rounded-sm ${
              activeTab.name === tab.name
                ? `${tab.color} text-white`
                : '  text-[#4D4D4D]'
            }`}
          >
            <Image
              alt={tab.name}
              height={50}
              width={50}
              src={tab.img}
              className="w-4 h-4 "
            />
            <h3 className="text-base font-semibold">{tab.name}</h3>
          </div>
        ))}
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 px-8 mx-auto">
        {activeTab.cards.map((card, idx) => (
          <div
            key={idx}
            className={`border ${activeTab.border} rounded-xl space-y-3 px-2 py-4 bg-white shadow-sm hover:shadow-md transition`}
          >
            <div className="flex flex-col justify-start gap-3 mb-3">
              <div   className={` rounded-sm `}>

              <Image
                alt={card.title}
                height={50}
                width={50}
                src={card.icon}
                className={`w-8 h-8 ${activeTab.iconbg} rounded-sm p-2` }
                />
                </div>
              <h4 className="text-lg font-bold">{card.title}</h4>
            </div>
            <div className="py-2 ">

            <p className="text-sm  text-gray-600 mb-8">{card.description}</p>
            <ul className="text-sm space-y-3 text-gray-700 ">
              {card.features.map((feature, fIndex) => (
                <li key={fIndex}>{feature}</li>
              ))}
            </ul>
              </div>
          </div>
        ))}
      </div>
      <div className='px-6'>
        
       <h2 className="lg:text-3xl text-xl font-bold text-center text-gray-900 mb-2 mt-8">
Why Choose WebTray?      </h2>
      <p className="text-center mb-8">
Built specifically for African businesses with features that matter      </p>
          {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 px-8  mx-auto">
        {choose.map((card, i) => (
          <div
          key={i}
          className={`border  rounded-xl space-y-3 px-2 py-4 bg-white shadow-sm hover:shadow-md transition`}
          >
            <div className="flex flex-col justify-start gap-3 mb-3">
              <div   className={` rounded-sm `}>

              <Image
                alt={card.title}
                height={50}
                width={50}
                src={card.Icon}
                className={`w-8 h-8 ${card.iconbg} rounded-sm p-2` }
                />
                </div>
              <h4 className="text-sm font-bold">{card.title}</h4>
            </div>
            <div className="py-1 ">

            <p className="text-[12px] text-gray-600 mb-8">{card.description}</p>
         
              </div>
          </div>
        ))}
      </div>
        </div>
      <div className='px-6'>
        
       <h2 className="lg:text-3xl text-xl font-bold text-center text-gray-900 mb-2 mt-8">
       Perfect for Every Business
      </h2>
      <p className="text-center mb-8">
       Trusted by hundreds of businesses across Nigeria
      </p>
          {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 px-8  mx-auto">
        {perfect.map((card, i) => (
          <div
          key={i}
          className={`border flex flex-col items-center justify-center  rounded-xl space-y-3 px-2 py-4 bg-white shadow-sm hover:shadow-md transition`}
          >
            <div className="flex flex-col justify-start gap-3 mb-3">
              <div   className={` flex items-center justify-center rounded-sm `}>

              <Image
                alt={card.title}
                height={50}
                width={50}
                src={card.Icon}
                className={`w-8 h-8 ${card.iconbg} rounded-sm p-2` }
                />
                </div>
              <h4 className="text-sm font-bold">{card.title}</h4>
            </div>
            <div className="py-1 ">

            <p className="text-[12px] text-gray-600 mb-8">{card.description}</p>
         
              </div>
          </div>
        ))}
      </div>
        </div>
        <ReadyToSection/>
    </div>
  )
}

export default FeatureTab
