export function calculateBmi(height: number, weight: number) {
  const BMI = weight / ((height / 100) * (height / 100))
  let res
  if (BMI < 15)
    res = "Very severely underweight"
  else if (BMI < 16)
    res = "Severely underweight"
  else if (BMI < 18.5)
    res = "Underweight"
  else if (BMI < 25)
    res = "Normal (healthy weight)"
  else if (BMI < 30)
    res = "Overweight"
  else if (BMI < 35)
    res = "Obese Class I (Moderately obese)"
  else if (BMI < 40)
    res = "Obese Class II (Severely obese)"
  else
    res = "Obese Class III (Very severely obese)"

  console.log(res)
  return res
}

// console.log(calculateBmi(180, 74))

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
calculateBmi(height, weight)
