import { useState } from "react";

export interface CheckboxProps {
  checked:boolean;
  label:string;
  id:string;
  premuto:(e:any)=>any;
}
 
const Checkbox: React.FunctionComponent<CheckboxProps> = ({id,label,checked,premuto}) => {
  const [value,setValue]=useState<boolean>(checked);
  function pressed(e:any) {
    setValue((value:boolean)=>!value);
    premuto(e);
  }
  return ( 
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type="checkbox" id={id} checked={value} onChange={pressed}/>
    </div>
   );
}
 
export default Checkbox;