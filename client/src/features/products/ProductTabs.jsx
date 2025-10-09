import React, { useState } from "react";

const tabs = [
  "Description",
  "Specification",
  "Reviews",
  "Questions and Answers",
  "More Offers",
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("Description");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Embodying the Raw, Wayward Spirit of Rock 'N' Roll
              </h3>
              <p>
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo
                speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes
                the show on the road.
              </p>
            </div>

            <p>
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled
              engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is
              a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and
              extended highs for a sound that is both articulate and pronounced. The analogue knobs allow
              you to fine tune the controls to your personal preferences while the guitar-influenced
              leather strap enables easy and stylish travel.
            </p>

            <div className="overflow-hidden rounded-lg shadow-md max-w-4xl mx-auto">
              <img
                src="https://i.imgur.com/MNLR1pK.png"
                alt="Marshall Kilburn"
                className="w-full object-cover"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-600 text-sm md:text-base">
            <p>
              This is the <strong>{activeTab}</strong> content area. Replace with actual data as needed.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 font-sans">
      {/* Tabs Header */}
      <div className="border-b border-gray-300 mb-8">
        <ul className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-gray-700">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 transition-all duration-300 ease-in-out ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-700 font-semibold"
                    : "border-transparent hover:text-blue-600"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content with fade animation */}
      <div className="min-h-[200px] animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;
