import { Box, Button, Grid2, Paper } from '@mui/material'
import React from 'react'

export const Numbers = () => {

    const numbers = [1,2,3,4,5,6,7,8,9]

  return (
    <>
    <Box  sx={{ 
          flex: 2, 
          padding: 2, 
          textAlign: 'center', 
          maxWidth: '60%',
          overflow: 'auto'
        }}>
    <Paper 
       
      >
            <Grid2 container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {numbers.map((number, index) => (
                    <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', height: '100%' }}
                        >
                            {number}
                        </Button>
                  </Grid2>
                ))}
            </Grid2>
            
      </Paper>

      <Paper
        sx={{ 
          padding: 2, 
          textAlign: 'center',
          marginTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2
        }}
        >
            <Button
            variant="contained"
            color="primary"
            sx={{ width: '40%' }}
            >
                0
            </Button>

            <Button
            variant="contained"
            color="primary"
            sx={{ width: '40%' }}
            
            >
                .
            </Button>
        </Paper>

      </Box>


      </>
  )
}
