import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { TableData } from '../../services/data-const';
import { useNavigate } from 'react-router-dom';

// Sample structured data
const exampleData = TableData;

const PostEventTable = () => {
  // Initialize state for data
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      // Here you can replace with actual API call
      setData(exampleData); // Set the example data (or use fetched data)
    };

    fetchData();
  }, []);

  // Columns definition for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'title', // column accessor key (matches data field)
        header: 'Title',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'content',
        header: 'Content',
        Cell: ({ cell }) => <div dangerouslySetInnerHTML={{ __html: cell.getValue() }} />, // Render HTML content
      },
      {
        accessorKey: 'images',
        header: 'Images',
        Cell: ({ cell }) => {
          const images = cell.getValue();
          return (
            <div>
              {images.map((img, index) =>
                img[`img${index + 1}`] ? (
                  <img
                    key={index}
                    src={img[`img${index + 1}`]}
                    alt={`img-${index}`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '5px' }}
                  />
                ) : (
                  <span key={index}>
                    {/* No Image */}
                  </span>
                )
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'speaker1',
        header: 'Speaker 1',
      },
      {
        accessorKey: 'speaker2',
        header: 'Speaker 2',
      },
      {
        accessorKey: 'speaker3',
        header: 'Speaker 3',
      },
      {
        accessorKey: 'speaker4',
        header: 'Speaker 4',
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
      {
        accessorKey: 'time',
        header: 'Time',
      },
      {
        id: 'actions', // Actions column for buttons
        header: 'Actions',
        Cell: ({ row }) => (
          <Box display={'flex'} justifyContent={'space-around'} sx={{width: '100%'}}>
            <Edit 
              sx={{padding: '8px', cursor:'pointer'}}
              onClick={() => editAction(row.index)}
            />

            <Delete
              sx={{padding: '8px', cursor: 'pointer'}}
              onClick={() => deleteAction(row.index)}
            />
          </Box>          
        ),
      },
    ],
    []
  );

  const editAction = (index)=> {
    navigate('/nursing/post-event-new', {state: {tableData: TableData[index]}})
  }

  const deleteAction = (index)=> {

  }


  // Check if data is loaded and available before rendering the table
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Table configuration
  return (
    <Stack>
      <Box display={'flex'} justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={'bold'}>
          Post Event Table
        </Typography>
        <Button
          variant="contained"
          onClick={()=> navigate('/nursing/post-event-new')}
          sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
        >
          Add Post Event
        </Button>
      </Box>

      <MaterialReactTable
        columns={columns} // Pass columns configuration
        data={data} // Pass data
        // enableColumnPinning={true} // Enable column pinning
        layoutMode="grid-no-grow" // Constant column widths
        initialState={{
          columnPinning: { left: ['title'], right: ['actions'] }, // Pinning actions column to the right
        }}
      />
    </Stack>
  );
};

export default PostEventTable;
