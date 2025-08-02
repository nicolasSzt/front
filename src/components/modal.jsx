import Modal from '@mui/material/Modal';
import { Box, Button, TextField } from '@mui/material';
import styled from '@emotion/styled';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
`;

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
  onCreate,
  titleError,
  handleChangeWithValidation,
  onChangeDescription,
  setDescription,
  labelTitle,
  buttonlabel,
  title,
  description,
}) => {
  const isFormValid = title.trim() && description.trim();

  return (
    <StyledModal
      open={openModal}
      onClose={onCloseModal}
    >
      <ModalContent>
        <TextField
          label={labelTitle}
          name="title"
          onChange={handleChangeWithValidation}
          value={title}
          fullWidth
          error={!!titleError}
          helperText={titleError || ""}
        />
        <TextField
          label="Descripción"
          name="description"
          onChange={onChangeDescription}
          value={description}
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
            onClick={onCreate}
            variant="outlined"
            color="primary"
            disabled={!isFormValid}
          >
            {buttonlabel}
          </ButtonCreate>
        </Box>
      </ModalContent>
    </StyledModal>
  )
}

export default ModalCreate