interface BorderPanelProps {
  children: React.ReactNode;
  title?: string;
  classNameChildren?: string;
}

export const BorderPanel = ({ children, title, classNameChildren }: BorderPanelProps) => {
  return (
    <div className="flex h-fit flex-col gap-[15px] rounded-xl border border-border bg-background-info p-[15px]">
      {title && <p className="text-accent">{title}</p>}
      {children && (
        <div className={`text-main duration-300 ${classNameChildren ?? ''}`}>{children}</div>
      )}
    </div>
  );
};
