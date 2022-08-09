let testArray1 = [41, 55, 61, 1, 8, 27, 37, 39]; // [3025]
let testArray2 = [41, 55, 2, 3, 6, 99, 88, 77]; // [2, 3, 6, 41, 55, 77, 88, 99]
let testArray3 = [55, 1025, 101, 33, 48, 863, 99104, 2431, 53, 7]; // [49, 10201]

function filterArray(initialArr) {
  // сортируем входной массив
  initialArr.sort((a, b) => a - b);

  // превращаем его в массив строк
  let stringArr = makeStringArray(initialArr);

  // засекаем длину для проверки на условие останова
  let stringArrLength = stringArr.length;

  // создаем новый массив, куда пойдет конечный результат
  let resultArr = [];

  // перебираем входной массив
  for (let i = 0; i < initialArr.length; i++) {
    // если массив пуст, прекращаем фильтрацию
    if (stringArr.length === 0) break;

    // перед фильтрацией фиксируем длину , чтобы сверяться на каждой итерации
    let lengthIndicator = stringArr.length;

    // берем очередной элемент входного массива
    let includedElem = stringArr[0];

    // 2 случая:
    // 1) элемент - не однозначное число
    if (includedElem.length > 1) {
      let splitElem = includedElem.split('');
      for (let i = 0; i < splitElem.length; i++) {
        for (let j = 1; j < stringArr.length; j++) {
          if (stringArr[j].includes(splitElem[i])) {
            stringArr.splice(j, 1);
          }
        }
      }

      // 2) элемент - однозначное число
    } else if (includedElem.length === 1) {
      for (let i = 1; i < stringArr.length; i++) {
        if (stringArr[i].includes(includedElem)) {
          stringArr.splice(i, 1);
        }
      }
    }

    // проверяем по длине, отфильтровалось ли что-то после итерации
    if (lengthIndicator === stringArr.length) {
      // если нет, то выносим очередной элемент (includedElem) в результат
      resultArr.push(stringArr.splice(0, 1).join(''));
    } else if (lengthIndicator !== stringArr.length) {
      // если да, то просто удаляем сверяемый элемент
      stringArr.shift();
    }
  }

  // проверяем условия для останова
  if (
    resultArr.length === 0 ||
    resultArr.length === 1 ||
    resultArr.length === stringArrLength
  ) {
    // если условие останова выполняется, выносим результат в консоль
    console.log('Конечный результат');
    console.log(makeNumberArray(resultArr));
  } else {
    // если условие останова не выполняется, выводим промежуточный массив
    console.log('После круга фильтрации');
    console.log(makeNumberArray(resultArr));

    // и далее продолжаем фильтрацию
    // отображаем числа в обратном порядке и возводим в квадрат
    let newResultArr = makeReversedPow(resultArr);

    // заново фильтруем
    filterArray(newResultArr);
  }
}

filterArray(testArray1);

//--------------------------------------------------- Вспомогательные методы: ----------------------------------------------------//

// 1) Отображение в обратном порядке и возведение в квадрат
function makeReversedPow(formerResult) {
  let reversedAndDoubledArray = formerResult.map((item) => {
    if (item.length > 1) {
      let reversedItem = item.split('').reverse().join('');
      let reversedDoubledItem = reversedItem ** 2;
      return reversedDoubledItem;
    } else {
      let doubledItem = item ** 2;
      return doubledItem;
    }
  });

  return reversedAndDoubledArray;
}

// 2) Превращение массива чисел в массив строк, чтобы фильтровать по методам строк

function makeStringArray(numberArr) {
  let stringArr = numberArr.map((item) => {
    return item.toString();
  });

  return stringArr;
}

// 3) Преобразование в массив чисел, т.к по условию задачи в консоль выводится массив чисел, а не строк
function makeNumberArray(result) {
  let consoleArray = result.map((item) => Number(item));

  return consoleArray;
}
