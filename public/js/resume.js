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

const personalDetailOldInput = (btn) => {
  const editId = btn.parentNode.querySelector("[name='editId']").value;
  const personalModal = document.getElementById("userDetailModal");
  const form = personalModal.querySelector("#userDetailsForm");

  form.action = "/personal/editDetails";

  personalModal.querySelector("[name='editDetailsId']").value = editId;

  fetch("/personalOldContent/" + editId, {
    method: "POST",
  })
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    console.log(data);
    personalModal.querySelector("[name='first_name']").value =
      data.firstName;
    personalModal.querySelector("[name='last_name']").value =
      data.lastName;
    personalModal.querySelector("[name='phoneNum']").value =
      data.phoneNo;
    personalModal.querySelector("[name='emailId']").value =
      data.email;
    personalModal.querySelector("[name='address']").value =
      data.address;
  })
  .catch((err) => {
    console.log(err);
  });
}

const internOldInput = (btn) => {
  const editId = btn.parentNode.querySelector("[name='editId']").value;
  const internModal = document.getElementById("internDetailModal");
  const form = internModal.querySelector("#internForm");

  form.action = "/internship/editDetails";

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
      internModal.querySelector("[name='wfh']").value = 
        data.workFrom[0];
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
  const trainingModal = document.getElementById("trainingDetailModal");
  const form = trainingModal.querySelector("#trainingForm");

  form.action = "/training/editDetails";

  trainingModal.querySelector("[name='editDetailsId']").value = editId;

  fetch("/trainingOldContent/" + editId, {
    method: "POST",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      trainingModal.querySelector("[name='trainProgram']").value =
        data.trainProgram;
      trainingModal.querySelector("[name='trainingOrganisation']").value =
        data.trainingOrganisation;
      trainingModal.querySelector("[name='trainingLocation']").value =
        data.trainingLocation;
      trainingModal.querySelector("[name='ongoing']").value = 
        data.ongoing[0];
      trainingModal.querySelector("[name='trainingStartDate']").value =
        data.startDate.substring(0, 10);
      trainingModal.querySelector("[name='trainingEndDate']").value =
        data.endDate.substring(0, 10);
      trainingModal.querySelector("[name='trainingDisc']").value = data.disc;
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearInput = () => {
  const inputField = document.querySelectorAll(".modal-body");
  const personalForm = document.getElementById("userDetailModal").querySelector("#userDetailsForm");
  const internForm = document.getElementById("internDetailModal").querySelector("#internForm");
  const trainingForm = document.getElementById("trainingDetailModal").querySelector("#trainingForm");

  personalForm.action = "/personal/details";
  internForm.action = "/internship/details";
  trainingForm.action = "/training/details";

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
