import React from "react";
import styled from "@emotion/styled";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogTitleStyled = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const DialogContentStyled = styled(DialogContent)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const DialogActionsStyled = styled(DialogActions)`
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

const CloseButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const Modal = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = "sm",
    fullWidth = true,
    showCloseButton = true,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitleStyled>
                {title}
                {showCloseButton && (
                    <CloseButton aria-label="close" onClick={onClose} size="small">
                        <CloseIcon />
                    </CloseButton>
                )}
            </DialogTitleStyled>

            <DialogContentStyled>{children}</DialogContentStyled>

            {actions && <DialogActionsStyled>{actions}</DialogActionsStyled>}
        </Dialog>
    );
};

export default Modal;
