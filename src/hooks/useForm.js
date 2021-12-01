// En este archivo se crea un custom hook, o hook personalizado por usuario
// Archivos de React que combinen tags y javaScript usualmente usan la
// extension jsx; el presente archivo contiene codigo javaScript pero tags
import { useState } from 'react';
//Este custom hook usa el useState para guardar un estado inicial de un formulario y lo
// actualiza con los valores que se le envien a traves del target


export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }) => {

        if (target.type === 'checkbox') {
            setValues({
                ...values,
                [target.name]: target.checked
            });
        } else {
            // En un objeto no pueden existir 2 llaves con el mismo nombre, por
            // ello, si se agrega un campo cuya llave existe previamente en el
            // objeto, entonces, este campo reemplaza al campo anterior
            setValues({
                ...values,
                // Los corchetes dicen a js que target.name no es el nombre de la
                // llave sino una variable en la cual se encuentra este nombre
                [target.name]: target.value
            });
        }

    }

    return [values, handleInputChange, reset];

}