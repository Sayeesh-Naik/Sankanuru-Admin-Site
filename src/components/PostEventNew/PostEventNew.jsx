import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';

function PostEventNew() {

  const navigate = useNavigate()
  const location = useLocation();
  const initialData = location.state?.tableData;
   
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    images: [
      { img1: null },
      { img2: null },
      { img3: null }
    ],
    speaker1: '',
    speaker2: '',
    speaker3: '',
    speaker4: '',
    date: '',
    time: dayjs() // Initialize time as current dayjs object
  });

  // Use useEffect to populate the form data when initialData is available
  useEffect(() => {
    
    if (initialData) {
      setFormData((prevState) => ({
        ...prevState,
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        images: initialData.images.map((imgObj, index) => ({
          [`img${index + 1}`]: imgObj[`img${index + 1}`] || null
        })),
        speaker1: initialData.speaker1 || '',
        speaker2: initialData.speaker2 || '',
        speaker3: initialData.speaker3 || '',
        speaker4: initialData.speaker4 || '',
        date: initialData.date || '',
      }));
    }
  }, []); // This effect runs when `initialData` changes

  // Dynamically update form data
  const updateFormData = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image upload for specific image index
  const handleImageUpload = async (file, index) => {
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file); // Upload image to Cloudinary
      if (imageUrl) {
        const updatedImages = [...formData.images];
        updatedImages[index] = { [`img${index + 1}`]: imageUrl };
        updateFormData('images', updatedImages); // Update the images state dynamically
      }
    }
  };

  // Trigger file input click
  const handleBoxClick = (index) => {
    document.getElementById(`upload-button-${index}`).click();
  };

  // Handle image drag-and-drop
  const handleImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Get the first dropped file
    handleImageUpload(file, index); // Upload the dropped file
  };

  // Handle drag over event to allow dropping
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent the default behavior to allow drop
  };

  // Handle form submission
  const handleSubmit = () => {
    const formattedTime = formData.time.format('hh:mm A'); // Format time as 'Hr:Mm AM/PM'
    const updatedFormData = {
      ...formData,
      time: formattedTime, // Update time field in formData to the formatted string
    };
    console.log('Form Data on Submit:', JSON.stringify(updatedFormData, null, 2)); // Log the form data
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'white', // Set background color to white
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
       <Box display={'flex'} justifyContent="space-between" mb={1}>
              <Typography variant="h5" fontWeight={'bold'}>
                Post Event Table
              </Typography>
              <Button
                variant="contained"
                onClick={()=>navigate('/nursing/post-event-table')}
                sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
              >
                Show Post Event Table
              </Button>
      </Box>
      <Grid container spacing={3}>
        {/* Image Upload Section */}
        <Grid item xs={12}>
          <Typography variant="h6" mb={1}>Browse File or Drag and Drop</Typography>
          <Grid container spacing={2}>
            {formData.images.map((imageObj, index) => (
              <Grid item xs={4} key={index} textAlign="center">
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    border: '2px dashed #aaa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'rgb(225, 244, 255)'
                  }}
                  onClick={() => handleBoxClick(index)} // Trigger file input on Box click
                  onDrop={(e) => handleImageDrop(e, index)} // Handle image drop
                  onDragOver={handleDragOver} // Allow drag over
                >
                  {imageObj[`img${index + 1}`] ? (
                    <img
                      src={imageObj[`img${index + 1}`]}
                      alt={`upload-preview-${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography>Upload Image {index + 1}</Typography>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], index)}
                    style={{ display: 'none' }}
                    id={`upload-button-${index}`}
                  />
                </Box>
                {imageObj[`img${index + 1}`] && (
                  <Button
                    onClick={() => {
                      const updatedImages = [...formData.images];
                      updatedImages[index] = { [`img${index + 1}`]: null };  // Reset image
                      updateFormData('images', updatedImages); 
                      handleBoxClick(index);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '10px', background: 'var(--mainBg)', color: 'white'}}
                  >
                    Re-upload
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Title Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Title</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)} // Dynamically update title
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)} // Dynamically update description
          />
        </Grid>

        {/* Rich Text Editor Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Content</Typography>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) => updateFormData('content', value)} // Dynamically update content
            style={{
              fontSize: '16px',
              backgroundColor: 'white', // Set background color to white
              borderRadius: '5px',
              padding: '10px',
              paddingBottom: '50px',
              height: '200px',
            }}
          />
        </Grid>

        {/* Speaker Fields */}
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 1" value={formData.speaker1} onChange={(e) => updateFormData('speaker1', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 2" value={formData.speaker2} onChange={(e) => updateFormData('speaker2', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 3" value={formData.speaker3} onChange={(e) => updateFormData('speaker3', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 4" value={formData.speaker4} onChange={(e) => updateFormData('speaker4', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={(e) => updateFormData('date', e.target.value)} />
        </Grid>

        {/* Time Picker Section */}
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="HR:MM - AM/PM"
              value={formData.time} // Use dayjs object here
              onChange={(newTime) => updateFormData('time', newTime)} // Update with dayjs object
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  value={formData.time ? formData.time.format('hh:mm A') : ''} // Format time as hr:min AM/PM
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default PostEventNew;
