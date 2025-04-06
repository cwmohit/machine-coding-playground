import DynamicEditor from "@/Components/DynamicEditor";
import { MENU_VERSION, menuItems } from "@/helpers/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parse } from "url";

const NewFilePage = ({ currentPath }) => {
  const [isValid, setIsValid] = useState(true); // Tracks if the path is valid
  const router = useRouter();

  useEffect(() => {
    if (!isValidPath(currentPath)) {
      setIsValid(false); // Mark the page as invalid
      router.push("/404"); // Redirect to the 404 page
    }
  }, [currentPath]);

  if (!isValid) {
    return <div>Loading...</div>; // Optionally, show a loading state while checking
  }

  return <DynamicEditor />;
};

export default NewFilePage;

export const flattenMenuItems = (items) => {
  let paths = [];

  const traverse = (menu) => {
    menu.forEach((item) => {
      if (item.link) {
        paths.push(item.link);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };

  traverse(items);
  return paths;
};

export const isValidPath = (reqPath) => {
  const menus = window.localStorage.getItem(MENU_VERSION);
  const storedMenus = menus ? JSON.parse(menus) : menuItems;
  const validPaths = flattenMenuItems(storedMenus);
  return validPaths.includes(reqPath);
};

export async function getServerSideProps({ params, res, req }) {
  // Get the current path from the request
  const currentPath = `/${params.slug.join("/")}`;
  return {
    props: { currentPath }, // Pass the valid page data to the page component
  };
}
