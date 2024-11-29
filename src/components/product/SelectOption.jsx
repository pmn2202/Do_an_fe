/* eslint-disable react/prop-types */

const SelectOption = ({ icons, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm cursor-pointer hover:bg-gray-800 hover:text-white hover:border-gray-800"
    >
      {icons}
    </div>
  );
};

export default SelectOption;
