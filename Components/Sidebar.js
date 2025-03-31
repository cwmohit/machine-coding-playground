import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, File } from "lucide-react";
import { useRouter } from "next/router";

const Sidebar = ({ menuItems }) => {
  const router = useRouter();
  
  return (
    <div className="min-w-64 bg-gray-900 text-white h-screen p-4 col-span-2 xl:col-span-1">
      <ul>
        {menuItems.map((item, index) => (
          <SidebarItem key={index} item={item} router={router} pathname={router.pathname} />
        ))}
      </ul>
    </div>
  );
};

const SidebarItem = ({ item, router, pathname }) => {
  const isActivePath = pathname.includes(item.link || `/${item.key}`);
  const [open, setOpen] = useState(isActivePath);

  // Ensure open state updates on pathname change
  useEffect(() => {
    setOpen(isActivePath);
  }, []);

  return (
    <li>
      <div
        className={`flex items-center gap-2 p-2 cursor-pointer ${pathname === item.link ? "bg-gray-800" : "hover:bg-gray-700"} rounded-md`}
        onClick={() => {
          if (item.link) router.push(item.link);
          setOpen(!open);
        }}
      >
        {item.children ? (
          open ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : (
          <File size={16} />
        )}
        <span className="font-medium truncate">{item.name}</span>
      </div>
      {item.children && open && (
        <ul className="ml-4 border-l border-gray-600 pl-2">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} router={router} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;