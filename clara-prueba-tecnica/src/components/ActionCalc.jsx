import { Box, Button,  Paper } from '@mui/material'

export const ActionCalc = ({deleteOneDigit, setInitialValue, findRemesas}) => {
  return (
    <Paper 
        sx={{ 
          flex: 1, 
          padding: 2, 
          textAlign: 'center',
          maxWidth: '100%',
          overflow: 'auto',
          height: '80%',
          my: 2
        }}
      >
        <Box
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 2
            }}

        >
            <button
                
                onClick={deleteOneDigit}
                className="h-50 bg-indigo-700 rounded-md hover:bg-indigo-800 h-40 text-3xl "
            >
              <i className="fa-solid fa-delete-left text-white"></i>            </button>
            <button
                
                onClick={findRemesas}
                className="h-50 bg-indigo-700 rounded-md hover:bg-indigo-800 h-40 text-3xl "
            >
                <i className="fas fa-arrow-left text-white"></i> 
            </button>
        </Box>

      </Paper>
  )
}
