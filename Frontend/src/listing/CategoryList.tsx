import { useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { getCategoryAPI } from '../api/services/getCategoryList';

export interface Subcategory {
  subcategory_id: number;
  subcategory_description: string;
}

export interface Category {
  category_id: number;
  category_description: string;
  sub_category: Subcategory[]; // Includes subcategories
}

// Function to fetch category data with subcategories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const data = await getCategoryAPI.getAllData();
    console.log('Fetched categories with subcategories:', data); // Log fetched data for debugging
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// CategoryList Component
export const CategoryList: React.FC<{
  onCategorySelect: (category: Category | null) => void;
}> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryId = parseInt(event.target.value);
    const category =
      categories.find((cat) => cat.category_id == categoryId) || null;
    setSelectedCategoryId(event.target.value);
    onCategorySelect(category);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategoryId}
        name="category"
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
  );
};

export const SubcategoryList: React.FC<{
  subcategories: Subcategory[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
}> = ({ subcategories, selectedSubcategory, onSubcategoryChange }) => {
  const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
    onSubcategoryChange(event.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Subcategory</InputLabel>
      <Select
        name="sub_category"
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
  );
};

const CategorySelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); 
  };

  return (
    <>
      <Grid>
        {' '}
        <CategoryList onCategorySelect={handleCategorySelect} />
        {selectedCategory && selectedCategory.sub_category && (
          <SubcategoryList
            subcategories={selectedCategory.sub_category}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={setSelectedSubcategory} 
          />
        )}
      </Grid>
    </>
  );
};

export default CategorySelector;
