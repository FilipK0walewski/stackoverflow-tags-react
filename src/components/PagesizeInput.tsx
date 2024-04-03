import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

interface Props {
  label: string
  initValue?: number
  minValue?: number
  maxValue?: number
  disabled?: boolean
  changeTimeoutMs?: number | null
  onChange: (value: number) => void
}

const PagesizeInput = ({
  label,
  initValue = 1,
  minValue = -Infinity,
  maxValue = Infinity,
  disabled = false,
  changeTimeoutMs = 500,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState(initValue)
  const [timeoutId, setTimeoutId] = useState<number | null | any>(null)

  const clearLastTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  const handlePagesizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.target.value)
    if (newValue > maxValue) {
      newValue = maxValue
    } else if (newValue < minValue) {
      newValue = minValue
    }

    clearLastTimeout()
    if (inputValue !== newValue) {
      setInputValue(newValue)
      if (changeTimeoutMs) {
        const newTimeoutId = setTimeout(() => {
          onChange(newValue)
        }, changeTimeoutMs)
        setTimeoutId(newTimeoutId)
      } else {
        onChange(newValue)
      }
    }
  }

  const handleBlur = () => {
    clearLastTimeout()
    onChange(inputValue)
  }

  return (
    <TextField
      label={label}
      type="number"
      value={inputValue}
      disabled={disabled}
      onChange={handlePagesizeChange}
      onBlur={handleBlur}
    />
  )
}

export default PagesizeInput
