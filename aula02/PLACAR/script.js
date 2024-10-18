goalGremio = 0
goalInter = 0

function verify() {
    if (goalGremio == goalInter) {
        $("#divGremio").css("border", "none");
        $("#divInter").css("border", "none");
    } else if (goalGremio > goalInter) {
        $("#divGremio").css("border", "2px solid #8eb44b");
        $("#divGremio").css("border-radius", "7px");
    } else if (goalGremio < goalInter) {
        $("#divInter").css("border", "2px solid #8eb44b");
        $("#divInter").css("border-radius", "7px");
    }
};

// function toggleCircleGremio() {
//     if ($("#circleInter").css("display") === "none") {
//         $("#circleGremio").show();
//     } else {
//         $("#circleInter").hide();
//         $("#circleGremio").show();
//     }
// };

// function toggleCircleInter() {
//     if ($("#circleGremio").css("display") === "none") {
//         $("#circleInter").show();
//     } else {
//         $("#circleGremio").hide();
//         $("#circleInter").show();
//     }
// };

function toggleCircle(team) {
    $(".circle").hide();
    if (team === 'Gremio') {
        $("#circleGremio").show();
    } else if (team === 'Inter') {
        $("#circleInter").show();
    }
};

$("#sumGremio").click(function() {      // POR QUE PRECISA CRIAR UMA FUNÇÃO?
    goalGremio += 1                     // - SE EU DEIXO SEM, O PLACAR COMECA 
    $("#goalGremio").text(goalGremio);  // COM O VALOR QUE EU COLOQUEI EM JS
    toggleCircle("Gremio");
    verify();
});

$("#sumInter").click(function() {
    goalInter += 1
    $("#goalInter").text(goalInter);
    toggleCircle("Inter");
    verify();
});

$("#reset").click(function() {
    $("#goalGremio, #goalInter").text("0");
    goalGremio = 0;
    goalInter = 0;
    $(".circle").hide();
    verify();
});
