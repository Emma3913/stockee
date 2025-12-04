export type CustomModalProps = {
    isVisible?: boolean;
    title?: string;
    description?: string;
    subDescription?: string;
    buttonTitle?: string;
    onPressButton?: () => void;
    closeAnimation?: () => void;
    modalWithoutButton?: boolean;
    goToAnotherPage?: boolean;
};


export type ModalState = Omit<CustomModalProps, "isVisible" | "onPressButton"> & {
  isVisible: boolean;
};