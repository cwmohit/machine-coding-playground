import { useCallback, useEffect, useRef, useState } from "react";
import SuggestionList from "./SuggestionList";
import { debounce } from "lodash";
import useCache from "@/hooks/useCache";

const AutoComplete = ({
  placeholder,
  fetchSuggestions,
  dataKey,
  customLoading,
  onSelect,
  onChange,
  onFocus,
  onBlur,
  customStyle,
  staticData,
  caching = true,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsListRef = useRef(null);
  const { setCache, getCache } = useCache('autoComplete', 3600);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  }

  const getSuggestions = async (query) => {
    setError(null);
    const cachedSuggestions = getCache(query);
    if(cachedSuggestions && caching){
      setSuggestions(cachedSuggestions);
    }else{
      setLoading(true);
      try {
        if (staticData && staticData.length > 0) {
          const filteredSuggestions = staticData.filter(item =>
            (dataKey ? item[dataKey] : item).toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        }else{
          const result = await fetchSuggestions(query);
          setSuggestions(result);
          setCache(query, result);
        }
      } catch (err) {
        setError("Failed to fetch suggestions");
      } finally {
        setLoading(false);
      }
    }
  }

  const debouncedGetSuggestions = useCallback(debounce(getSuggestions, 300), []);

  function handleSuggestionClick(suggestion) {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    setSuggestions([]);
    onSelect(suggestion);
  }

  const scrollIntoView = (index) => {
    if (suggestionsListRef.current) {
      const suggestionElements = suggestionsListRef.current.getElementsByTagName("li");
      if (suggestionElements[index]) {
        suggestionElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }
  };

  function handleKeyDown(e){
      switch (e.key) {
        case 'ArrowDown':
          setSelectedIndex((prev) => {
              const newIndex = (prev+1)%suggestions.length;
              scrollIntoView(newIndex);
              return newIndex;
          })
          break;
        case 'ArrowUp':
          setSelectedIndex((prev) => {
              const newIndex = (prev-1+suggestions.length)%suggestions.length;
              scrollIntoView(newIndex);
              return newIndex;
          })
          break;  
        case 'Enter':
            if(selectedIndex >= 0 && selectedIndex < suggestions.length){
                handleSuggestionClick(suggestions[selectedIndex])
            }
          break;         
        default:
          break;
      }
  }

  useEffect(() => {
    setSelectedIndex(-1);
    if(inputValue.length > 1){
      debouncedGetSuggestions(inputValue);
    }else{
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        style={customStyle}
        value={inputValue}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
        onKeyDown={handleKeyDown}
      />

      {(suggestions.length > 0 || loading | error) ? (
        <ul ref={suggestionsListRef} className="suggestion-list h-[250px] overflow-auto" role="listbox">
          {loading && (
            <div className="top-full left-0 w-full bg-gray-900 text-gray-400 border-gray-300 rounded shadow-lg">
              <div className="p-3">{customLoading}</div>
            </div>
          )}
          {error && (
            <div className="top-full left-0 w-full bg-gray-900 border-gray-300 rounded shadow-lg">
              <div className="p-3 text-red-500">{error}</div>
            </div>
          )}
          <SuggestionList 
             suggestions={suggestions}
             highlight={inputValue}
             dataKey={dataKey}
             selectedIndex={selectedIndex}
             onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      ): null}
    </div>
  );
};

export default AutoComplete;
