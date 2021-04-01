import React from "react";

import FilterButton from './FilterButton.js'
import './FilterButton.css';

function Filter({ filterNames, currentFilter, setFilter }) {
  return (
    <div className="filters btn-group stack-exception">
        {
          filterNames.map(name => (
            <FilterButton
              key={name}
              name={name}
              isPressed={name === currentFilter}
              setFilter={setFilter}
            />
          ))
        }
    </div>
  );
}

export default Filter;