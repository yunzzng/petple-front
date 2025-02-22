import { PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  onCloseModal: () => void;
  onOpenModal: () => void;
  open: boolean;
  className?: string;
}

export interface ModalContextProps {
  onCloseModal: () => void;
  onOpenModal: () => void;
  open: boolean;
}

export interface ContentProps extends PropsWithChildren {
  className?: string;
}

export interface TriggerProps extends PropsWithChildren {
  className?: string;
}

export interface CloseProps extends PropsWithChildren {
  className?: string;
}

export interface BackdropProps {
  className?: string;
}
