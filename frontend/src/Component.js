import React, {useState} from 'react'

export default function Component() {
  
    const [text, setText] = useState()
    const [updatedtext, setUpdated] = useState()
    
    const textOnChange = (event) => {
        setText(event.target.value)
    }
    
    const buttonOnClick = () => {
        setUpdated(text)
    }

    return (
    <div>
        <input type = "text" value={text} onChange={textOnChange}/>
        <button onClick={buttonOnClick}>Actualizar</button> 
        <p>Aqui aparece el texto capturado:</p>
        <p>{text}</p>
        <p>Aqui aparece el texto actualizado</p>
        <p>{updatedtext}</p>
    </div>
  )
}
