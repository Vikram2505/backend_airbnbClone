// This function is for rename key receive form request body
export default function renameKeys(obj, newKeys) {
    const keyValues = Object?.keys(obj).map((key) => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }