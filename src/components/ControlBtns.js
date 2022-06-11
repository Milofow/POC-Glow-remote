import '../styling/styles.css'
import { useState } from 'react';
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudBolt, faCloudRain, faSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const socket = io.connect("https://glow-websocket-server.herokuapp.com")

const defaultWeather = {
    sunny: false,
    cloudy: false,
    windy: false,
    rainy: false,
    stormy: false
}

const ControlBtn = () => {

    const [weather, setWeather] = useState({...defaultWeather});

    const changeWeather = (e) => {
        const weatherType = e.target.value;
        setWeather({...defaultWeather});
        weather[weatherType] = true;
        console.log(weather)
        socket.emit("weather", weather)
    }

    return (
        <div className=''>
            <FormControl>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="sunny"
                    name="radio-buttons-group"
                    onChange={(e) => changeWeather(e)}
                >
                    <FormControlLabel 
                        value="sunny"
                        control={<Radio />} 
                        label={<FontAwesomeIcon icon={faSun} size="6x" color={ weather.sunny? 'green' : ''} />}
                    />
                    <FormControlLabel 
                        value="cloudy"
                        control={<Radio />} 
                        label={<FontAwesomeIcon icon={faCloud} size="6x" color={weather.cloudy? 'green' : ''} />} 
                    />
                    <FormControlLabel
                        value="windy" 
                        control={<Radio />} 
                        label={<FontAwesomeIcon icon={faWind} size="6x" color={weather.windy? 'green' : ''} />} 
                    />
                    <FormControlLabel 
                        value="rainy"
                        control={<Radio />} 
                        label={<FontAwesomeIcon icon={faCloudRain} size="6x" color={weather.rainy? 'green' : ''} />} 
                    />
                    <FormControlLabel 
                        value="stormy"
                        control={<Radio />} 
                        label={<FontAwesomeIcon icon={faCloudBolt} size="6x" color={weather.stormy? 'green' : ''} />} 
                    />


                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ControlBtn;