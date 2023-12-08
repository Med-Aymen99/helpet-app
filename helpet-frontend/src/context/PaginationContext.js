import React, { createContext } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({children}) => {

    const [currentPage,setCurrentPage]= React.useState(1);
    //const [totalPosts,setTotalPosts]= React.useState(0);
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    const [isSearch, setIsSearch] = React.useState(false);
    //const postsPerPage=3;

    const generatePagesArray = () => {
        let pages = [];
        let i;
        for (i=1; i<=numberOfPages;i++) {
            pages.push(i)
        }
        return pages
    }

    return(
        <PaginationContext.Provider value={{currentPage,setCurrentPage,
                                            numberOfPages, setNumberOfPages,
                                            generatePagesArray, setCurrentPage,
                                            isSearch, setIsSearch,
                                            }}>
            {children}
        </PaginationContext.Provider>
    )

}

