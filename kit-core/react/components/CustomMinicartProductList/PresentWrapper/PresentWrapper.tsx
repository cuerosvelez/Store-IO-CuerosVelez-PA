import React, { useEffect, useState } from 'react';
import { OrderForm } from 'vtex.order-manager';

import styles from './styles.css';
import useItemAttachment from './useItemAttachment';

const { useOrderForm } = OrderForm;

export const PresentWrapper: StorefrontFunctionComponent = (props) => {
  const { orderForm } = useOrderForm();
  const { addAttachment, removeAttachment } = useItemAttachment();
  const product = props.props;

  console.log('product', product);

  const wrapperAlreadyExists = product.attachments.length;

  const wrapperIndex = orderForm?.items?.findIndex(
    (item: { id: string }) => item.id === product.id,
  );

  const [hasWrapper, setHasWrapper] = useState(!!wrapperAlreadyExists);
  const [inputDe, setInputDe] = useState('');
  const [inputPara, setInputPara] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [verify, setVerify] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement>,
    isRemoving?: boolean,
  ) => {
    e?.preventDefault();
    setVerify(true);
    if (!inputDe || !inputPara || !inputMessage) return;

    console.log(product.attachments, 'Olha o produto aque');

    if (isRemoving) {
      await removeAttachment({
        attachmentName: 'regalo',
        attachment: {
          content: {
            remitente: inputDe,
            destinatario: inputPara,
            mensaje: inputMessage,
          },
        },
        itemIndex:
          wrapperIndex !== -1 ? wrapperIndex : orderForm?.items?.length,
      });
    } else {
      await addAttachment({
        attachmentName: 'regalo',
        attachment: {
          content: {
            remitente: inputDe,
            destinatario: inputPara,
            mensaje: inputMessage,
          },
        },
        itemIndex:
          wrapperIndex !== -1 ? wrapperIndex : orderForm?.items?.length,
      });
    }
  };

  function verificarCheckBox() {
    const inputCheck = document.getElementById(
      `${product.id}`,
    ) as HTMLInputElement;
    if (product.attachments.length) {
      inputCheck.checked = true;
    }
  }

  const clearInputs = () => {
    setInputDe('');
    setInputPara('');
    setInputMessage('');
  };

  useEffect(() => {
    if (hasWrapper) return;

    setHasWrapper(false);
    verificarCheckBox();
    clearInputs();
  }, [wrapperAlreadyExists, hasWrapper]);

  //Não colocado classe pois não esta sendo utilizado

  return (
    <div className={styles['wrapper-container']}>
      <label
        htmlFor={`${product.id}`}
        className={styles['label-select-wrapper']}
      >
        <input
          id={`${product.id}`}
          type="checkbox"
          onChange={() => {
            openForm &&
              product.attachments.some((e: any) => e.name === 'regalo') &&
              handleSubmit(undefined, openForm);
            setOpenForm(!openForm);
          }}
          className={styles['input-select-wrapper']}
        />
        <span className={styles.checkmarkSelectWrapper} />
        <span className={styles.messageSelectWrapper}>
          Incluir empaque de regalo
        </span>
        <p className={styles.messageCost}>
          Este tendrá un costo adicionalde $0.000
        </p>
      </label>
      {openForm && (
        <form className={styles['form-send-wrapper']} onSubmit={handleSubmit}>
          <div className={styles['form-inputs-row']}>
            <label className={styles['form-send-wrapper-label']}>
              De:
              <input
                type="text"
                value={inputDe}
                onChange={(e) => setInputDe(e.target.value)}
                className={styles['form-send-wrapper-input']}
                placeholder="Su nombre"
              />
              <span className={styles['form-send-wrapper-error-message']}>
                {!inputDe && verify ? 'Este campo es necesario' : ''}
              </span>
            </label>
            <label className={styles['form-send-wrapper-label']}>
              Para:
              <input
                type="text"
                value={inputPara}
                onChange={(e) => setInputPara(e.target.value)}
                className={styles['form-send-wrapper-input']}
                placeholder="Su nombre"
              />
              <span className={styles['form-send-wrapper-error-message']}>
                {!inputPara && verify ? 'Este campo es necesario' : ''}
              </span>
            </label>
          </div>
          <label className={styles['form-send-wrapper-label']}>
            Mensaje:
            <textarea
              className={styles['form-send-wrapper-textarea']}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe acá"
            />
            <span className={styles['form-send-wrapper-error-message']}>
              {!inputMessage && verify ? 'Este campo es necesario' : ''}
            </span>
          </label>
          <button type="submit" className={styles['form-send-wrapper-submit']}>
            ENVIAR
          </button>
        </form>
      )}
    </div>
  );
};
