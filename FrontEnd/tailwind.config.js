/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primaryColor: '#181B33',
      primaryLightColor: '#282D49',
      blueColor: '#004680',
      greenColor: '#34C364',
      white:'#FFF',
      gray: '#73747C',
      primaryBlue: '#0071F9',
      primaryLightBlue: '#F5F6FA',
      primaryMediumBlue: '#EAF4FE',
      red: '#E20D2C',
      greenLinear: '#10B981',
      purpleLinear: '#6366F1',
      blueLinear:'#0EA7DE',
      grayLight: '#D1D5DB',
      grayDark: '#4B5563',
      black: '#000',
      red: '#E3242B',
      greenDark: '#327846',
      greenLight: '#D7E6DC',
      peachColor: '#FFC5C5',
      greenBlur: '#A6CF98',
      grayDropDown: '#444546',
      redLight: "#C70039",
      whiteMilk: '#FCFDFE',
      blueLight: '#BFDBFE',
      
    }
  },
  
  plugins: [],
}