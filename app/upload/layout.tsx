export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning className="h-[91vh] mx-auto lg:py-16 max-w-7xl lg:px-20 bg-background dark:bg-background/95">
      {children}
    </div>
  );
}
