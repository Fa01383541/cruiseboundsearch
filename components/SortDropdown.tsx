import { useState, useRef, useEffect } from "react";

const sortOptions = [
  { value: "price-asc", label: "Price", sublabel: "Lowest first" },
  { value: "price-desc", label: "Price", sublabel: "Highest first" },
  { value: "date-asc", label: "Departure Date", sublabel: "Earliest first" },
  { value: "date-desc", label: "Departure Date", sublabel: "Latest first" },
  { value: "duration-asc", label: "Duration", sublabel: "Shortest first" },
  { value: "duration-desc", label: "Duration", sublabel: "Longest first" },
];

type SortDropdownProps = {
  sort: string;
  setSort: (value: string) => void;
};

export default function SortDropdown({ sort, setSort }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selected = sortOptions.find(opt => opt.value === sort);

  return (
    <div className="relative" ref={ref}>
      <button
        className="border-2 border-gray-300 w-60 cursor-pointer rounded-sm px-6 py-2 bg-white font-bold text-base flex flex-row justify-between items-center space-x-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <span className="flex flex-col items-start leading-tight">
        <span className="font-bold text-base">{selected ? selected.label : "Sort"}</span>
        <span className="text-xs text-gray-400 font-normal">{selected ? selected.sublabel : null}</span>
      </span>
      <svg className="w-4 h-4 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      </button>
      
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              className={`w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100 ${opt.value === sort ? "font-bold bg-gray-50" : ""}`}
              onClick={() => {
                setSort(opt.value);
                setOpen(false);
              }}
            >
              <div className="flex flex-col">
                <span>{opt.label}</span>
                <span className="text-xs text-gray-400">{opt.sublabel}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}