/* import React, { useState } from 'react';
import Select from 'react-select';
import { colourOptions } from '../data';

function App() {
  const [selectedOptions, setSelectedOptions] = useState([colourOptions[2], colourOptions[3]]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptions);
    // TODO: form 데이터 전송 로직 추가
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        value={selectedOptions}
        onChange={setSelectedOptions}
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
 */
