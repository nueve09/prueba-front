import { Box, Button, Grid2, Paper } from '@mui/material'

export const Numbers = ({formmatId}) => {

    const numbers = [1,2,3,4,5,6,7,8,9]
    const handleClick = (e) => {
     e.preventDefault()

     const number = e.target.textContent
     formmatId(number)
    }

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
                        <button
                            
                            onClick={handleClick}
                            className="h-20 rounded-full bg-white hover:bg-gray-200 text-3xl px-4 py-2"

                        >
                            {number}
                        </button>
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
            <button
                className="h-20 bg-white hover:bg-gray-200 text-3xl px-5  rounded-full m-auto"
                  onClick={handleClick}
            >
                0
            </button>

            
        </Paper>

      </Box>


      </>
  )
}
