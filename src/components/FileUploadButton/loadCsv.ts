import React from "react"

export const parseCsv = (data: string): string[][] => {
  return data.split('\r\n').map((row)=>row.split(','))
}

export const onFileInputToArray = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (!(event.target instanceof HTMLInputElement)) return
  if (!event.target.files) return

  const file = parseCsv(await event.target.files[0].text())

  const target = []

  for(let i = 1; i < file.length; i++) {
    const data = file[i].reduce((accumlator, currentValue, index) => {
      const obj = { [file[0][index]]: currentValue }
      accumlator = Object.assign({ ...accumlator }, obj)
      return accumlator
    }, {})
    target.push(data)
  }
  return target
}