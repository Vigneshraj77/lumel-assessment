import { memo, useEffect, useMemo, useState } from "react";
import styles  from './TableRow.module.css';
const TableRow = ({ row, isChild = false, parentId =  null, handleAllocatePer, handleAllocateVal}) => {
    const [inputVal,setInputVal] = useState();
    const [orgVal,setOrgValue] = useState();

    useEffect(() => {
        setOrgValue(row.value);
    },[row.id]);
    const variance = useMemo(() => {
        if(orgVal != row.value){
            const per = ((row.value - orgVal)/orgVal) *100;
            return per.toFixed(2)
        }
        else return "0.00"
    })
   return  <>
      <tr className={isChild ? "child-row" : "parent-row"}>
        <td style={{ paddingLeft: isChild ? "20px" : "5px" }}>
          {isChild ? "--" : ""} {row.label}
        </td>
        <td>{row.value}</td>
        <td><input type="number" className={styles.InputAll} value={inputVal} onChange={(e) => setInputVal(e.target.value)}/></td>
        <td><button type="button" className={`btn btn-secondary btn-sm ${styles.BtnAllocate}`} onClick={() => handleAllocatePer(row.id,parentId,inputVal)}>Allocate %</button></td>
        <td><button type="button" className={`btn btn-secondary btn-sm ${styles.BtnAllocate}`} onClick={() => handleAllocateVal(row.id,parentId,inputVal)}>Allocate Value</button></td>
        <td>{variance} %</td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <TableRow key={child.id} row={child} isChild={true} parentId={row.id} handleAllocatePer={handleAllocatePer} handleAllocateVal={handleAllocateVal} />
        ))}
    </>
};
export default memo(TableRow);  
