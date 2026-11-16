import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useState } from 'react'

const types = [
  { value: 'MCQ_SINGLE', label: 'MCQ (single correct)' },
  { value: 'MCQ_MULTI', label: 'MCQ (multiple correct)' },
  { value: 'SHORT_ANSWER', label: 'Short Answer (2 words)' },
  { value: 'DESCRIPTION', label: 'Description (2–4 sentences)' }
]

export default function QuestionTypeDialog({ open, onClose, onSelect }) {
  const [type, setType] = useState('MCQ_SINGLE')
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Select Question Type</DialogTitle>
      <DialogContent>
        <RadioGroup value={type} onChange={e => setType(e.target.value)}>
          {types.map(item => <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />)}
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button variant="contained" onClick={() => onSelect(type)}>Continue</Button>
      </DialogActions>
    </Dialog>
  )
}
