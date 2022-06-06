export default function checkArrayEquality(arrOne, arrTwo){
  let result =
  arrOne.length === arrTwo.length &&
  arrOne.every(function (element) {
    return arrTwo.includes(element);
  });

  return result
}