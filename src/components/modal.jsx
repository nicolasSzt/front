import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField } from '@mui/material';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  width: '400px',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ButtonCreate = styled(Button)(({ theme }) => ({
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    cursor: 'not-allowed',
  },
}));

const ModalCreate = ({
  openModal,
  onCloseModal,
  onCreateChannel,
  handleChangeWithValidationTitle,
  handleChangeDescription,
  channelNameError,
  newChannelName,
  newChannelDescription,
}) => {
  const isFormValid = newChannelName.trim() && newChannelDescription.trim();

  return (
    <StyledModal
      open={openModal}
      onClose={onCloseModal}
    >
      <ModalContent>
        <TextField
          label="Nombre del Workspace"
          name="title"
          onChange={handleChangeWithValidationTitle}
          value={newChannelName}
          fullWidth
          error={!!channelNameError}
          helperText={channelNameError || ""}
        />
        <TextField
          label="Descripción"
          name="description"
          onChange={handleChangeDescription}
          value={newChannelDescription}
          fullWidth
        />
        <Box
          display="flex"
          justifyContent="flex-end"
          gap={1}
        >
          <Button
            onClick={onCloseModal}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
          <ButtonCreate
            onClick={onCreateChannel}
            variant="outlined"
            color="primary"
            disabled={!isFormValid}
          >
            Crear nuevo Canal
          </ButtonCreate>
        </Box>
      </ModalContent>
    </StyledModal>
  )
}

export default ModalCreate;

