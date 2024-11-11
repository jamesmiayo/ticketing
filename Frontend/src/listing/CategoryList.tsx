import { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { getCategoryAPI } from '../api/services/getCategoryList'

export interface Subcategory {
  subcategory_id: number
  subcategory_description: string
}

export interface Category {
  category_id: number
  category_description: string
  sub_category: Subcategory[] // Includes subcategories
}

// Function to fetch category data with subcategories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const data = await getCategoryAPI.getAllData()
    console.log('Fetched categories with subcategories:', data) // Log fetched data for debugging
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// CategoryList Component
export const CategoryList: React.FC<{
  onCategorySelect: (category: Category | null) => void
}> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories()
      setCategories(categories)
    }

    fetchData()
  }, [])

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryId = parseInt(event.target.value)
    console.log(categoryId, categories)
    const category =
      categories.find((cat) => cat.category_id == categoryId) || null
    setSelectedCategoryId(event.target.value)
    console.log('Selected Category:', category?.sub_category)
    onCategorySelect(category)
    console.log('list', category)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategoryId}
        onChange={(e) => handleCategoryChange(e)}
        label="Category"
      >
        {categories.map((category) => (
          <MenuItem
            key={category.category_id}
            value={category.category_id.toString()}
          >
            {category.category_description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

// SubcategoryList Component
export const SubcategoryList: React.FC<{
  subcategories: Subcategory[]
  selectedSubcategory: string
  onSubcategoryChange: (subcategory: string) => void
}> = ({ subcategories, selectedSubcategory, onSubcategoryChange }) => {
  const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
    onSubcategoryChange(event.target.value)
  }

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Subcategory</InputLabel>
      <Select
        value={selectedSubcategory}
        onChange={handleSubcategoryChange}
        label="Subcategory"
      >
        {subcategories.map((sub) => (
          <MenuItem
            key={sub.subcategory_id}
            value={sub.subcategory_description}
          >
            {sub.subcategory_description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

// Main Component to use CategoryList and SubcategoryList
const CategorySelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')

  // Handles when a category is selected and updates state
  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category)
    setSelectedSubcategory('') // Clear the subcategory selection when the category changes
  }

  return (
    <>
      <CategoryList onCategorySelect={handleCategorySelect} />

      {/* Render Subcategory dropdown only if a category is selected */}
      {selectedCategory && selectedCategory.subcategories && (
        <SubcategoryList
          subcategories={selectedCategory.subcategories} // Pass the subcategories of the selected category
          selectedSubcategory={selectedSubcategory}
          onSubcategoryChange={setSelectedSubcategory} // Handle subcategory selection
        />
      )}
    </>
  )
}

export default CategorySelector
