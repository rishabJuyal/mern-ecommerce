import React from "react";
import { Facebook, Twitter, Globe, Linkedin } from "lucide-react";

const SocialShare = () => (
  <div className="flex space-x-3 mt-4 text-white text-sm">
    <a href="#" className="bg-blue-700 p-2 rounded"><Facebook size={16} /></a>
    <a href="#" className="bg-sky-500 p-2 rounded"><Twitter size={16} /></a>
    <a href="#" className="bg-red-600 p-2 rounded"><Globe size={16} /></a>
    <a href="#" className="bg-blue-900 p-2 rounded"><Linkedin size={16} /></a>
  </div>
);

export default SocialShare;
