import { useCallback, useState } from "react";

const DEFAULT_STATE = {
  "cb-1": {
    checked: false,
    parentId: null,
    label: "cb-1",
  },
  "cb-2": {
    checked: false,
    parentId: "cb-1",
    label: "cb-2",
  },
  "cb-3": {
    checked: false,
    parentId: "cb-1",
    label: "cb-3",
  },
  "cb-4": {
    checked: false,
    parentId: "cb-1",
    label: "cb-4",
  },
  "cb-5": {
    checked: false,
    parentId: "cb-1",
    label: "cb-5",
  },
  "cb-6": {
    checked: false,
    parentId: "cb-5",
    label: "cb-6",
  },
  "cb-7": {
    checked: false,
    parentId: "cb-5",
    label: "cb-7",
  },
};

const CreateANestedCheckboxTreeComponent = () => {
  const [checkboxes, setCheckboxes] = useState(DEFAULT_STATE);

  function handleCheckboxClick(name: string): void {
    console.log(name);
  }

  const updateCheckbox = useCallback((id, checked) => {
    setCheckboxes((prev) => {
      const next = { ...prev };

      const setChecked = (nodeId, value) => {
        const node = next[nodeId];
        if (!node) return;
        next[nodeId] = { ...node, checked: value };
      };

      
    });
  }, []);

  return (
    <div>
      {checkboxes.map((checkbox) => (
        <div key={checkbox.name}>
          <label>
            <input
              className="mr-2"
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => {
                handleCheckboxClick(checkbox.name);
              }}
            />
            {checkbox.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CreateANestedCheckboxTreeComponent;
