document.addEventListener('DOMContentLoaded', () => main());

const main = () => {
    let stepTemplates = [
        {
            step: 0,
            template: `
                    <h1 class="title">Pulley System</h1>
                    <h4 class="subtitle">The pulleys are a simple machines. They help to perform work by changing the direction of forces and making easier the moving of large objects.</h4>
                    <h4>There are 3 types of pulleys</h4>
                    <ul class="list">
                        <li>Fixed Pulleys</li>
                        <li>Movable Pulleys</li>
                        <li>Pulley Systems</li>
                    </ul>
                    <p>Lets get started, press to Forward button</p>
                    <img class="img-rotate" src="assets/arrow.png">
                    `,
            func: () => {},
        },
        {
            step: 1,
            template: `
                    <h1 class="title">Fixed Pulleys</h1>
                    <h4 class="subtitle">Fixed pulleys are simple machines that redirects force. This means that after looping rope around a pulley and attaching the rope to a load, you can pull down the rope to raise the load, instead of lifting the load.</h4>
                    <p>Let's try! </p><br><br><br>
                    <img class="img-rotate" src="assets/arrow.png">
                   `,
            func: () => {
                getStaticPulleyGroup(step).transform('t119,0');
            },
        },
        {
            step: 2,
            template: `
                    <h1 class="title">Fixed Pulleys</h1>
                    <h4 class="subtitle">Fixed pulleys are simple machines that redirects force. This means that after looping rope around a pulley and attaching the rope to a load, you can pull down the rope to raise the load, instead of lifting the load.</h4>
                    <p>In order to get balanced, you must apply the same force to lift as the load. <strong>Fixed pulley does not give any mechanical advantage. </strong></p>
                    <h5>What do we have here?</h5>
                    <ul class="list">
                        <li>A fixed pulley</li>
                        <li>A rope</li>
                        <li>10kg Load x 9.81 N ≈ 100 N </li>
                    </ul>
                    <h4 class="title">At least how much force do we need to lift the load?</h4>
                    `,
            func: () => {
                getLoadAndHookGroup(step).transform('t100,220');
                getStaticPulleyGroup(step).transform('t119,0');
                getRopeGroup(step).transform('t0,0');
            },
        },
        {
            step: 3,
            template: `
                    <h1 class="title">Question</h1>
                    <h4 class="subtitle">At least how much force do we need to lift the load?</h4>
                    <p>Thats right! Over 100 N</p>
                    `,
            func: () => {
                getStaticPulleyGroup(step).transform('t119,0');
                step.drawAnimated(getRopeTop(), undefined, 1);
                let ropeBottom = step.drawAnimated(getRopeBottom(), undefined, 1);
                step.drawAnimated(getRopeArc(), undefined, 1);
                let loadAndHook = getLoadAndHookGroup(step).transform('t100,220');
                loadAndHook.animate({ transform: 'translate(100,100)' }, 700, mina.linear);
                step.drawAnimated('M150, 40 L 251 170', undefined, 700).transform('t100,100');
                ropeBottom.animate({ transform: 'matrix(1,0.22,0,0.33,0,0)' }, 700, mina.linear);
                step.text(320, 200, '110 N ↓')
            },
        },
        {
            step: 4,
            template: `
                    <h1 class="title">Movable Pulleys</h1>
                    <h4 class="subtitle"> In a movable pulley system, the rope is attached to a fixed point, the pulley is attached to the load that you want to move. By pulling on the rope, the pulley moves and the load raises. </h4>
                    <p>Let's try! </p><br><br><br>
                    <img class="img-rotate" src="assets/arrow.png">
                   `,
            func: () => {
                getMovablePulleyGroup(step).transform('t250,250s2');

            },
        },
        {
            step: 5,
            template: `
                    <h1 class="title">Movable Pulleys</h1>
                    <h4 class="subtitle"> In a movable pulley system, the rope is attached to a fixed point, the pulley is attached to the load that you want to move. By pulling on the rope, the pulley moves and the load raises. </h4>
                    <p>If you attach a 100 newton box to a moveable pulley, you will only need to apply 50 newtons of force to move the box because the moveable pulley will multiply your force by 2.</p>
                    <h5>What do we have here?</h5>
                    <ul class="list">
                        <li>A movable pulley</li>
                        <li>A wall</li>
                        <li>A rope</li>
                        <li>10kg Load x 9.81 N ≈ 100 N </li>
                    </ul>
                    
                    `,
            func: () => {
                step.drawAnimated(getMovingRopeTop(), undefined, 1).transform('t245,100s2');
                step.drawAnimated(getMovingRopeBottom(), undefined, 1).transform('t355,240s2');
                step.drawAnimated(getMovingRopeArc(), undefined, 1).transform('t282,268s2');
                getMovablePulleyGroup(step).transform('t250,250s2');
                getWall(step).transform('t250,50s2');
            },
        },
        {
            step: 6,
            template: `
                    <h1 class="title">Question</h1>
                    <h4 class="subtitle">At least how much force do we need to lift the load?</h4>
                    <p>Thats right! Over 100 N</p>
                    `,
            func: () => {
                //         getStaticPulleyGroup(step).transform('t119,0');
                step.drawAnimated(getMovingRopeTop(), undefined, 1).transform('t245,100s2');
                let ropeBottom = step.drawAnimated(getMovingRopeBottom(), undefined, 1).transform('t355,240s2');
                step.drawAnimated(getMovingRopeArc(), undefined, 1).transform('t282,268s2');
                //         let loadAndHook = getLoadAndHookGroup(step).transform('t100,220');
                //         loadAndHook.animate({ transform: 'translate(100,100)' }, 700, mina.linear);
                //         step.drawAnimated('M150, 40 L 251 170', undefined, 700).transform('t100,100');
                //         ropeBottom.animate({ transform: 'matrix(1,0.22,0,0.33,0,0)' }, 700, mina.linear);
                //         step.text(320, 200, '110 N ↓')

                // getLoadAndHookGroup(step).transform('t100,220');
                getMovablePulleyGroup(step).transform('t250,250s2');
                getWall(step).transform('t250,50s2');
                // getRopeGroup(step).transform('t0,0');
            },
        },
        // {
        //     step: 7,
        //     template: ` 
        //             <ul>
                   
        //             </ul>
        //             `,
        //     func: () => {
        //         const pathDefinition = zintSnapUtility.describeArc(31.94, 45.39, 100, 0, 90);
        //         step.drawAnimated(pathDefinition, ZintSnapStepByStepDescription.PEN_HELPER);
        //     },
        // },
        // {
        //     step: 8,
        //     template: ` 
        //             <ul>
        //                 <li>This is the third step.</li>
        //                 <li>Note that there is no new drawing here.</li>
        //             </ul>
        //             `,
        //     func: () => {
        //         // nop
        //     },
        // },
        // {
        //     step: 9,
        //     template: ` 
        //             <ul>
        //                 <li>This is the fourth and last step</li>
        //             </ul>
        //             `,
        //     func: () => {
        //         step.drawAnimated('M50 100 L 100 50', {
        //             stroke: 'red',
        //             'stroke-width': '3',
        //         });
        //     },
        // },
    ];

    stepTemplates
        .map((el) => el.template)
        .map((template) => {
            var parent = document.createElement('div');
            parent.classList.add('step-description-item');
            parent.innerHTML = template;
            document.getElementById('step-description').appendChild(parent);
        });

    let step = new ZintSnapStepByStepDescription('step-description-item', {
        viewBox: '0 0 750 500',
        arrSnap: stepTemplates.map((el) => el.func),
        steps: stepTemplates.map((el) => el.step),
    });
    step.start();
};

