export const calculatePer = (value,inputVal) =>  {
    return value + (value*(inputVal / 100));
}
export const getNewChildVal =  (childValue, orgValue,newVal) => {
    const childper = (childValue / orgValue)*100;
    console.log(childper)
    return parseFloat((newVal*childper)/100).toFixed(2);
}