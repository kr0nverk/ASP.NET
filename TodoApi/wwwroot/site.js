const uri = "api/todo";
let todos = null;
function getCount(data) {
    const el = $("#counter");
    let name = "todo";
    if (data) {
        if (data > 1) {
            name = "todos";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#todos");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append(
                        $("<td></td>").append(
                            $("<input/>", {
                                type: "checkbox",
                                disabled: true,
                                checked: item.isComplete
                            })
                        )
                    )
                    .append($("<td></td>").text(item.name))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            todos = data;
        }
    });
}

function addItem() {
    const item = {
        name: $("#add-name").val(),
        isComplete: false
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-name").val("");
        }
    });
}
function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(todos, function (key, item) {
        if (item.id === id) {
            $("#edit-name").val(item.name);
            $("#edit-id").val(item.id);
            $("#edit-isComplete")[0].checked = item.isComplete;
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        name: $("#edit-name").val(),
        isComplete: $("#edit-isComplete").is(":checked"),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});


const uriC = "api/contact";
let contacts = null;

function getCountContacts(data) {
    const elC = $("#counterC");
    let name = "contact";
    if (data) {
        if (data > 1) {
            name = "contacts";
        }
        elC.text(data + " " + name);
    } else {
        elC.text("No " + name);
    }
}

function getContacts() {
    $.ajax({
        type: "GET",
        url: uriC,
        cache: false,
        success: function (data) {
            const tBody = $("#contacts");

            $(tBody).empty();

            getCountContacts(data.length);

            $.each(data, function (key, itemC) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(itemC.name))
                    .append($("<td></td>").text(itemC.address))
                    .append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editContact(itemC.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteContact(itemC.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            contacts = data;
        }
    });
}

function addContacts() {
    const itemC = {
        name: $("#addC-name").val(),
        address: $("#addC-address").val()
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uriC,
        contentType: "application/json",
        data: JSON.stringify(itemC),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getContacts();
            $("#addC-name").val("");
        }
    });
}

function editContact(id) {
    $.each(contacts, function (key, itemC) {
        if (itemC.id === id) {
            $("#editC-name").val(itemC.name);
            $("#editC-address").val(itemC.address);
            $("#editC-id").val(itemC.id);
        }
    });
    $("#spoiler").css({ display: "block" });
}

function deleteContact(id) {
    $.ajax({
        url: uriC + "/" + id,
        type: "DELETE",
        success: function (result) {
            getContacts();
        }
    });
}

$(".my-formC").on("submit", function () {
    const itemC = {
        name: $("#editC-name").val(),
        address: $("#editC-address").val(),
        id: $("#editC-id").val()
    };

    $.ajax({
        url: uriC + "/" + $("#editC-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(itemC),
        success: function (result) {
            getContacts();
        }
    });

    closeInput();
    return false;
});


function closeInput() {
    $("#spoiler").css({ display: "none" });
}