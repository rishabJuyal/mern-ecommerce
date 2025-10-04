import React, { useState } from "react";

const ExpandableDescriptionList = ({ description = "", maxVisible = 3 }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = description.split("\n").filter((line) => line.trim() !== "");
  const visibleLines = expanded ? lines : lines.slice(0, maxVisible);

  return (
    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
      {visibleLines.map((line, i) => {
        const isLastVisible = i === visibleLines.length - 1;
        const isTruncated = !expanded && lines.length > maxVisible && isLastVisible;
        const isLastInFullList = expanded && i === lines.length - 1;

        return (
          <li key={i}>
            {line}
            {isTruncated && (
              <>
                {" "}
                <button
                  onClick={() => setExpanded(true)}
                  className="text-blue-600 hover:underline inline ml-1"
                >
                  Read more
                </button>
              </>
            )}
            {isLastInFullList && lines.length > maxVisible && (
              <>
                {" "}
                <button
                  onClick={() => setExpanded(false)}
                  className="text-blue-600 hover:underline inline ml-1"
                >
                  Show less
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ExpandableDescriptionList;
