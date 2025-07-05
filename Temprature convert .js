<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temperature Converter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .converter-container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }
        
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        
        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }
        
        input[type="number"]:focus {
            outline: none;
            border-color: #4CAF50;
        }
        
        select {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            background-color: white;
            box-sizing: border-box;
        }
        
        select:focus {
            outline: none;
            border-color: #4CAF50;
        }
        
        .convert-btn {
            width: 100%;
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .convert-btn:hover:not(:disabled) {
            background-color: #45a049;
        }
        
        .convert-btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        
        .result {
            margin-top: 20px;
            padding: 15px;
            background-color: #e8f5e8;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
            font-size: 18px;
            font-weight: bold;
            color: #2e7d32;
            display: none;
        }
        
        .form-row {
            display: flex;
            gap: 15px;
        }
        
        .form-row .form-group {
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="converter-container">
        <h1>Temperature Converter</h1>
        <p class="subtitle">Enter the temperature, select units and submit</p>
        
        <form id="temperatureForm">
            <div class="form-group">
                <label for="temperature">Temperature Value:</label>
                <input type="number" id="temperature" step="any" placeholder="0.00">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="fromUnit">From Unit:</label>
                    <select id="fromUnit">
                        <option value="">Select unit</option>
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="toUnit">To Unit:</label>
                    <select id="toUnit">
                        <option value="">Select unit</option>
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                </div>
            </div>
            
            <button type="submit" class="convert-btn" id="convertBtn" disabled>Convert</button>
        </form>
        
        <div id="result" class="result"></div>
    </div>

    <script>
        // Get DOM elements
        const temperatureInput = document.getElementById('temperature');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const convertBtn = document.getElementById('convertBtn');
        const resultDiv = document.getElementById('result');
        const form = document.getElementById('temperatureForm');

        // Add event listeners to check if all fields are filled
        [temperatureInput, fromUnitSelect, toUnitSelect].forEach(element => {
            element.addEventListener('input', checkFormValidity);
            element.addEventListener('change', checkFormValidity);
        });

        function checkFormValidity() {
            const temperature = temperatureInput.value.trim();
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            
            // Enable button only if all three fields are filled
            const isValid = temperature !== '' && fromUnit !== '' && toUnit !== '';
            convertBtn.disabled = !isValid;
        }

        // Temperature conversion functions
        function celsiusToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }

        function celsiusToKelvin(celsius) {
            return celsius + 273.15;
        }

        function fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5/9;
        }

        function fahrenheitToKelvin(fahrenheit) {
            return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
        }

        function kelvinToCelsius(kelvin) {
            return kelvin - 273.15;
        }

        function kelvinToFahrenheit(kelvin) {
            return celsiusToFahrenheit(kelvinToCelsius(kelvin));
        }

        function convertTemperature(value, fromUnit, toUnit) {
            const temp = parseFloat(value);
            
            // If converting to the same unit, return the same value
            if (fromUnit === toUnit) {
                return temp;
            }
            
            // Convert based on the from and to units
            switch (fromUnit) {
                case 'celsius':
                    switch (toUnit) {
                        case 'fahrenheit':
                            return celsiusToFahrenheit(temp);
                        case 'kelvin':
                            return celsiusToKelvin(temp);
                    }
                    break;
                case 'fahrenheit':
                    switch (toUnit) {
                        case 'celsius':
                            return fahrenheitToCelsius(temp);
                        case 'kelvin':
                            return fahrenheitToKelvin(temp);
                    }
                    break;
                case 'kelvin':
                    switch (toUnit) {
                        case 'celsius':
                            return kelvinToCelsius(temp);
                        case 'fahrenheit':
                            return kelvinToFahrenheit(temp);
                    }
                    break;
            }
            
            return temp;
        }

        function getUnitSymbol(unit) {
            switch (unit) {
                case 'celsius':
                    return '°C';
                case 'fahrenheit':
                    return '°F';
                case 'kelvin':
                    return 'K';
                default:
                    return '';
            }
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const temperature = parseFloat(temperatureInput.value);
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            
            // Perform conversion
            const convertedTemp = convertTemperature(temperature, fromUnit, toUnit);
            
            // Display result
            const fromSymbol = getUnitSymbol(fromUnit);
            const toSymbol = getUnitSymbol(toUnit);
            const fromUnitName = capitalizeFirstLetter(fromUnit);
            const toUnitName = capitalizeFirstLetter(toUnit);
            
            resultDiv.innerHTML = `${temperature} ${fromUnitName} is ${convertedTemp.toFixed(2)} ${toUnitName}`;
            resultDiv.style.display = 'block';
        });

        // Initial check on page load
        checkFormValidity();
    </script>
</body>
</html>