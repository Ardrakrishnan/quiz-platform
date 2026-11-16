import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const location = useLocation()
  const participant = useSelector(state => state.play.participant)
  const links = [
    { label: 'Home', to: '/' },
    { label: 'My Quizzes', to: '/my-quizzes' },
    { label: 'Play Quiz', to: '/authentication' }
  ]
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ maxWidth: 1240, width: '100%', mx: 'auto', minHeight: '70px !important', gap: 2 }}>
        <Typography component={RouterLink} to="/" variant="h6" sx={{ color: '#172033', textDecoration: 'none', fontWeight: 850, letterSpacing: '-.04em', mr: 'auto' }}>
          <Box component="span" sx={{ bgcolor: '#e32323', color: 'white', px: .7, py: .15, borderRadius: .5, mr: .6 }}>A</Box>lmaBetter
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: .2, sm: 1 } }}>
          {links.map(link => (
            <Button key={link.to} component={RouterLink} to={link.to} color={location.pathname === link.to ? 'primary' : 'inherit'} size="medium">
              {link.label}
            </Button>
          ))}
          {participant && <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>{participant}</Typography>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
