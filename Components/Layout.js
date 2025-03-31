import Sidebar from "@/Components/Sidebar";
import { menuItems } from "@/helpers/constants";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar menuItems={menuItems} />
      <main className="w-full col-span-5 xl:col-span-6 ">{children}</main>
    </div>
  );
};

export default Layout;
