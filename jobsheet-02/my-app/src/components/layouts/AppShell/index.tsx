import Navbar from "../navbar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
      <br />
      <div><strong><i>footer</i></strong>
        
      </div>
    </main>
  );
};

export default AppShell;
