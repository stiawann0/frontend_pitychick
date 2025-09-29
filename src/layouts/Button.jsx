import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className="px-6 py-2 border-2 border-transparent text-white bg-[#d62828] hover:bg-[#b91c1c] hover:shadow-lg transition-all rounded-full">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
