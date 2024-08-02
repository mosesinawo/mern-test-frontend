import "./button.css";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  primary?: boolean;

  backgroundColor?: string;

  size?: "small" | "medium" | "large";

  label: string;

  onClick?: () => void;
}


export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  type,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type={type ? type : "button"}
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
