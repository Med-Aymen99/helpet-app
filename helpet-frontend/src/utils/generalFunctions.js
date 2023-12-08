
const removeEmptyAttributes = (data) => {
  return Object.entries(data)
    .filter(([key, value]) => value !== "" && value !== null)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}

const handleChangeFunc = (setStatefunc) => 
  (e) => {
    const {name, value, type, checked} = e.target
    console.log(e.target)
    setStatefunc(prevState => {
        return {
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

export {handleChangeFunc, removeEmptyAttributes};