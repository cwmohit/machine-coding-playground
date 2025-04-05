import React from "react";

const NestedCheckbox = ({
  data,
  checkboxData,
  checkedInputs,
  setCheckedInputs,
  idPath = "",
}) => {
  const onInputChange = (e, item) => {
    const { checked } = e.target;
    const newCheckedInputs = { ...checkedInputs };
    const currentPath = `${idPath}${item.id}`;

    newCheckedInputs[currentPath] = checked;

    const updateChildrenCheckedState = (children, checked, path) => {
      children.forEach((child) => {
        const childPath = `${path}${child.id}`;
        newCheckedInputs[childPath] = checked;

        if (child.children?.length > 0) {
          updateChildrenCheckedState(child.children, checked, `${childPath}.`);
        }
      });
    };

    if (item.children?.length > 0) {
      updateChildrenCheckedState(item.children, checked, `${currentPath}.`);
    }

    const getChildren = (path) => {
      let children = checkboxData;
      const splitPath = path.split(".");

      for (let i = 0; i < splitPath.length; i++) {
        const id = splitPath[i];
        const match = children.find((child) => child.id === parseInt(id));
        if (!match) return [];
        if (i === splitPath.length - 1) return match.children || [];
        children = match.children;
      }

      return [];
    };

    const updateParents = (path, checked) => {
      const parentPath = path.substring(0, path.lastIndexOf("."));
      if (!parentPath) return;

      const siblings = getChildren(parentPath);
      const allChildrenChecked = siblings.every((child) => {
        const childPath = `${parentPath}.${child.id}`;
        return newCheckedInputs[childPath] === true;
      });

      newCheckedInputs[parentPath] = allChildrenChecked;
      updateParents(parentPath, checked);
    };

    updateParents(currentPath, checked);
    setCheckedInputs(newCheckedInputs);
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => {
        const itemPath = `${idPath}${item.id}`;
        return (
          <div key={item.id} className="border-l-1 border-gray-300 pl-2">
            <input
              type="checkbox"
              id={item.name}
              name={item.name}
              checked={checkedInputs[itemPath] || false}
              onChange={(e) => onInputChange(e, item)}
              className="cursor-pointer"
            />
            <label htmlFor={item.name} className="ml-2">
              {item.name}
            </label>

            {item.children?.length > 0 && (
              <div className="pl-5 mt-1">
                <NestedCheckbox
                  data={item.children}
                  checkedInputs={checkedInputs}
                  setCheckedInputs={setCheckedInputs}
                  idPath={`${itemPath}.`}
                  checkboxData={checkboxData}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NestedCheckbox;