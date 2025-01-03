import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { TableDataPre } from '../../services/data-const';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../../services/api-service';
import { getAllPreEventsConst } from '../../services/api-constants';
import Loader from '../../common-components/Loader/Loader';

// Sample structured data
const tableData = TableDataPre;

const PretEventTable = () => {
  // Initialize state for data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetchEvents();
    setIsLoading(false);
  }, []);

  const fetchEvents = async () => {
      const response = await apiGet(getAllPreEventsConst);
      setData(response['data'])
   
  };


  // Columns definition for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'title', // column accessor key (matches data field)
        header: 'Title',
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
        header: 'Image',
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
        id: 'actions', // Actions column for buttons
        header: 'Actions',
        Cell: ({ row }) => (
          <Box display={'flex'} justifyContent={'space-around'} sx={{width: '100%'}}>
            <Edit 
              sx={{padding: '8px', cursor:'pointer'}}
              onClick={() => editAction(row.original)}
            />

            <Delete
              sx={{padding: '8px', cursor: 'pointer'}}
              onClick={() => deleteAction(row.original)}
            />
          </Box>          
        ),
      },
    ],
    []
  );

  const editAction = (updatingData)=> {
    console.log(updatingData)
    navigate('/nursing/pre-event-update', {state: {tableData: updatingData}})
  }

  const deleteAction = (index)=> {

  }


  // Check if data is loaded and available before rendering the table
  if (!data || data.length === 0) {
    return (
      <Stack>
          <Loader/>
        <Box display={'flex'} justifyContent="space-between" mb={3}>
          <Typography variant="h5" fontWeight={'bold'}>
            Pre Event Table
          </Typography>
          <Button
            variant="contained"
            onClick={()=> navigate('/nursing/pre-event-new')}
            sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
          >
            Add Pre Event
          </Button>
        </Box>
        <div>No data available</div>
        </Stack>
      )
  }

  // Table configuration
  return (
    <Stack>
      <Box display={'flex'} justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={'bold'}>
          Pre Event Table
        </Typography>
        <Button
          variant="contained"
          onClick={()=> navigate('/nursing/pre-event-new')}
          sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
        >
          Add Pre Event
        </Button>
      </Box>

      <MaterialReactTable
        columns={columns} // Pass columns configuration
        data={data} // Pass data
        // enableColumnPinning={true} // Enable column pinning
        layoutMode="grid-no-grow" // Constant column widths
        initialState={{
          columnPinning: { left: ['title', 'date'], right: ['actions'] }, // Pinning actions column to the right
        }}
      />
    </Stack>
  );
};

export default PretEventTable;
