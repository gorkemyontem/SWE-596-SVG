document.addEventListener("DOMContentLoaded", () => main());

const main = () => {
    let viewBox = "0 0 300 200";
    let indexArrSnap;
    let arrSnap = [];
    let board;
    let step_by_step;

    board = {
        viewBox: viewBox,
        arrSnap: arrSnap
    }
    
    indexArrSnap = 0;
    const initStepByStep = function () {
        step_by_step = new ZintSnapStepByStepDescription(
            "step-by-step-description-item",
            board
        );
        step_by_step.start();
    }

    arrSnap[indexArrSnap++] = () => {
        step_by_step.drawAnimated("M50 100 L 150 100");
    }
    arrSnap[indexArrSnap++] = () => {
        const pathDefinition = zintSnapUtility.describeArc(50, 100, 100, 0, 90);
        step_by_step.drawAnimated(pathDefinition, ZintSnapStepByStepDescription.PEN_HELPER);
    }
    arrSnap[indexArrSnap++] = () => {
        // nop
    }
    const pen_red = {
        'stroke': "red",
        'stroke-width': "3",
    };
    arrSnap[indexArrSnap++] = () => {
        step_by_step.drawAnimated("M50 100 L 100 50", pen_red);
    }
    initStepByStep();
}
