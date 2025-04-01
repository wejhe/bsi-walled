const TransferForm = () => {
  return (
    <>
      <BalInfo />
      <div className="tighterGroup">
        <div className="inputGroupWithSpan">
          <InputSpan text="&#127917; Recipient" width="25%" />
          <InputField type="text" placeholder="Account Number" width="75%" />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128176; Amount" width="25%" />
          <InputField type="text" placeholder="Transfer Amount" width="75%" />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128221; Note" width="25%" />
          <InputField type="text" placeholder="Transfer Note" width="75%" />
        </div>
      </div>
      <PrimaryButton
        text="TRANSFER"
        onClick={() =>
          Swal.fire({
            title: "Transfer Success",
            text: "Your request has been successfullly processed",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "PRINT",
            cancelButtonText: "DISMISS",
            customClass: {
              popup: "modalRadius",
              confirmButton: "modalButton",
              cancelButton: "modalButtonSecondary",
            },
          })
        }
        width="calc(100% + 32px)"
      />
    </>
  );
};

export default TransferForm;
