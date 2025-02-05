import { ReactNode } from "react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: ReactNode;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btm w-full bg-green-500"}
    >
      {isLoading ? (
        <p className="flex items-center gap-4 animate-pulse justify-center">
          Loading ...
        </p>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
