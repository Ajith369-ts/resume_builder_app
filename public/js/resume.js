const deleteBox = (btn) => {
  const detailsId = btn.value;
  const delId = btn.parentNode.querySelector("[name='delId']").value;

  const contentElement = btn.closest(".detailDiscBox");

  fetch(`/deletedetails/${detailsId}/${delId}`, {
    method: "DELETE",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      contentElement.parentNode.removeChild(contentElement);
    })
    .catch((err) => {
      console.log(err);
    });
};

const internOldInput = (btn) => {
  const editId = btn.parentNode.querySelector("[name='editId']").value;
  const internModal = document.getElementById("editInternDetailModal");

  internModal.querySelector("[name='editDetailsId']").value = editId;

  fetch("/internOldContent/" + editId, {
    method: "POST",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      internModal.querySelector("[name='internProfile']").value =
        data.internProfile;
      internModal.querySelector("[name='internOrganisation']").value =
        data.internOrganisation;
      internModal.querySelector("[name='internLocation']").value =
        data.internLocation;
      internModal.querySelector("[name='wfh']").value = data.workFrom[0];
      internModal.querySelector("[name='internStartDate']").value =
        data.startDate.substring(0, 10);
      internModal.querySelector("[name='internEndDate']").value =
        data.endDate.substring(0, 10);
      internModal.querySelector("[name='internDiscription']").value =
        data.discription;
    })
    .catch((err) => {
      console.log(err);
    });
};

const trainingOldInput = (btn) => {
  const editId = btn.parentNode.querySelector("[name='editId']").value;
  const internModal = document.getElementById("editTrainingDetailModal");

  internModal.querySelector("[name='editDetailsId']").value = editId;

  fetch("/trainingOldContent/" + editId, {
    method: "POST",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      internModal.querySelector("[name='trainProgram']").value =
        data.trainProgram;
      internModal.querySelector("[name='trainingOrganisation']").value =
        data.trainingOrganisation;
      internModal.querySelector("[name='trainingLocation']").value =
        data.trainingLocation;
      internModal.querySelector("[name='ongoing']").value = data.ongoing[0];
      internModal.querySelector("[name='trainingStartDate']").value =
        data.startDate.substring(0, 10);
      internModal.querySelector("[name='trainingEndDate']").value =
        data.endDate.substring(0, 10);
      internModal.querySelector("[name='trainingDisc']").value = data.disc;
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearInput = () => {
  const inputField = document.querySelectorAll(".modal-body");

  inputField.forEach((element) => {
    const input = element.querySelectorAll("input");
    const textarea = element.querySelectorAll("textarea");

    input.forEach((r) => {
      r.value = "";
    });

    textarea.forEach((r) => {
      r.value = "";
    });
  });
};

// const inputValidation = () => {

//   document.getElementById("userDetailForm").submit();

// fetch("/personal/details", {
//   method: "POST",
// })
//   .then((result) => {
//     return result.json();
//   })
//   .then((data) => {
//     console.log(data);
//     if (data) {
//       $("#userDetailModal").modal("show");
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
