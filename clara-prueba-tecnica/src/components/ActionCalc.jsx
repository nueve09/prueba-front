import { Box, Button, Grid2, Paper } from '@mui/material'

export const ActionCalc = () => {
  return (
    <Paper 
        sx={{ 
          flex: 1, 
          padding: 2, 
          textAlign: 'center',
          maxWidth: '100%',
          overflow: 'auto'

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
            <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%', height: '00%' }}
            >
                Calcular
            </Button>
            <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%' }}
            >
                Limpiar
            </Button>
        </Box>

      </Paper>
  )
}
