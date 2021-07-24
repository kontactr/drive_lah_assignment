export const convertToCSV = (data = null, columnDelimiter = ",", lineDelimiter = "\n") => {
    let result, ctr, keys


    if (data === null || !data.length) {
        return null;
    }

    keys = Object.keys(data[0])

    result = ""
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach((item) => {
        ctr = 0
        keys.forEach(key => {
            if (ctr > 0) {
                result += columnDelimiter
            }
            result += typeof item[key] === "string" && item[key].includes(columnDelimiter) ? `"${item[key]}"` : item[key]
            ctr++
        })
        result += lineDelimiter
    })



    return result
}

export const convertToArray = (arr) => {
    let jsonObj = [];
    arr = arr.split("\n").filter(Boolean);
    console.log(arr, 35555)
    let headers = arr[0].split(',');
    for (let i = 1; i < arr.length; i++) {
        let data = arr[i].split(',');
        let obj = {};
        for (let j = 0; j < data.length; j++) {
            obj[headers[j].trim()] = data[j].trim();
        }
        jsonObj.push(obj);
    }
    return jsonObj;
}