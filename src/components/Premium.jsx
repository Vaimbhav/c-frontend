import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
    {
        tier: 'STARTUP',
        price: '$4999',
        label: 'Expand',
        duration: '3-day full-time',
        highlights: [
            'Top-tier experts, 3-day full-time dedication (UI/UX/Product/Dev)',
            'Daily design progress & Zoom calls',
            'Projects handled from start to finish',
        ],
    },
    {
        tier: 'INTERMEDIATE',
        price: '$9999',
        label: 'Scale',
        duration: '5-day full-time',
        highlights: [
            'Top-tier experts, 5-day full-time dedication (UI/UX/Product/Dev)',
            'Daily design progress & Zoom calls + Jira',
            'Projects handled from start to finish',
        ],
    },
    {
        tier: 'ADVANCE',
        price: '$14999',
        label: 'Thrive',
        duration: '7-day full-time',
        highlights: [
            'Top-tier experts, 7-day full-time dedication (UI/UX/Product/Dev)',
            'Daily design progress & Zoom calls + Jira + Live Progress view',
            'Projects handled from start to finish',
        ],
    },
];

const PricingPage = () => {
    const [visible] = useState(true);
    if (!visible) return null;

    return (
        <div className="pt-24 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen px-4 sm:px-6 lg:px-8 relative">

            <Link
                to="/"
                className="fixed top-20 right-4 text-gray-700 hover:text-red-500 z-50"
            >
                <X size={28} />
            </Link>


            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">Clear terms, happy clients.</h1>
                <p className="text-gray-700 max-w-3xl mx-auto">
                    Unlock premium support and dedicated design services for $10k/month. Access expert
                    product designers, developers, and motion graphics specialists every day.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 text-sm">{index + 1}</span>
                                <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                                    {plan.label}
                                </span>
                            </div>
                            <h2 className="text-lg font-semibold uppercase mb-2">{plan.tier}</h2>
                            <p className="text-2xl font-bold mb-2">{plan.price}<span className="text-sm font-normal">/month</span></p>
                            <ul className="mb-4 space-y-2 text-sm text-gray-700">
                                {plan.highlights.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-blue-600">✔</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className="mb-6 text-sm text-gray-700 space-y-2">
                                <li className="flex items-start gap-2">✔ Customizable workload</li>
                                <li className="flex items-start gap-2">✔ Pay-as-you-go or subscription</li>
                                <li className="flex items-start gap-2">✔ No lock-in, cancel easily</li>
                                <li className="flex items-start gap-2">✔ Unlimited Revisions</li>
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 mb-2">
                                Book a Call Now
                            </button>
                            <p className="text-center text-xs text-gray-500">or <span className="underline">Send an email</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
