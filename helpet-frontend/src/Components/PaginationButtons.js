import React, { useContext } from "react"
import { PaginationContext } from "../context/PaginationContext";

export default function PaginationButtons(props) {
    const {setCurrentPage, currentPage, generatePagesArray} = useContext(PaginationContext)
    
    const pages = generatePagesArray();
    const pagesButtons = pages.map((page,index)=> {
        return (<button key={index} 
                       onClick={()=>{setCurrentPage(page)}} 
                       className={page==currentPage? 'active' : ''}
               >
                {page}
               </button>
        )
    }
)
    return (
        <div>
            {pagesButtons}
        </div>
    )
}
