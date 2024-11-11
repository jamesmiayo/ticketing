// CategoryList.tsx

import { useEffect, useState } from 'react'
import { getCategoryAPI } from '../api/services/getCategoryList'

export interface Category {
  id: number
  name: string
}

// Separate function to fetch category data
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const data = await getCategoryAPI.getAllData()
    const categoryNames = data.map((category: Category) => category.name)
    console.log('Category Names:', categoryNames)
    return categoryNames
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// React component to display fetched data
const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const names = await fetchCategories()
      setCategories(names)
    }

    fetchData()
  }, [])

  return (
    <div>
      {categories.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  )
}

export default CategoryList
