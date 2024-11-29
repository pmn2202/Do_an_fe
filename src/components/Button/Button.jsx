/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "../loading/LoadingSpinner";
const Button = ({
  children,
  type = "button",
  className,
  onClick,
  kind = "primary",
  isLoading = false,
}) => {
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <button
      kind={kind}
      type={type}
      onClick={onClick}
      className={twMerge(
        kind === "primary" ? "bg-primary text-white" : "",
        kind === "secondary" ? "bg-secondary text-gray-900" : "",
        "rounded-sm px-6 py-1 flex items-center justify-center gap-2 text-base leading-10 hover:opacity-90",
        className
      )}
    >
      {child}
    </button>
  );
};

export default Button;
