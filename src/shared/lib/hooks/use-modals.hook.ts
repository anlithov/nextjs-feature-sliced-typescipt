import { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { generateRandomNDigits } from '../utils/generate-random-n-digits.util';

export interface IModalProps {
  onClose: () => void;
}

const MODALS_QUERY_KEY = 'app-modals';
export interface IModalData {
  component: FC<IModalProps>;
  props: any;
  onClickBackground?: () => void;
  popupBackgroundColor?: string;
  isShow?: boolean;
}

export type IModalsState = Record<string, IModalData>;

interface ISetNewModal<T> {
  id?: string;
  component: FC<T>;
  props: Omit<T, 'onClose'>;
  onClickBackground?: () => void;
  popupBackgroundColor?: string;
}

export const useModals = () => {
  const queryClient = useQueryClient();
  const { data: modalState } = useQuery<IModalsState>([MODALS_QUERY_KEY], {
    initialData: {},
    enabled: false,
    onSettled: () => {
      queryClient.invalidateQueries([MODALS_QUERY_KEY]);
    },
  });

  const setModalState = (state: IModalsState) => {
    queryClient.setQueryData([MODALS_QUERY_KEY], state);
  };

  const closeAllModals = <T extends {}>() => {
    if (!modalState) {
      return;
    }
    const allActiveModalKeys = Object.keys(modalState);

    const newClosedModalsState: IModalsState = {};
    for (const modalKey of allActiveModalKeys) {
      newClosedModalsState[modalKey] = {
        ...modalState[modalKey],
        isShow: false,
      };
    }
    setModalState(newClosedModalsState);
    if (!allActiveModalKeys.length) {
      return;
    }
    setTimeout(() => {
      setModalState({});
    }, 200);
  };

  const closeModal = <T extends {}>(id: string) => {
    const newClosedModalsState = {
      ...queryClient.getQueryData<IModalsState>([MODALS_QUERY_KEY]),
    };
    if (!newClosedModalsState || !(id in newClosedModalsState)) {
      return;
    }
    newClosedModalsState[id] = {
      ...newClosedModalsState[id],
      isShow: false,
    };
    queryClient.setQueryData<IModalsState>(
      [MODALS_QUERY_KEY],
      newClosedModalsState,
    );
    setTimeout(() => {
      if (!(id in newClosedModalsState)) {
        delete newClosedModalsState[id];
      }
      queryClient.setQueryData<IModalsState>(
        [MODALS_QUERY_KEY],
        newClosedModalsState,
      );
    }, 2000);
  };

  const setModal = <T extends IModalProps>(newModalParams: ISetNewModal<T>) => {
    // Close old modal if not closed
    closeAllModals();
    addModal(newModalParams);
  };

  const addModal = <T extends IModalProps>(newModalParams: ISetNewModal<T>) => {
    const modalId = newModalParams?.id || String(generateRandomNDigits(8));
    // Apply new modal
    setTimeout(() => {
      queryClient.setQueryData<IModalsState>([MODALS_QUERY_KEY], (prev) => {
        if (!prev) {
          return {};
        } else {
          return {
            ...prev,
            [modalId]: {
              ...newModalParams,
              isShow: false,
            } as IModalData,
          };
        }
      });
      // Make it visible
      queryClient.setQueryData<IModalsState>([MODALS_QUERY_KEY], (prev) => {
        if (!prev) {
          return {};
        } else {
          return {
            ...prev,
            [modalId]: {
              ...newModalParams,
              isShow: true,
            } as IModalData,
          };
        }
      });
    }, 200);

    return modalId;
  };

  return { closeAllModals, setModal, closeModal, addModal };
};
