

export function getArrayData(data) {
    if (data) {
        return Object.entries(data).map(([key , value])=>({
          ...value, 
          id: key
        }))
    }
}