function getLoadAndHookGroup(step) {
    let loadParts = [];
    loadParts.push(step.rect(30.41, 13.64, 3.17, 6.75, 'fill-grey'));
    loadParts.push(step.circle(32, 11.4, 3.51, 'fill-grey'));
    loadParts.push(step.path('M50.76,17H13.24a4,4,0,0,0-3.91,3.17L.51,61.58a2,2,0,0,0,2,2.42H61.53a2,2,0,0,0,2-2.42L54.67,20.19A4,4,0,0,0,50.76,17Z', 'fill-light-grey'));
    loadParts.push(step.polygon(['8.72 56.49 15.53 24.53 48.47 24.53 55.28 56.49 8.72 56.49'], 'fill-grey'));
    let hookParts = [];
    hookParts.push(step.path('M28.49,7.88A3.51,3.51,0,1,0,32,4.37v1.4a2.12,2.12,0,1,1-2.11,2.11Z', 'fill-grey'));
    hookParts.push(step.rect(31.37, 0, 1.25, 6.75, 'fill-grey'));
    let textParts = [];
    textParts.push(step.text(14, 45, '100 N', { 'font-size': 12, stroke: '#cccccc' }));
    return step.group([...loadParts, ...textParts, ...hookParts]);
}

function getLoadGroup(step) {
    let loadParts = [];
    loadParts.push(step.rect(30.41, 13.64, 3.17, 6.75, 'fill-grey'));
    loadParts.push(step.circle(32, 11.4, 3.51, 'fill-grey'));
    loadParts.push(step.path('M50.76,17H13.24a4,4,0,0,0-3.91,3.17L.51,61.58a2,2,0,0,0,2,2.42H61.53a2,2,0,0,0,2-2.42L54.67,20.19A4,4,0,0,0,50.76,17Z', 'fill-light-grey'));
    loadParts.push(step.polygon(['8.72 56.49 15.53 24.53 48.47 24.53 55.28 56.49 8.72 56.49'], 'fill-grey'));
    let hooks = getHookGroup(step);
    return step.group([...loadParts, ...hooks]);
}

