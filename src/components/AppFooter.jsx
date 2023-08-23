import React from "react";

export default function AppFooter() {
  return (
    <footer className="p-10 flex gap-4 items-start bg-pink-50">
      <div>
        <div className="flex items-center">
          <img src="logo.svg" className="h-8 mr-3" alt="Logo" />
          <div className="font-bold text-2xl text-pink-500">CryptoMeow</div>
        </div>
        <div>Crypto Kitties-Group 8-8/2023</div>
      </div>
      <div className="ml-auto w-[300px] flex flex-col gap-3">
        <div className="font-bold text-lg">FOLLOW US</div>
        <div>Github</div>
        <div>Discord</div>
      </div>
      <div className="w-[300px] flex flex-col gap-3">
        <div className="font-bold text-lg">LEGAL</div>
        <div>Privacy Policy</div>
        <div>Terms & Conditions</div>
      </div>
    </footer>
  );
}
