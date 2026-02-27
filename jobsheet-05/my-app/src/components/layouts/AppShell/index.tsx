import Navbar from "../navbar";
import Footer from "../footer";
import { useRouter } from "next/router";

const disableNavbar = ['/auth/login', '/auth/register'];

type AppShellProps = {
  children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;

