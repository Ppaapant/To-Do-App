import AppBar from "../AppBar/AppBar";



interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto">
      <AppBar />
      {children}
    </div>
  );
}