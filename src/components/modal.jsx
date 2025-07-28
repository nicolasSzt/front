import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(1)};
`;

const ButtonCreate = styled(Button)`
  &.Mui-disabled {
    background-color: #e0e0e0;
    color: #999;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

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
    <Modal
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
    </Modal>
  )
}

export default ModalCreate;

