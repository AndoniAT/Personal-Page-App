import clsx from "clsx";

interface CustomProps extends React.AllHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
  }

export default function CustomSection({ children, className, ...rest }: CustomProps) {
    return (
      <div
        {...rest}
        className={clsx(
          className
        )}
        id="resumePageCustom"
      >
        {children}
      </div>
    );
  }