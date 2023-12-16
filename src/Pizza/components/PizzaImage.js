import { Radio } from '@mui/material';

const PizzaImage = ({data, isChecked, radioChecked}) => {

    const handleCard = () => {
        radioChecked(data.id)
    }   

    return (
        <div className="pizza-img" onClick={handleCard}>
            <img src={data.img} alt={data.title}/>
            <h3>{data.title}</h3>
            <p>${data.price}</p>
            <Radio checked={isChecked}/>
        </div>
    )
}

export default PizzaImage