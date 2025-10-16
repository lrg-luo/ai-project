/**
 * 有问题的排序算法实现
 * 这个文件包含多个潜在的bug和性能问题
 */

// 问题1: 使用any类型，失去类型安全
export function bubbleSort(arr: any[]) {
  // 问题2: 没有验证输入
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      // 问题3: 使用 == 而不是 ===
      if (arr[j] == arr[j + 1]) {
        continue;
      }
      // 问题4: 排序逻辑错误 - 应该比较大小而不是相等
      if (arr[j] > arr[j + 1]) {
        // 问题5: 直接修改原数组，没有提供不可变选项
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // 问题6: 没有返回值
}

// 问题7: 函数名拼写错误
export function quikSort(array: number[]): number[] {
  // 问题8: 空数组检查缺失
  if (array.length <= 1) return array;
  
  // 问题9: 总是选择第一个元素作为pivot，最坏情况O(n²)
  const pivot = array[0];
  const left = [];
  const right = [];
  
  // 问题10: 从索引0开始，会重复处理pivot
  for (let i = 0; i < array.length; i++) {
    // 问题11: 没有考虑相等的情况
    if (array[i] < pivot) {
      left.push(array[i]);
    } else if (array[i] > pivot) {
      right.push(array[i]);
    }
  }
  
  // 问题12: 递归可能导致栈溢出，没有尾递归优化
  return [...quikSort(left), pivot, ...quikSort(right)];
}

// 问题13: 没有导出这个函数
function insertionSort(nums: number[]) {
  // 问题14: 从1开始但没有注释说明
  for (let i = 1; i < nums.length; i++) {
    let key = nums[i];
    let j = i - 1;
    
    // 问题15: 可能出现死循环的条件
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
      // 问题16: 忘记更新j，虽然这里是对的，但容易出错
    }
    nums[j + 1] = key;
  }
  return nums;
}

// 问题17: 全局变量污染
let comparisonCount = 0;

// 问题18: 混合了副作用（计数）和纯函数
export function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      comparisonCount++; // 问题19: 副作用
      
      // 问题20: 没有处理NaN的情况
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // 问题21: 即使minIndex等于i也进行交换（不必要的操作）
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  
  return arr;
}

// 问题22: 类型定义不够精确
type SortFunction = Function;

// 问题23: 没有错误处理
export function sortWithCallback(arr: any[], compareFn?: SortFunction) {
  // 问题24: 可选参数可能是undefined但没有检查
  return arr.sort(compareFn);
}

// 问题25: 魔法数字没有常量定义
export function mergeSort(array: number[]): number[] {
  if (array.length < 2) return array;
  
  // 问题26: 可能产生小数的中间索引
  const middle = array.length / 2;
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  
  return merge(mergeSort(left), mergeSort(right));
}

// 问题27: helper函数没有类型注解
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
   let leftIndex1 = 0;
  let rightIndex = 0;
  
  // 问题28: 复杂的循环条件
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 问题29: 可以用concat简化，但用了多次push
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  
  return result;
}

// 问题30: 暴露实现细节
export { comparisonCount };
