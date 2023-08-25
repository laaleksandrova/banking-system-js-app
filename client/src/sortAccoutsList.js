export  function sortAccoutsList(arr, prop, dirProp = false) {
    let result = arr.sort(function(a, b) {
        if ((dirProp == false ? a[prop] < b[prop] : a[prop] < b[prop])  == true) return -1 ;
    });

    return result
}