import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, File } from "lucide-react";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { MENU_VERSION } from "@/helpers/constants";

const Sidebar = ({ menuItems }) => {
  const [menus, setMenus] = useLocalStorage(MENU_VERSION, menuItems);
  const [createFolder, setCreateFolder] = useState(false);
  const [createFile, setCreateFile] = useState(false);
  const router = useRouter();

  function onSave(key, newValue) {
    let newRoute = '';
    function updateMenuItems(items, parentPath = []) {
      return items.map((item) => {
        const currentPath = [...parentPath, item.key];
    
        if (item.key === key) {
          const newKey = newValue.toLowerCase().split(" ").join("-");
          newRoute = `/${currentPath.join('/')}/${newKey}`;
          return {
            ...item,
            children: [...item.children, {
              name: newValue,
              link: newRoute,
            }]
          };
        }
    
        if (item.children) {
          return { ...item, children: updateMenuItems(item.children, currentPath) };
        }
    
        return item;
      });
    }

    setMenus((prevMenus) => {
      const updatedValues = updateMenuItems(prevMenus);
      return updatedValues;
    });

    router.push(newRoute);
  }  

  const onSaveInRoot = (value, type) => {
     const newKey = value.toLowerCase().split(" ").join("-");
     setMenus((prevMenus) => [...prevMenus,
      {
        name: value,
        key: newKey,
        ...(type === 'file' ? {
          link: `/${newKey}`,
        } : {
          children: []
        })
      }
    ]);

    if(type === 'file') router.push(`/${newKey}`);
  }

  return (
    <div className="min-w-64 bg-gray-900 text-white h-screen p-4 col-span-2 xl:col-span-1">
      <div className="flex items-start gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded text-sm"
          onClick={() => {
            setCreateFolder(true);
            setCreateFile(false);
          }}
        >
          + Add Folder
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded text-sm"
          onClick={() => {
            setCreateFile(true);
            setCreateFolder(false);
          }}
        >
          +
        </button>
      </div>
      {createFolder || createFile ? <FileEditor onSave={(value) => {
        if(value){
          if(createFile){
            onSaveInRoot(value, 'file');
          }else{
            onSaveInRoot(value, 'folder');
          }
          setCreateFile(false);
          setCreateFolder(false);
        }
      }} /> : null}
      <ul>
        {menus.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            router={router}
            pathname={router.asPath}
            onSave={onSave}
          />
        ))}
      </ul>
    </div>
  );
};

const SidebarItem = ({ onSave, item, router, pathname }) => {
  // const isActivePath = pathname.includes(item.link || `/${item.key}`);
  const [open, setOpen] = useState(true);
  const [createFile, setCreateFile] = useState(false);

  // Ensure open state updates on pathname change
  // useEffect(() => {
  //   setOpen(isActivePath);
  // }, [isActivePath]);

  return (
    <li>
      <div
        className={`flex items-center gap-2 p-2 cursor-pointer relative ${
          pathname === item.link ? "bg-gray-800" : "hover:bg-gray-700"
        } rounded-md`}
        onClick={() => {
          if (item.link) router.push(item.link);
          setOpen(!open);
        }}
      >
        {Array.isArray(item.children) ? (
          open ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : (
          <File size={16} />
        )}
        <span className="font-medium truncate">{item.name}</span>
        {Array.isArray(item?.children) ? <button className="text-sm bg-green-500 px-2 py-1 ml-2 absolute right-4" onClick={(e) => {
          if(open){
            e.stopPropagation();
            e.preventDefault();
          }
          setCreateFile(true)
        }}>+</button> : null}
      </div>
      {item.children && open && (
        <ul className="ml-4 border-l border-gray-600 pl-2">
          {createFile ? <FileEditor content='' onSave={(value) => {
            if(value){
              onSave(item.key, value);
            }
            setCreateFile(false);
          }} /> : null}
          {item.children.map((child, index) => (
            <SidebarItem
              key={index}
              item={child}
              router={router}
              pathname={pathname}
              onSave={onSave}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FileEditor = ({ onSave }) => {
  return (
    <input
      className="w-full h-8 bg-gray-500 outline-0 border-blue-400 px-2 my-1"
      onBlur={(e) => onSave(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSave(e.target.value);
        }
      }}
      ref={(input) => input && input.focus()}
    />
  );
};

export default Sidebar;