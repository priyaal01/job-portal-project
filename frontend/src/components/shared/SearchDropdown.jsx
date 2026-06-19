import { Search} from "lucide-react";

const SearchDropdown = () => {
  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-full shadow-xl border border-gray-200 p-2 z-50">
      <div className="flex items-center">

        {/* Job Type */}
        <div className="flex items-center px-5 border-r border-gray-200">
          <select className="outline-none text-gray-500 bg-transparent">
            <option>Select job type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
          </select>

          
        </div>

        {/* Keyword */}
        <input
          type="text"
          placeholder="Enter keyword / designation / companies"
          className="flex-1 px-5 outline-none"
        />

        {/* Location */}
        <div className="border-l border-gray-200 px-5">
          <input
            type="text"
            placeholder="Enter location"
            className="outline-none"
          />
        </div>

        {/* Search Button */}
        <button className="bg-gradient-to-b from-green-500 to-green-400 text-white px-8 py-4 rounded-full flex items-center gap-2">
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchDropdown;