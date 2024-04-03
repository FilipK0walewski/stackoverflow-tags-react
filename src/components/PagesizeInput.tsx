import React, { useEffect, useState } from 'react'
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
  const [inputValue, setInputValue] = useState<number | string>(initValue)
  const [timeoutId, setTimeoutId] = useState<any>(null)

  const clearLastTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  const setValidValue = () => {
    let newValue = inputValue
    if (typeof newValue === 'string') {
      newValue = parseInt(newValue) || initValue
    }
    if (newValue > maxValue) {
      newValue = maxValue
    } else if (newValue < minValue) {
      newValue = minValue
    }
    setInputValue(newValue)
    onChange(newValue)
  }

  const handlePagesizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleBlur = () => {
    clearLastTimeout()
    setValidValue()
  }

  useEffect(() => {
    clearLastTimeout()
    const newTimeoutId = setTimeout(() => {
      setValidValue()
    }, changeTimeoutMs || 1)
    setTimeoutId(newTimeoutId)
  }, [inputValue])

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
