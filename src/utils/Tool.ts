export function transformTitleAndValue(data: any[],
                                       disabledValues: any[] = [],
                                       titleProp = 'title',
                                       valueProp = 'value',
                                       childrenProp = 'children'): any[] {
  return data.map(item => {
    let children = [];
    if (item[childrenProp]) {
      children = transformTitleAndValue(item[childrenProp], disabledValues, titleProp, valueProp, childrenProp);
    }
    return {
      title: item[titleProp],
      value: item[valueProp],
      disabled: disabledValues.indexOf(item[valueProp]) !== -1,
      children,
    };
  });
}

const Tool = {
  transformTitleAndValue,
};

export default Tool;
