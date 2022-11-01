import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table'
import Papa from "papaparse";
import Completions from"../datos/production.csv"


function Tablaproduction() {

  
  const columns = [
    { title: "BHP", field: "BHP" },
    { title: "CompL ", field: "CompL" },
    { title: "FlowDays", field: "FlowDays" }, 
    { title: "Month", field: 'Month' },
    { title: "Pressure", field: "Pressure", },
    { title: "Qg", field: 'Qg' },
    { title: "Qo", field: 'Qo' },
    { title: "Qs", field: 'Qs' },
    { title: "Qw", field: 'Qw' },
    { title: "Status", field: 'Status' },
    { title: "Year", field: 'Year' },
    { title: "boreID", field: 'boreID' },
    { title: "compSubId", field: 'compSubId' },
    
    
   
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
        title="production"
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

export default Tablaproduction;