import { createContext } from "react";



const QuioscoContext= createContext();




const QuioscoProvider = ({children})=>{

    const auth = true
    return (
        <QuioscoContext.Provider
            value={{auth}}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {QuioscoProvider}

export default QuioscoContext

