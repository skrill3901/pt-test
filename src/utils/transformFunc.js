const transformFunc = (obj) => {
    let arr = [];
    Object.entries(obj.Valute).map(item => {
        arr = [...arr, item.slice(1)]
        return arr;
    })
    arr = arr.flat().map((item) => {
        if (item.Name.length > 25) {
            item.Name = item.Name.slice(0, 25) + '...';
        }
        item.Dynamic = (100 * (item.Value - item.Previous) / item.Previous).toFixed(2);
        item.Value = (item.Value / item.Nominal).toFixed(2);
        return item;
    })
    return arr;
}

export default transformFunc;
  