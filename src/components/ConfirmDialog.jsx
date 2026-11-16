import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'

export default function ConfirmDialog({ open, title = 'Are you sure?', message, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent><Typography color="text.secondary">{message}</Typography></DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} color="inherit">No</Button>
        <Button onClick={onConfirm} color="error" variant="contained">Yes, delete</Button>
      </DialogActions>
    </Dialog>
  )
}
