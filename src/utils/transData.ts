export default (jsonArr: any[], idStr: string, pidStr: string, childrenStr: string) => {
  // 存放的最终结果树数组
  const result = [];
  const id = idStr;
  const parentId = pidStr;
  const children = childrenStr;
  const len = jsonArr.length;

  // 遍历得到以id为键名的对象(建立整棵树的索引)
  const hash = {};
  jsonArr.forEach((item) => {
    hash[item[id]] = item;
  });

  for (let j = 0; j < len; j++) {
    const jsonArrItem = jsonArr[j];
    const hashItem = hash[jsonArrItem[parentId]];
    if (hashItem) {
      // 如果当前项还没有children属性，则添加该属性并设置为空数组
      if (!hashItem[children]) {
        hashItem[children] = [];
      }
      hashItem[children].push(jsonArrItem);
    } else {
      result.push(jsonArrItem);
    }
  }
  return result;
};
