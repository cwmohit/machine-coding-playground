import { Fragment } from "react";

const SuggestionList = ({
  suggestions,
  highlight,
  dataKey,
  onSuggestionClick,
  selectedIndex
}) => {  
  function getHighlightedText(text) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-900 text-white">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <Fragment>
      {suggestions.map((suggestion, index) => {
        const isHighlighted = highlight === index;
        const suggestionValue = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            className={`p-3 suggestion-item cursor-pointer hover:bg-gray-700 ${
              isHighlighted ? "bg-blue-500 text-white" : "bg-gray-900 text-white"
            }`}
            onClick={() => onSuggestionClick(suggestion)}
            id={`suggestion-${index}`}
            role="option"
            aria-selected={selectedIndex === index}
          >
            {getHighlightedText(suggestionValue)}
          </li>
        );
      })}
    </Fragment>
  );
};

export default SuggestionList;
