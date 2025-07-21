import React from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury cars on Rent{" "}
      </h1>

      <form className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">

      <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <div>
               <select required>
                    <option value="">Pickup location</option>
                    {cityList.map((city) => <option value={city} key={city}>{city}</option>)}
               </select>
               <p className="px-1 text-sm text-gray-500">Please select location</p>
          </div>
      </div>

      </form>

      <img src={assets.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;
