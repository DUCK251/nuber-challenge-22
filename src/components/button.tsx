import React from "react";

interface IButtonProps {
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({ loading, actionText }) => (
  <button
    className={`focus:outline-none text-white py-3  transition-colors rounded-3xl bg-blue-600 hover:bg-blue-700`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
