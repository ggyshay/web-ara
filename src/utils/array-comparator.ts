export const areEqual = (ar1, ar2) => {
    let equal = true;
    ar1.forEach((el, idx) => {
        if(el != ar2[idx]){ equal = false}
    });
    return equal;
}