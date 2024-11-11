import { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { getCategoryAPI } from '../api/services/getCategoryList'

export interface Category {
  category_id: number
  category_description: string
}

// Separate function to fetch category data
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const data = await getCategoryAPI.getAllData()
    const categoryNames = data.map(
      (category: Category) => category.category_description
    )
    console.log('Category Names:', categoryNames)
    return categoryNames
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// React component to display fetched data in a combobox
const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const names = await fetchCategories()
      setCategories(names)
    }

    fetchData()
  }, [])

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        label="Category"
      >
        {categories.map((name, index) => (
          <MenuItem key={index} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategoryList
