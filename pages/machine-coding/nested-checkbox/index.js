import NestedCheckbox from "@/Components/NestedCheckbox";
import { checkboxData } from "@/helpers/constants";
import React from "react";

const NestedCheckboxPage = () => {
  const [checkedInputs, setCheckedInputs] = React.useState({});

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Nested Checkbox</h1>
      <p className="mb-4">
        This is a nested checkbox component. You can select multiple checkboxes
        at different levels.
      </p>
      <NestedCheckbox
        data={checkboxData}
        checkboxData={checkboxData}
        checkedInputs={checkedInputs}
        setCheckedInputs={setCheckedInputs}
      />
    </div>
  );
};

export default NestedCheckboxPage;
