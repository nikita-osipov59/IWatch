interface BorderPanelProps {
  children: React.ReactNode;
  title?: string;
}

export const BorderPanel = ({ children, title }: BorderPanelProps) => {
  return (
    <div className="flex h-fit w-fit flex-col gap-[15px] rounded-xl border border-border bg-background-info p-[15px]">
      {title && <p className="text-accent">{title}</p>}
      {children && <div className="text-main duration-300">{children}</div>}
    </div>
  );
};
