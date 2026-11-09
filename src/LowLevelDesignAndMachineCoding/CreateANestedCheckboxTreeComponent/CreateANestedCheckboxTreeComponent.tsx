import { useCallback, useState } from "react";
import { NavLink } from "react-router";
import Checkbox from "./components/Checkbox";

export type CheckboxNode = {
  checked: boolean;
  parentId: string | null;
  label: string;
};

export type CheckboxState = Record<string, CheckboxNode>;

const DEFAULT_STATE: CheckboxState = {
  "cb-1": {
    checked: false,
    parentId: null,
    label: "Root (cb-1)",
  },
  "cb-2": {
    checked: false,
    parentId: "cb-1",
    label: "Node (cb-2)",
  },
  "cb-3": {
    checked: false,
    parentId: "cb-1",
    label: "Node (cb-3)",
  },
  "cb-4": {
    checked: false,
    parentId: "cb-1",
    label: "Node (cb-4)",
  },
  "cb-5": {
    checked: false,
    parentId: "cb-1",
    label: "Parent Node (cb-5)",
  },
  "cb-6": {
    checked: false,
    parentId: "cb-5",
    label: "Leaf Node (cb-6)",
  },
  "cb-7": {
    checked: false,
    parentId: "cb-5",
    label: "Leaf Node (cb-7)",
  },
};

const CreateANestedCheckboxTreeComponent = () => {
  const [checkboxes, setCheckboxes] = useState<CheckboxState>(DEFAULT_STATE);

  const updateCheckbox = useCallback((id: string, checked: boolean) => {
    setCheckboxes((prev) => {
      const next = { ...prev };

      // 1. Cascade down: update current node and all descendants
      const updateDescendants = (nodeId: string, value: boolean) => {
        next[nodeId] = { ...next[nodeId], checked: value };
        for (const [childId, childNode] of Object.entries(next)) {
          if (childNode.parentId === nodeId) {
            updateDescendants(childId, value);
          }
        }
      };
      updateDescendants(id, checked);

      // 2. Cascade up: update parent and ancestors up to the root
      let currentParentId = next[id].parentId;
      while (currentParentId) {
        const children = Object.values(next).filter(
          (node) => node.parentId === currentParentId
        );
        const allChildrenChecked =
          children.length > 0 && children.every((child) => child.checked);

        next[currentParentId] = {
          ...next[currentParentId],
          checked: allChildrenChecked,
        };
        currentParentId = next[currentParentId].parentId;
      }

      return next;
    });
  }, []);

  const isIndeterminate = useCallback(
    (nodeId: string): boolean => {
      const node = checkboxes[nodeId];
      if (!node || node.checked) return false;

      const hasCheckedDescendant = (currentId: string): boolean => {
        for (const [childId, childNode] of Object.entries(checkboxes)) {
          if (childNode.parentId === currentId) {
            if (childNode.checked || hasCheckedDescendant(childId)) {
              return true;
            }
          }
        }
        return false;
      };

      return hasCheckedDescendant(nodeId);
    },
    [checkboxes]
  );

  const handleSelectAll = (select: boolean) => {
    setCheckboxes((prev) => {
      const next: CheckboxState = {};
      for (const [id, node] of Object.entries(prev)) {
        next[id] = { ...node, checked: select };
      }
      return next;
    });
  };

  const renderTree = (parentId: string | null = null, depth = 0) => {
    const nodes = Object.entries(checkboxes).filter(
      ([_, node]) => node.parentId === parentId
    );

    if (nodes.length === 0) return null;

    return (
      <div
        className={`flex flex-col ${
          depth > 0 ? "ml-6 border-l-2 border-slate-200 pl-4" : ""
        }`}
      >
        {nodes.map(([id, node]) => (
          <div key={id} className="my-1">
            <Checkbox
              id={id}
              label={node.label}
              checked={node.checked}
              indeterminate={isIndeterminate(id)}
              onChange={(checked) => updateCheckbox(id, checked)}
            />
            {renderTree(id, depth + 1)}
          </div>
        ))}
      </div>
    );
  };

  const selectedCount = Object.values(checkboxes).filter((n) => n.checked).length;
  const totalCount = Object.values(checkboxes).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <NavLink
        to="/"
        className="text-sm font-medium text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </NavLink>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <h1 className="text-xl font-bold text-slate-800 mb-2">
          Nested Checkbox Tree Component
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          Selecting a parent checks all its descendants. Selecting only some
          children marks the parent as indeterminate.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSelectAll(true)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={() => handleSelectAll(false)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 transition"
          >
            Clear All
          </button>
          <span className="text-xs text-slate-500 ml-auto">
            Selected: {selectedCount} / {totalCount}
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
          {renderTree(null)}
        </div>
      </div>
    </div>
  );
};

export default CreateANestedCheckboxTreeComponent;
