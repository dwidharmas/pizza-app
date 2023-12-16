import './styles/index.scss'
import { Box, RadioGroup, Radio, FormControlLabel, Checkbox } from '@mui/material';
import PizzaImage from './components/PizzaImage';
import pizzaData from  './data/pizza-images.json'
import toppings from  './data/toppings.json'
import { useState } from 'react';
import { useEffect } from 'react';

const PizzaPage = () => {

    const [ order, setOrder ] = useState({
        id_pizza: '',
        size: '',
        toppings: [],
        total_price: 0
    })

    const handleOrder = (key, value) => {
        setOrder((prevState) => ({ ...prevState, [key]: value }));
    }

    const handlePizza = (val) => {
        handleOrder('id_pizza', val)
        let tempOrder = order.toppings
        const availableTopping = toppings.filter((top) => top.used_on.includes(val)).map((top) => top.id)
        if (tempOrder.length > 0) {
            tempOrder = tempOrder.filter((order) => availableTopping.includes(order))
            handleOrder('toppings', tempOrder)
        }
    }

    const handleSize = (e) => {
        const {value} = e.target
        handleOrder('size', value)
    }

    const handleTopping = (e) => {
        const { value, checked } = e.target
        let tempOrder = order.toppings
        if (checked) {
            tempOrder = [...tempOrder, value]
        } else {
            tempOrder = tempOrder.filter((order) => order !== value)
        }
        handleOrder('toppings', tempOrder)
    }

    useEffect(() => {
        const calculatePrize = () => {
            let pizza_price = 0
            let size_price = 0
            let topping_price = 0
    
            const pizza = pizzaData.find((pizza) => pizza.id === order.id_pizza)

            pizza_price = pizza?.price || 0;
    
            switch (order.size) {
                case 'small':
                    size_price = -1;
                    break;
                case 'large':
                    size_price = 2;
                    break;
                default:
                    break;
            }
    
    
            toppings.forEach((topping) => {
                if (order.toppings.includes(topping.id)) {
                    topping_price = topping_price + topping.price
                }
            })
            handleOrder('total_price', pizza_price + size_price + topping_price)
        }

        calculatePrize()
    }, [order.id_pizza, order.size, order.toppings])

    return (
        <Box className="pizza-page">
            <Box className='pizza-section'>
                <h1>Pizza</h1>
                <Box className="pizza-list">
                    {
                        pizzaData.map((pizza) => (
                            <PizzaImage key={pizza.id} data={pizza} isChecked={pizza.id === order.id_pizza} radioChecked={handlePizza} />
                        ))
                    }
                </Box>
            </Box>
            <Box className='pizza-section'>
                <h1>Size</h1>
                <RadioGroup
                    value={order.size}
                    onChange={handleSize}
                    className='size-list'
                >
                    <FormControlLabel disabled={!order.id_pizza} value={'small'} className='size-item' control={<Radio />}  label={'Small'}/>
                    <FormControlLabel disabled={!order.id_pizza} value={'medium'} className='size-item' control={<Radio />}  label={'Medium'}/>
                    <FormControlLabel disabled={!order.id_pizza} value={'large'} className='size-item' control={<Radio />}  label={'Large'}/>
                </RadioGroup>
            </Box>
            <Box className='pizza-section'>
                <h1>Toppings</h1>
                <Box className='toppings-list'>
                    {
                        toppings.map((topping) => (
                            <FormControlLabel key={topping.id} className='topping-item' disabled={!topping.used_on.includes(order.id_pizza)} control={<Checkbox checked={order.toppings.includes(topping.id) || false} value={topping.id} onChange={handleTopping} />} label={topping.name + '-' + topping.price} />
                        ))
                    }
                </Box>
            </Box>
            <Box className='pizza-section'>
                <h1>Price</h1>
                <div className='total-price'>
                    ${order.total_price}
                </div>
            </Box>
        </Box>
    )
}

export default PizzaPage