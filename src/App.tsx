import React, { useState } from 'react';

import Table from './components/table';
/*Helper function */
import { isNumber } from './helper';
/*CSS*/
import './App.css';

function App() {

  const [count, setCount] = useState({
    rows:0,
    cols:0
  });

  
  const[errorMessage,setErrorMessage] = useState<boolean>(false)


  const handleChange = (e:any,name:string) => {
    if(isNumber(e)){
      setErrorMessage(false)
      if(name == "row") {
        setCount({...count,rows:parseInt(e)})
      }
      if(name == "col"){
        setCount({...count,cols:parseInt(e)})
      }    
    }
    else{
      setErrorMessage(true)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='textBox'>
          <div className='first_div'>
        <label className='first_div_label'>Enter value for rows : </label>
        <input 
          type="text" 
          id="rows"
          onChange={(e)=>handleChange(e.target.value,"row")}
        />
        </div>
        <div className='first_div'>
                <label className='first_div_label'>Enter value for columns : </label>

         <input 
          type="text" 
          id="cols"
          onChange={(e)=>handleChange(e.target.value,"col")}
        />
        </div>
        {/* Displaying error message if user tries to enter characters */}
        {errorMessage && <div style={{
          display: "flex",
          justifyContent:"center",
          color:"red",
          fontWeight:500
        }}>Only number are allowed</div>}

        </div>
        {/* Rendering table component and passing cols and rows */}
        <Table rows={count && count.rows} cols={count && count.cols} />
      </header>
    </div>
  );
}

export default App;
