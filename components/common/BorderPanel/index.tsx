interface BorderPanelProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  className?: string;
  classNameTitle?: string;
  classNameSubTitle?: string;
  classNameChildren?: string;
}

export const BorderPanel = ({
  children,
  title,
  subTitle,
  className,
  classNameTitle,
  classNameSubTitle,
  classNameChildren,
}: BorderPanelProps) => {
  return (
    <div
      className={`flex h-fit flex-col gap-[15px] rounded-xl border border-border bg-background-info p-[15px] ${className}`}
    >
      {title && <p className={`text-accent ${classNameTitle}`}>{title}</p>}
      {subTitle && <p className={classNameSubTitle}>{subTitle}</p>}
      {children && (
        <div className={`text-main duration-300 ${classNameChildren ?? ''}`}>{children}</div>
      )}
    </div>
  );
};
