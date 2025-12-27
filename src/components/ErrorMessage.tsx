interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ff6b6b',
          marginBottom: '16px',
        }}
      >
        Произошла ошибка загрузки данных
      </div>
      <div
        style={{
          fontSize: '16px',
          color: '#ff6b6b',
          maxWidth: '500px',
        }}
      >
        {message}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: '#ff6b6b',
          marginTop: '24px',
        }}
      >
        Возможно проблемы с подключением к интернету, попробуйте проверить соединение и обновить страницу.
      </div>
    </div>
  );
}

export default ErrorMessage;
