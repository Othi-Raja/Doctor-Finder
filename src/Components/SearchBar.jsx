import React, { useState } from "react";
import { TextField, Menu, MenuItem, ListItemText } from "@mui/material";

const SearchBar = ({ allDoctors, updateQueryParams }) => {
  const [query, setQuery] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);  

  const handleChange = (e) => {
    setQuery(e.target.value);
    const params = new URLSearchParams();
    params.set("name", e.target.value);
    updateQueryParams(params);

    if (e.target.value) {
      setAnchorEl(e.target);  
    } else {
      setAnchorEl(null);  
    }
  };

  const getSuggestions = () => {
    const filtered = allDoctors.filter((doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.slice(0, 3);  
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    const params = new URLSearchParams();
    params.set("name", suggestion.name);
    updateQueryParams(params);
    setAnchorEl(null);  
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedSuggestion !== null) {
      const suggestion = getSuggestions()[selectedSuggestion];
      handleSuggestionClick(suggestion);
    }
  };

  const handleMouseEnter = (index) => {
    setSelectedSuggestion(index);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* MUI Search Input */}
      <TextField
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      
        variant="standard"
        fullWidth
        data-testid="autocomplete-input"
        placeholder="Search by doctor name"
        autoComplete="off"
      />

     
      {query && getSuggestions().length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDropdown}
          MenuListProps={{
            dense: true,
          }}
        >
          {getSuggestions().map((suggestion, index) => (
            <MenuItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={`suggestion-item ${
                selectedSuggestion === index ? "highlighted" : ""
              }`}
              data-testid="suggestion-item"
            >
              <ListItemText primary={suggestion.name} />
            </MenuItem>
          ))}
        </Menu>
      )}

     
      {query && getSuggestions().length === 0 && (
        <div className="no-matches">No matches found</div>
      )}
    </div>
  );
};

export default SearchBar;
