import { captureRejections } from 'events'

var { jStat } = require('jstat')


function jstatTest(){
  console.log('in jstat test', jStat.percentile([1, 2, 3, 4], 0.3, true))
  return jStat.percentile([1, 2, 3, 4], 0.3, true)
}

function calcPercentDiff(num1, num2){
  const minus = num1-num2
  const plus = (num1+num2)/2
  // const smallNum = minus/plus < 0 ? (minus/plus)*-1 : minus/plus
  return minus/plus * 100
}

export {jstatTest, calcPercentDiff}