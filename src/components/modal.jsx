"use client"
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Fade } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Close } from "@mui/icons-material"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    minWidth: "400px",
    maxWidth: "500px",
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(1),
}))

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}))

const Modal = ({ open, onClose, title, children, actions }) => {
  return (
    <StyledDialog open={open} onClose={onClose} TransitionComponent={Fade} transitionDuration={300}>
      <StyledDialogTitle>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <Close />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <StyledDialogActions>{actions}</StyledDialogActions>}
    </StyledDialog>
  )
}

export default Modal
