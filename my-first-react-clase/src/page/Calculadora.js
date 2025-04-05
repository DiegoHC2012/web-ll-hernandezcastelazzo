import { useState } from "react";
export default function Calculadora() {
    const [numero_1, setNumero_1] = useState(0);
    const [numero_2, setNumero_2] = useState(0);
    const [operador, setOperador] = useState("");
    const [total, setTotal] = useState(0);

    function Sumar() {
        setTotal(numero_1 + numero_2);
        setOperador("");
        setNumero_1(0);
        setNumero_2(0);
    }

    function Restar() {
        setTotal(numero_1 - numero_2);
        setOperador("");
        setNumero_1(0);
        setNumero_2(0);
    }

    function Asignar(digito) {
        if (operador == "") {
            const numero = `${numero_1}` + digito;
            setNumero_1(parseInt(numero));
        }
        else {
            const numero = `${numero_2}` + digito;
            setNumero_2(parseInt(numero));
        }
    }

    function Total() {
        if (operador == "+") {
            Sumar();
        }
        else {
            Restar();
        }
    }

    return (
        <div>
            <h1>Total {total}</h1>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%" }}>
                <p> {numero_1} </p>
                <p>| {operador} |</p>
                <p> {numero_2} </p>
            </div>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%" }}>
                <div>
                    <button onClick={() => Asignar(1)}>1</button>
                </div>
                <div>
                    <button onClick={() => Asignar(2)}>2</button>
                </div>
                <div>
                    <button onClick={() => Asignar(3)}>3</button>
                </div>
            </div>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%" }}>
                <div>
                    <button onClick={() => Asignar(4)}>4</button>
                </div>
                <div>
                    <button onClick={() => Asignar(5)}>5</button>
                </div>
                <div>
                    <button onClick={() => Asignar(6)}>6</button>
                </div>
            </div>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%" }}>
                <div>
                    <button onClick={() => Asignar(7)}>7</button>
                </div>
                <div>
                    <button onClick={() => Asignar(8)}>8</button>
                </div>
                <div>
                    <button onClick={() => Asignar(9)}>9</button>
                </div>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%" }}>
                <div>
                    <button onClick={() => setOperador("+")}>+</button>
                </div>
                <div>
                    <button onClick={() => Asignar(0)}>0</button>
                </div>
                <div>
                    <button onClick={() => setOperador("-")}>-</button>
                </div>
            </div>
            
            <div>
                <button onClick={() => Total()}>=</button>
            </div>
        </div>
    )
}