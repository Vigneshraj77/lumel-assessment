import { useState } from 'react';
import { TABLE_CONTENT, TABLE_HEADERS } from '../constants';
import styles from './AllocationTable.module.css';
import TableRow from './TableRow';
import { calculatePer, getNewChildVal } from '../utils';

function AllocationTable() {
    const [tableRows,setTableRows]= useState(TABLE_CONTENT);
    const handleAllocatePer = (id, parentId, inputVal) => {
        let rows = tableRows;
        if(parentId){
            rows = rows.map((row) => {
                if(row.id == parentId){
                    let parentValue = 0;
                    row.children = row.children.map((child) => {
                        child = child.id == id ? {...child, value: calculatePer(child.value,inputVal)} : child;
                    parentValue = parseInt(parentValue)  + parseInt(child.value);
                    return child;
                });
                row.value = parentValue;
            }
                return row;
            })
        }
        setTableRows([...rows])
    };
    const handleAllocateVal = (id, parentId, inputVal) => {
        let rows = tableRows;
        if(parentId){
            rows = rows.map((row) => {
                if(row.id == parentId){
                    let parentValue = 0;
                    row.children = row.children.map((child) => {
                        child = child.id == id ? {...child, value:inputVal} : child;
                    parentValue =parseInt(parentValue)  + parseInt(child.value);
                    return child;
                });
                row.value = parentValue;
            }
                return row;
            })
        }
        else{
            rows = rows.map((row) => {
                if(row.id == id){
                    const orgVal = row.value;
                    row.value = inputVal;
                    row.children = row.children.map((child) => {
                       child.value =  getNewChildVal(child.value,orgVal,row.value);
                       return child;
                    })               
                }
                return row;
            })
        }
        setTableRows([...rows])
    };

  return (
    <table className={`table table-bordered table-hoverable ${styles.table}`}>
  <thead>
    <tr>
      {TABLE_HEADERS.map(headers => 
      <th scope="col" key={headers}>{headers}</th>)}
    </tr>
  </thead>
  {tableRows.map((row) => (
          <TableRow key={row.id} row={row} handleAllocatePer={handleAllocatePer} handleAllocateVal={handleAllocateVal}/>
        ))}
</table>
  );
}

export default AllocationTable;
