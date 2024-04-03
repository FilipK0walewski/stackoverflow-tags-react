import React, { useState } from 'react'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material'

interface Option {
  label: string
  value: string
}

interface SelectProps {
  label: string
  options: Option[]
  defaultValue?: string
  disabled?: boolean
  onChange: (value: string) => void
}

const BasicSelect: React.FC<SelectProps> = ({
  label,
  options,
  defaultValue = '',
  disabled = false,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue)

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value as string
    setSelectedOption(newValue)
    onChange(newValue)
  }

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={selectedOption}
          label={label}
          onChange={handleChange}
        >
          {options.map((option: Option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default BasicSelect
