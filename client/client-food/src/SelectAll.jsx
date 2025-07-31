import React from 'react'

export const SelectAll= ({list,handleChange}) => {
   // const {id,name,city}= data
    return (
        <div>
            <h2>
            <input type="checkbox" onChange={(e)=>handleChange(e)}
className="btn btn-sm btn-success"
name="Allselect"
checked={list.filter((item)=>item?.isChecked !== true ).length < 1}
/>



</h2>
        </div>
    )
}