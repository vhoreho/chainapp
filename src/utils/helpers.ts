export const mergeObjects = (objectsArray: any[]): any => {
  return objectsArray.reduce((merged, obj) => {
    return { ...merged, ...obj };
  }, {});
};

export const isEmptyObject = (obj: any): any => {
  return Object.getOwnPropertyNames(obj).length === 0;
};