function getHookGroup(step) {
    let hookParts = [];
    hookParts.push(step.path('M28.49,7.88A3.51,3.51,0,1,0,32,4.37v1.4a2.12,2.12,0,1,1-2.11,2.11Z', 'fill-grey'));
    hookParts.push(step.rect(31.37, 0, 1.25, 6.75, 'fill-grey'));
    return step.group(hookParts);
}
function getStaticPulleyGroup(step) {
    let staticPulley = [];
    staticPulley.push(step.rect(-0.06, 0, 64, 7.88, 'fill-brown'));
    staticPulley.push(step.circle(31.94, 45.39, 18.61, 'fill-blue'));
    staticPulley.push(step.circle(31.94, 45.39, 14.16, 'fill-light-blue'));
    staticPulley.push(step.circle(31.94, 45.39, 4.63, 'fill-blue'));
    staticPulley.push(step.path('M29.83,54.68V7.88h4.22v46.8A3.11,3.11,0,0,1,29.83,54.68Z', 'fill-light-grey'));
    staticPulley.push(step.circle(31.94, 45.39, 4.63, 'fill-grey'));
    return step.group(staticPulley);
}

function getRopeGroup(step) {
    const ropeArc = getRopeArc();
    const ropeTop = getRopeTop();
    const ropeBottom = getRopeBottom();
    return step.drawAnimated(ropeBottom + ropeArc + ropeTop, undefined, 1);
}

function getRopeBottom() {
    return 'M132 220 L 132 44';
}

function getRopeTop() {
    return 'M166.5, 36 L 250 140';
}

function getRopeArc() {
    return zintSnapUtility.describeArc(150.5, 45, 18.25, 270, 62, 1);
}

function getMovablePulleyGroup(step) {
    let movablePulley = [];
    movablePulley.push(step.circle(31.94, 18.61, 18.61, 'fill-blue'));
    movablePulley.push(step.circle(31.94, 18.61, 14.16, 'fill-light-blue'));
    movablePulley.push(step.circle(31.94, 18.61, 4.63, 'fill-blue'));
    movablePulley.push(step.path('M29.83,47.27V7.88h4.22V47.27A3.09,3.09,0,0,1,29.83,47.27Z', 'fill-light-grey'));
    movablePulley.push(step.circle(31.94, 18.61, 1.4, 'fill-grey'));
    movablePulley.push(step.path('M27.56,56.63a4.38,4.38,0,1,0,4.38-4.38V54a2.63,2.63,0,1,1-2.63,2.63Z', 'fill-grey'));
    movablePulley.push(step.rect(31.16, 45.6, 1.56, 8.4, 'fill-grey'));
    movablePulley.push(step.circle(31.94, 45.6, 2.93, 'fill-grey'));
    movablePulley.push(step.circle(31.94, 45.6, 1.65, 'fill-light-grey'));
    getMovableLoadAndHookGroup(step).transform('t250,350s2');
    return step.group(movablePulley);
}

function getMovableLoadAndHookGroup(step) {
    let loadParts = [];
    loadParts.push(step.rect(30.41, 13.64, 3.17, 6.75, 'fill-grey'));
    loadParts.push(step.circle(32, 11.4, 3.51, 'fill-grey'));
    loadParts.push(step.path('M50.76,17H13.24a4,4,0,0,0-3.91,3.17L.51,61.58a2,2,0,0,0,2,2.42H61.53a2,2,0,0,0,2-2.42L54.67,20.19A4,4,0,0,0,50.76,17Z', 'fill-light-grey'));
    loadParts.push(step.polygon(['8.72 56.49 15.53 24.53 48.47 24.53 55.28 56.49 8.72 56.49'], 'fill-grey'));
    let textParts = [];
    textParts.push(step.text(14, 45, '100 N', { 'font-size': 12, stroke: '#cccccc' }));
    return step.group([...loadParts, ...textParts]);
}

function getWall(step) {
    let staticPulley = [];
    staticPulley.push(step.rect(-50, 0, 170, 7.88, 'fill-brown'));
    return step.group(staticPulley);
}

function getMovingRopeBottom() {
    return 'M0, 0 L 80 -70';
}

function getMovingRopeTop() {
    return 'M0,0 L 0 105';
}

function getMovingRopeArc() {
    return zintSnapUtility.describeArc(0, 0, 18.25, 270, 90, 0);
}

// function getRopeGroup(step) {
//     const ropeArc = getRopeArc();
//     const ropeTop = getRopeTop();
//     const ropeBottom = getRopeBottom();
//     return step.drawAnimated(ropeBottom + ropeArc + ropeTop, undefined, 1);
// }

// <rect class="cls-4" x="30.96" y="59.77" width="2.09" height="4.23"/>
// <circle class="cls-4" cx="32" cy="59.77" r="2.68"/>

// rope.animate({ transform:'translate(100,220)'}, 700, mina.linear );
// var rect = step.rect(20,20,40,40);
// var circle = step.circle(60,150,50);

// var move = function(dx,dy) {
//         this.attr({
//                     transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
//                 });
// }

// var start = function() {
//         this.data('origTransform', this.transform().local );
// }
// var stop = function() {
//         console.log('finished dragging');
// }

// rect.drag(move, start, stop );
// circle.drag(move, start, stop );

// var t = p.Matrix()
// console.log(t);
// t.translate(100, 100);
// butterfly.transform(t);

// hook
// pulley
// rope
