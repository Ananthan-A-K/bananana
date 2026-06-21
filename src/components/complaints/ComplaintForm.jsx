import React, { useState } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';

const CATEGORIES = [
  { label: 'Classroom', value: 'Classroom' },
  { label: 'Laboratory', value: 'Laboratory' },
  { label: 'Hostel', value: 'Hostel' },
  { label: 'Library', value: 'Library' },
  { label: 'Internet/Wi-Fi', value: 'Internet/Wi-Fi' },
  { label: 'Electrical', value: 'Electrical' },
  { label: 'Water Supply', value: 'Water Supply' },
  { label: 'Cleanliness', value: 'Cleanliness' },
  { label: 'Other', value: 'Other' },
];

const ComplaintForm = ({ onSubmit, initialData = {}, submitButtonText = "Submit Complaint" }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    description: initialData.description || '',
    location: initialData.location || '',
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      location: '',
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    handleReset(); // Reset after successful submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Complaint Title"
        id="title"
        name="title"
        placeholder="Brief title of the issue"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <Select
        label="Category"
        id="category"
        name="category"
        placeholder="Select a category"
        options={CATEGORIES}
        value={formData.category}
        onChange={handleChange}
        error={errors.category}
        required
      />

      <Input
        label="Location"
        id="location"
        name="location"
        placeholder="Room number, Building, etc."
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        required
      />

      <TextArea
        label="Description"
        id="description"
        name="description"
        placeholder="Describe the issue in detail"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        rows={5}
        required
      />

      <div className="flex justify-end gap-3 pt-6 border-t border-charcoal-900">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-charcoal-900 bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-warm-cream/60 hover:text-warm-cream hover:border-warm-cream/20 transition-all cursor-pointer"
        >
          Reset Form
        </button>
        <button
          type="submit"
          className="rounded-full bg-acid-lime hover:bg-lime-400 px-8 py-2.5 text-xs font-black uppercase tracking-widest text-pitch-black transition-all cursor-pointer"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
