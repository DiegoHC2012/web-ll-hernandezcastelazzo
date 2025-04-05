import { useReducer } from "react";

function calculadora (state, action) {
    if (action.type === "sumar") {
        return {
            numero: state.numero + 1
        }
    }
    if (action.type === "restar") {
        return {
            numero: state.numero - 1
        }
    }
}

export default function ReducerScreen() {
    const [state, dispatch] = useReducer(calculadora, {numero: 0});
    return (
        <div>
            <button onClick={() => dispatch({type: "sumar"})}>Sumar</button>
            <h2>{state.numero}</h2>

            <button onClick={() => dispatch({type: "restar"})}>Restar</button>
        </div>
    )
}