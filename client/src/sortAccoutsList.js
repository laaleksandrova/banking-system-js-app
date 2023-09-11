export  function sortAccoutsList(arr, prop, dirProp = false) {
    let result = arr.sort(function(a, b) {
        if (!dirProp ? a[prop] < b[prop] : a[prop] < b[prop]) return -1 ;
    });

    return result
}