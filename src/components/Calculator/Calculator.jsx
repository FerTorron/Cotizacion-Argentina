import './Calculator.css'
import { useState, useEffect } from 'react'

const Calculator = () => {
    const [dolarOficial, setDolarOficial] = useState(null)
    const [dolarBlue, setDolarBlue] = useState(null)
    const [euroOficial, setEuroOficial] = useState(null)
    const [euroBlue, setEuroBlue] = useState(null)

    const [amount, setAmount] = useState("")
    const [convDolOfi, setConvDolOfi] = useState(0)
    const [convDolBlue, setConvDolBlue] = useState(0)
    const [convEurOfi, setConvEurOfi] = useState(0)
    const [convEurBlue, setConvEurBlue] = useState(0)

    useEffect(() => {
        const apiUrl = "https://api.bluelytics.com.ar/v2/latest"
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const dolarOficialValue = data.oficial.value_avg.toFixed(2)
                setDolarOficial(dolarOficialValue)

                const dolarBlueValue = data.blue.value_avg.toFixed(2)
                setDolarBlue(dolarBlueValue)

                const euroOficialValue = data.oficial_euro.value_avg.toFixed(2)
                setEuroOficial(euroOficialValue)

                const euroBlueValue = data.blue_euro.value_avg.toFixed(2)
                setEuroBlue(euroBlueValue)
            })
            .catch(error => {
                console.log(error)
            })
    })

    const convertAmount = () => {
        if (amount === '') {
            setAmount(0)
            return
        }
        const inputAmount = parseFloat(amount)

        if (!isNaN(inputAmount)) {
            const convDolOfiValue = (inputAmount / parseFloat(dolarOficial)).toFixed(2)
            setConvDolOfi(convDolOfiValue)

            const convDolBlueValue = (inputAmount / parseFloat(dolarBlue)).toFixed(2)
            setConvDolBlue(convDolBlueValue)

            const convEurOfiValue = (inputAmount / parseFloat(euroOficial)).toFixed(2)
            setConvEurOfi(convEurOfiValue)

            const convEurBlueValue = (inputAmount / parseFloat(euroBlue)).toFixed(2)
            setConvEurBlue(convEurBlueValue)
        } else {
            alert("Valor invalido")
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            convertAmount();
        }
    }

    return (
        <div className='calcContainer'>
            <div className="leftInfo">
                <div className="topLeftInfo">
                    <h2>Monto en ARS</h2>
                    <input placeholder='0' value={amount} type="number" onKeyDown={handleKeyDown} onChange={e => setAmount(e.target.value)} />
                    <button type="submit" onClick={convertAmount}>Convertir</button>
                </div>
                <div className="bottomLeftInfo">
                    <p>Hecho por <a href="https://www.linkedin.com/in/fertorron/">FerTorron</a></p>
                </div>
            </div>
            <div className="rightInfo">
                <div className="dolarInfo">
                    <p>Dolar Oficial <b><span>US$ {convDolOfi}</span>${dolarOficial}</b></p>
                    <p>Dolar Blue <b><span>US$ {convDolBlue}</span>${dolarBlue}</b></p>
                </div>
                <div className="euroInfo">
                    <p>Euro Oficial <b><span>US$ {convEurOfi}</span>${euroOficial}</b></p>
                    <p>Euro Blue <b><span>US$ {convEurBlue}</span>${euroBlue}</b></p>
                </div>
            </div>
        </div>
    )
}

export default Calculator