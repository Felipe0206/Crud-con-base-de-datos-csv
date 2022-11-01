import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table'
import Papa from "papaparse";
import Completions from"../datos/completions.csv"


function Tablacompletions() {

  
  const columns = [
    { title: "TD", field: "TD" },
    { title: "Type ", field: "Type" },
    { title: "X", field: "X" }, 
    { title: "Y", field: 'Y' },
    { title: "boreID", field: "boreID", },
    { title: "compSubId", field: 'compSubId' },
    { title: "compartment", field: 'compartment' },
    { title: "faultBlock", field: 'faultBlock' },
    { title: "isHorizontal", field: 'isHorizontal' },
    { title: "lat", field: 'lat' },
    { title: "long", field: 'long' },
    { title: "maxBHP", field: 'maxBHP' },
    { title: "reservoir", field: 'reservoir' },
    
    
   
  ] 

  var commonConfig = { delimiter: "," };

  const [CSVData, setCSVData] = useState();
  

  // Parse remote CSV file
  function parseCSVData() {
    Papa.parse(
      Completions,
      {
        ...commonConfig,
        header: true,
        download: true,
        
        complete: (result) => {
          setCSVData(result.data);
        }
      }
    );
    
  }

  useEffect(() => {
    parseCSVData();
  });

  return (
    <div className="App">
      
    
      
      
      <MaterialTable
        title="completions"
        data={CSVData}
        columns={columns}
        editable={{
            onRownAdd:(newRow)=>new Promise((resolve,reject)=>{
                setCSVData([...CSVData,newRow])
                
                setTimeout(()=>resolve(),500)
            }),

            onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
                const updateData=[...CSVData]
                updateData[oldRow,CSVData.TD]=newRow
                setCSVData(updateData)
                setTimeout(()=>resolve(),500)
            })

            

            
        }}
        options={{
            addRowposition:"first",actionsColumIndex:-1
        }}
        
      />
    </div>
  );
}

export default Tablacompletions;