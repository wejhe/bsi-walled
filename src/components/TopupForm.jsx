const TopupForm = () => {
  return (
    <>
      <BalInfo />
      <div className="tighterGroup">
        <div className="inputGroupWithSpan">
          <InputSpan text="&#127917; Source" width="25%" />
          <DropDown
            options={[
              {
                value: "bsi",
                label: "Bank Syariah Indonesia (BSI)",
              },
              {
                value: "bca",
                label: "Bank Central Asia (BCA)",
              },
              {
                value: "bri",
                label: "Bank Rakyat Indonesia (BRI)",
              },
            ]}
          />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128176; Amount" width="25%" />
          <InputField type="text" placeholder="Top-Up Amount" width="75%" />
        </div>
        <div className="inputGroupWithSpan">
          <InputSpan text="&#128221; Note" width="25%" />
          <InputField type="text" placeholder="Top-Up Note" width="75%" />
        </div>
      </div>
      <PrimaryButton
        text="TOP-UP"
        onClick={() =>
          Swal.fire({
            title: "Top-Up Success",
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

export default TopupForm;
