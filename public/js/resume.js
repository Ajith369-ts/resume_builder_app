const deleteBox = (btn) => {
    const delId = btn.parentNode.querySelector("[name='delId']").value;

    const contentElement = btn.closest(".detailDiscBox");

    fetch("/deleteInternItem/" + delId, {
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

const oldInput = (btn) => {
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
